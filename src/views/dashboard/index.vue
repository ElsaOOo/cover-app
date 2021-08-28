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
            <el-color-picker v-model="state.config.bgColor"></el-color-picker>
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
            <el-upload
              :limit="1"
              action=""
              :show-file-list="false"
              @change="handleBgImg"
              :before-upload="beforeUpload"
            >
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
              v-model="state.config.title"
            />
          </div>
          <div class="flex justify-between items-center mb-3">
            <span class="label">文字大小</span>
            <el-input-number
              size="small"
              style="width: 160px"
              v-model="state.config.fontSize"
            />
          </div>
          <div class="flex justify-between items-center mb-3">
            <span class="label">文字颜色</span>
            <el-color-picker
              v-model="state.config.titleColor"
            ></el-color-picker>
          </div>
          <div class="flex justify-between items-center mb-3">
            <span class="label">图片宽度</span>
            <el-input-number
              size="small"
              style="width: 160px"
              v-model="state.config.width"
            />
          </div>
          <div class="flex justify-between items-center mb-3">
            <span class="label">图片高度</span>
            <el-input-number
              size="small"
              style="width: 160px"
              v-model="state.config.height"
            />
          </div>
        </div>
        <div>
          <div class="flex justify-between">
            <el-button size="mini" type="primary" @click="resetConfig"
              >重置</el-button
            >
            <el-button size="mini" type="primary" @click="download"
              >图片下载</el-button
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
        {{ state.config.title }}
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ColorRecomend from './components/color-recomend/index.vue'

export default defineComponent({
  name: 'dashboard',
  components: {
    ColorRecomend,
  },
})
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import downloadJs from 'downloadjs'
import * as htmlToImage from 'html-to-image'
import { getCurrentTimestamp } from '@/utils/index'

interface DefaultConfig {
  bgColor: string
  bgImg: null | File
  titleColor: string
  title: string
  fontSize: number
  width: number
  height: number
}

const defaultConfig: DefaultConfig = {
  bgColor: '#D49A89',
  bgImg: null,
  titleColor: '#F4F4F4',
  title: 'title',
  fontSize: 36,
  width: 660,
  height: 192,
}
const state = reactive({
  config: {
    ...defaultConfig,
  },
})
const viewStyle = computed(() => {
  const constantStyle = {
    color: state.config.titleColor,
    fontSize: state.config.fontSize + 'px',
    width: state.config.width + 'px',
    height: state.config.height + 'px',
  }
  if (state.config.bgImg) {
    return {
      ...constantStyle,
      background: `url(${state.config.bgImg}) center/100% no-repeat`,
    }
  }
  return {
    ...constantStyle,
    background: state.config.bgColor,
  }
})
const download = () => {
  htmlToImage
    .toPng(document.getElementById('box-view')!, { quality: 1 })
    .then(function (dataUrl) {
      downloadJs(dataUrl, `${getCurrentTimestamp().split(' ').join('-')}.png`)
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
    })
}
const resetConfig = () => {
  state.config = { ...defaultConfig }
}
const handleBgImg = (file: { raw: File }) => {
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file.raw)
  fileReader.onload = (event: any) => {
    state.config.bgImg = event.target.result
  }
}
const beforeUpload = () => {
  return false
}
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
