"use client";

import React, { useState } from "react";
import classes from "./accordion.module.scss";
interface AccordionProps {
  title: string;
  children: React.ReactNode;
}
function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState<boolean>(true);
  const classess =
    (open && classes.accordion_open) + " " + classes.accordion_body;
  return (
    <div className={classes.accordion}>
      <div className={classes.accordion_head} onClick={() => setOpen(!open)}>
        <strong>{title}</strong>
        <i className={`bi bi-chevron-${!open ? "down" : "up"}`}></i>
      </div>
      <div className={classess} style={{'transition': 'all 0.2s ease'}}>{children}</div>
    </div>
  );
}

export default Accordion;
