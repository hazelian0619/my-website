# Academic Website Template

一个轻量、可 fork 的学术 / 研究 / 独立创作者个人网站模板。它还原了参考站点的多页导航、浅色留白、绿色强调线、头像 hover、图片轮播和 PDF 下载体验，同时保持纯静态：没有框架、构建步骤或第三方 CDN。

## 3 步开始

1. 点击 GitHub 的 **Use this template**，或直接 fork 本仓库。
2. 只编辑 [`content/site.js`](content/site.js)：改姓名、身份、导航链接、文案、项目和图片路径。
3. 将自己的图片放入 `images/`，将 CV 放入 `files/`，然后开启 GitHub Pages（仓库已带 Actions 工作流）。

本地预览：

```bash
python3 -m http.server 4173
# 打开 http://localhost:4173/
```

## 需要替换的地方

| 文件 | 用途 |
| --- | --- |
| `content/site.js` | 唯一内容入口：姓名、简介、研究、项目、工作、外链 |
| `images/avatar.jpg` | 首页默认头像 |
| `images/self2.jpg` | 首页 hover 后的第二张头像（可删掉并清空 `avatarHover`） |
| `images/adventurex/`、`images/sparklab/` | Other 页轮播示例图片，可整组替换 |
| `files/cv.pdf` | CV 文件；或在 `site.js` 的 `links.cv` 指向其他路径 |

页面文件只负责结构：

- `index.html`：首页与头像交互
- `bio.html`：简介、教育、研究方向
- `research.html`：研究卡片与状态
- `projects.html`：项目预览卡片
- `work.html`：经历列表
- `cv.html`：CV 下载与预览占位
- `other.html`：其他经历与轮播

## 发布到 GitHub Pages

在仓库 Settings → Pages → Source 选择 **GitHub Actions**。每次推送到 `main`，`.github/workflows/pages.yml` 会直接发布当前目录，不需要安装依赖。

## 交互约定

- 桌面端导航自动标记当前页面；小屏幕使用菜单按钮，支持 Escape 关闭。
- 首页头像在 hover / focus 时交叉淡入第二张图。
- Other 页轮播默认 4 秒切换；鼠标悬停、键盘 focus 和 reduced-motion 会暂停。
- 外链应在配置中填写，并由页面以新标签安全打开；本地 PDF 使用相对路径。

## 许可证

MIT。图片、PDF 与你添加的内容仍由各自权利人负责。
