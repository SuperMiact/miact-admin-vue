<template>
  <div>
    <div>
      <el-button
        style="margin-bottom: 10px"
        type="primary"
        plain
        @click="openMenuDialog"
        >添加主菜单</el-button
      >
    </div>
    <div>
      <el-table
        ref="tableF"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :tree-props="{ children: 'childNode', hasChildren: 'hasChildren' }"
        @select-all="dialogCheck"
        @select="dialogCheck"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="url" label="地址"> </el-table-column>
        <el-table-column prop="sortOrder" label="排序"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="addMenu(scope.row)">添加</el-button>
            <el-button type="text" @click="editMenu(scope.row)">修改</el-button>
            <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <menuDialog @submitForm="subFormReload" ref="menuDig"></menuDialog>
    <menuDialogOther
      @submitFormOther="subFormOtherReload"
      ref="menuDigOther"
    ></menuDialogOther>
  </div>
</template>
<script>
import menuDialog from "@/components/sysAdmin/menuDialog";
import menuDialogOther from "@/components/sysAdmin/menuDialogOther";
export default {
  name: "menuModel",
  components: {
    menuDialog,
    menuDialogOther,
  },
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      radioData: {},
    };
  },
  created() {
    this.selectMainMenu();
  },
  methods: {
    subFormReload() {
      this.reload();
    },
    subFormOtherReload() {
      this.reload();
    },
    dialogCheck: function (selection, row) {
      this.$refs.tableF.clearSelection();
      if (selection.length === 0) {
        return;
      }
      this.radioData = row;
      if (row) {
        this.$refs.tableF.toggleRowSelection(row, true);
      }
    },
    openMenuDialog() {
      this.$refs.menuDig.centerDialogVisible = true;
    },
    addMenu(row) {
      this.$refs.menuDigOther.formLabelAlign = {};
      this.$refs.menuDigOther.centerDialogVisible = true;
      this.$refs.menuDigOther.menuType = 1;
      this.$refs.menuDigOther.formLabelAlign.pid = row.id;
    },
    editMenu(row) {
      this.$refs.menuDigOther.centerDialogVisible = true;
      this.$refs.menuDigOther.formLabelAlign = row;
      this.$refs.menuDigOther.menuType = 2;
    },
    delMenu(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.post("/mainMenu/delMenu", row).then((res) => {
            this.$message.success("删除" + res.data + "条数据成功");
          });
          this.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    selectMainMenu() {
      this.$axios
        .get("/mainMenu/getMenu")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>