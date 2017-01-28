import React from 'react';

const Help = ({ activate, styleClass }) => {
  return (
    <button className={styleClass} onClick={activate}>Help</button>
  );
};

export default Help;