<!--
 * @Descripttion:
 * @Author: SUI
 * @Date: 2022-05-11 09:44:32
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-11 09:54:03
 * @FilePath: \Mall-system\z.md
-->

# Project Configuration

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
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
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
```

## 效果

http://gl.timemeetyou.com/#/login
