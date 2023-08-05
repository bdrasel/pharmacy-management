<template>
  <div>
    <router-view></router-view>

    <!-- <div class="toasts"> -->
    <TransitionGroup name="animation" tag="div" class="toasts">
      <the-toast
        v-for="(toast, i) in toasts"
        :key="i"
        :toastType="toast.type"
        :toastMessage="toast.message"
      ></the-toast>
    </TransitionGroup>
    <!-- </div> -->
  </div>
</template>

<script>
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

<style>
.animation-enter-active,
.animation-leave-active {
  transition: all 0.5s ease;
}
.animation-enter-from,
.animation-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
