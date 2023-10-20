import React, { useState, useEffect } from 'react';

export default function NotificationBanner({ isOpen, setOpen, isSuccess, message }) {

  const [isBannerOpen, setIsBannerOpen] = useState(isOpen);

  const toggleBannerState = () => {
    setIsBannerOpen(!isBannerOpen);
    setOpen(!isOpen);
  }

  useEffect(() => {
    setIsBannerOpen(isOpen);
  }, [isOpen]);


  return (<>
    
    <div className="fixed top-0 left-0 right-0 z-100 flex justify-center items-center bg-lightOrange">
      {isSuccess ? <p>SUCCESS!</p> : <p>ERROR!</p>}
      {message}
    </div>
      
  </>);
}