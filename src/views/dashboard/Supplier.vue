<template>
  <div class="d-flex jc-between ai-center">
    <h2>All Supplier</h2>
    <the-button @click="showModal = true">Add Supplier</the-button>
  </div>

  <div v-if="supplierLoading" class="d-flex jc-center ai-center">
    Loading...
  </div>

  <table class="mt-4" e-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Contact Number</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(supplier, index) in suppliers" :key="index">
        <td>{{ supplier.supplier_name }}</td>
        <td>{{ supplier.email }}</td>
        <td>{{ supplier.contact_number }}</td>
        <td>{{ supplier.address }}</td>
        <td>
          <the-button><i class="fa-solid fa-pen-to-square"></i></the-button>
          <the-button><i class="fa-solid fa-trash"></i></the-button>
        </td>
      </tr>
    </tbody>
  </table>
  <the-modal v-model="showModal" heading="Create Supplier">
    <form @submit.prevent="AddNewSupplier">
      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.supplier_name"
        placeholder="Supplier Name"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="form.company_name"
        placeholder="Company Name"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="form.contact_number"
        placeholder="Contact Number"
      />
      <input
        type="email"
        class="mt-2 w-100"
        v-model="form.email"
        placeholder="email"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="form.address"
        placeholder="address"
      />

      <the-button
        :block="true"
        class="mt-3 w-100"
        type="submit"
        :loading="loading"
        >Add Supplier</the-button
      >
    </form>
  </the-modal>
</template>

<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
export default {
  data: () => ({
    showModal: false,
    loading: false,
    suppliers: [],
    supplierLoading: false,
    form: {
      supplier_name: "",
      company_name: "",
      contact_number: "",
      email: "",
      address: "",
    },
  }),
  mounted() {
    this.getSuppliers();
  },
  methods: {
    resetForm() {
      this.form = {
        supplier_name: "",
        company_name: "",
        contact_number: "",
        email: "",
        address: "",
      };
    },

    getSuppliers() {
      this.supplierLoading = true;
      axios
        .get("https://api.epharma4u.com/api/v1/inventory/supplier/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        .then((res) => {
          this.suppliers = res.data.data;
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
        .finally(() => {
          this.supplierLoading = false;
        });
    },

    AddNewSupplier() {
      this.loading = true;
      axios
        .post(
          "https://api.epharma4u.com/api/v1/inventory/supplier/create",
          this.form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.$eventBus.emit("toast", {
            type: "Success",
            message: "Supplier Added Successfully",
          });
          this.showModal = false;
          this.resetForm();
        })
        .catch((err) => {
          // console.log(err.response.data.message);

          this.$eventBus.emit("toast", {
            type: "Error",
            message: err.response.data.message,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  components: { TheButton, TheModal },
};
</script>

<style></style>
