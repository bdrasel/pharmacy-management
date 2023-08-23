<template>
  <div class="d-flex jc-between ai-center">
    <h2>Drugs Storage</h2>
    <the-button @click="showModal = true">Add Storage</the-button>
  </div>

  <div v-if="storageLoading" class="d-flex jc-center ai-center">Loading...</div>

  <table class="mt-4" e-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(storage, index) in storages" :key="index">
        <td>{{ storage.name }}</td>
        <td>{{ storage.description }}</td>

        <td>
          <the-button
            @click="
              selectStorage = storage;
              editModal = true;
            "
            ><i class="fa-solid fa-pen-to-square"></i
          ></the-button>
          <the-button
            @click="
              selectStorage = storage;
              deleteModal = true;
            "
          >
            <i class="fa-solid fa-trash"></i>
          </the-button>
        </td>
      </tr>
    </tbody>
  </table>
  <the-modal v-model="showModal" heading="Create Drugs Storage">
    <form @submit.prevent="AddNewStorage">
      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.name"
        placeholder="Storage Name"
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
        >Add Storage</the-button
      >
    </form>
  </the-modal>

  <the-modal v-model="editModal" heading="Update Drugs Storage">
    <form @submit.prevent="updateStorage">
      <input
        type="text"
        class="mt-1 w-100"
        v-model="selectStorage.name"
        placeholder="Storage Name"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="selectStorage.description"
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

  <the-modal v-model="deleteModal" heading="Delete Drugs Storage">
    <form @submit.prevent="deleteStorage">
      <p>Are you sure you want to delete this {{ selectStorage.name }}?</p>

      <the-button class="mt-3" type="submit">Yes</the-button>
      <the-button class="ml-3" color="gray" @click="deleteModal = false"
        >Close</the-button
      >
    </form>
  </the-modal>
</template>

<script>
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import { errorMessage, successMessage } from "../../utlis/functions";
import privateApi from "../../api/privateApi";
export default {
  data: () => ({
    showModal: false,
    editModal: false,
    deleteModal: false,
    loading: false,
    storages: [],
    selectStorage: {},
    deleting: false,
    editing: false,
    storageLoading: false,
    form: {
      name: "",
      description: "",
    },
  }),
  mounted() {
    setTimeout(this.getStorages, 1000);
  },
  methods: {
    resetForm() {
      this.form = {
        name: "",
        description: "",
      };
    },

    getStorages() {
      this.storageLoading = true;
      privateApi
        .getStorages()

        .then((res) => {
          this.storages = res.data.data;
        })
        .catch((err) => {
          errorMessage(err);
        })
        .finally(() => {
          this.storageLoading = false;
        });
    },

    AddNewStorage() {
      this.loading = true;
      privateApi
        .newStorage(this.form)
        .then((res) => {
          successMessage("Drugs Storage Added Successfully");

          this.showModal = false;
          this.resetForm();
          this.getStorages();
        })
        .catch((err) => {
          errorMessage(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    updateStorage() {
      this.loading = true;
      privateApi
        .updateStorage(this.selectStorage)
        .then((res) => {
          successMessage("Drugs Storage Updated Successfully");

          this.editModal = false;
          this.loading = false;
        })
        .catch((err) => {
          errorMessage(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    deleteStorage() {
      this.deleting = true;
      privateApi
        .deleteStorage(this.selectStorage)
        .then((res) => {
          successMessage("Drugs Storage Deleted Successfully");

          this.deleteModal = false;
          this.deleting = false;
          this.getStorages();
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
