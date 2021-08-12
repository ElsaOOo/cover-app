<template>
  <div class="flex h-full">
    <aside class="aside w-64">
      <header
        class="top font-mono font-semibold text-lg text-white h-14 text-center"
      >
        Cover Image
      </header>
      <div class="edit-area p-2">
        <div class="bg border-b border-gray-700 mb-3">
          <div class="flex justify-between items-center mb-3">
            <span class="label">背景色</span>
            <el-color-picker v-model="config.bgColor"></el-color-picker>
          </div>
          <div class="mb-3 text-right">
            <color-recomend>
              <template v-slot:default="slotProps">
                <el-button
                  type="primary"
                  size="small"
                  @click="slotProps.openDialog"
                  >配色推荐</el-button
                >
              </template>
            </color-recomend>
          </div>
          <div class="flex justify-between items-center mb-3">
            <span class="label">背景图片</span>
            <el-upload :limit="1">
              <el-button size="small" type="primary">文件上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="title border-b border-gray-700 mb-3">
          <div class="flex justify-between items-center mb-3">
            <span class="label">文字内容</span>
            <el-input
              size="small"
              placeholder="请输入内容"
              style="width: 160px"
              v-model="config.title"
            />
          </div>
          <div class="flex justify-between items-center mb-3">
            <span class="label">文字大小</span>
            <el-input-number
              size="small"
              style="width: 160px"
              v-model="config.fontSize"
            />
          </div>
          <div class="flex justify-between items-center mb-3">
            <span class="label">文字颜色</span>
            <el-color-picker v-model="config.titleColor"></el-color-picker>
          </div>
        </div>
        <div>
          <div class="text-right">
            <el-button size="mini" type="primary" @click="download"
              >下载</el-button
            >
          </div>
        </div>
      </div>
    </aside>
    <main class="main m-auto">
      <div
        id="box-view"
        class="box-view flex flex-col items-center justify-center"
        :style="viewStyle"
      >
        {{ config.title }}
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import ColorRecomend from "./components/color-recomend/index.vue";

export default defineComponent({
  name: "dashboard",
  components: {
    ColorRecomend,
  },
});
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import downloadJs from "downloadjs";
import * as htmlToImage from "html-to-image";

const config = reactive({
  bgColor: "#D49A89",
  titleColor: "#F4F4F4",
  title: "title",
  fontSize: 36,
});
const viewStyle = computed(() => {
  return {
    backgroundColor: config.bgColor,
    color: config.titleColor,
    fontSize: config.fontSize + "px",
  };
});
const download = () => {
  htmlToImage
    .toPng(document.getElementById("box-view")!, { quality: 1 })
    .then(function (dataUrl) {
      downloadJs(dataUrl, "my-node.png");
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};
</script>

<style lang="less" scoped>
.aside {
  border-right: 1px solid #e9e9e9;
  .top {
    line-height: 56px;
    background-color: #557571;
  }
}
.main {
  .box-view {
    width: 660px;
    height: 192px;
    background-color: #e9e9e9;
  }
}
</style>
