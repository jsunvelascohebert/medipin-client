import React, { useEffect, useState } from 'react';

export default function LoadingOverlay({ color }) {

  const [containerColor, setContainerColor] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    switch (color) {
      case 'green':
        setContainerColor('bg-lightGreen');
        setTextColor('text-darkGreen');
        break;
      case 'purple':
        setContainerColor('bg-lightPurple');
        setTextColor('text-darkPurple');
        break;
      default:
        break;
    }
  }, [color]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-100 ${containerColor} w-full h-full opacity-80 flex justify-center items-center gap-2`}>
    <svg className={`animate-spin -ml-1 mr-3 h-10 w-10 ${textColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className={`text-center ${textColor} text-bold`}>
      loading...
    </p>
  </div>
  );
}