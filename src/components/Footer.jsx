import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className='py-5 sm:px-10 px-5'>
      <div className='screen-max-width'>
        <div>
          <p className='font-semibold text-gray text-xs'>More ways to shop: {" "}
            <span className='underline text-blue'>
            Find an apple store {" "}
            </span>
            or {" "}
            <span className='underline text-blue'>
            other retailer
            </span>{" "}
            near you.
          </p>
          <p className='font-semibold text-gray text-xs'>
            Or call 000800-040-1966
          </p>
        </div>
        <div className='bg-neutral-700 my-5 h-[1px] w-full' />
        <div className='flex md:flex-row flex-col md:item-center justify-between'>
          <p className='font-semibold text-gray text-xs'>Copyright @ 2024 Apple Inc. All rights reserver.</p>
          <div className='flex'>
            {footerLinks.map((link, i) => (
              <p key={link} className='font-semibold text-gray text-xs'>
                {link}{" "}
                {i !== footerLinks.length - 1 && (<span className='mx-2'> | </span>)}
              </p>
            ))}
          </div>
        </div>
        <p className='mt-5'>Clone by <a href="https://github.com/Safi100" target='_blank' className='text-blue'>Safi Nafi</a></p>
      </div>
    </footer>
  )
}

export default Footer