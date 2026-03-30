// src/ui/mobileShell.config.js

import facebookSocial from '../assets/socials/facebook_social.svg';
import xSocial from '../assets/socials/x_social.svg';
import instagramSocial from '../assets/socials/instagram_social.svg';
import youtubeSocial from '../assets/socials/youtube_social.svg';
import whatsappSocial from '../assets/socials/whatsapp_social.svg';
import telegramSocial from '../assets/socials/telegram_social.svg';
import threadsSocial from '../assets/socials/threads_social.svg';
import tiktokSocial from '../assets/socials/tiktok_social.svg';
import discordSocial from '../assets/socials/discord_social.svg';
import githubSocial from '../assets/socials/github_social.svg';

import buyMenu from '../assets/menu/buy_menu.svg';
import swapMenu from '../assets/menu/swap_menu.svg';
import unlockMenu from '../assets/menu/unlock_menu.svg';
import liquidityMenu from '../assets/menu/liquidity_menu.svg';

export const MOBILE_MENU_LINKS = [
  { id: 'home', label: 'Home', shortLabel: '/', href: 'https://4teen.me' },
  { id: 'whitepaper', label: 'Whitepaper', shortLabel: '/wp', href: 'https://4teen.me/wp' },
  { id: 'blog', label: 'Blog', shortLabel: '/bg', href: 'https://4teen.me/bg' },
  { id: 'buy', label: 'Direct Buy', shortLabel: '/bt', href: 'https://4teen.me/bt' },
  { id: 'swap', label: 'Swap 4TEEN', shortLabel: '/sw', href: 'https://4teen.me/sw' },
  { id: 'unlock-timeline', label: 'Unlock Timeline', shortLabel: '/ult', href: 'https://4teen.me/ult' },
  { id: 'liquidity-controller', label: 'Liquidity Controller', shortLabel: '/lc', href: 'https://4teen.me/lc' },

  {
    id: 'ambassador-program',
    label: 'Ambassador',
    shortLabel: '/a',
    href: 'https://4teen.me/a',
    children: [
      {
        id: 'ambassador-registration',
        label: 'Registration',
        shortLabel: '/reg',
        href: 'https://4teen.me/a#register'
      },
      {
        id: 'ambassador-cabinet',
        label: 'Cabinet',
        shortLabel: '/cab',
        href: 'https://4teen.me/a#cabinet'
      }
    ]
  },

  {
    id: 'airdrop',
    label: 'Airdrop',
    shortLabel: '/ad',
    href: 'https://4teen.me/ad',
    children: [
      {
        id: 'airdrop-telegram',
        label: 'Telegram Campaign',
        shortLabel: '/tg',
        href: 'https://4teen.me/ad#telegram'
      }
    ]
  },

  { id: 'phone', label: '+1 646-217-8070', shortLabel: 'tel', href: 'tel:+1%20646-217-8070' },
  { id: 'email', label: 'info@4teen.me', shortLabel: 'mail', href: 'mailto:info@4teen.me' }
];

export const MOBILE_MENU_MATRIX = [
  { id: 'home', type: 'single' },
  { id: 'whitepaper', type: 'single' },
  { id: 'blog', type: 'single' },
  { id: 'buy', type: 'single' },
  { id: 'swap', type: 'single' },
  { id: 'unlock-timeline', type: 'single' },
  { id: 'liquidity-controller', type: 'single' },
  { id: 'ambassador-program', type: 'group' },
  { id: 'airdrop', type: 'group' }
];

export const MOBILE_SOCIALS = [
  {
    id: 'facebook',
    shortName: 'facebook',
    href: 'https://facebook.com/Fourteentoken',
    icon: facebookSocial,
    alt: 'Facebook'
  },
  {
    id: 'x',
    shortName: 'x',
    href: 'https://x.com/4teentoken',
    icon: xSocial,
    alt: 'X'
  },
  {
    id: 'instagram',
    shortName: 'instagram',
    href: 'https://instagram.com/fourteentoken',
    icon: instagramSocial,
    alt: 'Instagram'
  },
  {
    id: 'youtube',
    shortName: 'youtube',
    href: 'https://www.youtube.com/@4teentoken',
    icon: youtubeSocial,
    alt: 'YouTube'
  },
  {
    id: 'whatsapp',
    shortName: 'whatsapp',
    href: 'https://wa.me/16462178070',
    icon: whatsappSocial,
    alt: 'WhatsApp'
  },
  {
    id: 'telegram',
    shortName: 'telegram',
    href: 'https://t.me/fourteentoken',
    icon: telegramSocial,
    alt: 'Telegram'
  },
  {
    id: 'threads',
    shortName: 'threads',
    href: 'https://www.threads.com/@fourteentoken',
    icon: threadsSocial,
    alt: 'Threads'
  },
  {
    id: 'tiktok',
    shortName: 'tiktok',
    href: 'https://www.tiktok.com/@4teentoken',
    icon: tiktokSocial,
    alt: 'TikTok'
  },
  {
    id: 'discord',
    shortName: 'discord',
    href: 'https://discord.gg/jWZF6KzPCB',
    icon: discordSocial,
    alt: 'Discord'
  },
  {
    id: 'github',
    shortName: 'github',
    href: 'https://github.com/info14fourteen-creator',
    icon: githubSocial,
    alt: 'GitHub'
  }
];

export const MOBILE_BOTTOM_NAV = [
  {
    id: 'buy',
    label: 'buy\ntoken',
    href: 'https://4teen.me/bt',
    icon: buyMenu
  },
  {
    id: 'swap',
    label: 'swap\ntoken',
    href: 'https://4teen.me/sw',
    icon: swapMenu
  },
  {
    id: 'unlock',
    label: 'unlock\ntimeline',
    href: 'https://4teen.me/ult',
    icon: unlockMenu
  },
  {
    id: 'liquidity',
    label: 'liquidity\ncontroller',
    href: 'https://4teen.me/lc',
    icon: liquidityMenu
  }
];

export const MOBILE_SHELL_DEFAULTS = {
  brandText: '4teen.me',
  connectText: 'connect',
  socialRotateMs: 1500,
  menuHint: 'routes'
};
