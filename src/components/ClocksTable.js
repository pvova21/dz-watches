import React, { useState } from 'react';
import ClockItem from './ClockItem.js';
import InputForm from './InputForm.js';

export default function ClocksTable() {
  const [clocks, setClocks] = useState([]);

  const handleSbmit = (addClocks) => {
    setClocks((prevClocks) => ([...prevClocks, addClocks]));
  };

  const handleClose = (id) => {
    setClocks((prevClocks) => (prevClocks.filter((item) => item.id !== id)));
  };

  return (
    <>
      <InputForm onFormSubmit={handleSbmit} />
      <div className='clock-list'>
        {clocks.map((item) => (
          <ClockItem key={item.id} clocksSetup={item} onClose={handleClose} />
        ))}
      </div>
    </>
  );
}
