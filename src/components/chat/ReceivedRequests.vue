<template>
  <div class="container">
    <div class="dropdown">
      <button class="dropbtn">Received Requests</button>
      <div class="dropdown-content">
        <div v-for="request in requests">
          <p>{{ request.name }}</p>
          <div class="actions">
            <button @click="accept(request)">Ok</button>
            <button>Deny</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requests: [],
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      try {
        let res = await axios.get("receivedRequests");
        this.requests = res.data.receivedRequests;
      } catch (error) {
        console.log(error);
      }
    },
    async accept(user) {
      try {
        let res = await axios.post("acceptRequest", user);
        console.log("D:", res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  position: absolute;
  top: 10px;
  right: 0;
  width: fit-content;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>