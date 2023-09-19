import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

interface BreadcrumbLink {
  href?: string;
  text: string;
}

export interface BreadcrumbProps extends ComponentPropsWithoutRef<'nav'>, BaseProps {
  items: BreadcrumbLink[];
  onLinkClick?: (value: number) => void;
}
