import { ComponentPropsWithoutRef } from 'react';

import { BaseProps } from '@elvia/elvis-toolbox';

interface BreadcrumbLink {
  href?: string;
  text: string;
}

export interface BaseBreadcrumbProps extends BaseProps {
  items: BreadcrumbLink[];
  onLinkClick?: (value: number) => void;
}

export interface BreadcrumbProps extends BaseBreadcrumbProps, ComponentPropsWithoutRef<'nav'> {}
