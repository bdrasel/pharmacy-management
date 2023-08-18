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
          <the-button
            @click="
              selectSupplier = supplier;
              editModal = true;
            "
            ><i class="fa-solid fa-pen-to-square"></i
          ></the-button>
          <the-button
            @click="
              selectSupplier = supplier;
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

  <the-modal v-model="editModal" heading="Update Supplier">
    <form @submit.prevent="updateSupplier">
      <input
        type="text"
        class="mt-1 w-100"
        v-model="selectSupplier.supplier_name"
        placeholder="Supplier Name"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="selectSupplier.company_name"
        placeholder="Company Name"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="selectSupplier.contact_number"
        placeholder="Contact Number"
      />
      <input
        type="email"
        class="mt-2 w-100"
        v-model="selectSupplier.email"
        placeholder="email"
      />
      <input
        type="text"
        class="mt-2 w-100"
        v-model="selectSupplier.address"
        placeholder="address"
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

  <the-modal v-model="deleteModal" heading="Delete Supplier">
    <form @submit.prevent="deleteSupplier">
      <!-- <input type="text" v-model="selectSupplierId" disabled /> -->

      <p>
        Are you sure you want to delete this {{ selectSupplier.supplier_name }}?
      </p>

      <the-button class="mt-3" type="submit" :loading="deleting"
        >Yes</the-button
      >
      <the-button class="ml-3" color="gray" @click="deleteModal = false"
        >Close</the-button
      >
    </form>
  </the-modal>
</template>

<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import { eventBus } from "../../utlis/eventBus";
import { errorMessage, successMessage } from "../../utlis/functions";
export default {
  data: () => ({
    showModal: false,
    editModal: false,
    deleteModal: false,
    loading: false,
    suppliers: [],
    selectSupplier: {},
    deleting: false,
    editing: false,
    supplierLoading: false,
    form: {
      supplier_name: "",
      company_name: "",
      contact_number: "",
      email: "",
      address: "",
    },
    selectSupplierId: "",
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
          // this.$eventBus.emit("toast", {
          //   type: "Success",
          //   message: "Supplier Added Successfully",
          // });

          successMessage("Supplier Added Successfully");

          this.showModal = false;
          this.resetForm();
          this.getSuppliers();
        })
        .catch((err) => {
          // console.log(err.response.data.message);

          errorMessage(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    updateSupplier() {
      this.editing = true;
      axios
        .post(
          "https://api.epharma4u.com/api/v1/inventory/supplier/update",
          this.selectSupplier,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          successMessage("Supplier Updated Successfully");

          this.editModal = false;
          this.editing = false;
        })
        .catch((err) => {
          // console.log(err.response.data.message);

          errorMessage(err);
        })
        .finally(() => {
          this.editing = false;
        });
    },

    deleteSupplier() {
      this.deleting = true;
      axios
        .post(
          "https://api.epharma4u.com/api/v1/inventory/supplier/delete",
          this.selectSupplier,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )

        .then((res) => {
          console.log(res.data);
          successMessage("Supplier Deleted Successfully");

          this.deleteModal = false;
          this.deleting = false;
          this.getSuppliers();
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
