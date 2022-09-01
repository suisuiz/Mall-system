/*
 * @Descripttion:
 * @Author: SUI
 * @Date: 2022-05-12 09:23:13
 * @LastEditors: SUI
 * @LastEditTime: 2022-09-01 14:50:40
 * @FilePath: \Mall-system\src\plugins\element.js
 */

import Vue from 'vue'

// 按需引入 element 组件
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  MessageBox,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Pagination,
  Table,
  TableColumn,
  Switch,
  Dialog,
  Select,
  Option,
  Tag,
  Tooltip,
  Tree,
  Alert,
  Step,
  Steps,
  Cascader,
  Upload,
  Tabs,
  TabPane

  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // MenuItemGroup,
  // InputNumber,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  // OptionGroup,
  // ButtonGroup,
  // DatePicker,
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Slider,
  // Icon,
  // Progress,
  // Spinner,
  // Badge,
  // Rate,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // ColorPicker,
  // Transfer,
  // Footer,
  // Timeline,
  // TimelineItem,
  // Link,
  // Divider,
  // Image,
  // Calendar,
  // Backtop,
  // PageHeader,
  // CascaderPanel,
  // Loading,
  // Notification
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Cascader)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)

// Vue.use(Autocomplete);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(MenuItemGroup);
// Vue.use(InputNumber);
// Vue.use(Radio);
// Vue.use(RadioGroup);
// Vue.use(RadioButton);
// Vue.use(Checkbox);
// Vue.use(CheckboxButton);
// Vue.use(CheckboxGroup);
// Vue.use(OptionGroup);
// Vue.use(ButtonGroup);
// Vue.use(DatePicker);
// Vue.use(TimeSelect);
// Vue.use(TimePicker);
// Vue.use(Popover);
// Vue.use(Slider);
// Vue.use(Icon);
// Vue.use(Progress);
// Vue.use(Spinner);
// Vue.use(Badge);
// Vue.use(Rate);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(ColorPicker);
// Vue.use(Transfer);
// Vue.use(Footer);
// Vue.use(Timeline);
// Vue.use(TimelineItem);
// Vue.use(Link);
// Vue.use(Divider);
// Vue.use(Image);
// Vue.use(Calendar);
// Vue.use(Backtop);
// Vue.use(PageHeader);
// Vue.use(CascaderPanel);

// Vue.use(Loading.directive);

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
