// src/ui/mobileShell.config.js

export const MOBILE_MENU_LINKS = [
  { id: 'home', label: 'home', href: 'https://4teen.me' },
  { id: 'whitepaper', label: 'whitepaper', href: 'https://4teen.me/wp' },
  { id: 'tokenomics', label: 'tokenomics', href: 'https://4teen.me/tc' },
  { id: 'airdrop', label: 'airdrop', href: 'https://4teen.me/ad' },
  { id: 'blog', label: 'blog', href: 'https://4teen.me/bg' },
  { id: 'buy', label: 'buy', href: 'https://4teen.me/bt' },
  { id: 'swap', label: 'swap', href: 'https://4teen.me/sw' },
  { id: 'unlock-timeline', label: 'unlock timeline', href: 'https://4teen.me/ult' },
  { id: 'liquidity-controller', label: 'liquidity controller', href: 'https://4teen.me/lc' },
  { id: 'phone', label: 'tel: +1 646-217-8070', href: 'tel:+1%20646-217-8070' },
  { id: 'email', label: 'email: info@4teen.me', href: 'mailto:info@4teen.me' }
];

export const MOBILE_SOCIALS = [
  {
    id: 'facebook',
    shortName: 'facebook',
    href: 'https://facebook.com/Fourteentoken',
    icon: '/src/assets/socials/facebook_social.svg',
    alt: 'Facebook'
  },
  {
    id: 'x',
    shortName: 'x',
    href: 'https://x.com/4teentoken',
    icon: '/src/assets/socials/x_social.svg',
    alt: 'X'
  },
  {
    id: 'instagram',
    shortName: 'instagram',
    href: 'https://instagram.com/fourteentoken',
    icon: '/src/assets/socials/instagram_social.svg',
    alt: 'Instagram'
  },
  {
    id: 'youtube',
    shortName: 'youtube',
    href: 'https://www.youtube.com/@4teentoken',
    icon: '/src/assets/socials/youtube_social.svg',
    alt: 'YouTube'
  },
  {
    id: 'whatsapp',
    shortName: 'whatsapp',
    href: 'https://wa.me/16462178070',
    icon: '/src/assets/socials/whatsapp_social.svg',
    alt: 'WhatsApp'
  },
  {
    id: 'telegram',
    shortName: 'telegram',
    href: 'https://t.me/fourteentoken',
    icon: '/src/assets/socials/telegram_social.svg',
    alt: 'Telegram'
  },
  {
    id: 'threads',
    shortName: 'threads',
    href: 'https://www.threads.com/@fourteentoken',
    icon: '/src/assets/socials/threads_social.svg',
    alt: 'Threads'
  },
  {
    id: 'tiktok',
    shortName: 'tiktok',
    href: 'https://www.tiktok.com/@4teentoken',
    icon: '/src/assets/socials/tiktok_social.svg',
    alt: 'TikTok'
  },
  {
    id: 'discord',
    shortName: 'discord',
    href: 'https://discord.gg/jWZF6KzPCB',
    icon: '/src/assets/socials/discord_social.svg',
    alt: 'Discord'
  },
  {
    id: 'github',
    shortName: 'github',
    href: 'https://github.com/info14fourteen-creator',
    icon: '/src/assets/socials/github_social.svg',
    alt: 'GitHub'
  }
];

export const MOBILE_BOTTOM_NAV = [
  {
    id: 'buy',
    label: 'buy\ntoken',
    href: 'https://4teen.me/bt',
    icon: '/src/assets/menu/buy_menu.svg'
  },
  {
    id: 'swap',
    label: 'swap\ntoken',
    href: 'https://4teen.me/sw',
    icon: '/src/assets/menu/swap_menu.svg'
  },
  {
    id: 'unlock',
    label: 'unlock\ntimeline',
    href: 'https://4teen.me/ult',
    icon: '/src/assets/menu/unlock_menu.svg'
  },
  {
    id: 'liquidity',
    label: 'liquidity\ncontroller',
    href: 'https://4teen.me/lc',
    icon: '/src/assets/menu/liquidity_menu.svg'
  }
];

export const MOBILE_SHELL_DEFAULTS = {
  brandText: '4teen.me',
  connectText: 'connect',
  socialRotateMs: 1500
};
