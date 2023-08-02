<template>
  <div class="people-lists" ref="peopleLists">
    <div @click="showUsers()" class="showBtn none" ref="arrowShow">
      <span
        id="arrowShow"
        role="button"
        class="mdi mdi-chevron-double-right"
      ></span>
    </div>
    <div class="people-list">
      <div class="titel text-center fw-bold fst-italic">Users</div>
      <div class="people-list-header">
        <div class="input-group">
          <div class="input-group-prepend w-25 h-100">
            <span role="button" class="input-group-text h-100"
              ><i style="margin: 0 auto" class="mdi mdi-account-search h4"></i
            ></span>
          </div>
          <input type="text" class="form-control p-1" placeholder="Search..." />
        </div>
      </div>
      <div class="people-list-body">
        <ul class="list-unstyled chat-list mt-2 mb-0">
          <li
            @click.exact="showRequest($event)"
            v-for="user in users"
            :key="user.id"
            class="user mb-2"
          >
            <img
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              alt="avatar"
            />
            <div class="about">
              <div class="name">{{ user.name }}</div>
              <div v-if="user.status" class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
            <button
              @click="this.sendRquest(user.id)"
              class="btn btn-primary request-btn"
              style="z-index: 9999"
            >
              Send request
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="people-list">
      <div class="titel text-center fw-bold fst-italic">Friends</div>
      <div class="people-list-header">
        <div class="input-group">
          <div class="input-group-prepend w-25 h-100">
            <span role="button" class="input-group-text h-100"
              ><i style="margin: 0 auto" class="mdi mdi-account-search h4"></i
            ></span>
          </div>
          <input type="text" class="form-control p-1" placeholder="Search..." />
        </div>
      </div>
      <div class="people-list-body">
        <ul class="list-unstyled chat-list mt-2 mb-0">
          <li class="user mb-2" v-for="friend in friends">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              alt="avatar"
            />
            <div class="about">
              <div class="name">{{ friend.name }}</div>
              <div v-if="friend.status" class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div @click="hideUsers()" class="hideBtn none" ref="arrowHide">
      <span
        id="arrowHide"
        role="button"
        class="mdi mdi-chevron-double-left"
      ></span>
    </div>
  </div>
</template>

<script>
import { AuthStore } from "../../stores/AuthStore";
import axios from "axios";

export default {
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  watch: {
    onlineUsers() {
      console.log("online", this.onlineUsers);
    },
  },
  async mounted() {
    try {
      let friends = await axios.get("friends");
      this.friends = friends.data.friends;
      console.log("friends", friends);
    } catch (error) {
      console.log(error);
    }
    try {
      let users = await axios.get("users/10");
      this.users = users.data.users;
      console.log("users", users);
    } catch (error) {
      console.log("error");

      console.log(error);
    }
  },
  data() {
    return {
      onlineUsers: [],
      onlineIds: [],
      friends: [],
      users: [],
    };
  },
  methods: {
    setUsers(users) {
      this.onlineUsers = users.filter((u) => u.id != this.auth.user.id);
    },
    async sendRquest(id) {
      console.log(id);
      try {
        axios.post("friendRequest", { to: id });
      } catch (error) {
        console.log(error);
      }
    },
    showRequest(e) {
      if (e.target.tagName == "LI") {
        e.target.querySelectorAll(".request-btn")[0].classList.toggle("active");
      }
    },
    removeUser(user) {
      this.onlineUsers = this.onlineUsers.filter((u) => u.id != user.id);
    },
    addUser(user) {
      this.onlineUsers.push(user);
    },
    showUsers() {
      this.$refs.peopleLists.classList.add("show-people-lists");
      this.$refs.arrowShow.classList.add("hide", "disabled");
      this.$refs.arrowHide.classList.add("flex");
    },
    hideUsers() {
      this.$refs.peopleLists.classList.remove("show-people-lists");
      this.$refs.arrowShow.classList.remove("hide", "disabled");
      this.$refs.arrowHide.classList.remove("flex");
    },
  },
};
</script>

<style scoped lang="scss">
.none {
  display: none;
}
.people-lists {
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 5px;
  transition: all 0.8s;

  .showBtn {
    position: absolute;
    background: rgb(255, 255, 255);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 32px;
    cursor: pointer;
  }

  .people-list {
    display: grid;
    grid-template-rows: 30px 47px 1fr;
    overflow: auto;
    gap: 5px;
    border: 1px solid #eee;
    border-radius: 10px;

    .people-list-header {
      padding: 5px;
      margin-bottom: 3px;
      display: flex;
      input {
        width: 70%;
        height: 100%;
      }
      button {
        width: 30%;
        height: 100%;
      }
    }

    .user {
      position: relative;
      display: flex;
      cursor: pointer;
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 5px;
        pointer-events: none;
      }
      .about,
      .name,
      .status,
      .online {
        pointer-events: none;
      }
      .request-btn {
        display: none;
        opacity: 0;
        height: 0;
        width: 0;
        position: absolute;
        left: 0;
        transition: all 0.4s;

        &.active {
          display: block;
          top: 100%;
          opacity: 1;
          height: 75%;
          width: 80%;
        }
      }
    }

    .people-list-body {
      overflow: auto;
      padding: 5px;

      &::-webkit-scrollbar-thumb {
        background-color: #747d72;
        border: 2px solid #747d72;
        border-radius: 20px;
      }

      &::-webkit-scrollbar {
        width: 7px;
      }
    }
  }

  .hideBtn {
    position: absolute;
    background: rgb(255, 255, 255);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 32px;
    cursor: pointer;
  }
}

.hide {
  opacity: 0;
}

.flex {
  display: flex;
}

.show-people-lists {
  left: -40px !important;
}

@media screen and (max-width: 768px) {
  .people-lists {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 48;
    left: -587px;
    grid-template-columns: 45% 45%;

    .people-list {
      background: gray;
    }

    .hideBtn {
      right: -17px;
      box-shadow: 3px 2px 2px 1px rgb(0 0 0 / 20%);
    }

    .showBtn {
      right: -73px;
      display: flex;
      box-shadow: -3px 2px 2px 1px rgb(0 0 0 / 20%);
    }
  }
}

@media screen and (max-width: 600px) {
  .people-lists {
    grid-template-columns: 40% 40% !important;
    left: -565px;

    .showBtn,
    .hideBtn {
      font-size: 25px !important;
      width: 50px !important;
      height: 50px !important;
    }
    .hideBtn {
      right: 50px !important;
    }

    .showBtn {
      right: -53px !important;
    }
  }
}
</style>