import React from 'react'

type Props = {
  id: string;
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
}

const FormField = ({ 
  id,
  type, 
  title, 
  state,
  placeholder,
  isTextArea,
  setState,
}: Props) => {
  return (
    <div className='flexStart flex-col w-full gap-2'>
      <label htmlFor={id} className='w-full text-gray-100'>{title}</label>
      
      {isTextArea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={state}
          required
          className='form_field-input'
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type || 'text'}
          placeholder={placeholder}
          value={state}
          required
          className='form_field-input'
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  )
}

export default FormField