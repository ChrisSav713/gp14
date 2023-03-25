import React from 'react'

export default function FormTextArea(props) {
  let { name, value, desc, handler } = props

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {desc}
      </label>
      <div className='mt-1'>
        <textarea
          rows={4}
          name={name}
          id={name}
          className='block w-full bg-white rounded-md;
          border-width-4; border-gray-800; border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          value={value}
          onChange={handler}
        />
      </div>
    </div>
  )
}
