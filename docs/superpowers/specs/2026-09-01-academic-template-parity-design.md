# Academic Website Template：交互还原与轻量化设计

## 目标

在不修改现有根目录 website 的前提下，整理出一个可直接 fork 的 `academic-website-template/` 静态模板。模板以现有 website 的页面结构、视觉语言和交互为唯一基准，不重新设计界面。

## 范围

- 页面：`index.html`、`bio.html`、`research.html`、`projects.html`、`work.html`、`cv.html`、`other.html`。
- 交互：固定导航、当前页面导航态、移动端菜单、首页头像 hover 切换、项目/研究内容中的媒体预览与外链、`other.html` 的图片轮播、PDF 下载/打开。
- 资源：模板不复制个人 PDF；保留可替换图片目录和示例占位资源约定。用户现有图片可按相同路径复制进入模板。
- 脱敏：所有姓名、学校、公司、论文题目、社交链接、指标和联系方式改为中性示例；不改图片文件本身。
- 运行方式：纯静态 HTML/CSS/JS，可直接用 GitHub Pages；不依赖 Tailwind CDN、Remix Icon CDN 或构建工具。

## 架构

```text
academic-website-template/
├── index.html
├── bio.html
├── research.html
├── projects.html
├── work.html
├── cv.html
├── other.html
├── content/site.js       # 站点身份、导航、可替换文案和链接
├── assets/site.css       # 共享样式、响应式规则、交互状态
├── assets/site.js        # 菜单、头像 hover、轮播和通用增强
├── images/               # 示例图片；可直接替换
├── files/                # 用户自行放入 PDF/CV；默认不携带个人文件
├── .github/workflows/pages.yml
├── README.md
├── LICENSE
└── .gitignore
```

页面保留语义 HTML 与稳定的 `data-*` 钩子，内容集中在 `content/site.js`，共享脚本在 DOMContentLoaded 后增强页面；没有框架运行时，也没有生成步骤。

## 交互契约

1. 所有页面使用同一套导航数据，当前文件对应链接自动获得 `aria-current="page"` 与 active 样式。
2. 小屏幕隐藏桌面导航，菜单按钮切换可访问的展开面板；点击链接或 Escape 后关闭。
3. 首页头像容器在 hover/focus 时用第二张图交叉淡入；无第二张图时只显示主图。
4. `data-carousel` 容器按 `data-interval` 自动轮播，鼠标悬停、键盘 focus 和 `prefers-reduced-motion` 时暂停；提供上一张/下一张按钮与当前状态。
5. 所有外链使用 `target="_blank" rel="noopener noreferrer"`；本地文件链接使用相对路径，缺失文件不导致页面脚本报错。
6. 尊重 `prefers-reduced-motion`，仅保留必要的状态变化。

## 脱敏内容模型

`content/site.js` 暴露 `siteConfig`：

- `identity`: `name`、`role`、`location`、`tagline`、`avatar`、`avatarHover`
- `navigation`: 页面 label 与 href
- `links`: `cv`、`email`、`github`、`scholar` 等可选链接
- `copy`: 首页、简介、研究、项目、工作、其他页的示例文案

页面只读取这些配置中的身份和可替换字段；不在 HTML 中硬编码原站个人信息。

## 验证

- 使用本地静态服务器逐页检查桌面与移动宽度。
- 用 `rg` 检查模板中不存在原站姓名、学校、公司、真实社交链接和个人 PDF 文件名。
- 用浏览器手工确认导航、菜单、头像 hover、轮播、PDF/外链和 reduced-motion 行为。
- README 提供 3 步 fork/替换/发布流程和常见替换清单。

## 非目标

- 不修改根目录现有 website 的任何文件。
- 不迁移到 Next.js、React、Jekyll 或 Tailwind 构建链。
- 不重做页面视觉、不引入新的品牌色、不压缩或编辑现有图片。
