import React from 'react';
import NavBar from './navbar';
import Footer from './footer';
import ProfileImage from './profileImage';
import SEO from './seo';

export default function Layout({ children }) {
  return (
    <>
      <SEO />
      <div className="container mx-auto sm:w-1/2">
        <ProfileImage />
        <NavBar />
      </div>
      <div className="w-full">
        <div className="container rounded-md border-2 border-blue-700 border-opacity-50 mx-auto p-4 lg:w-1/2 mt-2 py-6">
          {children}
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  )
}
