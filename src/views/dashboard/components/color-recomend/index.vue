<template>
  <slot v-bind:openDialog="openDialog"></slot>
  <el-dialog
    title="配色推荐"
    v-model="dialogVisible"
    width="480"
    :before-close="handleClose"
  >
    <ul class="flex flex-wrap justify-between items-center">
      <li
        v-for="item in dataList"
        :key="item.name"
        class="w-5/12 border border-gray-600 rounded-sm mb-3 p-2 box"
      >
        <a :href="item.link" target="_blank">
          <div class="name">{{ item.name }}</div>
          <div class="about">{{ item.about }}</div>
        </a>
      </li>
    </ul>
  </el-dialog>
</template>
//
<script lang="ts">
export default {
  name: "color-recomend",
};
</script>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useDialog } from "./useDialog";
const { dialogVisible, openDialog, closeDialog } = useDialog();
const dataList = reactive([
  {
    name: "ColorHunt",
    about: "配色灵感收集",
    link: "https://colorhunt.co/",
  },
  {
    name: "CoolHue",
    about: "超好看的渐变色",
    link: "https://webkul.github.io/coolhue/",
  },
  {
    name: "LOLCOLORS",
    about: "独立小站，色彩组合推荐",
    link: "https://www.webdesignrankings.com/resources/lolcolors/",
  },
  {
    name: "neilorangepeel",
    about: "随机颜色",
    link: "https://colours.neilorangepeel.com/",
  },
  {
    name: "BrandColors",
    about: "世界知名品牌颜色收集网",
    link: "http://brandcolors.net/",
  },
  {
    name: "中国色",
    about: "中国传统配色",
    link: "http://zhongguose.com/",
  },
  {
    name: "colorfavs",
    about: "提取图片中的配色",
    link: "http://www.colorfavs.com/",
  },
  {
    name: "flatuicolorpicker",
    about: "颜色收集",
    link: "http://www.flatuicolorpicker.com/",
  },
]);
</script>

<style lang="less" scoped>
.box {
  background-color: #f1e9e5;
  border-color: #f1e9e5;
}
.name {
  color: #368b85;
}
.about {
  color: #464660;
}
</style>
