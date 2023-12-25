"use client"

import { CloseIcon } from "../svgIcons/SvgIcons"

export default function RightDrawer({ isOpen, onClose, children }) {
  return (
    <div className={`fixed z-50 top-0 right-0 w-full h-full ${isOpen ? 'visible' : 'invisible'}`}>
      <div className={`fixed z-50 top-0 right-0 bottom-0 left-0 bg-black opacity-70 ${isOpen ? 'visible' : 'invisible'}`} onClick={onClose}></div>
      <div className={`absolute z-50 pt-[20px] overflow-x-auto pb-8 top-0 right-0 h-full w-[350px] bg-white p-4 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-end">
            <CloseIcon onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}
