import * as React from 'react';
import { useEffect } from 'react';
import './style.scss';

export interface ProgressbarProps {
  value: number;
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
      <div className="ewc-progress">
        <div className="ewc-progress__bar"></div>
      </div>
    </span>
  );
};

export default Progressbar;
