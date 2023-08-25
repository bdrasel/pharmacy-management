<template>
  <div class="d-flex jc-between ai-center">
    <h2>Drugs Manufacturer</h2>
    <the-button @click="showModal = true">Add Manufacturer</the-button>
  </div>

  <div v-if="manufacturerLoading" class="d-flex jc-center ai-center">
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
      <tr v-for="(manufacturer, index) in manufacturers" :key="index">
        <td>{{ manufacturer.name }}</td>
        <td>{{ manufacturer.description }}</td>

        <td>
          <the-button
            @click="
              selectManufacturer = manufacturer;
              editModal = true;
            "
            ><i class="fa-solid fa-pen-to-square"></i
          ></the-button>
          <the-button
            @click="
              selectManufacturer = manufacturer;
              deleteModal = true;
            "
          >
            <i class="fa-solid fa-trash"></i>
          </the-button>
        </td>
      </tr>
    </tbody>
  </table>
  <the-modal v-model="showModal" heading="Create Drugs Manufacturer">
    <form @submit.prevent="AddNewManufacturer">
      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.name"
        placeholder="Manufacturer Name"
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
        >Add Manufacturer</the-button
      >
    </form>
  </the-modal>

  <the-modal v-model="editModal" heading="Update Drugs Manufacturer">
    <form @submit.prevent="updateManufacturer">
      <input
        type="text"
        class="mt-1 w-100"
        v-model="selectManufacturer.name"
        placeholder="Manufacturer Name"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="selectManufacturer.description"
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

  <the-modal v-model="deleteModal" heading="Delete Drugs Manufacturer">
    <form @submit.prevent="deleteManufacturer">
      <p>Are you sure you want to delete this {{ selectManufacturer.name }}?</p>

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
    manufacturers: [],
    selectManufacturer: {},
    deleting: false,
    editing: false,
    manufacturerLoading: false,
    form: {
      name: "",
      description: "",
    },
  }),
  mounted() {
    setTimeout(this.getManufacturers, 1000);
  },
  methods: {
    resetForm() {
      this.form = {
        name: "",
        description: "",
      };
    },

    getManufacturers() {
      this.manufacturerLoading = true;
      privateApi
        .getManufacturers()

        .then((res) => {
          this.manufacturers = res.data.data;
        })
        .catch((err) => {
          errorMessage(err);
        })
        .finally(() => {
          this.manufacturerLoading = false;
        });
    },

    AddNewManufacturer() {
      this.loading = true;
      privateApi
        .newManufacturer(this.form)
        .then((res) => {
          successMessage("Drugs Manufacturer Added Successfully");

          this.showModal = false;
          this.resetForm();
          this.getManufacturers();
        })
        .catch((err) => {
          errorMessage(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    updateManufacturer() {
      this.loading = true;
      privateApi
        .updateManufacturer(this.selectManufacturer)
        .then((res) => {
          successMessage("Drugs Manufacturer Updated Successfully");

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

    deleteManufacturer() {
      this.deleting = true;
      privateApi
        .deleteManufacturer(this.selectManufacturer)
        .then((res) => {
          successMessage("Drugs Manufacturer Deleted Successfully");

          this.deleteModal = false;
          this.deleting = false;
          this.getManufacturers();
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
