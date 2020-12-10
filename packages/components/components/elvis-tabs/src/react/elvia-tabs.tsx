import * as React from 'react';
import { forwardRef } from 'react';
import './style.scss';

export interface TabsProps {
  label: string;
}

const Tabs: React.FC<TabsProps> = forwardRef((props: TabsProps, ref: any) => {

  return (
    <span ref={ref}>
        {props.label}
    </span>
  );
});

export default Tabs;