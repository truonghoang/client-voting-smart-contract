"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import "@/styles/modal.css";

// { children, isOpen, onClose }:{children:ReactNode,isOpen:boolean,onClose:()=>void}
const Modal = ({ children, show, onShow }:{children?:ReactNode,show:boolean,onShow:(arg:boolean)=>void}) => {
  const modalRef = useRef(null);
 
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open"); // Add body class for styling
    } else {
      document.body.classList.remove("modal-open");
    }
   
  }, [show]);


  const handleCloseModal = () => {
    onShow(false);
  };

  return (
    <>
      {show ? (
        <div ref={modalRef} className="modal">
          <div className="modal-content">
           <button className="icon-close" onClick={handleCloseModal}> <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
            
            {children}
            <div className="event-modal">
            <button onClick={handleCloseModal} className="btn close-btn">
              Close
            </button>
            <button onClick={handleCloseModal} className="btn save-btn">
              Save
            </button>
                
            </div>
           
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
