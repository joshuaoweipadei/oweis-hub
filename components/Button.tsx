import { MouseEventHandler } from 'react';
import Image from 'next/image';

type Props = {
  title: string,
  leftIcon?: string | null,
  rightIcon?: string | null,
  handleClick?: MouseEventHandler,
  isSubmitting?: boolean | false,
  type?: 'button' | 'submit',
  bgColor?: string,
  textColor?: string
}

const Button = ({ 
  type,
  title,
  leftIcon,
  rightIcon,
  isSubmitting,
  handleClick,
  bgColor,
  textColor,
}: Props) => {
  return (
    <button
      type={type}
      disabled={isSubmitting || false}
      className={`flexCenter gap-3 px-4 py-3 
      ${textColor ? textColor : 'text-white'} 
      ${isSubmitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left icon" />}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right icon" />}
    </button>
  )
}

export default Button