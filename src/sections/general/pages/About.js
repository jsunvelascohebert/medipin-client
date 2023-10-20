import React, { useState } from 'react';
import { PiArrowsOutDuotone, PiChatsCircleBold, PiArrowsInDuotone, PiPencilBold, PiPuzzlePieceBold, PiHammerBold, PiMonitorBold, PiTelegramLogoBold, PiArrowsClockwiseBold } from 'react-icons/pi';

export default function About() {

  const [isEmpathizeOpen, setIsEmpathizeOpen] = useState(true);
  const [isDefineOpen, setIsDefineOpen] = useState(false);
  const [isIdeateOpen, setIsIdeateOpen] = useState(false);
  const [isPrototypeOpen, setIsPrototypeOpen] = useState(false);
  const [isDevelopOpen, setIsDevelopOpen] = useState(false);
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [isIterateOpen, setIsIterateOpen] = useState(false);

  /* ***** ***** accordian handler ***** ***** */
  const openAccordian = (name) => {
    setIsEmpathizeOpen(false);
    setIsDefineOpen(false);
    setIsIdeateOpen(false);
    setIsPrototypeOpen(false);
    setIsDevelopOpen(false);
    setIsDeployOpen(false);
    setIsIterateOpen(false);
    switch (name) {
      case 'empathize':
        setIsEmpathizeOpen(true);
        break;
      case 'define':
        setIsDefineOpen(true);
        break;
      case 'ideate':
        setIsIdeateOpen(true);
        break;
      case 'prototype':
        setIsPrototypeOpen(true);
        break;
      case 'develop':
        setIsDevelopOpen(true);
        break;
      case 'deploy':
        setIsDeployOpen(true);
        break;
      case 'iterate':
        setIsIterateOpen(true);
        break;
      default:
        break;
    }
  }

  return (
    <section id="about" className='bg-gradient-to-b from-lightRed to-white w-full flex flex-col p-12 md:p-24 justify-center items-center gap-24'>
      {/* banner */}
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-center text-darkRed">about</h1>
        <p className='text-center md:max-w-[40vw]'>all medical information used in medipin is pulled from the US Department’s of Health and Human Services’ external API. otherwise, the entire front-end, back-end, and database was designed from scratch using Java, Spring, React, Router, Tailwind, and MySQL.</p>
      </div>

      {/* ideation and development */}
      <div className="flex flex-col justify-center items-center gap-10">
        <h2 className='text-center text-darkRed'>ideation & development</h2>
        <p className='text-center md:max-w-[40vw]'>this version of medipin was conceptualized, designed, and developed solely by Jsun Velasco-Hébert (more information about them below). following the design process, the making of medipin started from a conversation had between Jsun and their friends enrolled in medical school. that conversation ended up with the goal to: </p>
        <div className="text-center md:max-w-[50vw] p-10 rounded-xl bg-red border-2 border-darkRed shadow-md shadow-darkRed text-darkRed text-lg md:text-2xl font-bold">
          develop a web/mobile application that bridges the gap between medical information and awareness
        </div>
      </div>

      {/* process & documentation accordian */}
      <div className="w-full flex flex-col justify-center items-center gap-10">

        <h2 className='text-center text-darkRed'>
          process & documentation
        </h2>

        {/* desktop accordian icons */}
        <div className="hidden md:flex flex-row w-full justify-around items-center">
          {/* empathize icon */}
          <div className={`flex flex-col justify-center items-center gap-2 hover:cursor-pointer ${isEmpathizeOpen && 'border-2 border-darkRed rounded-lg p-2 bg-red'}`}
            onClick={() => openAccordian('empathize')}>
            {/* icon */}
            <PiChatsCircleBold className='text-darkRed text-2xl'/>
            {/* name */}
            <p className="font-bold text-darkRed">empathize</p>
          </div>

          {/* define icon */}
          <div className={`flex flex-col justify-center items-center gap-2 hover:cursor-pointer ${isDefineOpen && 'border-2 border-darkRed rounded-lg p-2 bg-red'}`}
            onClick={() => openAccordian('define')}>
            <PiPencilBold className='text-darkRed text-2xl' />
            <p className="font-bold text-darkRed">define</p>
          </div>

          {/* ideate icon */}
          <div className={`flex flex-col justify-center items-center gap-2 hover:cursor-pointer ${isIdeateOpen && 'border-2 border-darkRed rounded-lg p-2 bg-red'}`} onClick={() => openAccordian('ideate')}>
            <PiPuzzlePieceBold className='text-darkRed text-2xl' />
            <p className="font-bold text-darkRed">ideate</p>
          </div>

          {/* prototype icon */}
          <div className={`flex flex-col justify-center items-center gap-2 hover:cursor-pointer ${isPrototypeOpen && 'border-2 border-darkRed rounded-lg p-2 bg-red'}`}
          onClick={() => openAccordian('prototype')}>
            <PiHammerBold className='text-darkRed text-2xl' />
            <p className="font-bold text-darkRed">prototype</p>
          </div>

          {/* develop icon */}
          <div className={`flex flex-col justify-center items-center gap-2 hover:cursor-pointer ${isDevelopOpen && 'border-2 border-darkRed rounded-lg p-2 bg-red'}`}
            onClick={() => openAccordian('develop')}>
            <PiMonitorBold className='text-darkRed text-2xl' />
            <p className="font-bold text-darkRed">develop</p>
          </div>

          {/* deploy icon */}
          <div className={`flex flex-col justify-center items-center gap-2 hover:cursor-pointer ${isDeployOpen && 'border-2 border-darkRed rounded-lg p-2 bg-red'}`}
          onClick={() => openAccordian('deploy')}>
            <PiTelegramLogoBold className='text-darkRed text-2xl' />
            <p className="font-bold text-darkRed">deploy</p>
          </div>

          {/* iterate icon */}
          <div className={`flex flex-col justify-center items-center gap-2 hover:cursor-pointer ${isIterateOpen && 'border-2 border-darkRed rounded-lg p-2 bg-red'}`}
          onClick={() => openAccordian('iterate')}>
            <PiArrowsClockwiseBold className='text-darkRed text-2xl' />
            <p className="font-bold text-darkRed">iterate</p>
          </div>
        </div>

        {/* empathize mobile accordian card */}
        <div className="w-full flex md:hidden flex-row justify-between items-center border-b-2 border-darkRed pb-2 hover:cursor-pointer"
          onClick={() => openAccordian('empathize')}>
          {/* icon/name container */}
          <div className="flex flex-row gap-2 justify-start items-center">
            {/* icon */}
            <PiChatsCircleBold className='text-darkRed'/>
            {/* name */}
            <p className="font-bold text-darkRed">empathize</p>
          </div>
          {/* expand icon */}
          {isEmpathizeOpen
            ? <PiArrowsInDuotone className='text-darkRed' />
            : <PiArrowsOutDuotone className='text-darkRed' />
          }
        </div>

        {/* empathize information */}
        {isEmpathizeOpen &&
          <div className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 md:max-w-[60vw]'>
            {/* image */}
            <img src='https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt='two people having a conversation' className='rounded-lg border-2 border-darkRed shadow-md shadow-darkRed md:max-w-[25vw]' />
            {/* text content */}
            <p>during the empathize phase, we spoke to current medical students starting with the question, “what are some issues in the medical field that you would want to see addressed?” the common pattern amongst their answers were centered on the discrepancy in health knowledge. upon further discussions with other involved parties, it was decided that an easily learnable app for bridging said gap would be central to the app’s development.</p>
          </div>
        }

        {/* define mobile accordian card */}
        <div className="w-full flex md:hidden flex-row justify-between items-center border-b-2 border-darkRed pb-2 hover:cursor-pointer"
          onClick={() => openAccordian('define')}>
          {/* icon/name container */}
          <div className="flex flex-row gap-2 justify-start items-center">
            {/* icon */}
            <PiPencilBold className='text-darkRed'/>
            {/* name */}
            <p className="font-bold text-darkRed">define</p>
          </div>
          {/* expand icon */}
          {isDefineOpen
            ? <PiArrowsInDuotone className='text-darkRed' />
            : <PiArrowsOutDuotone className='text-darkRed' />
          }
        </div>

        {/* define information */}
        {isDefineOpen &&
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 md:max-w-[60vw]">
            {/* image */}
            <img src='https://images.unsplash.com/photo-1598520106830-8c45c2035460?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80' alt='person writing on whiteboard' className='rounded-lg border-2 border-darkRed shadow-md shadow-darkRed md:max-w-[25vw]' />
            {/* text content */}
            <p>during the define phase, work was done to articulate the problem statement and goal statements. Our hypothesis is that: <span className='font-bold'>If Zoe can easily access credible information on their partner’s condition, then they will be more educated and supportive of their partner’s needs and concerns</span>. Also, <span className=' underline'>We believe that an intuitive interface that makes medical information accessible for Zoe will ease their nerves concerning their knowledge of medical information with their limited background training.</span></p>
          </div>
        }

        {/* ideate mobile accordian card */}
        <div className="w-full flex md:hidden flex-row justify-between items-center border-b-2 border-darkRed pb-2 hover:cursor-pointer"
          onClick={() => openAccordian('ideate')}>
          {/* icon/name container */}
          <div className="flex flex-row gap-2 justify-start items-center">
            {/* icon */}
            <PiPuzzlePieceBold className='text-darkRed'/>
            {/* name */}
            <p className="font-bold text-darkRed">ideate</p>
          </div>
          {/* expand icon */}
          {isIdeateOpen
            ? <PiArrowsInDuotone className='text-darkRed' />
            : <PiArrowsOutDuotone className='text-darkRed' />
          }
        </div>

        {/* ideate information */}
        {isIdeateOpen &&
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 md:max-w-[60vw]">
            {/* image */}
            <img src={require('./assets/medipin-ideate.png')} alt="shared figjam board ideating medipin app" className='rounded-lg border-2 border-darkRed shadow-md shadow-darkRed md:max-w-[25vw]'/>
            {/* text content */}
            <p>for the ideate phase, we used a shared FigJam board to map out the remaining elements of our goal statement, hypothesis, personas, as well as the systemic structure of the app. For the second version, the planning began with the MySQL database tables, moved onto the backend structure, and ended with some interface prototypes. The structure was based primarily on a Three-Layer Architecture model: global level models, data layer repositories, domain level validation services, and a user interface level model/view/control structure.</p>
          </div>
        }

        {/* prototype mobile accordian card */}
        <div className="w-full flex md:hidden flex-row justify-between items-center border-b-2 border-darkRed pb-2 hover:cursor-pointer"
          onClick={() => openAccordian('prototype')}>
          {/* icon/name container */}
          <div className="flex flex-row gap-2 justify-start items-center">
            {/* icon */}
            <PiHammerBold className='text-darkRed'/>
            {/* name */}
            <p className="font-bold text-darkRed">prototype</p>
          </div>
          {/* expand icon */}
          {isPrototypeOpen
            ? <PiArrowsInDuotone className='text-darkRed' />
            : <PiArrowsOutDuotone className='text-darkRed' />
          }
        </div>

        {/* prototype information */}
        {isPrototypeOpen &&
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 md:max-w-[60vw]">
            {/* image */}
            <img src={require('./assets/medipin-prototype.png')} alt="figma mockup board for the hi-fidelity prototype" className='rounded-lg border-2 border-darkRed shadow-md shadow-darkRed md:max-w-[25vw]'/>
            {/* text content */}
            <p>when prototyping, Figma was used to create both lo-fidelity and hi-fidelity mockups. with Figma, there was a focus on utilizing all of the available tools and features, including auto-layout, variants, and local variables. interactivity was an important element, so two interactive prototypes are made available for both the lo-fidelity and hi-fidelity mockups. lastly, responsive design was deeply considered, so both mobile and desktop versions were designed.</p>
          </div>
        }
        
        {/* develop mobile accordian card */}
        <div className="w-full flex md:hidden flex-row justify-between items-center border-b-2 border-darkRed pb-2 hover:cursor-pointer"
          onClick={() => openAccordian('develop')}>
          {/* icon/name container */}
          <div className="flex flex-row gap-2 justify-start items-center">
            {/* icon */}
            <PiMonitorBold className='text-darkRed'/>
            {/* name */}
            <p className="font-bold text-darkRed">develop</p>
          </div>
          {/* expand icon */}
          {isDevelopOpen
            ? <PiArrowsInDuotone className='text-darkRed' />
            : <PiArrowsOutDuotone className='text-darkRed' />
          }
        </div>

        {/* develop information */}
        {isDevelopOpen &&
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 md:max-w-[60vw]">
            {/* image */}
            <img src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt="laptop screen with code editor opened" className='rounded-lg border-2 border-darkRed shadow-md shadow-darkRed md:max-w-[25vw]'/>
            {/* text content */}
            <p>development materialized into three main phases: the MySQL database, the Java backend, and the React front-end. as hinted at, MySQL and Docker were used for creating the database. the Java Backend prioritized SpringBoot and included test-driven development with JUnit tests. Lastly, the front-end uses both React and Tailwind CSS. all elements were created from scratch using the utility framework.</p>
          </div>
        }

        {/* deploy mobile accordian card */}
        <div className="w-full flex md:hidden flex-row justify-between items-center border-b-2 border-darkRed pb-2 hover:cursor-pointer"
          onClick={() => openAccordian('deploy')}>
          {/* icon/name container */}
          <div className="flex flex-row gap-2 justify-start items-center">
            {/* icon */}
            <PiTelegramLogoBold className='text-darkRed'/>
            {/* name */}
            <p className="font-bold text-darkRed">deploy</p>
          </div>
          {/* expand icon */}
          {isDeployOpen
            ? <PiArrowsInDuotone className='text-darkRed' />
            : <PiArrowsOutDuotone className='text-darkRed' />
          }
        </div>

        {/* deploy information */}
        {isDeployOpen &&
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 md:max-w-[60vw]">
            {/* image */}
            <img src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80' alt="laptop screen with data visualized" className='rounded-lg border-2 border-darkRed shadow-md shadow-darkRed md:max-w-[25vw]'/>
            {/* text content */}
            <p>for deploying medipin, multiple routes were considered including AWS and Heroku. Heroku was ultimately decided due to the simplicity in its services. all elements of the app are hosted on Heroku; including the backend, database, and front-end separately. in the future, AWS will be considered when resources, time, and energy are less sparse.</p>
          </div>
        }

        {/* iterate mobile accordian card */}
        <div className="w-full flex md:hidden flex-row justify-between items-center border-b-2 border-darkRed pb-2 hover:cursor-pointer"
          onClick={() => openAccordian('iterate')}>
          {/* icon/name container */}
          <div className="flex flex-row gap-2 justify-start items-center">
            {/* icon */}
            <PiArrowsClockwiseBold className='text-darkRed'/>
            {/* name */}
            <p className="font-bold text-darkRed">iterate</p>
          </div>
          {/* expand icon */}
          {isIterateOpen
            ? <PiArrowsInDuotone className='text-darkRed' />
            : <PiArrowsOutDuotone className='text-darkRed' />
          }
        </div>

        {/* iterate information */}
        {isIterateOpen &&
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 md:max-w-[60vw]">
            {/* image */}
            <img src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt="person writing notes at a desk" className='rounded-lg border-2 border-darkRed shadow-md shadow-darkRed md:max-w-[25vw]'/>
            {/* text content */}
            <p>iterating will be a continuous process and will result in updated versions with improvements. major areas to improve include new features such as sorting and filtering, better experience with specific elements, and updated backend/database services to meet the needs required. user testing will start with qualitative methods but attempts will be made to include quantitative elements (such as A/B testing and other digital metrics).</p>
          </div>
        }
      </div>

      {/* designer & developer container */}
      <div className="w-full flex flex-col justify-center items-center gap-10">
        {/* section header */}
        <h2 className='text-center text-darkRed'>designer & developer</h2>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-10 max-w-[75vw]">
          {/* image */}
          <img src={require('./assets/jvh_headshot.png')} alt='headshot of jsun velasco-hebert' className='rounded-full border-2 border-darkRed shadow-md shadow-darkRed max-w-[50vw] max-h-[35vh]' />
          
          <div className="flex flex-col justify-center md:justify-start items-center md:items-start gap-2">
            {/* name */}
            <p className='font-bold text-xl text-darkRed text-center md:text-left'>
              jsun velasco-hebert
            </p>
            {/* pronouns */}
            <p className='text-light italic text-sm text-center md:text-left'>they/he</p>
            {/* text */}
            <p className='text-center md:text-left'>Jsun is a designer-educator-developer with a diverse background in digital media, industrial design, participatory research, and community engagement. They have worked a plethora of positions including a diversity and equity liaison, a marketing and graphic designer for a sustainability office, and an educator in both higher education institutions and youth-oriented non-profits.</p>
          </div>
        </div>
      </div>

      {/* special thanks container */}
      <div className="flex flex-col justify-center items-center gap-10">
        <h2 className='text-center text-darkRed'>special thanks</h2>
        <p className='text-center md:max-w-[30vw]'>as this project was made to improve on the capstone project completed during Jsun’s training at Dev10, special thanks are deserved to Ella Gaorian and Elizabeth Sweet, the other co-creators of the first version.</p>
      </div>



    </section>
  );
}