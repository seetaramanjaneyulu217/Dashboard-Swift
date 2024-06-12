import React from 'react'
import { InputBoxProps } from '../types'

const InputBox = ({ type, label, value }: InputBoxProps) => {
  return (
    <div className='flex flex-col gap-y-2 w-[70%] xl:w-[40%]'>
        <label className='text-[#4a5b77]'>{label}</label>
        <input readOnly type={type} value={value} className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-[#4a5b77] border border-[#f5f5f5] bg-[#f5f5f5] px-4 py-2 rounded-lg outline-none' />
    </div>
  )
}

export default InputBox