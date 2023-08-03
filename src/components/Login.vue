<template>
  <div class="login-page">
    <TheToast></TheToast>
    <div class="login-card">
      <div class="text-center">
        <img
          class="login-card__icon"
          src="../../public/img/1803612.png"
          alt="logo"
        />
        <h2>user login</h2>
      </div>

      <form action="#" @submit.prevent="handleSubmit">
        <label class="block" for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Enter Email Address"
          required
          ref="email"
        />

        <label class="block mt-3" for="password">Password</label>
        <input
          type="password"
          v-model="form.password"
          id="password"
          placeholder="Enter Password"
          required
          ref="password"
        />

        <button type="submit" class="w-100 mt-3">Login</button>

        <div class="d-flex jc-between mt-3">
          <div>
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>
          <div>
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    handleSubmit() {
      if (!this.form.email) {
        this.$eventBus.emit("toast", {
          type: "Error",
          message: "Email is required",
        });
        this.$refs.email.focus();
        return;
      }

      if (this.form.password.length < 6) {
        this.$eventBus.emit("toast", {
          type: "Error",
          message: "Password must be at least 6 characters",
        });
        this.$refs.password.focus();
        return;
      }
    },
  },
};
</script>

<style>
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(235, 235, 235);
}

.login-card {
  width: 400px;
  /* border: 1px solid gray; */
  min-height: 193px;
  box-shadow: 0px 2px 9px 4px #dfdfdf;
  background-color: #fff;
  border-radius: 5px;
  padding: 44px 33px;
}

.login-card input[type="email"],
.login-card input[type="password"] {
  width: 100%;
}

.login-card button {
  background-color: #1e88e5;
  color: #fff;
  border: none;
  padding: 10px 0;
  border-radius: 5px;
  cursor: pointer;
}

.login-card__icon {
  max-width: 77px;
}
</style>
