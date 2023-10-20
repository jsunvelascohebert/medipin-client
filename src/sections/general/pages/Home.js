import React, { useContext, useState } from 'react';
import RegisterModal from '../components/RegisterModal';
import AuthContext from '../../../contexts/AuthContext';

export default function Home() {

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const auth = useContext(AuthContext);

  return (<>
    <section id="home" className='bg-gradient-to-b from-lightBlue to-white'>
      {/* banner */}
      <div id="banner" className="flex flex-col w-full mx-auto py-24 md:py-32 justify-center items-center gap-5">
        <h1 className='text-center uppercase text-darkBlue'>
          medipin
        </h1>
        <div className="font-nunito text-base mx-4 text-center md:text-xl font-light text-darkBlue">
          a way to search, pin, and annotate your medical knowledge
        </div>
      </div>
      
      {/* hero image */}
      <img id="hero-image" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" alt="temporary unsplash home image" className="object-cover w-3/4 h-80 rounded-lg mx-auto border-2 border-darkBlue shadow-md hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-lg transition duration-75" />

      {/* mission statement */}
      <div id="mission" className='flex flex-col mx-auto pt-24 px-12 max-w-xl gap-14'>
        <h2 className="text-darkBlue text-center">mission</h2>
        <p className='text-center'><span className='font-bold text-darkBlue'>medipin</span> was created to bridge the gap between medical information and awareness. by allowing users to search, save, and supplement medical knowledge through a pin-and-note structure, medipin offers a platform for broadening our medical knowledge.</p>
      </div>

      {/* features */}
      <div id="features" className="mx-auto pt-24">
        {/* header */}
        <h2 className="text-darkBlue text-center">features</h2>

        {/* card container */}
        <div className="flex flex-col mx-auto gap-8 justify-center items-center md:flex-row p-8 sm:p-16">

          {/* search card */}
          <div className="card items-start bg-blue md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1501250987900-211872d97eaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="person using keyboard"
              className="rounded-xl border-2 border-darkBlue"
            />
            {/* content */}
            <h4>search for information</h4>
            <p>pull interesting articles from the U.S. Department of Health and Human Service's external API.</p>
          </div>

          {/* pin card */}
          <div className="card items-start bg-blue md:w-1/3">
            <img
              src="https://plus.unsplash.com/premium_photo-1661963429761-5f27bcb6cdaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="board with pinned sticky notes"
              className="rounded-xl border-2 border-darkBlue"
            />
            {/* content */}
            <h4>pin to custom topics</h4>
            <p>using medipin's service, you can pin and organize any interesting articles to customized topics</p>
          </div>

          {/* notes card */}
          <div className="card items-start bg-blue md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="notepad with some notes"
              className="rounded-xl border-2 border-darkBlue"
            />
            {/* content */}
            <h4 className='text-left'>leave personalized notes</h4>
            <p>for each article you pin, you can both read and leave notes, even editing and deleting them as you wish</p>
          </div>
        </div>
      </div>
      
      {/* call to action container */}
      <div id="cta" className="flex flex-col md:flex-row justify-center items-center px-4 sm:px-24 py-24 my-12 w-100 bg-blue gap-12 md:gap-24 border-y-2 border-darkBlue">

        {/* content */}
        <p className="w-3/4 md:w-1/2 text-center text-xl">medipin is free to use but for the full experience, it is recommended you sign up for an account.</p>
        {/* button */}
        {!auth.isLoggedIn() && 
          <button className={`btn-blue scale-150`}
          onClick={() => setIsSignUpOpen(true)}>
            sign up
          </button>        
        }

      </div>

      {/* disclaimer */}
      <div id="disclaimer" className="flex flex-col justify-center items-center gap-12 p-12 max-w-xl mx-auto mb-12">
        <h2 className="text-darkBlue">disclaimer!</h2>
        <p className='text-center'>medipin is a personal project used for practicing full-stack development skills. important to note here is the level of security that may be provided due to limited knowledge on the backend. security features and user-specific features are included; however, it is highly advised to avoid inputting any sensitive information.</p>
      </div>
    </section>

    {/* register modal */}
    {isSignUpOpen &&
      <RegisterModal isOpen={true} color='blue'
        setOpen={(val) => setIsSignUpOpen(val)} />
    }
    
    </>);
}