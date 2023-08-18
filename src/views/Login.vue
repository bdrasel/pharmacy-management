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

        <TheButton :block="true" class="mt-3" type="submit" :loading="loggedIn">
          Login
        </TheButton>

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
import axios from "axios";
import TheButton from "../components/TheButton.vue";
import { eventBus } from "../utlis/eventBus";
import { successMessage, errorMessage } from "../utlis/functions";
import { setPrivateHeaders } from "../api/axiosinstance";

export default {
  data: () => ({
    form: {
      email: "",
      password: "",
    },
    loggedIn: false,
  }),
  components: {
    TheButton,
  },
  methods: {
    handleSubmit() {
      if (!this.form.email) {
        eventBus.emit("toast", {
          type: "Error",
          message: "Email is required",
        });
        this.$refs.email.focus();
        return;
      }

      if (this.form.password.length < 6) {
        errorMessage("Password must be at least 6 characters");
        this.$refs.password.focus();
        return;
      }

      this.loggedIn = true;
      axios
        .post("https://api.epharma4u.com/api/v1/user/login", this.form)
        .then((res) => {
          console.log(res.data);

          successMessage(res.data.user.user_name + " Logged in successfully");

          localStorage.setItem("token", res.data.access_token);
          setPrivateHeaders();
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          // console.log(err.response.data.err_message);
          errorMessage(err);
        })
        .finally(() => {
          this.loggedIn = false;
        });
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
