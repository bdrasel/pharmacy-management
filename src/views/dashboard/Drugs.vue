<template>
  <div class="d-flex jc-between ai-center">
    <h2>Drugs</h2>
    <the-button>
      <router-link to="/dashboard/drug/create">Add Drug</router-link>
    </the-button>
  </div>
</template>

<script>
import TheButton from "../../components/TheButton.vue";

export default {
  components: { TheButton },
};
</script>

<style>
button a {
  color: #fff;
  text-decoration: none;
}
</style>
