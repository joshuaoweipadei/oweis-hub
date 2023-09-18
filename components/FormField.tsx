import React from 'react'

type Props = {
  id: string;
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
  error?: string
}

const FormField = ({ 
  id,
  type, 
  title, 
  state,
  placeholder,
  isTextArea,
  setState,
  error,
}: Props) => {
  return (
    <div className='flex justify-start items-start flex-col w-full gap-2'>
      <label htmlFor={id} className='w-full text-gray-100'>{title}</label>
      
      {isTextArea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={state}
          // required
          className='form_field-input'
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type || 'text'}
          placeholder={placeholder}
          value={state}
          // required
          className='form_field-input'
          onChange={(e) => setState(e.target.value)}
        />
      )}
      {error && <div className="text-xs text-red-600">{error}</div>}
    </div>
  )
}

export default FormField