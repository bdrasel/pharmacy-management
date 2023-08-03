<template>
  <div>
    <login></login>
    <div class="toasts">
      <the-toast
        v-for="(toast, i) in toasts"
        :key="i"
        :toastType="toast.type"
        :toastMessage="toast.message"
      ></the-toast>
    </div>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import TheToast from "./components/TheToast.vue";
export default {
  data: () => ({
    toasts: [
      //   {
      //     type: "Success",
      //     message: "Successfully Done",
      //   },
      //   {
      //     type: "Error",
      //     message: "something went wrong",
      //   },
    ],
  }),
  components: {
    Login,
    TheToast,
  },
  mounted() {
    this.$eventBus.on("toast", (toast) => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts.shift();
      }, 2000);
      // console.log(toast);
    });
  },
};
</script>

<style></style>
