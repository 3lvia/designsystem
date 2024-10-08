import checkCircle from '@elvia/elvis-assets-icons/dist/icons/checkCircle';
import informationCircle from '@elvia/elvis-assets-icons/dist/icons/informationCircle';
import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import { IconWrapper } from '@elvia/elvis-toolbox';
import DOMPurify from 'dompurify';
import React from 'react';

import { ToastConfig } from './publicApi.public';

interface Props {
  toast: ToastConfig;
}

export const ToastIcon: React.FC<Props> = ({ toast }) => {
  if (toast.customIcon) {
    const sanitizedDom = DOMPurify.sanitize(toast.customIcon, {
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^e-icon$/,
      },
    });
    return <div dangerouslySetInnerHTML={{ __html: sanitizedDom }} />;
  } else if (toast.status === 'informative') {
    return <IconWrapper icon={informationCircle} color={'icon-info'} size="sm" />;
  } else if (toast.status === 'negative') {
    return <IconWrapper icon={removeCircle} color={'icon-danger'} size="sm" />;
  } else {
    return <IconWrapper icon={checkCircle} color={'icon-positive'} size="sm" />;
  }
};
