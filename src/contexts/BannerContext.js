import React, { useState, createContext } from 'react';

const BannerContext = createContext();

const EMPTY_CONTENT = {
  message: '',
  status: ''
}

const BannerProvider = ({ children }) => {

  const [content, setContent] = useState(EMPTY_CONTENT);
  const [visible, setVisible] = useState(false);

  const showBanner = (content) => {
    setContent(content);
    setVisible(true);
    setTimeout(() => {
      hideBanner();
    }, 3000);
  }
  
  const hideBanner = () => {
    setContent(EMPTY_CONTENT);
    setVisible(false);
  }

  return (
    <BannerContext.Provider
      value={{ content, visible, showBanner, hideBanner }}>
      {children}
    </BannerContext.Provider>
  );
}

export { BannerContext, BannerProvider };