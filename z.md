<!--
 * @Descripttion:
 * @Author: SUI
 * @Date: 2022-05-11 09:44:32
 * @LastEditors: SUI
 * @LastEditTime: 2022-07-25 15:13:25
 * @FilePath: \Mall-system\z.md
-->

# Project Configuration

```
  "axios": "^0.21.1",
  "core-js": "^3.6.5",
  "element-ui": "^2.15.5",
  "nprogress": "^0.2.0",
  "vue": "^2.6.11",
  "vue-quill-editor": "^3.0.6",
  "vue-router": "^3.2.0",
  "vue-table-with-tree-grid": "^0.2.4",
  "vuex": "^3.4.0"
```

## Project install

### `element-ui`

#### `Vue 2`

```
npm i element-ui -S
// 按需引入
npm install babel-plugin-component -D
```

`main.js`

```javascript
// 按需引入 element
import './plugins/element'
```

`babel.config.js`

```javascript
module.exports = {
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
```

#### `Vue 3`

```
npm install element-plus --save
```

### `axios`

```
npm i axios -S


// 导航进度条
npm install --save nprogress


// 树形组件
npm i vue-table-with-tree-grid -S
// 文档
https://github.com/MisterTaki/vue-table-with-tree-grid#api
https://www.npmjs.com/package/vue-table-with-tree-grid


// 引入富文本
npm install vue-quill-editor -S
// 使用
// 引入富文本
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor)
```

## 效果

http://gl.timemeetyou.com/#/login
