<template>
  <div>
    <div>
      <el-button
        style="margin-bottom: 10px"
        type="primary"
        plain
        @click="editMenu('add')"
        size="small"
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
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="left"> </el-table-column>
        <el-table-column prop="perms" label="菜单权限" align="center"></el-table-column>
        <el-table-column label="菜单类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type==0">目录</span>
            <span v-if="scope.row.type==1">菜单</span>
            <span v-if="scope.row.type==2">按钮</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="地址" align="center"> </el-table-column>
        <el-table-column prop="sortOrder" label="排序" align="center"> </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
             {{scope.row.status==1?'已启用':'未启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editMenu('add',scope.row)">添加</el-button>
            <el-button type="text" @click="editMenu('update',scope.row)">修改</el-button>
            <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      ref="menuDig"
      title="编辑菜单"
      :visible.sync="showMenuModel"
      width="360px"
      center
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="formData"
        style="margin: 20px"
      >
        <div align="center">
          <el-form-item label="名称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="formData.url"></el-input>
          </el-form-item>
          <el-form-item label="菜单权限">
            <el-input v-model="formData.perms"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-select placeholder="请选择" v-model="menuType" @change="changeMenuType">
                <el-option 
                v-for="mt in menuTypeList"
                :key="mt.menuValue"
                :label="mt.menuLabel"
                :value="mt.menuValue"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-select placeholder="请选择" v-model="formData.iconClass">
              <el-option
                v-for="item in iconList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <i :class="item.label"></i>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="formData.sortOrder"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              @change="menuStatusChange"
              v-model="menuStatus"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {addMenu,updateMenu,getMenu,delMenu} from '@/api/system/menu/index'
export default {
  name: 'menuModel',
  components: {
  },
  inject: ['reload'],
  data () {
    return {
      tableData: [],
      radioData: {},
      showMenuModel:false,
      modify:'',
      formData: {
        name: "",
        url: "",
        sortOrder: "",
        iconClass: "",
        status:0,
        pid: 0,
        type:'',
        perms:"",
      },
      iconList: [
        { label: "el-icon-platform-eleme", value: "el-icon-platform-eleme" },
        { label: "el-icon-eleme", value: "el-icon-eleme" },
        { label: "el-icon-delete-solid", value: "el-icon-delete-solid" },
        { label: "el-icon-delete", value: "el-icon-delete" },
        { label: "el-icon-s-tools", value: "el-icon-s-tools" },
        { label: "el-icon-setting", value: "el-icon-setting" },
        { label: "el-icon-user-solid", value: "el-icon-user-solid" },
        { label: "el-icon-user", value: "el-icon-user" },
        { label: "el-icon-phone", value: "el-icon-phone" },
        { label: "el-icon-phone-outline", value: "el-icon-phone-outline" },
        { label: "el-icon-more", value: "el-icon-more" },
        { label: "el-icon-more-outline", value: "el-icon-more-outline" },
        { label: "el-icon-star-on", value: "el-icon-star-on" },
        { label: "el-icon-star-off", value: "el-icon-star-off" },
        { label: "el-icon-s-goods", value: "el-icon-s-goods" },
        { label: "el-icon-goods", value: "el-icon-goods" },
        { label: "el-icon-warning", value: "el-icon-warning" },
        { label: "el-icon-warning-outline", value: "el-icon-warning-outline" },
        { label: "el-icon-question", value: "el-icon-question" },
        { label: "el-icon-info", value: "el-icon-info" },
        { label: "el-icon-remove", value: "el-icon-remove" },
        { label: "el-icon-circle-plus", value: "el-icon-circle-plus" },
        { label: "el-icon-success", value: "el-icon-success" },
        { label: "el-icon-error", value: "el-icon-error" },
        { label: "el-icon-zoom-in", value: "el-icon-zoom-in" },
        { label: "el-icon-zoom-out", value: "el-icon-zoom-out" },
        { label: "el-icon-remove-outline", value: "el-icon-remove-outline" },
        {
          label: "el-icon-circle-plus-outline",
          value: "el-icon-circle-plus-outline",
        },
        { label: "el-icon-circle-check", value: "el-icon-circle-check" },
        { label: "el-icon-circle-close", value: "el-icon-circle-close" },
        { label: "el-icon-s-help", value: "el-icon-s-help" },
        { label: "el-icon-help", value: "el-icon-help" },
        { label: "el-icon-minus", value: "el-icon-minus" },
        { label: "el-icon-plus", value: "el-icon-plus" },
        { label: "el-icon-check", value: "el-icon-check" },
        { label: "el-icon-close", value: "el-icon-close" },
        { label: "el-icon-picture", value: "el-icon-picture" },
        { label: "el-icon-picture-outline", value: "el-icon-picture-outline" },
        {
          label: "el-icon-picture-outline-round",
          value: "el-icon-picture-outline-round",
        },
        { label: "el-icon-upload", value: "el-icon-upload" },
        { label: "el-icon-upload2", value: "el-icon-upload2" },
        { label: "el-icon-download", value: "el-icon-download" },
        { label: "el-icon-camera-solid", value: "el-icon-camera-solid" },
        { label: "el-icon-camera", value: "el-icon-camera" },
        {
          label: "el-icon-video-camera-solid",
          value: "el-icon-video-camera-solid",
        },
        { label: "el-icon-video-camera", value: "el-icon-video-camera" },
        { label: "el-icon-message-solid", value: "el-icon-message-solid" },
        { label: "el-icon-bell", value: "el-icon-bell" },
        { label: "el-icon-s-cooperation", value: "el-icon-s-cooperation" },
        { label: "el-icon-s-order", value: "el-icon-s-order" },
        { label: "el-icon-s-platform", value: "el-icon-s-platform" },
        { label: "el-icon-s-fold", value: "el-icon-s-fold" },
        { label: "el-icon-s-unfold", value: "el-icon-s-unfold" },
        { label: "el-icon-s-operation", value: "el-icon-s-operation" },
        { label: "el-icon-s-promotion", value: "el-icon-s-promotion" },
        { label: "el-icon-s-home", value: "el-icon-s-home" },
        { label: "el-icon-s-release", value: "el-icon-s-release" },
        { label: "el-icon-s-ticket", value: "el-icon-s-ticket" },
        { label: "el-icon-s-management", value: "el-icon-s-management" },
        { label: "el-icon-s-open", value: "el-icon-s-open" },
        { label: "el-icon-s-shop", value: "el-icon-s-shop" },
        { label: "el-icon-s-marketing", value: "el-icon-s-marketing" },
        { label: "el-icon-s-flag", value: "el-icon-s-flag" },
        { label: "el-icon-s-comment", value: "el-icon-s-comment" },
        { label: "el-icon-s-finance", value: "el-icon-s-finance" },
        { label: "el-icon-s-claim", value: "el-icon-s-claim" },
        { label: "el-icon-s-custom", value: "el-icon-s-custom" },
        { label: "el-icon-s-opportunity", value: "el-icon-s-opportunity" },
        { label: "el-icon-s-data", value: "el-icon-s-data" },
        { label: "el-icon-s-check", value: "el-icon-s-check" },
        { label: "el-icon-s-grid", value: "el-icon-s-grid" },
        { label: "el-icon-menu", value: "el-icon-menu" },
        { label: "el-icon-share", value: "el-icon-share" },
        { label: "el-icon-d-caret", value: "el-icon-d-caret" },
        { label: "el-icon-caret-left", value: "el-icon-caret-left" },
        { label: "el-icon-caret-right", value: "el-icon-caret-right" },
        { label: "el-icon-caret-bottom", value: "el-icon-caret-bottom" },
        { label: "el-icon-caret-top", value: "el-icon-caret-top" },
        { label: "el-icon-bottom-left", value: "el-icon-bottom-left" },
        { label: "el-icon-bottom-right", value: "el-icon-bottom-right" },
        { label: "el-icon-back", value: "el-icon-back" },
        { label: "el-icon-right", value: "el-icon-right" },
        { label: "el-icon-bottom", value: "el-icon-bottom" },
        { label: "el-icon-top", value: "el-icon-top" },
        { label: "el-icon-top-left", value: "el-icon-top-left" },
        { label: "el-icon-top-right", value: "el-icon-top-right" },
        { label: "el-icon-arrow-left", value: "el-icon-arrow-left" },
        { label: "el-icon-arrow-right", value: "el-icon-arrow-right" },
        { label: "el-icon-arrow-down", value: "el-icon-arrow-down" },
        { label: "el-icon-arrow-up", value: "el-icon-arrow-up" },
        { label: "el-icon-d-arrow-left", value: "el-icon-d-arrow-left" },
        { label: "el-icon-d-arrow-right", value: "el-icon-d-arrow-right" },
        { label: "el-icon-video-pause", value: "el-icon-video-pause" },
        { label: "el-icon-video-play", value: "el-icon-video-play" },
        { label: "el-icon-refresh", value: "el-icon-refresh" },
        { label: "el-icon-refresh-right", value: "el-icon-refresh-right" },
        { label: "el-icon-refresh-left", value: "el-icon-refresh-left" },
        { label: "el-icon-finished", value: "el-icon-finished" },
        { label: "el-icon-sort", value: "el-icon-sort" },
        { label: "el-icon-sort-up", value: "el-icon-sort-up" },
        { label: "el-icon-sort-down", value: "el-icon-sort-down" },
        { label: "el-icon-rank", value: "el-icon-rank" },
        { label: "el-icon-loading", value: "el-icon-loading" },
        { label: "el-icon-view", value: "el-icon-view" },
        {
          label: "el-icon-c-scale-to-original",
          value: "el-icon-c-scale-to-original",
        },
        { label: "el-icon-date", value: "el-icon-date" },
        { label: "el-icon-edit", value: "el-icon-edit" },
        { label: "el-icon-edit-outline", value: "el-icon-edit-outline" },
        { label: "el-icon-folder", value: "el-icon-folder" },
        { label: "el-icon-folder-opened", value: "el-icon-folder-opened" },
        { label: "el-icon-folder-add", value: "el-icon-folder-add" },
        { label: "el-icon-folder-remove", value: "el-icon-folder-remove" },
        { label: "el-icon-folder-delete", value: "el-icon-folder-delete" },
        { label: "el-icon-folder-checked", value: "el-icon-folder-checked" },
        { label: "el-icon-tickets", value: "el-icon-tickets" },
        { label: "el-icon-document-remove", value: "el-icon-document-remove" },
        { label: "el-icon-document-delete", value: "el-icon-document-delete" },
        { label: "el-icon-document-copy", value: "el-icon-document-copy" },
        {
          label: "el-icon-document-checked",
          value: "el-icon-document-checked",
        },
        { label: "el-icon-document", value: "el-icon-document" },
        { label: "el-icon-document-add", value: "el-icon-document-add" },
        { label: "el-icon-printer", value: "el-icon-printer" },
        { label: "el-icon-paperclip", value: "el-icon-paperclip" },
        { label: "el-icon-takeaway-box", value: "el-icon-takeaway-box" },
        { label: "el-icon-search", value: "el-icon-search" },
        { label: "el-icon-monitor", value: "el-icon-monitor" },
        { label: "el-icon-attract", value: "el-icon-attract" },
        { label: "el-icon-mobile", value: "el-icon-mobile" },
        { label: "el-icon-scissors", value: "el-icon-scissors" },
        { label: "el-icon-umbrella", value: "el-icon-umbrella" },
        { label: "el-icon-headset", value: "el-icon-headset" },
        { label: "el-icon-brush", value: "el-icon-brush" },
        { label: "el-icon-mouse", value: "el-icon-mouse" },
        { label: "el-icon-coordinate", value: "el-icon-coordinate" },
        { label: "el-icon-magic-stick", value: "el-icon-magic-stick" },
        { label: "el-icon-reading", value: "el-icon-reading" },
        { label: "el-icon-data-line", value: "el-icon-data-line" },
        { label: "el-icon-data-board", value: "el-icon-data-board" },
        { label: "el-icon-pie-chart", value: "el-icon-pie-chart" },
        { label: "el-icon-data-analysis", value: "el-icon-data-analysis" },
        { label: "el-icon-collection-tag", value: "el-icon-collection-tag" },
        { label: "el-icon-film", value: "el-icon-film" },
        { label: "el-icon-suitcase", value: "el-icon-suitcase" },
        { label: "el-icon-suitcase-1", value: "el-icon-suitcase-1" },
        { label: "el-icon-receiving", value: "el-icon-receiving" },
        { label: "el-icon-collection", value: "el-icon-collection" },
        { label: "el-icon-files", value: "el-icon-files" },
        { label: "el-icon-notebook-1", value: "el-icon-notebook-1" },
        { label: "el-icon-notebook-2", value: "el-icon-notebook-2" },
        { label: "el-icon-toilet-paper", value: "el-icon-toilet-paper" },
        { label: "el-icon-office-building", value: "el-icon-office-building" },
        { label: "el-icon-school", value: "el-icon-school" },
        { label: "el-icon-table-lamp", value: "el-icon-table-lamp" },
        { label: "el-icon-house", value: "el-icon-house" },
        { label: "el-icon-no-smoking", value: "el-icon-no-smoking" },
        { label: "el-icon-smoking", value: "el-icon-smoking" },
        {
          label: "el-icon-shopping-cart-full",
          value: "el-icon-shopping-cart-full",
        },
        { label: "el-icon-shopping-cart-1", value: "el-icon-shopping-cart-1" },
        { label: "el-icon-shopping-cart-2", value: "el-icon-shopping-cart-2" },
        { label: "el-icon-shopping-bag-1", value: "el-icon-shopping-bag-1" },
        { label: "el-icon-shopping-bag-2", value: "el-icon-shopping-bag-2" },
        { label: "el-icon-sold-out", value: "el-icon-sold-out" },
        { label: "el-icon-sell", value: "el-icon-sell" },
        { label: "el-icon-present", value: "el-icon-present" },
        { label: "el-icon-box", value: "el-icon-box" },
        { label: "el-icon-bank-card", value: "el-icon-bank-card" },
        { label: "el-icon-money", value: "el-icon-money" },
        { label: "el-icon-coin", value: "el-icon-coin" },
        { label: "el-icon-wallet", value: "el-icon-wallet" },
        { label: "el-icon-discount", value: "el-icon-discount" },
        { label: "el-icon-price-tag", value: "el-icon-price-tag" },
        { label: "el-icon-news", value: "el-icon-news" },
        { label: "el-icon-guide", value: "el-icon-guide" },
        { label: "el-icon-male", value: "el-icon-male" },
        { label: "el-icon-female", value: "el-icon-female" },
        { label: "el-icon-thumb", value: "el-icon-thumb" },
        { label: "el-icon-cpu", value: "el-icon-cpu" },
        { label: "el-icon-link", value: "el-icon-link" },
        { label: "el-icon-connection", value: "el-icon-connection" },
        { label: "el-icon-open", value: "el-icon-open" },
        { label: "el-icon-turn-off", value: "el-icon-turn-off" },
        { label: "el-icon-set-up", value: "el-icon-set-up" },
        { label: "el-icon-chat-round", value: "el-icon-chat-round" },
        { label: "el-icon-chat-line-round", value: "el-icon-chat-line-round" },
        { label: "el-icon-chat-square", value: "el-icon-chat-square" },
        { label: "el-icon-chat-dot-round", value: "el-icon-chat-dot-round" },
        { label: "el-icon-chat-dot-square", value: "el-icon-chat-dot-square" },
        {
          label: "el-icon-chat-line-square",
          value: "el-icon-chat-line-square",
        },
        { label: "el-icon-message", value: "el-icon-message" },
        { label: "el-icon-postcard", value: "el-icon-postcard" },
        { label: "el-icon-position", value: "el-icon-position" },
        {
          label: "el-icon-turn-off-microphone",
          value: "el-icon-turn-off-microphone",
        },
        { label: "el-icon-microphone", value: "el-icon-microphone" },
        {
          label: "el-icon-close-notification",
          value: "el-icon-close-notification",
        },
        { label: "el-icon-bangzhu", value: "el-icon-bangzhu" },
        { label: "el-icon-time", value: "el-icon-time" },
        { label: "el-icon-odometer", value: "el-icon-odometer" },
        { label: "el-icon-crop", value: "el-icon-crop" },
        { label: "el-icon-aim", value: "el-icon-aim" },
        { label: "el-icon-switch-button", value: "el-icon-switch-button" },
        { label: "el-icon-full-screen", value: "el-icon-full-screen" },
        { label: "el-icon-copy-document", value: "el-icon-copy-document" },
        { label: "el-icon-mic", value: "el-icon-mic" },
        { label: "el-icon-stopwatch", value: "el-icon-stopwatch" },
        { label: "el-icon-medal-1", value: "el-icon-medal-1" },
        { label: "el-icon-medal", value: "el-icon-medal" },
        { label: "el-icon-trophy", value: "el-icon-trophy" },
        { label: "el-icon-trophy-1", value: "el-icon-trophy-1" },
        { label: "el-icon-first-aid-kit", value: "el-icon-first-aid-kit" },
        { label: "el-icon-discover", value: "el-icon-discover" },
        { label: "el-icon-place", value: "el-icon-place" },
        { label: "el-icon-location", value: "el-icon-location" },
        {
          label: "el-icon-location-outline",
          value: "el-icon-location-outline",
        },
        {
          label: "el-icon-location-information",
          value: "el-icon-location-information",
        },
        { label: "el-icon-add-location", value: "el-icon-add-location" },
        { label: "el-icon-delete-location", value: "el-icon-delete-location" },
        { label: "el-icon-map-location", value: "el-icon-map-location" },
        { label: "el-icon-alarm-clock", value: "el-icon-alarm-clock" },
        { label: "el-icon-timer", value: "el-icon-timer" },
        { label: "el-icon-watch-1", value: "el-icon-watch-1" },
        { label: "el-icon-watch", value: "el-icon-watch" },
        { label: "el-icon-lock", value: "el-icon-lock" },
        { label: "el-icon-unlock", value: "el-icon-unlock" },
        { label: "el-icon-key", value: "el-icon-key" },
        { label: "el-icon-service", value: "el-icon-service" },
        { label: "el-icon-mobile-phone", value: "el-icon-mobile-phone" },
        { label: "el-icon-bicycle", value: "el-icon-bicycle" },
        { label: "el-icon-truck", value: "el-icon-truck" },
        { label: "el-icon-ship", value: "el-icon-ship" },
        { label: "el-icon-basketball", value: "el-icon-basketball" },
        { label: "el-icon-football", value: "el-icon-football" },
        { label: "el-icon-soccer", value: "el-icon-soccer" },
        { label: "el-icon-baseball", value: "el-icon-baseball" },
        { label: "el-icon-wind-power", value: "el-icon-wind-power" },
        { label: "el-icon-light-rain", value: "el-icon-light-rain" },
        { label: "el-icon-lightning", value: "el-icon-lightning" },
        { label: "el-icon-heavy-rain", value: "el-icon-heavy-rain" },
        { label: "el-icon-sunrise", value: "el-icon-sunrise" },
        { label: "el-icon-sunrise-1", value: "el-icon-sunrise-1" },
        { label: "el-icon-sunset", value: "el-icon-sunset" },
        { label: "el-icon-sunny", value: "el-icon-sunny" },
        { label: "el-icon-cloudy", value: "el-icon-cloudy" },
        { label: "el-icon-partly-cloudy", value: "el-icon-partly-cloudy" },
        {
          label: "el-icon-cloudy-and-sunny",
          value: "el-icon-cloudy-and-sunny",
        },
        { label: "el-icon-moon", value: "el-icon-moon" },
        { label: "el-icon-moon-night", value: "el-icon-moon-night" },
        { label: "el-icon-dish", value: "el-icon-dish" },
        { label: "el-icon-dish-1", value: "el-icon-dish-1" },
        { label: "el-icon-food", value: "el-icon-food" },
        { label: "el-icon-chicken", value: "el-icon-chicken" },
        { label: "el-icon-fork-spoon", value: "el-icon-fork-spoon" },
        { label: "el-icon-knife-fork", value: "el-icon-knife-fork" },
        { label: "el-icon-burger", value: "el-icon-burger" },
        { label: "el-icon-tableware", value: "el-icon-tableware" },
        { label: "el-icon-sugar", value: "el-icon-sugar" },
        { label: "el-icon-dessert", value: "el-icon-dessert" },
        { label: "el-icon-ice-cream", value: "el-icon-ice-cream" },
        { label: "el-icon-hot-water", value: "el-icon-hot-water" },
        { label: "el-icon-water-cup", value: "el-icon-water-cup" },
        { label: "el-icon-coffee-cup", value: "el-icon-coffee-cup" },
        { label: "el-icon-cold-drink", value: "el-icon-cold-drink" },
        { label: "el-icon-goblet", value: "el-icon-goblet" },
        { label: "el-icon-goblet-full", value: "el-icon-goblet-full" },
        { label: "el-icon-goblet-square", value: "el-icon-goblet-square" },
        {
          label: "el-icon-goblet-square-full",
          value: "el-icon-goblet-square-full",
        },
        { label: "el-icon-refrigerator", value: "el-icon-refrigerator" },
        { label: "el-icon-grape", value: "el-icon-grape" },
        { label: "el-icon-watermelon", value: "el-icon-watermelon" },
        { label: "el-icon-cherry", value: "el-icon-cherry" },
        { label: "el-icon-apple", value: "el-icon-apple" },
        { label: "el-icon-pear", value: "el-icon-pear" },
        { label: "el-icon-orange", value: "el-icon-orange" },
        { label: "el-icon-coffee", value: "el-icon-coffee" },
        { label: "el-icon-ice-tea", value: "el-icon-ice-tea" },
        { label: "el-icon-ice-drink", value: "el-icon-ice-drink" },
        { label: "el-icon-milk-tea", value: "el-icon-milk-tea" },
        { label: "el-icon-potato-strips", value: "el-icon-potato-strips" },
        { label: "el-icon-lollipop", value: "el-icon-lollipop" },
        {
          label: "el-icon-ice-cream-square",
          value: "el-icon-ice-cream-square",
        },
        { label: "el-icon-ice-cream-round", value: "el-icon-ice-cream-round" },
      ],
      menuType:'',
      menuTypeList:[
        {menuLabel:'目录',menuValue:'0'},
        {menuLabel:'菜单',menuValue:'1'},
        {menuLabel:'按钮',menuValue:'2'},
      ],
      menuStatus:false
    }
  },
  created () {
    this.selectMainMenu()
  },
  methods: {
    dialogCheck: function (selection, row) {
      this.$refs.tableF.clearSelection()
      if (selection.length === 0) {
        return
      }
      this.radioData = row
      if (row) {
        this.$refs.tableF.toggleRowSelection(row, true)
      }
    },
    selectMainMenu () {
      getMenu().then((res) => {
        this.tableData = res.results
      })
      .catch((err) => {
        this.$message.error(err)
      })
    },
    editMenu (type,row) {
      this.menuStatus = false
      this.menuType = ''
      if(type&&type!=undefined&&type!=""){
        this.modify = type
      }
      let modify = this.modify
      if(modify == "add"){
        let pid = 0
        if(row&&row!=undefined&&row!=""){
          pid = row["id"]
        }
        this.formData = {
          name: "",
          url: "",
          sortOrder: "",
          iconClass: "",
          status:this.menuStatus,
          pid: pid,
        }
      }else if (modify == "update"){
        this.menuStatus = row.status===1?true:false
        if(row.type===0)this.menuType='目录'
        if(row.type===1)this.menuType='菜单'
        if(row.type===2)this.menuType='按钮'

        this.formData = row
      }
      this.showMenuModel = true
    },
    delMenu (row) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        if(row.childNode.length==0){
          delMenu(row).then(res => {
            if(res.success==true){
              this.$message.success('删除' + res.results + '条数据成功')
              this.reload()
            }else{
              this.$message.error(res.message)
            }
          })
        }else{
          this.$message.error('该节点下有子节点，请先删除子节点')
        }
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    menuStatusChange(data){
        this.formData.status = data===true?1:0
    },
    submitForm(){
      let modify = this.modify
      if(modify == "add"){
        addMenu(this.formData).then((res) => {
          if(res.success==true){
            this.$message.success("成功，有" + res.results + "条数据被处理！");
            this.reload()
          }else{
            this.$message.error(res.message)
          }
        });
      }else if("update"){
        updateMenu(this.formData).then((res) => {
          if(res.success==true){
            this.$message.success("修改成功，有" + res.results + "条数据被处理！");
            this.reload()
          }else{
            this.$message.error(res.message)
          }
        });
      }
      this.cancelForm()
    },
    cancelForm(){
      this.formData = {
          name: "",
          url: "",
          sortOrder: "",
          iconClass: "",
          status:0,
          pid: 0,
        }
      this.menuStatus = false  
      this.showMenuModel = false  
    },
    changeMenuType(data){
      if(data&&data!=undefined&&data!=""){
        this.formData.type = data
      }
    },
  }
}
</script>
