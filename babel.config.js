/*
 * @Descripttion:
 * @Author: SUI
 * @Date: 2022-05-09 12:12:01
 * @LastEditors: SUI
 * @LastEditTime: 2022-08-18 18:54:30
 * @FilePath: \Mall-system\babel.config.js
 */
// 这是在项目发布阶段需要用到的babel插件
const prodPlugins = []

// 判断是发布模式
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
    // 发布产品时候的插件组件
    ...prodPlugins,
    // 路由懒加载配置
    '@babel/plugin-syntax-dynamic-import',
  ],
}
