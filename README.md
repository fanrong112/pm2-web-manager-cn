# PM2 Web Manager (中文增强版)

![PM2 Web Manager](https://img.shields.io/badge/PM2-Web_Manager-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20macOS-lightgrey.svg)
![License](https://img.shields.io/badge/License-AGPL%203.0-green.svg)

本项目基于原优秀的开源项目 [ezpm2gui](https://github.com/thechandanbhagat/ezpm2gui) 进行深度二次开发，针对国内开发者和 Windows 服务器环境进行了大量优化与修复。

## 🌟 为什么需要这个版本？ (核心特性)

原版 `ezpm2gui` 存在几个对中国开发者和 Windows 环境不太友好的痛点。本项目针对这些痛点进行了彻底的重构和修复：

1. **🇨🇳 深度汉化 UI**
   - 所有的菜单、按钮、状态提示、操作面板全部中文化。
   - 更加符合国人的操作直觉。

2. **🪟 完美支持 Windows 远程服务器**
   - **痛点修复**：原版使用原生的 Linux `tail` 等命令来拉取远程日志，这导致如果在 Windows 服务器上使用 SSH，日志功能会直接崩溃或无法读取。
   - **解决方案**：重写了底层日志拉取逻辑，针对 Windows 环境自动降级使用 PowerShell (`Get-Content`) 获取日志，实现 Windows 远程服务器的无缝兼容。

3. **🔤 彻底解决“中文乱码”问题**
   - **痛点修复**：在读取含有中文（GBK/UTF-8 混杂）的日志时，原版经常会出现满屏乱码（如 `` 等符号）。
   - **解决方案**：在 PowerShell 管道和本地终端中强制指定 `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8` 等编码策略，确保本地和远程日志的中文输出清晰准确。

4. **🔒 修复严重的安全隐私漏洞**
   - **痛点修复**：原版项目中，由于 `.gitignore` 的配置疏漏，用户的远程服务器账号密码文件 (`remote-connections.json`) 极易被误传到开源仓库中。
   - **解决方案**：修复了 `.gitignore`，强制忽略本地敏感配置文件，保护您的服务器资产绝对安全。

---

## 🚀 安装与使用 (Usage)

### 方法 A：通过 NPM 全局安装直接使用 (推荐，最简单)

你可以在任何电脑上通过 npm 快速全局安装并启动它：

```bash
# 全局安装
npm install -g pm2-web-manager-cn

# 启动 Web 面板
ezpm2cn
```
启动后在浏览器打开：`http://localhost:3101` 即可使用。

---

### 方法 B：本地开发与编译安装 (Developers)

1. 克隆代码：
```bash
git clone https://github.com/fanrong112/pm2-web-manager-cn.git
cd pm2-web-manager-cn
```

2. 安装依赖：
```bash
npm install
cd src/client && npm install && cd ../..
```

3. 编译并运行：
```bash
npm run build
npm start
```
默认会在 `http://localhost:3101` 启动 Web 服务。

---

# PM2 Web Manager (Chinese Enhanced Edition)

This project is a deep customization based on the excellent open-source project [ezpm2gui](https://github.com/thechandanbhagat/ezpm2gui). It is specifically optimized for Chinese developers and Windows server environments.

## 🌟 Key Enhancements

1. **🇨🇳 Full Chinese Localization (UI)**
   - All menus, buttons, status indicators, and dashboards have been fully translated into Chinese.

2. **🪟 Full Windows Server SSH Compatibility**
   - **Fixed**: The original version relied on Linux `tail` and other bash commands to fetch remote logs. This caused the remote logging feature to fail completely when connecting to a Windows server via SSH.
   - **Solution**: Implemented a robust fallback mechanism using PowerShell (`Get-Content`) to seamlessly fetch logs from remote Windows servers.

3. **🔤 UTF-8 / GBK Encoding Fixes**
   - **Fixed**: Chinese characters in logs often appeared as garbled text (``).
   - **Solution**: Enforced `[System.Text.Encoding]::UTF8` in PowerShell execution and SSH pipelines to ensure pristine rendering of Chinese logs.

4. **🔒 Critical Security Patch**
   - **Fixed**: The original project failed to ignore the `remote-connections.json` file in `.gitignore`, which could easily lead to the accidental leak of remote server credentials (IPs, Usernames, Passwords) to public repositories.
   - **Solution**: Added strict `.gitignore` rules to permanently exclude sensitive credential files.

## 📄 协议 (License)

本项目遵循 **AGPL-3.0** 开源协议，与原项目保持一致。
This project is licensed under the **AGPL-3.0 License**.
