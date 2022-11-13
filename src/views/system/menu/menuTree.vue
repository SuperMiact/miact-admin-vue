<template>
  <fragment>
    <template v-for="menu in menuList">
      <el-submenu
        v-if="menu.childNode && menu.childNode.length > 0"
        :index="menu.url + ''"
        :key="menu.id"
      >
        <template slot="title">
          <i :class="menu.iconClass"></i>
          <span slot="title">{{ menu.name }}</span>
        </template>
        <MenuTree :menuList="menu.childNode"></MenuTree>
      </el-submenu>
      <el-menu-item v-else :index="menu.url + ''" :key="menu.id + menu.pid">
        <i :class="menu.iconClass"></i>
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
