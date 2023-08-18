import { axiosPrivate } from "./axiosinstance";

export default {
  getSuppliers() {
    return axiosPrivate.get("/inventory/supplier/all");
  },
  newSupplier(data) {
    return axiosPrivate.post("/inventory/supplier/create", data);
  },
  updateSupplier(id) {
    return axiosPrivate.post("/inventory/supplier/update", id);
  },
  deleteSupplier(data) {
    return axiosPrivate.post("/inventory/supplier/delete", data);
  },
};
