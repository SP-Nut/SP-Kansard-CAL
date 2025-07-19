import React from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  }

  const changeClasses = {
    positive: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
    negative: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20',
    neutral: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${changeClasses[changeType]}`}>
              {change}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
