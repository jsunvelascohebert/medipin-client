import React, { useContext, useEffect, useState } from 'react';
import { BannerContext } from '../../contexts/BannerContext';
import { AiOutlineClose } from 'react-icons/ai';

export default function Banner() {

  const { content, visible, hideBanner } = useContext(BannerContext);
  const [loadingBarWidth, setLoadingBarWidth] = useState('w-0');
  const [colorStyle, setColorStyle] = useState('bg-white border-black');

  useEffect(() => {

    // set color scheme
    if (content.status === 'success') {
      setColorStyle('bg-green border-darkGreen');
    } else if (content.status === 'error') {
      setColorStyle('bg-red border-darkRed');
    } 

    // set visibility
    if (visible) {
      setLoadingBarWidth('w-full duration-3000 transition-all ease-linear'); 
    } else {
      setColorStyle(colorStyle);
      setLoadingBarWidth('w-0 duration-0 transition-all');
    } 
  }, [visible]);

  return (<>
    {/* full width container */}
    <div tabIndex={-1} className={`fixed ${visible ? 'top-1' : '-top-24'} left-0 right-0 z-75 flex flex-col justify-center items-center min-h-1/6 transition-all duration-300`} >

      {/* inner container */}
      <div className={`flex flex-col gap-2 py-2 px-4 w-5/6 ${colorStyle} border-2 rounded-full opacity-100`}>

        {/* message container */}
        <div className='flex flex-col sm:flex-row justify-center sm:justify-between items-center'>
          <h5>{content.status}</h5>
          <div className='w-full text-center flex flex-col justify-center items-center gap-2'>
            <p>{content.message}</p>
            {/* loading bar */}
            <div className='relative w-11/12 mx-5 h-1 rounded-full bg-white opacity-25'>
              <div id="bar" className={`absolute bg-black h-1 rounded-full ${loadingBarWidth} `}>
              </div>
            </div>
          </div>
          <AiOutlineClose className="hidden sm:block hover:cursor-pointer hover:scale-110" onClick={hideBanner} />
        </div>
      </div>
    </div>
  </>);

}