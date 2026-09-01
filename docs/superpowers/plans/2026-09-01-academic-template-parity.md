# Academic Website Template Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将当前根目录的 academic website 交互还原为一个可 fork、可脱敏替换、零构建依赖的静态模板。

**Architecture:** 在 `academic-website-template/` 内保留七个静态页面；共享导航与身份从 `content/site.js` 读取，所有样式与交互集中到 `assets/site.css` 和 `assets/site.js`。页面通过 `data-page`、`data-carousel`、`data-avatar` 等稳定钩子接入共享增强，不触碰根目录现有页面。

**Tech Stack:** 语义 HTML、原生 CSS、原生 JavaScript、GitHub Pages Actions；不使用 Tailwind CDN、图标 CDN、框架或构建工具。

---

### Task 1: 建立模板骨架与可替换配置

**Files:**
- Create: `academic-website-template/content/site.js`
- Create: `academic-website-template/assets/site.css`
- Create: `academic-website-template/assets/site.js`
- Create: `academic-website-template/images/.gitkeep`
- Create: `academic-website-template/files/.gitkeep`

- [ ] **Step 1: 创建配置对象**

在 `content/site.js` 导出全局 `window.siteConfig`，包含中性身份、七项导航、联系方式与示例内容；不写入任何真实姓名、学校、公司、社交 URL 或个人文件名。

- [ ] **Step 2: 创建共享 CSS**

将现有网站的浅底、emerald 强调色、最大宽度、左对齐内容、hover border、PDF/图片容器和移动断点整理为 CSS 变量与类；加入 `prefers-reduced-motion` 覆盖。

- [ ] **Step 3: 创建共享 JS**

实现 `renderSiteChrome()`、`initMobileMenu()`、`initAvatarSwap()`、`initCarousels()`；函数只在对应 `data-*` 节点存在时执行，不依赖第三方库。

- [ ] **Step 4: 提交骨架**

```bash
git add academic-website-template
git commit -m "feat: add lightweight academic template shell"
```

### Task 2: 还原七个页面与导航交互

**Files:**
- Create: `academic-website-template/index.html`
- Create: `academic-website-template/bio.html`
- Create: `academic-website-template/research.html`
- Create: `academic-website-template/projects.html`
- Create: `academic-website-template/work.html`
- Create: `academic-website-template/cv.html`
- Create: `academic-website-template/other.html`

- [ ] **Step 1: 为每页添加统一 shell**

每页包含 `data-page`、共享 CSS/JS、`<header data-site-nav>`、`<main>`、`<footer data-site-footer>`；桌面导航由 `siteConfig.navigation` 渲染，移动菜单通过按钮与 `aria-expanded` 控制。

- [ ] **Step 2: 还原首页头像交互**

首页使用 `data-avatar` 包含主图和 hover 图，复制现有 website 的交叉淡入效果；默认图片为 `images/avatar.jpg` 与 `images/self2.jpg`，用户可替换同名文件。

- [ ] **Step 3: 还原内容页结构**

Bio、Research、Projects、Work、CV、Other 保留现有页面的信息层级、列表、链接、媒体容器与 PDF 预览位置，文案改成中性示例并将真实链接替换为 `#` 或空配置。

- [ ] **Step 4: 还原 Other 页轮播**

使用 `data-carousel` 标记两个示例图片组，提供上一张/下一张按钮、状态文本和自动播放；无图片时显示可读占位区域。

- [ ] **Step 5: 提交页面**

```bash
git add academic-website-template/*.html
git commit -m "feat: restore academic site pages and interactions"
```

### Task 3: 添加开源发布与使用文档

**Files:**
- Create: `academic-website-template/README.md`
- Create: `academic-website-template/LICENSE`
- Create: `academic-website-template/.gitignore`
- Create: `academic-website-template/.github/workflows/pages.yml`

- [ ] **Step 1: 编写 README**

说明 fork 后只需编辑 `content/site.js`、替换 `images/`、可选放入 `files/`，以及本地预览和 GitHub Pages 发布命令；附页面对应关系和常见替换清单。

- [ ] **Step 2: 添加 GitHub Pages 工作流**

使用官方 Pages artifact/upload/deploy actions，直接上传模板目录，不执行构建。

- [ ] **Step 3: 添加许可证和忽略规则**

使用 MIT License；忽略 `.DS_Store`、编辑器目录和本地预览产物。

- [ ] **Step 4: 提交发布文件**

```bash
git add academic-website-template/README.md academic-website-template/LICENSE academic-website-template/.gitignore academic-website-template/.github
git commit -m "docs: make academic template fork-ready"
```

### Task 4: 验证交互、脱敏与可视化结果

**Files:**
- Test: `academic-website-template/` via local static server

- [ ] **Step 1: 运行静态服务器**

```bash
python3 -m http.server 4173 --directory academic-website-template
```

Expected: `http://localhost:4173/index.html` 可访问。

- [ ] **Step 2: 做文本脱敏扫描**

```bash
rg -n "Lian|HKUST|Medrix|hazelian0619|bookdone|douban|CV\\+Lian|files/academic|files/work" academic-website-template
```

Expected: 无匹配；仅允许 README 中出现通用 GitHub Pages 说明。

- [ ] **Step 3: 做页面与脚本检查**

```bash
for page in index bio research projects work cv other; do curl -fsS "http://localhost:4173/$page.html" >/dev/null; done
node --check academic-website-template/assets/site.js
```

Expected: 七个页面均返回 200，脚本语法检查通过。

- [ ] **Step 4: 浏览器人工确认**

确认桌面导航、小屏菜单、头像 hover、Other 轮播、外链新标签、PDF 链接和 reduced-motion；启动视觉 companion 展示最终模板。

- [ ] **Step 5: 提交验证结果**

```bash
git add academic-website-template
git commit -m "test: verify template parity and privacy baseline"
```
