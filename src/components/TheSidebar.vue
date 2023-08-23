<template>
  <div class="sidebar">
    <div class="sidebar__top">
      <div class="brand">Dispensary Management</div>
    </div>
    <div class="sidebar__bottom">
      <nav class="sidebar__nav">
        <router-link to="/dashboard/overview">Dashboard</router-link>
        <router-link to="/dashboard/drugs/category">Drugs Category</router-link>
        <router-link to="/dashboard/drugs/storage">Drugs Storage</router-link>
        <router-link to="/dashboard/drugs">Drugs</router-link>

        <router-link to="/dashboard/supplier">Supplier</router-link>
        <router-link to="/dashboard/order">Orders</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #0a4219;
  color: #f0faf5;
}

.sidebar__top {
  padding: 11px 22px;
  color: #28a745;
  text-shadow: 0 1px 0 #0a4219;
}

.sidebar__bottom {
  flex: 1;
  overflow-y: auto;
}

.sidebar__nav a,
.sidebar__nav a:visited {
  display: block;
  padding: 9px 22px;
  text-decoration: none;
  border-bottom: 1px solid #0a4219;
  color: #a7a097;
  border-left: 4px solid #0a4219;
  text-shadow: none;
}

.sidebar__nav a:hover,
.sidebar__nav a.router-link-active {
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.09);
  border-left: 4px solid #28a745;
  color: #cfcfcf;
}

.brand {
  color: #ffab81;
  font-size: 17px;
}
</style>
