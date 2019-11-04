// 按需加载
import {
  Pagination,
  Message,
  Button,
  Input,
  Form,
  FormItem,
  Table,
  Dialog,
  TableColumn,
  Menu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Radio,
  Checkbox,
  Select,
  Option,
  Tag,
  Step,
  Steps,
  Progress,
  InputNumber,
  Tabs,
  TabPane,
  Switch,
  Tooltip,
  RadioGroup,
  RadioButton,
  Loading

} from 'element-ui'

// eslint-disable-next-line no-undef
Vue.use(Pagination)
  .use(Button)
  .use(Input)
  .use(Form)
  .use(FormItem)
  .use(Table)
  .use(Dialog)
  .use(TableColumn)
  .use(Menu)
  .use(MenuItem)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Scrollbar)
  .use(Submenu)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Radio)
  .use(Checkbox)
  .use(Select)
  .use(Option)
  .use(Tag)
  .use(Step)
  .use(Steps)
  .use(Progress)
  .use(InputNumber)
  .use(TabPane)
  .use(Tabs)
  .use(Switch)
  .use(Tooltip)
  .use(RadioGroup)
  .use(RadioButton)
	.use(Loading)

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
// eslint-disable-next-line no-undef
Vue.prototype.$message = Message

// eslint-disable-next-line no-undef
Vue.prototype.error = function (msg) {
  Message({
    showClose: true,
    message: msg || '系统异常',
    type: 'error',
    duration: 4 * 1000
  })
}

// eslint-disable-next-line no-undef
Vue.prototype.success = function (msg) {
  Message({
    showClose: true,
    message: msg || '操作成功',
    type: 'success',
    duration: 3 * 1000
  })
}
