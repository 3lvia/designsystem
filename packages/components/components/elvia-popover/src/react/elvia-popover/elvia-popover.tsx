import * as React from "react";
import { useState } from "react";
import "./style.scss";

export interface PopoverProps {
  title?: string;
}

export const Popover: React.FC<PopoverProps> = ({ title }) => {
  let [visiblePopover, setPopoverVisibility] = useState(false);
  const togglePopover = (event: any) => {
    visiblePopover = !visiblePopover;
    setPopoverVisibility(visiblePopover);
  };

  return (
    <span>
      <button className="ewc-popover__button" onClick={togglePopover}>
        Show popover
      </button>
      {visiblePopover ? (
        <span className="ewc-popover">
          <div className={"ewc-popover__content"}>{title}</div>
        </span>
      ) : (
        ""
      )}
    </span>
  );
};
