<template>
  <main>
    <SentRequests />
    <ReceivedRequests />

    <Users ref="usersLists" />
    <mainChat
      @userJoined="userJoined"
      @setUsers="setUsers"
      @leftUser="leftUser"
    />
  </main>
</template>

<script>
import { AuthStore } from "../stores/AuthStore";
import Echo from "laravel-echo";
import Users from "../components/chat/usersLists";
import mainChat from "../components/chat/mainChat.vue";
import SentRequests from "../components/chat/SentRequests.vue";
import ReceivedRequests from "../components/chat/ReceivedRequests.vue";
import axios from "axios";

export default {
  components: { Users, mainChat, SentRequests, ReceivedRequests },
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  async mounted() {
    // await this.getData();
    const auth = AuthStore();
    await this.getSentRequests();
    await this.getReceivedRequests();

    // await this.getSentRequests();
    // await this.getReceivedRequests();

    // console.log({ "sent requests": this.sentRequests });
    // console.log({ "received requests": this.receivedRequests });

    window.Echo.private(`friend-request-channel.${auth.user.id}`).listen(
      "FriendRquestEvent",
      (e) => {
        console.log("D:");
        console.log(e);
      }
    );
  },
  data() {
    return {
      data: [],
      // sentRequests: [],
      // receivedRequests: [],
    };
  },
  methods: {
    // async getData() {
    //   try {
    //     let res = await axios.get("messages");
    //     this.data = res.data.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getSentRequests() {
      try {
        let res = await axios.get("sentRequests");
        console.log("getSentRequests1", res);
        this.sentRequests = res.data.sentRequests;
      } catch (error) {
        console.log(error);
      }
    },

    setUsers(users) {
      this.$refs.usersLists.setUsers(users);
    },
    userJoined(user) {
      this.$refs.usersLists.addUser(user);
    },
    leftUser(user) {
      this.$refs.usersLists.removeUser(user);
    },
    async getReceivedRequests() {
      try {
        let res = await axios.get("receivedRequests");
        console.log("getReceivedRequests1", res);

        this.receivedRequests = res.data.receivedRequests;
      } catch (error) {
        console.log(error);
      }
    },
  },

  /* TODO:: APPLY FOR FRONT END */
};
</script>

<style scoped>
main {
  height: calc(100vh - 100px);
  display: grid;
  grid-template-columns: 450px 1fr;
  column-gap: 10px;
  padding: 0 10px;
}

@media screen and (max-width: 768px) {
  main {
    grid-template-columns: 1fr;
    margin-left: 60px;
    position: relative;
  }
}

@media screen and (max-width: 600px) {
  main {
    margin-left: 45px;
  }
}
</style>