'use client';

import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import logo from '@/assets/cookdev_logo.png';
import { LockKeyhole, History, Columns2, Code, MonitorSmartphone, MoveUpRight, RotateCw, SquareDashedMousePointer, Plus, Lightbulb, AudioLines, MoveUp, ArrowUp, ArrowLeft, Mic } from "lucide-react"
import logoName from '@/assets/logo@4x.png'

const DashboardPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState('chat');
  const [showPopup, setShowPopup] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handlePageClick = () => {
    setVideoLoaded(false);
    setShowPopup(true);
  };

  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(false);
  };

  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (isLoaded && !isSignedIn) {
    window.location.href = '/sign-in';
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen max-h-screen bg-neutral-900 flex flex-col md:justify-center overflow-hidden">
      {/* Header Section */}
      <header className="hidden md:flex bg-neutral-900 px-2 xl:px-4 py-1 items-center">
        {/* Left side */}
        <div className="flex w-1/3 justify-between items-center space-x-3 xl:space-x-4">
          <div className="flex h-fit justify-center space-x-2">
            <div className="flex w-5 h-5 xl:w-6 xl:h-6 mt-1">
              <Image src={logo} alt="logo" width={100} height={100} />
            </div>
            <div className='flex flex-col text-start'>
              <span className="text-white font-medium text-xs xl:text-sm flex gap-1.5">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}` 
                  : user?.fullName || user?.username || 'User'}
                <LockKeyhole size={10} className='text-gray-300 mt-0.5 xl:mt-1' />
              </span>
              <span className='text-[10px] xl:text-[11px] text-gray-400'>Start Generating</span>
            </div>
          </div>
          <div className='flex space-x-2 xl:space-x-2.5'>
            <History className='w-3.5 h-3.5 xl:w-4 xl:h-4 text-gray-400' />
            <Columns2 className='w-3.5 h-3.5 xl:w-4 xl:h-4 text-gray-400' />
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='border border-neutral-700 h-6 xl:h-7 rounded-md px-1 xl:px-1.5 py-1 ml-4 xl:ml-6 items-center flex'>
            <Code className='w-2.5 h-2.5 xl:w-3 xl:h-3 text-gray-400' />
          </div>
          <div className="flex items-center border border-neutral-700 px-1.5 xl:px-2 py-1 rounded-4xl space-x-2 xl:space-x-3">
            <MonitorSmartphone className='w-3.5 h-3.5 xl:w-4 xl:h-4 text-gray-400' />
            <span className='w-16 xl:w-24 text-xs xl:text-sm text-gray-400'>/</span>
            <MoveUpRight className='w-3.5 h-3.5 xl:w-4 xl:h-4 text-gray-400' />
            <RotateCw className='w-3.5 h-3.5 xl:w-4 xl:h-4 text-gray-400' />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-1">
            <div className='flex items-center justify-center'>
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className='rounded-full w-5 h-5 xl:w-6 xl:h-6 object-cover'
                />
              ) : (
                <div className='rounded-full bg-pink-600 w-5 h-5 xl:w-6 xl:h-6 items-center justify-center flex text-xs font-bold'>
                  {user?.firstName?.charAt(0) || user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
              )}
              <div className="text-gray-500 -ml-1.5 bg-neutral-800 text-xs xl:text-sm rounded-4xl xl:px-3 px-1.5 py-1.5 xl:py-1 cursor-not-allowed opacity-50">
                <span className='xl:flex hidden'>Invite</span>
                <Plus className='w-3.5 h-3.5 xl:w-4 xl:h-4 xl:hidden' />
              </div>
            </div>



            <div className="text-gray-500 p-0.5 xl:p-1 bg-neutral-800 rounded-md cursor-not-allowed opacity-50">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px" className="xl:w-5 xl:h-5"><g id="Слой_1"><linearGradient id="SVGID_1_" x1="14.073" x2="14.073" y1="8.468" y2="36.033" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#7dffce" /><stop offset="1" stopColor="#50c08d" /></linearGradient><path fill="url(#SVGID_1_)" d="M24.2,30V6.3c0-1.8-2.3-2.6-3.4-1.2L4.5,25.9c-1.3,1.7-0.1,4.1,2,4.1H24.2z" /><linearGradient id="SVGID_00000140728474547789280440000018204366184369975479_" x1="34.249" x2="34.249" y1="48.404" y2="19.425" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#7dffce" /><stop offset="1" stopColor="#50c08d" /></linearGradient><path fill="url(#SVGID_00000140728474547789280440000018204366184369975479_)" d="M24,18.4v23.7c0,1.8,2.4,2.6,3.5,1.2 l16.4-20.7c1.3-1.7,0.1-4.1-2.1-4.1H24z" /></g></svg>
             </div>
            <div className="text-gray-500 p-1 xl:p-1.5 bg-neutral-800 rounded-md cursor-not-allowed opacity-50">
              <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-gray-500 bg-gray-700 p-1 px-2 xl:px-3 text-xs xl:text-sm font-bold rounded-md cursor-not-allowed opacity-50">
              Publish
            </div>

          </div>
        </div>


      </header>
      {/* Mobile Header */}
      <header className='md:hidden bg-neutral-900 border-b border-neutral-700 flex-shrink-0'>
        <div className='w-full flex items-center justify-between p-2 sm:p-3 md:p-4'>
          <ArrowLeft className='w-5 h-5 md:w-6 md:h-6 text-white' />
          <span className='text-white font-medium text-base md:text-lg'>
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}` 
              : user?.fullName || user?.username || 'User'}
          </span>
          <div className='flex items-center'>
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className='w-8 h-8 md:w-9 md:h-9 rounded-full object-cover'
              />
            ) : (
              <div className='w-8 h-8 md:w-9 md:h-9 rounded-full bg-pink-600 items-center justify-center flex text-sm md:text-base font-bold text-white'>
                <span>{user?.firstName?.charAt(0) || user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}</span>
              </div>
            )}
            <div className='w-8 h-8 md:w-9 md:h-9 -ml-2 rounded-full bg-neutral-800 border border-neutral-700 items-center justify-center flex'>
              <Plus className='w-4 h-4 md:w-5 md:h-5 text-neutral-400' />
            </div>
          </div>
        </div>
      </header>
      <div className="hidden md:flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-1/3 bg-neutral-900 border-r border-black/90 flex flex-col h-full">
          {/* Sidebar Header */}
          {/* <div className="p-4 ">
            <Image src={logoName} alt="logo" width={100} height={100} />
            <p className="text-gray-400 text-sm mt-2"></p
          </div> */}

          {/* Sidebar Content - Spacer */}
          <div className="flex-1"></div>

          {/* Sidebar Input */}
          <div className="p-3 xl:p-4">
            <div className="space-x-2 w-full border border-neutral-700 bg-neutral-800 p-2.5 xl:p-3 rounded-2xl">
              <textarea
                placeholder="Ask DevCook…"
                className="flex-1 text-white placeholder-gray-400 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg text-sm xl:text-base focus:outline-none resize-none overflow-y-auto min-h-[32px] max-h-[240px] w-full"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 240) + 'px';
                }}
              />
              <div className='flex items-center space-x-1.5 xl:space-x-2 justify-between'>
                <div className='flex items-center space-x-1 xl:space-x-1.5'>
                  <div className='rounded-full border border-neutral-700 cursor-not-allowed opacity-50'>
                    <Plus className='w-2.5 h-2.5 xl:w-3 xl:h-3 m-0.5 xl:m-1 text-neutral-500' />
                  </div>
                  <div className='flex items-center space-x-0.5 xl:space-x-1 rounded-4xl border border-neutral-700 px-1.5 xl:px-2 py-0.5 cursor-not-allowed opacity-50'>
                    <SquareDashedMousePointer className='w-2.5 h-2.5 xl:w-3 xl:h-3 text-neutral-500' />
                    <span className='text-neutral-500 text-[10px] xl:text-xs'>Edit</span>
                  </div>
                </div>
                <div className='flex items-center justify-center space-x-0.5 xl:space-x-1'>
                  <div className='flex items-center space-x-0.5 xl:space-x-1 rounded-4xl px-1.5 xl:px-2.5 border border-neutral-700 cursor-not-allowed opacity-50'>
                    <Lightbulb className='w-2.5 h-2.5 xl:w-3 xl:h-3 text-neutral-500' />
                    <span className='text-neutral-500 text-xs xl:text-sm'>Chat</span>
                  </div>
                  <div className='rounded-full border border-neutral-700 p-0.5 cursor-not-allowed opacity-50'>
                    <AudioLines className='w-3.5 h-3.5 xl:w-4 xl:h-4 text-neutral-500' />
                  </div>
                  <div className='flex rounded-full bg-white p-0.5 cursor-pointer' onClick={handlePageClick}>
                    <ArrowUp className='w-3.5 h-3.5 xl:w-4 xl:h-4 text-black' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="w-2/3 relative bg-gray-900 flex items-center justify-center rounded-2xl h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 rounded-lg"
          >
            <source src="/assets/9694443-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/80 z-10 rounded-2xl"></div>
          <div className="text-center absolute z-11 px-4">
            {/* Large Heart Icon */}
            <div className="mb-4 xl:mb-6 flex justify-center items-center rounded-3xl">
              <Image src={logo} alt="logo" width={80} height={80} className='rounded-3xl xl:w-[100px] xl:h-[100px]' />
            </div>

            {/* Main Text */}
            <h1 className="text-lg xl:text-xl text-gray-300 mb-6 xl:mb-8">Spinning up preview…</h1>

            {/* Subtext */}
            <div className="space-y-2 xl:space-y-3 text-gray-300">
              <div className="flex items-center justify-center space-x-2">
                <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 bg-gray-600 rounded-full"></span>
                <span className="text-sm xl:text-base">Collaborate at source, via GitHub</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 bg-gray-600 rounded-full"></span>
                <span className="text-sm xl:text-base">Deploy when you're ready</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 bg-gray-600 rounded-full"></span>
                <span className="text-sm xl:text-base">Chat with AI in the sidebar</span>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Mobile Main Content */}
      <main className="md:hidden flex-1 bg-neutral-900 overflow-hidden">
        {activeTab === 'chat' && (
          <div className="w-full h-full bg-neutral-900">
            {/* Chat content area - currently blank */}
          </div>
        )}
        {activeTab === 'preview' && (
          <div className="relative bg-gray-900 flex items-center justify-center h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src="/assets/9694443-hd_1920_1080_25fps.mp4" type="video/mp4" />
            </video>

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/80 z-10"></div>
            <div className="text-center absolute z-11 px-4">
              {/* Large Heart Icon */}
              <div className="mb-4 flex justify-center items-center rounded-3xl">
                <Image src={logo} alt="logo" width={60} height={60} className='rounded-2xl' />
              </div>

              {/* Main Text */}
              <h1 className="text-lg text-gray-300 mb-6">Spinning up preview…</h1>

              {/* Subtext */}
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                  <span className="text-sm">Collaborate at source, via GitHub</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                  <span className="text-sm">Deploy when you're ready</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                  <span className="text-sm">Chat with AI in the sidebar</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Panel */}
      <div className='md:hidden bg-neutral-900 border-t border-neutral-700 rounded-t-2xl p-2 sm:p-3 space-y-2 sm:space-y-3 flex-shrink-0 max-h-[40vh] overflow-y-auto'>
        {/* Input Section */}
        <div className='w-full flex items-center space-x-1.5 sm:space-x-2 md:space-x-3'>
          <textarea
            placeholder='Ask DevCook…'
            className='flex-1 rounded-xl px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-white placeholder-gray-400 text-xs sm:text-sm md:text-base focus:outline-none focus:border-neutral-600 resize-none overflow-y-auto min-h-[36px] sm:min-h-[40px] md:min-h-[44px] max-h-[240px]'
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 240) + 'px';
            }}
          />
          <div className='flex items-center justify-center border border-neutral-700 rounded-full p-1.5 sm:p-2 md:p-2.5 bg-neutral-800 flex-shrink-0 cursor-not-allowed opacity-50'>
            <AudioLines className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-neutral-500' />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='w-full flex items-center justify-between space-x-1.5 sm:space-x-2 md:space-x-3'>
          <div className='rounded-full bg-neutral-800 items-center justify-center flex border border-neutral-700 p-1.5 sm:p-2 md:p-2.5 flex-shrink-0 cursor-not-allowed opacity-50'>
            <Plus className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-neutral-500' />
          </div>
          <div className='flex-1 rounded-full p-0.5 sm:p-1 md:p-1.5 bg-neutral-800 flex items-center justify-between min-h-[36px] sm:min-h-[40px] md:min-h-[44px]'>
            <div className="py-1.5 sm:py-2 md:py-2.5 rounded-full px-8 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-medium cursor-not-allowed opacity-50 text-neutral-500">
              Chat
            </div>
            <div className="px-8 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base cursor-not-allowed opacity-50 text-neutral-500">
              Preview
            </div>
          </div>
          <div id='popup' className='rounded-full bg-white items-center justify-center flex text-black border border-neutral-700 p-1.5 sm:p-2 md:p-2.5 flex-shrink-0 cursor-pointer' onClick={handlePageClick}>
            <ArrowUp className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center"
          onClick={handleClosePopup}
        >


          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          <div
            className="relative z-20 w-full max-w-md mx-auto flex flex-col justify-center items-center px-4"
            onClick={handlePopupContentClick}
          >


            <div className="border border-gray-700 bg-black/90 rounded-2xl px-10 p-6 md:px-16 border-b-0 w-full relative">
              {/* Close Button */}
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50"
              >
                ×
              </button>
              
              {/* Skeleton Loader or Video Content */}
              {!videoLoaded ? (
                <div className="animate-pulse">
                  {/* Video Skeleton */}
                  <div className="w-full max-w-sm mb-6 h-48 bg-gray-700 rounded-lg mx-auto"></div>
                  {/* Text Skeleton */}
                  <div className="text-center mb-8 space-y-3">
                    <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto"></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Video Above Popup */}
                  <video
                    className="w-full max-w-sm mb-6 rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/assets/cookingVideo.mp4" type="video/mp4" />
                  </video>
                  <div className="text-center mb-8 space-y-1.5">
                    <h1 className="text-white text-3xl font-semibold mb-2">We're Cooking</h1>
                    <span className="text-gray-400 text-sm">Stay tuned and get ready for something delicious!</span>
                  </div>
                </>
              )}
              
              {/* Hidden video for preloading */}
              <video
                className="hidden"
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src="/assets/cookingVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;