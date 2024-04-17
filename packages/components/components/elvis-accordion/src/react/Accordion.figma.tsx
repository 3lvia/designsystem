import figma from '@figma/code-connect';
import React from 'react';

import { Accordion } from './elvia-accordion';

figma.connect(
  Accordion,
  'https://www.figma.com/file/CTFyTP4zr2KuVjSXsgZO1s/Accordion?type=design&node-id=286-229&mode=design&t=qgbcNLXAWGLncJAn-4',
  {
    props: {
      open: figma.boolean('Open'),
      size: figma.enum('Size', { Large: 'large', Medium: 'medium', Small: 'small' }),
      isStartAligned: figma.enum('Aligned', { Left: true, Right: undefined, 'Full width': undefined }),
      isFullWidth: figma.enum('Aligned', { Left: undefined, Right: undefined, 'Full width': true }),
      openLabel: figma.string('Label Text Open'),
      closeLabel: figma.string('Label Text'),
      openDetailText: figma.boolean('Add details', {
        true: 'Detail text',
        false: undefined,
      }),
      closeDetailText: figma.boolean('Add details', {
        true: 'Detail text',
        false: undefined,
      }),
    },
    example: ({
      open,
      openLabel,
      closeLabel,
      size,
      isFullWidth,
      isStartAligned,
      openDetailText,
      closeDetailText,
    }) => (
      <Accordion
        isOpen={open}
        openLabel={openLabel}
        closeLabel={closeLabel}
        size={size}
        isFullWidth={isFullWidth}
        isStartAligned={isStartAligned}
        openDetailText={openDetailText}
        closeDetailText={closeDetailText}
        content={<div>Add your content here</div>}
      />
    ),
  },
);
