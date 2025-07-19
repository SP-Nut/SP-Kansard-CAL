'use client'

import React from 'react'

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  placeholder?: string
  error?: string
  fullWidth?: boolean
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  placeholder,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const baseStyles =
    'rounded-md px-4 py-2 text-base border bg-white focus:outline-none focus:border-blue-500 placeholder:text-gray-400 border-gray-300'

  const borderColor = error
    ? 'border-red-500 focus:border-red-600'
    : 'border-gray-300'

  const width = fullWidth ? 'w-full' : ''
  const classes = `${baseStyles} ${borderColor} ${width} ${className}`

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-base font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select className={classes} {...props}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 mt-1 font-medium">{error}</p>
      )}
    </div>
  )
}
