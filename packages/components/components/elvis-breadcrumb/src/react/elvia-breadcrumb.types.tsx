import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

interface BreadcrumbLink {
  href?: string;
  text: string;
}

export interface BaseBreadcrumbProps extends BaseProps {
  items: BreadcrumbLink[];
  onLinkClick?: (value: number) => void;
}

export interface BreadcrumbProps extends BaseBreadcrumbProps, ComponentPropsWithoutRef<'nav'> {}
