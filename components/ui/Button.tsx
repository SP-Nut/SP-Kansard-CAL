import React from 'react'
import { generatePDF } from '../../utils/pdf'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
  pdfContent?: string; // เพิ่ม prop สำหรับเนื้อหา PDF
  pdfTitle?: string;   // เพิ่ม prop สำหรับหัวข้อ PDF
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  pdfContent,
  pdfTitle,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 bg-white text-gray-900'

  const variants = {
    primary: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600',
    secondary: 'bg-white text-blue-500 border-blue-500 hover:bg-gray-100',
    outline: 'bg-transparent text-blue-500 border-blue-500 hover:bg-gray-50'
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2 text-lg',
    xl: 'px-6 py-3 text-xl'
  }

  const width = fullWidth ? 'w-full' : ''
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pdfContent) {
      try {
        // ป้องกันการคลิกซ้ำและตรวจสอบเนื้อหา
        if (!pdfContent.trim()) {
          alert('ไม่พบข้อมูลสำหรับบันทึก PDF');
          return;
        }
        generatePDF(pdfContent, pdfTitle);
        alert('บันทึก PDF สำเร็จ');
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการบันทึก PDF');
        console.error(error);
      }
    }
    if (props.onClick) {
      props.onClick(e);
    }
  }

  return (
    <button className={classes} {...props} onClick={handleClick}>
      {children}
    </button>
  )
}
