import Vue from 'vue'
import titleMixin from './util/title-mixin'
import * as filters from '@/util/filters'

import 'element-ui/lib/theme-chalk/index.css'
import element from '@/element-ui'
import { Message } from 'element-ui'

Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key])
})


// 注册插件
Vue.use(element)
Vue.mixin(titleMixin)

Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 }
Vue.prototype.$message = Message

Vue.prototype.error = function (msg) {
	Message({ showClose: true, message: msg || '系统异常', type: 'error', duration: 4 * 1000 })
}
Vue.prototype.success = function (msg) {
	Message({ showClose: true, message: msg || '操作成功', type: 'success', duration: 3 * 1000 })
}

