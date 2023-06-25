import React from "react";

import "./Message.css";

export const Message = ({ message, type }) => {
  return (
    <div className={`Message ${type}`}>
      <p>{message}</p>
    </div>
  );
};
