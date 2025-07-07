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
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  placeholder,
  error,
  className = '',
  ...props
}) => {
  const baseStyles =
    'w-full rounded-md border px-3 py-2 text-sm shadow-sm transition bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 placeholder:text-gray-400'

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
      <select className={classes} {...props}>
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
