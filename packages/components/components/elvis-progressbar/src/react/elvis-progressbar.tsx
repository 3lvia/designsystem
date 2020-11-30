import * as React from 'react';
import { useEffect } from 'react';
import './style.scss';

export interface ProgressbarProps {
}

const Progressbar: React.FC<ProgressbarProps> = ({ }) => {
  // Running on first render only (on mount)
  useEffect(() => {
    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  });

  return (
    <span>
      <div>Test TEST TEST</div>
    </span>
  );
};

export default Progressbar;
