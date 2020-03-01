<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <admin_siderbox />
        </div>
        <div class="col-md-10 main">
          <menu_top/>
          <div class="inner">123</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./admin.scss";
</style>

<script>
import admin_siderbox from "./admin_siderbox";
import menu_top from "./menu_top";
export default {
  components: {
    admin_siderbox,
    menu_top
  }
};
</script>
