// src/ui/mobileShell.config.js

export const MOBILE_MENU_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Tokenomics', href: '/tokenomics' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Contact', href: '/contact' }
];

export const MOBILE_BOTTOM_NAV = [
  {
    id: 'buy',
    label: 'buy\ntoken',
    href: '/buy',
    icon: '/src/assets/menu/buy_menu.svg'
  },
  {
    id: 'swap',
    label: 'swap\ntoken',
    href: '/swap',
    icon: '/src/assets/menu/swap_menu.svg'
  },
  {
    id: 'unlock',
    label: 'unlock\ntimeline',
    href: '/unlock',
    icon: '/src/assets/menu/unlock_menu.svg'
  },
  {
    id: 'liquidity',
    label: 'liquidity\ncontroller',
    href: '/liquidity',
    icon: '/src/assets/menu/liquidity_menu.svg'
  }
];

export const MOBILE_SOCIALS = [
  {
    id: 'facebook',
    href: 'https://facebook.com/',
    icon: '/src/assets/socials/facebook_social.svg',
    alt: 'Facebook'
  },
  {
    id: 'x',
    href: 'https://x.com/',
    icon: '/src/assets/socials/x_social.svg',
    alt: 'X'
  },
  {
    id: 'instagram',
    href: 'https://instagram.com/',
    icon: '/src/assets/socials/instagram_social.svg',
    alt: 'Instagram'
  },
  {
    id: 'youtube',
    href: 'https://youtube.com/',
    icon: '/src/assets/socials/youtube_social.svg',
    alt: 'YouTube'
  },
  {
    id: 'whatsapp',
    href: 'https://whatsapp.com/',
    icon: '/src/assets/socials/whatsapp_social.svg',
    alt: 'WhatsApp'
  },
  {
    id: 'tiktok',
    href: 'https://tiktok.com/',
    icon: '/src/assets/socials/tiktok_social.svg',
    alt: 'TikTok'
  },
  {
    id: 'threads',
    href: 'https://threads.net/',
    icon: '/src/assets/socials/threads_social.svg',
    alt: 'Threads'
  },
  {
    id: 'discord',
    href: 'https://discord.com/',
    icon: '/src/assets/socials/discord_social.svg',
    alt: 'Discord'
  },
  {
    id: 'telegram',
    href: 'https://t.me/',
    icon: '/src/assets/socials/telegram_social.svg',
    alt: 'Telegram'
  },
  {
    id: 'github',
    href: 'https://github.com/',
    icon: '/src/assets/socials/github_social.svg',
    alt: 'GitHub'
  }
];

export const MOBILE_SHELL_DEFAULTS = {
  brandText: '4teen.me',
  connectText: 'connect wallet',
  socialRotateMs: 1500
};
