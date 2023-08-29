import React from 'react';
import { ShowIfDarkTheme, ShowIfLightTheme } from './styledComponents';

const ProfilePictureDark: React.FC = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M64.0001 32C64.0001 49.6731 49.6732 64 32.0001 64C14.3269 64 6.10352e-05 49.6731 6.10352e-05 32C6.10352e-05 14.3269 14.3269 0 32.0001 0C49.6732 0 64.0001 14.3269 64.0001 32Z"
      fill="#5E5E5E"
    />
    <path
      d="M37.1719 37.8617C36.8065 37.8248 36.7224 36.8624 37.0639 36.7274C42.2927 34.6594 45.9922 29.5503 45.9922 23.5753C45.9922 15.7694 39.6463 9.69556 31.8572 9.69556C24.0682 9.69556 17.7856 15.7694 17.7856 23.5753C17.7856 29.4809 21.3997 34.5406 26.5323 36.6541C26.8724 36.7941 26.776 37.7932 26.4106 37.835C25.1547 37.9788 24.1088 38.1586 23.165 38.3281C23.1326 38.3339 23.1054 38.3552 23.0918 38.3852L22.3706 39.9753C22.3481 40.025 22.3696 40.0836 22.4189 40.1069L30.9186 44.1337C30.9381 44.1429 30.9602 44.1456 30.9814 44.1413L39.3826 42.4262C39.401 42.4225 39.4179 42.4136 39.4315 42.4008L42.167 39.8049C42.1999 39.7736 42.2077 39.7241 42.1858 39.6842L41.4616 38.364C41.4455 38.3346 41.4157 38.3152 41.3823 38.3123C40.7552 38.2588 40.0324 38.1769 39.2336 38.0863C38.5921 38.0136 37.9015 37.9353 37.1719 37.8617Z"
      fill="#EDEDED"
    />
    <path
      d="M17.76 22.8539C18.0364 17.8676 20.2478 9.44151 32.2025 9.4415C37.2475 9.65873 45.1018 11.4314 46.3693 22.8539C41.5319 22.8539 33.9304 22.4383 32.2025 13.5738C32.2009 13.5603 32.1993 13.5461 32.1979 13.5311C32.1373 13.0736 31.759 13.1139 31.59 13.487C30.0846 18.7475 25.9143 22.8539 17.76 22.8539Z"
      fill="#1F1F1F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M40.5809 26.4121C40.3515 26.6141 40.0022 26.5914 39.8007 26.3615C39.3669 25.8666 38.5971 25.2974 37.7213 25.1584C36.8985 25.0279 35.8848 25.2601 34.8523 26.5466C34.661 26.7851 34.313 26.8229 34.0751 26.6311C33.8372 26.4394 33.7994 26.0906 33.9907 25.8522C35.2421 24.2928 36.6357 23.8643 37.8942 24.064C39.0998 24.2553 40.0853 25.0072 40.6314 25.6302C40.8329 25.8601 40.8103 26.2102 40.5809 26.4121Z"
      fill="#1F1F1F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.0055 26.7835C29.7761 26.9855 29.4268 26.9628 29.2253 26.7329C28.7915 26.238 28.0217 25.6688 27.1459 25.5298C26.3231 25.3993 25.3094 25.6315 24.277 26.918C24.0856 27.1565 23.7376 27.1943 23.4997 27.0025C23.2618 26.8108 23.224 26.462 23.4154 26.2236C24.6668 24.6642 26.0603 24.2357 27.3188 24.4354C28.5244 24.6267 29.5099 25.3786 30.056 26.0016C30.2575 26.2315 30.2349 26.5816 30.0055 26.7835Z"
      fill="#1F1F1F"
    />
    <path
      d="M22.8197 38.3291C22.8197 39.1657 25.996 41.6717 31.0105 41.6717C36.025 41.6717 41.6525 39.739 41.1085 38.3065C47.8541 38.8441 51.1903 42.0812 52.1172 54.9969C52.473 59.9547 48.3628 64 43.3922 64H21.0176C16.2595 64 12.1587 60.2986 12.2109 55.5408C12.2962 47.7692 14.0209 39.2556 22.8197 38.3291Z"
      fill="#171717"
    />
  </svg>
);

const ProfilePictureLight: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <path
      fill="#E9E9E9"
      d="M37.17 37.86c-.36-.03-.45-1-.1-1.13a14.14 14.14 0 0 0 8.92-13.15C46 15.77 39.65 9.7 31.86 9.7a13.88 13.88 0 0 0-14.07 13.88c0 5.9 3.61 10.96 8.74 13.07.34.14.25 1.14-.12 1.19-1.26.14-2.3.32-3.25.49a.1.1 0 0 0-.07.06l-.72 1.59a.1.1 0 0 0 .05.13l8.5 4.02a.1.1 0 0 0 .06.01l8.4-1.71a.1.1 0 0 0 .05-.03l2.74-2.6a.1.1 0 0 0 .02-.12l-.73-1.32a.1.1 0 0 0-.08-.05 69 69 0 0 1-2.15-.22l-2.06-.23z"
    />
    <path d="M17.76 22.85c.28-4.98 2.49-13.4 14.44-13.4 5.05.2 12.9 1.98 14.17 13.4-4.84 0-12.44-.41-14.17-9.28v-.04c-.06-.46-.44-.42-.61-.04-1.5 5.26-5.68 9.36-13.83 9.36z" />
    <path
      fill="#262626"
      d="M40.58 26.41a.55.55 0 0 1-.78-.05 3.72 3.72 0 0 0-2.08-1.2c-.82-.13-1.84.1-2.87 1.39a.55.55 0 1 1-.86-.7c1.25-1.56 2.65-1.99 3.9-1.79 1.21.2 2.2.95 2.74 1.57.2.23.18.58-.05.78zM30 26.78a.55.55 0 0 1-.78-.05 3.72 3.72 0 0 0-2.07-1.2c-.83-.13-1.84.1-2.87 1.39a.55.55 0 1 1-.87-.7c1.26-1.56 2.65-1.98 3.9-1.78 1.21.19 2.2.94 2.75 1.56.2.23.17.58-.05.78z"
    />
    <path
      fill="#fff"
      d="M22.82 38.33c0 .84 3.18 3.34 8.2 3.34s10.63-1.93 10.09-3.36c8.1.64 11.28 5.18 11.28 25.69H12.55c-.5-8.18-2.06-24.37 10.27-25.67z"
    />
  </svg>
);

export const ProfilePicture: React.FC = () => {
  return (
    <>
      <ShowIfLightTheme>
        <ProfilePictureLight />
      </ShowIfLightTheme>
      <ShowIfDarkTheme>
        <ProfilePictureDark />
      </ShowIfDarkTheme>
    </>
  );
};
