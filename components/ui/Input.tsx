import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const baseStyles =
    'rounded-md px-4 py-2 text-base border focus:outline-none focus:border-blue-500 placeholder:text-gray-400 bg-white border-gray-300'
  const borderColor = error
    ? 'border-red-500 focus:border-red-600'
    : 'border-gray-300 hover:border-blue-400'

  const width = fullWidth ? 'w-full' : ''
  const classes = `${baseStyles} ${borderColor} ${width} ${className}`

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-base font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input className={classes} {...props} />
      {error && (
        <p className="text-sm text-red-600 mt-1 font-medium">{error}</p>
      )}
    </div>
  )
}
