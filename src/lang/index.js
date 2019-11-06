import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementIdLocale from 'element-ui/lib/locale/lang/id'
import enLocale from './en'
import zhLocale from './zh'
import idLocale from './id'

Vue.use(VueI18n)

export default (store) => {
	const messages = {
		en: {
			...enLocale,
			...elementEnLocale
		},
		zh: {
			...zhLocale,
			...elementZhLocale
		},
		id: {
			...idLocale,
			...elementIdLocale
		}
	}

	const i18n = new VueI18n({
		locale: store.state.app.language,// 设置语言
		messages // 语言包
	})

	return i18n
}




