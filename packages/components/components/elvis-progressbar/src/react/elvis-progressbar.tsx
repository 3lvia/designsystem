import * as React from 'react';
import { useEffect, useState } from 'react';
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
  // inital state
  const [percentRange, setProgress] = useState(0);


  return (
    <span>
      <div className="ewc-progress--linear">
          <div className="ewc-progress--linear__range" style={{width: `${percentRange}%`}}></div>
      </div>
    
      <div style={{margin: "20px"}}>
                  <button onClick={() => setProgress(percentRange > 0 ?
                    percentRange - 10 : 0)}>Decrease
                </button>
                <button onClick={() => setProgress(percentRange < 100 ? percentRange + 10 : 100)}>Increase</button>
                <button onClick={() => setProgress(0)}>Reset</button>
      </div>
    </span>
  );
};

export default Progressbar;
