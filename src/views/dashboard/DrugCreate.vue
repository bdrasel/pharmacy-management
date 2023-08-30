<template>
  <div class="d-flex jc-between ai-center">
    <h2>Drugs Create</h2>
    <the-button>
      <router-link to="/dashboard/drugs">All Drug</router-link>
    </the-button>
  </div>

  <div class="drugForm">
    <form>
      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.name"
        placeholder="Drug Name"
      />
      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.scientific_name"
        placeholder="Scientific Name"
      />

      <select class="mt-1 w-100" v-model="form.category_id">
        <option selected value="">Select Category</option>
      </select>

      <select class="mt-1 w-100" v-model="form.manufacturer_id">
        <option selected value="">Select Manufacturer</option>
      </select>

      <select class="mt-1 w-100" v-model="form.storage_location_id">
        <option selected value="">Select Storage</option>
      </select>

      <select class="mt-1 w-100" v-model="form.storage_location_id">
        <option selected value="">Select Storage</option>
      </select>

      <select class="mt-1 w-100" v-model="form.supplier_id">
        <option selected value="">Select Supplier</option>
      </select>

      <select class="mt-1 w-100" v-model="form.need_prescription">
        <option selected value="1">Yes</option>
        <option selected value="0">No</option>
      </select>

      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.storage_temperature"
        placeholder="Storage Temperature"
      />

      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.dangerous_level"
        placeholder="Dangerous Level"
      />

      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.no_of_unit_in_package"
        placeholder="No of unit in package"
      />

      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.quantity"
        placeholder="Initial Quantity"
      />

      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.unit_price"
        placeholder="Unit Price"
      />

      <input
        type="text"
        class="mt-1 w-100"
        v-model="form.sales_price"
        placeholder="Sales Price"
      />

      <input
        type="date"
        class="mt-1 w-100"
        v-model="form.manufacturing_date"
        placeholder="Sales Price"
      />

      <input
        type="date"
        class="mt-1 w-100"
        v-model="form.expiry_date"
        placeholder="Sales Price"
      />

      <input
        type="date"
        class="mt-1 w-100"
        v-model="form.date_of_entry"
        placeholder="Sales Price"
      />

      <textarea
        type="date"
        class="mt-1 w-100"
        v-model="form.indication"
        placeholder="Indication"
      ></textarea>

      <textarea
        type="date"
        class="mt-1 w-100"
        v-model="form.preparation"
        placeholder="Preparation"
      ></textarea>

      <textarea
        type="text"
        class="mt-2 w-100"
        v-model="form.description"
        placeholder="Description"
      ></textarea>

      <input
        type="File"
        class="mt-1 w-100"
        v-model="form.photo"
        placeholder="Photo"
      />

      <the-button
        :block="true"
        class="mt-3 w-100"
        type="submit"
        :loading="loading"
        >Add Drug</the-button
      >
    </form>
  </div>
</template>

<script>
import TheButton from "../../components/TheButton.vue";
export default {
  data: () => ({
    form: {
      name: "",
      description: "",
    },
    loading: false,
  }),

  components: { TheButton },
};
</script>

<style>
button a {
  color: #fff;
  text-decoration: none;
}

.drugForm {
  margin-top: 50px;
  width: 50%;
  margin: 0 auto;
}
</style>
