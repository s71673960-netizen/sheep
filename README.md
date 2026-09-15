# UI Components

一套基于 React 和 Material UI 源码扩展的 UI 组件库，包含通用组件、布局、数据录入、数据展示、反馈、图表、日期时间控件和设计令牌。

仓库地址：[s71673960-netizen/sheep](https://github.com/s71673960-netizen/sheep)

在线组件文档：[zysheep.online/components](https://zysheep.online/components/docs.html#/)

本仓库只保留组件源码和分类完整的组件 Demo 文档，不包含产品业务页面、公司品牌文案、私有发布流程或 Registry 凭证。

## 项目定位

- 通过 GitHub 保存、维护和共享组件源码。
- 通过本地文档站查看组件分类、状态和示例代码。
- 当前不发布 npm 包，也不提供公共 npm 安装入口。
- `@ui/components` 只是仓库内部的 pnpm workspace 名称，不代表 npm 上存在同名包。

## 环境要求

- Node.js：以仓库配置为准。
- 包管理器：仅支持 pnpm，请勿使用 npm 或 yarn。

## 获取源码

```bash
git clone https://github.com/s71673960-netizen/sheep.git
cd sheep
pnpm install
```

## 查看组件 Demo

启动本地文档站：

```bash
pnpm components-docs:dev
```

启动后访问：

```text
http://localhost:5188/docs.html
```

构建文档站：

```bash
pnpm components-docs:build
```

文档源码位于 `components-docs/`，组件源码主要位于 `packages/mui-material/src/`。

## 在仓库内部使用组件

同一 pnpm workspace 内的项目可以声明内部依赖：

```json
{
  "dependencies": {
    "@ui/components": "workspace:*"
  }
}
```

然后使用一级组件路径导入：

```jsx
import Button from '@ui/components/Button';
import SearchIcon from '@ui/components/icons/Search';
```

文档站通过 Vite alias 直接引用组件源码，因此 Demo 中也使用相同的导入形式。

> `@ui/components` 只能在本仓库或正确配置了 workspace/源码 alias 的项目中解析，不能执行 `pnpm add @ui/components` 从公共 npm 安装。

## 在其他项目中使用

当前推荐直接 Fork 或克隆本仓库，并将目标应用加入同一个 pnpm workspace；也可以按需复制组件源码，同时补齐其内部依赖和构建配置。若未来需要让任意项目直接安装，再单独设计公开包名、构建产物、版本管理和发布流程。

## 构建组件源码

```bash
pnpm -F @ui/components build
```

## 提交前检查

```bash
pnpm components-docs:build
pnpm -F @ui/components typescript
```

请勿提交以下内容：

- `.env`、访问令牌和 Registry 认证信息；
- 公司名称、产品名称、客户名称或真实业务数据；
- 员工本机路径、内部服务地址和私有发布配置；
- `dist`、`build`、`node_modules` 等构建或依赖目录。

如果敏感信息曾进入 Git 历史，只删除当前文件并不能彻底移除；公开仓库前仍需轮换相关凭证并清理历史记录。

## 上游项目与许可证

本项目基于 Material UI 演进，并保留其 MIT 许可证。详见 [LICENSE](./LICENSE)。
