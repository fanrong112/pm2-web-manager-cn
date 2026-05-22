import React from 'react';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  LockOpenIcon,
  KeyIcon,
  ClockIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// @group Types
interface ChangeItem {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  tag: 'New' | 'Improved' | 'Fix';
}

interface Release {
  version: string;
  date: string;
  headline: string;
  changes: ChangeItem[];
}

// @group Constants : Changelog data
const RELEASES: Release[] = [
  {
    version: '1.8.4',
    date: '2026年5月',
    headline: 'PM2 Web Manager 中文增强与 Windows 适配版',
    changes: [
      {
        title: '🇨🇳 UI 深度汉化',
        description:
          '为了更加符合国内开发者的使用直觉，我们对菜单、按钮、状态提示、操作面板、图表全部进行了深度中文化翻译与重构。',
        icon: SparklesIcon,
        color: 'text-indigo-500',
        tag: 'New',
      },
      {
        title: '🪟 Windows 远程连接完美兼容',
        description:
          '原版使用 tail 等 Linux 命令读取日志，在 Windows SSH 服务器上会直接崩溃。本项目重写了底层日志拉取逻辑，自动适配 PowerShell 进行无缝兼容拉取。',
        icon: ShieldCheckIcon,
        color: 'text-blue-500',
        tag: 'New',
      },
      {
        title: '🔤 彻底解决“中文乱码”问题',
        description:
          '在 SSH 通道与本地 PowerShell 环境中强制统一指定 UTF-8 编码，消除 GBK/UTF-8 日志混杂带来的中文乱码。',
        icon: LockOpenIcon,
        color: 'text-emerald-500',
        tag: 'New',
      },
      {
        title: '🔒 敏感连接数据安全补丁',
        description:
          '修复了远程连接凭证配置文件误传的漏洞，在 .gitignore 中永久过滤远程服务器的敏感账号密码。',
        icon: ClockIcon,
        color: 'text-orange-500',
        tag: 'New',
      },
      {
        title: '🔌 毫秒级同步与状态锁 (v1.8.4)',
        description:
          '增加了中文进程日志路径模糊匹配（解决 PM2 自动清洗为破折号导致日志加载空白的问题）、实现了毫秒级侧边栏状态同步、关闭连接时自动加锁防止意外重连。',
        icon: KeyIcon,
        color: 'text-violet-500',
        tag: 'Improved',
      },
    ],
  },
  {
    version: '1.6.0',
    date: '2026年4月',
    headline: 'App 安全防护与屏幕锁定',
    changes: [
      {
        title: 'PIN 码锁定屏幕',
        description:
          '使用 4 位 PIN 码保护应用。锁定屏幕具有数字小键盘，在第 4 位数输入时自动提交验证。也支持键盘输入。',
        icon: KeyIcon,
        color: 'text-violet-500',
        tag: 'New',
      },
      {
        title: '密码保护',
        description:
          '可以从设置的安全选项中要求密码验证才能进入应用。',
        icon: ShieldCheckIcon,
        color: 'text-blue-500',
        tag: 'New',
      },
      {
        title: '手动锁定开关',
        description:
          '顶部导航条添加快速锁定按钮，支持随时退出会话并强制输入 PIN 码或密码重新登录。',
        icon: LockClosedIcon,
        color: 'text-primary-500',
        tag: 'New',
      },
    ],
  },
];

// @group Helpers
const TAG_STYLES: Record<ChangeItem['tag'], string> = {
  New:      'bg-green-500/10 text-green-500 border border-green-500/20',
  Improved: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
  Fix:      'bg-orange-500/10 text-orange-500 border border-orange-500/20',
};

// @group Component : What's New changelog page
const WhatsNew: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">

      {/* ── Page header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <SparklesIcon className="h-5 w-5 text-primary-500" />
          <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            更新日志
          </h1>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          PM2 Web Manager 中文增强版最新更新与功能优化
        </p>
      </div>

      {/* ── Releases ── */}
      {RELEASES.map((release) => (
        <div key={release.version} className="mb-10">

          {/* Version header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-600 text-white tracking-wide">
              v{release.version}
            </span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {release.headline}
            </span>
            <span className="ml-auto text-xs text-neutral-400 dark:text-neutral-600">
              {release.date}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 mb-4" />

          {/* Change cards grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {release.changes.map((change) => {
              const Icon = change.icon;
              return (
                <div
                  key={change.title}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800
                             bg-white dark:bg-neutral-900 p-4
                             hover:border-neutral-300 dark:hover:border-neutral-700
                             transition-colors duration-150"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800
                                    flex items-center justify-center">
                      <Icon className={`h-4 w-4 ${change.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                          {change.title}
                        </span>
                        <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${TAG_STYLES[change.tag]}`}>
                          {change.tag}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {change.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ── Footer CTA ── */}
      <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800
                      bg-neutral-50 dark:bg-neutral-900/50 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-0.5">
            安全与防范设置
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            前往设置页面开启 PIN 码和密码保护。
          </p>
        </div>
        <Link
          to="/settings"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md
                     bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium
                     transition-colors duration-150"
        >
          前往设置
          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

    </div>
  );
};

export default WhatsNew;
