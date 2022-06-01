<template>
  <div>
    <template v-for="menu in menuList">
      <el-submenu
        v-if="menu.childNode && menu.childNode.length > 0"
        :index="menu.url + ''"
        :key="menu.id"
      >
        <template slot="title">
          <i :class="menu.iconClass"></i>
          {{ menu.name }}
        </template>
        <MenuTree :menuList="menu.childNode"></MenuTree>
      </el-submenu>
      <el-menu-item v-else :index="menu.url + ''" :key="menu.id + 1">
        <i :class="menu.iconClass"></i>
        {{ menu.name }}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>
