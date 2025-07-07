import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const baseStyles =
    'w-full rounded-md border px-3 py-2 text-sm shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 placeholder:text-gray-400'
  const borderColor = error
    ? 'border-red-500 focus-visible:ring-red-500'
    : 'border-gray-300 focus-visible:ring-indigo-500'

  const classes = `${baseStyles} ${borderColor} ${className}`

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-600 mb-1">
          {label}
        </label>
      )}
      <input className={classes} {...props} />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}
