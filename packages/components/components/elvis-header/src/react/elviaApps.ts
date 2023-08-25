import { getThemeColor } from '@elvia/elvis-colors';

type AppLink = Readonly<{
  name: string;
  icon: string;
  iconLetters?: string;
  url: string;
}>;

type AppLinks = Readonly<AppLink[]>;

export const appList = [
  {
    name: 'Bildegjennomgang',
    icon: `<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20.019" cy="20.0019" r="19.9966" transform="rotate(-180 20.019 20.0019)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2791 1.56116C2.09458 5.83224 -2.69919 17.5508 1.5719 27.7353C3.01935 31.1868 5.32215 34.0191 8.13072 36.0894C17.9158 30.2935 28.5552 25.7877 39.8146 22.8063C40.3074 19.3507 39.9013 15.7213 38.4532 12.2683C34.1821 2.08383 22.4636 -2.70993 12.2791 1.56116Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Bi',
    url: 'bildegjennomgang',
  },
  {
    name: 'Datakatalog',
    icon: `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20.1104" cy="20.2187" r="19.9991" transform="rotate(-90 20.1104 20.2187)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1973 39.6076C11.8159 38.7542 8.61409 37.0049 5.96892 34.3598C-1.8412 26.5497 -1.8412 13.8869 5.96892 6.07683C13.779 -1.73329 26.4417 -1.73329 34.2519 6.07683C36.9004 8.7254 38.6508 11.932 39.503 15.3182C30.336 22.2672 22.1523 30.4455 15.1973 39.6076Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Da',
    url: 'data',
  },
  {
    name: 'Drops',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" transform="rotate(-90 20 20)" fill="${getThemeColor('brand-accent')}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M35.9743 7.96387C30.2562 17.797 25.8354 28.4778 22.9463 39.7716C19.5114 40.2839 15.8982 39.9069 12.4505 38.4965C2.23512 34.3177 -2.65846 22.6488 1.5204 12.4334C5.69926 2.21803 17.3681 -2.67555 27.5835 1.50331C31.0369 2.91602 33.8821 5.18471 35.9743 7.96387Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Dr',
    url: 'drops',
  },
  {
    name: 'Elflow',
    icon: `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20.0572" cy="20.0925" r="19.9703" transform="rotate(-90 20.0572 20.0925)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.2253 2.90144C29.4505 8.542 29.0502 14.302 29.0502 20.1554C29.0502 25.9685 29.445 31.6893 30.2093 37.2926C27.2206 39.0705 23.7292 40.0916 19.9993 40.0916C8.95399 40.0916 0 31.1376 0 20.0923C0 9.04696 8.95399 0.0929714 19.9993 0.0929709C23.7358 0.0929708 27.2331 1.11769 30.2253 2.90144Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Ef',
    url: 'elflow',
  },
  {
    name: 'Elvid',
    icon: `<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20.0979" r="20" transform="rotate(180 20 20.0979)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7657 0.286024C25.755 11.5547 30.2716 22.2017 36.0804 31.9918C34.0117 34.7913 31.1847 37.0866 27.7415 38.5306C17.5583 42.8011 5.84126 38.008 1.57072 27.8248C-2.69982 17.6416 2.09333 5.92452 12.2765 1.65397C15.7133 0.212703 19.3247 -0.196208 22.7657 0.286024Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'eID',
    url: 'elvid',
  },
  {
    name: 'Jordfeil',
    icon: `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20.0157" cy="20.1472" r="19.9993" transform="rotate(-90 20.0157 20.1472)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.67355 3.03014C10.4418 8.6476 10.8387 14.3833 10.8387 20.2117C10.8387 26.0007 10.4471 31.6983 9.68906 37.2794C12.7041 39.1015 16.239 40.1501 20.0189 40.1501C31.0646 40.1501 40.0189 31.1958 40.0189 20.1501C40.0189 9.10439 31.0646 0.150088 20.0189 0.150088C16.2325 0.150089 12.692 1.20225 9.67355 3.03014Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Jo',
    url: 'jordfeildashboard',
  },
  {
    name: 'Kvalitetsportal',
    icon: `<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="19.9992" cy="20.0921" r="19.9992" transform="rotate(-90 19.9992 20.0921)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.583985 24.9123C9.71704 17.9739 17.8716 9.81421 24.8041 0.676516C28.2245 1.51996 31.4655 3.27806 34.1383 5.9508C41.9485 13.761 41.9485 26.4237 34.1383 34.2339C26.3281 42.0441 13.6653 42.0441 5.85517 34.2339C3.1857 31.5644 1.42863 28.3281 0.583985 24.9123Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Kv',
    url: 'kvalitetsportalen',
  },
  {
    name: 'Louvre',
    icon: `<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20.9969" cy="20.004" r="19.9703" transform="rotate(180 20.9969 20.004)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0016 0.00012207C9.95631 0.000124784 1.00232 8.95412 1.00232 19.9994C1.00232 23.7536 2.03671 27.2661 3.83602 30.2676C9.42752 29.5066 15.136 29.1136 20.9363 29.1136C26.7784 29.1136 32.5273 29.5123 38.1573 30.2841C39.9627 27.279 41.0009 23.7605 41.0009 19.9994C41.0009 8.95412 32.0469 0.00012207 21.0016 0.00012207Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Lo',
    url: 'louvre',
  },
  {
    name: 'MDMx',
    icon: `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20.0447" cy="20.4188" r="19.9703" transform="rotate(22.2482 20.0447 20.4188)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.03468 4.42102C17.8674 10.1287 28.5455 14.5407 39.8354 17.4233C40.3589 20.875 39.9848 24.5084 38.5669 27.9746C34.3854 38.1965 22.7091 43.0932 12.4872 38.9117C2.26533 34.7302 -2.63136 23.0539 1.55016 12.832C2.96712 9.36819 5.24471 6.51584 8.03468 4.42102Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Mx',
    url: 'mdmx',
  },
  {
    name: 'MSIc',
    icon: `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" transform="rotate(-180 20 20)" fill="${getThemeColor('brand-accent')}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.208549 17.166C11.4457 14.1776 22.0637 9.67037 31.8294 3.87752C34.6631 5.95113 36.9866 8.7979 38.4436 12.272C42.7144 22.4557 37.9209 34.1735 27.7372 38.4442C17.5534 42.715 5.83567 37.9216 1.56489 27.7378C0.112071 24.2735 -0.291835 20.6317 0.208549 17.166Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Mc',
    url: 'msic',
  },
  {
    name: 'MSIm',
    icon: `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20.7485" cy="20.0371" r="19.9703" transform="rotate(180 20.7485 20.0371)" fill="${getThemeColor(
      'brand-accent',
    )}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.59017 9.76445C9.18158 10.5254 14.89 10.9185 20.6902 10.9185C26.532 10.9185 32.2806 10.5198 37.9103 9.74805C39.7155 12.7529 40.7535 16.2711 40.7535 20.0318C40.7535 31.0765 31.7999 40.0301 20.7552 40.0301C9.71039 40.0301 0.756837 31.0765 0.756836 20.0318C0.756836 16.278 1.79108 12.7657 3.59017 9.76445Z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Ms',
    url: 'msim',
  },
  {
    name: 'USLA',
    icon: `<svg width="41" height="41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.991.5c10.995 0 19.991 8.985 19.991 19.966 0 10.982-8.996 19.966-19.99 19.966C8.995 40.432 0 31.448 0 20.466 0 9.485 8.996.5 19.991.5z" fill="${getThemeColor(
      'brand-accent',
    )}"/><path d="M17.117 40.289A124.53 124.53 0 0 0 3.866 8.752c2.074-2.838 4.888-5.222 8.37-6.68 10.181-4.262 21.934.58 26.203 10.745 4.27 10.165-.522 21.862-10.704 26.125a19.927 19.927 0 0 1-10.618 1.347z" fill="#262626"/>
    </svg>`,
    iconLetters: 'Us',
    url: 'sluttbrukeravbrudd',
  },
] as const satisfies AppLinks;

const getUrlParts = (): string[] => {
  const url = new URL(location.href);
  // E.g. ['design', 'elvia', 'io']
  return url.host.split('.');
};

export const getActiveApp = (kind: 'url' | 'name'): string => {
  const url = getUrlParts()[0];
  if (kind === 'url') {
    return url;
  } else {
    return appList.find((app) => app.url === url)?.name || '';
  }
};

export const getCurrentDomain = (): string => {
  const urlParts = getUrlParts().reverse();

  if (urlParts.length > 1) {
    return `${urlParts[1]}.${urlParts[0]}`;
  }

  return 'elvia.io';
};
