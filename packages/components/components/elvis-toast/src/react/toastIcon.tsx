import React from 'react';
import * as DOMPurify from 'dompurify';

import { getThemeColor } from '@elvia/elvis-colors';
import { IconWrapper } from '@elvia/elvis-toolbox';
import { ToastConfig } from './elviaToast.types';
import checkCircle from '@elvia/elvis-assets-icons/dist/icons/checkCircle';
import informationCircle from '@elvia/elvis-assets-icons/dist/icons/informationCircle';

interface Props {
  toast: ToastConfig;
}

export const ToastIcon: React.FC<Props> = ({ toast }) => {
  if (toast.customIcon) {
    const sanitizedDom = DOMPurify.sanitize(toast.customIcon);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedDom }} />;
  } else if (toast.status === 'informative') {
    return <IconWrapper icon={informationCircle} color={getThemeColor('text-primary')} size="sm" />;
  } else {
    return <IconWrapper icon={checkCircle} color={getThemeColor('state-on')} size="sm" />;
  }
};
