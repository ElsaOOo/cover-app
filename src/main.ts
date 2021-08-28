import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElColorPicker,
  ElButton,
  ElDialog,
  ElUpload,
  ElInput,
  ElInputNumber,
} from 'element-plus'
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.component(ElColorPicker.name, ElColorPicker)
app.component(ElButton.name, ElButton)
app.component(ElDialog.name, ElDialog)
app.component(ElUpload.name, ElUpload)
app.component(ElInput.name, ElInput)
app.component(ElInputNumber.name, ElInputNumber)
app.mount('#app')
