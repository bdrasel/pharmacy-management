<template>
  <div class="d-flex jc-between ai-center">
    <h2>All Drugs Category</h2>
    <the-button @click="showModal = true">Add Category</the-button>
  </div>

  <div v-if="categoryLoading" class="d-flex jc-center ai-center">
    Loading...
  </div>

  <table class="mt-4" e-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(category, index) in categories" :key="index">
        <td>{{ category.name }}</td>
        <td>{{ category.description }}</td>

        <td>
          <the-button
            @click="
              selectCategory = category;
              editModal = true;
            "
            ><i class="fa-solid fa-pen-to-square"></i
          ></the-button>
          <the-button
            @click="
              selectCategory = category;
              deleteModal = true;
            "
          >
            <i class="fa-solid fa-trash"></i>
          </the-button>
        </td>
      </tr>
    </tbody>
  </table>
  <the-modal v-model="showModal" heading="Create Supplier">
    <form @submit.prevent="AddNewCategory">
      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.name"
        placeholder="Category Name"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="form.description"
        placeholder="Description"
      />

      <the-button
        :block="true"
        class="mt-3 w-100"
        type="submit"
        :loading="loading"
        >Add Category</the-button
      >
    </form>
  </the-modal>

  <the-modal v-model="editModal" heading="Update Drugs Category">
    <form @submit.prevent="updateCategory">
      <input
        type="text"
        class="mt-1 w-100"
        v-model="selectCategory.name"
        placeholder="Category Name"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="selectCategory.description"
        placeholder="Description"
      />

      <the-button
        :block="true"
        class="mt-3 w-100"
        type="submit"
        :loading="loading"
        >Update</the-button
      >
    </form>
  </the-modal>

  <the-modal v-model="deleteModal" heading="Delete Drugs Category">
    <form @submit.prevent="deleteCategory">
      <!-- <input type="text" v-model="selectSupplierId" disabled /> -->

      <p>Are you sure you want to delete this {{ selectCategory.name }}?</p>

      <the-button class="mt-3" type="submit">Yes</the-button>
      <the-button class="ml-3" color="gray" @click="deleteModal = false"
        >Close</the-button
      >
    </form>
  </the-modal>
</template>

<script>
import TheButton from "../../../components/TheButton.vue";
import TheModal from "../../../components/TheModal.vue";
import { errorMessage, successMessage } from "../../../utlis/functions";
import privateApi from "../../../api/privateApi";
export default {
  data: () => ({
    showModal: false,
    editModal: false,
    deleteModal: false,
    loading: false,
    categories: [],
    selectCategory: {},
    deleting: false,
    editing: false,
    categoryLoading: false,
    form: {
      name: "",
      description: "",
    },
  }),
  mounted() {
    setTimeout(this.getCategories, 1000);
  },
  methods: {
    resetForm() {
      this.form = {
        name: "",
        description: "",
      };
    },

    getCategories() {
      this.categoryLoading = true;
      privateApi
        .getCategories()

        .then((res) => {
          this.categories = res.data.data;
        })
        .catch((err) => {
          errorMessage(err);
        })
        .finally(() => {
          this.categoryLoading = false;
        });
    },

    AddNewCategory() {
      this.loading = true;
      privateApi
        .newCategory(this.form)
        .then((res) => {
          successMessage("Drugs Category Added Successfully");

          this.showModal = false;
          this.resetForm();
          this.getCategories();
        })
        .catch((err) => {
          errorMessage(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    updateCategory() {
      this.editing = true;
      privateApi
        .updateCategory(this.selectCategory)
        .then((res) => {
          successMessage("Drugs Category Updated Successfully");

          this.editModal = false;
          this.editing = false;
        })
        .catch((err) => {
          errorMessage(err);
        })
        .finally(() => {
          this.editing = false;
        });
    },

    deleteCategory() {
      this.deleting = true;
      privateApi
        .deleteCategory(this.selectCategory)
        .then((res) => {
          successMessage("Drugs Category Deleted Successfully");

          this.deleteModal = false;
          this.deleting = false;
          this.getCategories();
        })
        .catch((err) => {
          console.log(localStorage.getItem("token"));
        })
        .finally(() => {
          this.deleting = false;
        });
    },
  },
  components: { TheButton, TheModal },
};
</script>

<style></style>
