<template>
  <div id="todoMain">
    <preLoader v-if="loading" ref="preLoader" />

    <div ref="todoContainer" class="todo-container" v-if="data.length">
      <span v-if="!noData" @click="deleteAll" id="deleteAll">Delete All</span>

      <div v-for="(todo, index) in data" :key="todo.id">
        <div :class="oddOrEven(index)" class="todo">
          <p
            @click="done(todo.id, $event)"
            :class="[{ done: todo.done }, oddOrEven(index)]"
            class="todoBody"
            :ref="
              (el) => {
                todos[todo.id] = el;
              }
            "
          >
            {{ todo.body }}
          </p>

          <div class="todoIcons" :class="oddOrEven(index)">
            <span
              @click="deleteTodo(todo.id)"
              class="mdi mdi-delete delete"
            ></span>
            <span @click="edit(todo.id)" class="mdi mdi-table-edit edit"></span>
          </div>
        </div>
        <div class="todoEdit none" :class="oddOrEven(index)">
          <textarea
            class="todoInput"
            :class="oddOrEven(index)"
            :value="todo.body"
            :ref="
              (el) => {
                inputs[todo.id] = el;
              }
            "
          >
          </textarea>
          <div class="todoIcons" :class="oddOrEven(index)">
            <span
              @click="updateTodo(todo.id)"
              class="mdi mdi-arrow-up-bold save"
            ></span>
            <span
              @click="cancel(todo.id)"
              class="mdi mdi-close-box close"
            ></span>
          </div>
        </div>
        <p
          :ref="
            (el) => {
              dates[todo.id] = el;
            }
          "
          class="date"
          :class="oddOrEven(index)"
        >
          {{
            todo.updated_at
              ? "Updated " + todo.updated_at
              : "Created " + todo.created_at
          }}
        </p>
      </div>
      <span @click="scrollToTop()" v-if="scrollable" id="GoTop">Go To Top</span>
    </div>
    <div v-if="noData" id="noDataContainer">
      <h2>ADD SOME TODOS!!</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import preLoader from "./preLoader.vue";

export default {
  components: { preLoader },
  data() {
    return {
      inputs: [],
      todos: [],
      dates: [],
      data: [],
      scrollable: false,
      noData: false,
      scroll: true,
      loading: true,
    };
  },

  async mounted() {
    try {
      let res = await axios.get("todos");
      this.data = res.data.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },

  updated() {
    if (this.$refs.todoContainer) {
      if (
        this.$refs.todoContainer.scrollHeight >
        this.$refs.todoContainer.clientHeight
      ) {
        this.scrollable = true;
        if (this.scroll) {
          this.$refs.todoContainer.scrollTop =
            this.$refs.todoContainer.scrollHeight;
        }
      } else {
        this.scrollable = false;
      }
    }
  },

  watch: {
    data(newVal) {
      newVal.length ? (this.noData = false) : (this.noData = true);
    },
  },

  methods: {
    oddOrEven(index) {
      if (index % 2 == 0) {
        return "even";
      }

      return "ood";
    },

    edit(todo) {
      let pHeight = this.todos[todo].offsetHeight + "px";
      this.toggles(todo);
      this.inputs[todo].style.height = pHeight;
      this.inputs[todo].focus();
    },

    toggles(todo) {
      this.inputs[todo].parentElement.classList.toggle("none");
      this.inputs[todo].parentElement.previousElementSibling.classList.toggle(
        "none"
      );
    },

    cancel(todo) {
      this.toggles(todo);
      this.inputs[todo].value = this.todos[todo].textContent;
    },

    update(todo, data) {
      this.inputs[todo].value = data.body;
      this.todos[todo].textContent = data.body;
      this.todos[todo].classList.remove("done");
      this.dates[todo].textContent = "Updated " + data.updated_at;
    },

    scrollToTop() {
      this.$refs.todoContainer.scrollTop = 0;
    },

    async done(todo, event) {
      try {
        await axios.post(`todos/done/${todo}`);
        event.target.classList.toggle("done");
      } catch (error) {
        console.log(error);
      }
    },

    async updateTodo(todo) {
      try {
        let res = await axios.put(`todos/${todo}`, {
          body: this.inputs[todo].value,
        });
        this.update(todo, res.data.data);
        this.cancel(todo);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTodo(todo) {
      try {
        let res = await axios.delete(`todos/${todo}`);
        this.data = res.data.data;
        this.scroll = false;
      } catch (error) {
        console.log(error);
      }
    },

    async addTodo(body) {
      try {
        let res = await axios.post("todos", { body: body });
        this.data = res.data.data;
        this.scroll = true;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAll() {
      let res = await axios.post("todos/delete-all");
      this.data = res.data.data;
      this.scrollable = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/todo/main";
</style>