'use client'

import React from 'react'
import { FiBell, FiSearch, FiUser, FiMenu } from 'react-icons/fi'
import { ThemeToggle } from '@/components/ThemeToggle'

interface HeaderProps {
  onMenuClick: () => void
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="hidden md:flex relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหา..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-64"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Admin User</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">ผู้ดูแลระบบ</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
