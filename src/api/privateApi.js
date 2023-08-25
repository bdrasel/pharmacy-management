import { axiosPrivate } from "./axiosinstance";

export default {
  //============ supplier api ==================//
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
  //============ supplier api ==================//

  //============ category api ==================//
  getCategories() {
    return axiosPrivate.get("/inventory/category/all");
  },
  newCategory(data) {
    return axiosPrivate.post("/inventory/category/create", data);
  },
  updateCategory(data) {
    return axiosPrivate.post("/inventory/category/update", data);
  },
  deleteCategory(data) {
    return axiosPrivate.post("/inventory/category/delete", data);
  },
  //============ category api ==================//

  //============ storage api ==================//
  getStorages() {
    return axiosPrivate.get("/inventory/storage/all");
  },
  newStorage(data) {
    return axiosPrivate.post("/inventory/storage/create", data);
  },
  updateStorage(data) {
    return axiosPrivate.post("/inventory/storage/update", data);
  },
  deleteStorage(data) {
    return axiosPrivate.post("/inventory/storage/delete", data);
  },
  //============ storage api ==================//

  //============ manufacturer api ==================//
  getManufacturers() {
    return axiosPrivate.get("/inventory/manufacturer/all");
  },
  newManufacturer(data) {
    return axiosPrivate.post("/inventory/manufacturer/create", data);
  },
  updateManufacturer(data) {
    return axiosPrivate.post("/inventory/manufacturer/update", data);
  },
  deleteManufacturer(data) {
    return axiosPrivate.post("/inventory/manufacturer/delete", data);
  },
  //============ manufacturer api ==================//
};
