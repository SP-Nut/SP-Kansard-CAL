'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiHome, 
  FiActivity, 
  FiUsers, 
  FiFileText, 
  FiBarChart, 
  FiSettings,
  FiMenu,
  FiX,
  FiFolder,
  FiDollarSign
} from 'react-icons/fi'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const sidebarItems = [
  { name: 'หน้าแรก', href: '/dashboard', icon: FiHome },
  { name: 'คำนวณราคา', href: '/dashboard/calculator', icon: FiActivity },
  { name: 'โปรเจ็ค', href: '/dashboard/projects', icon: FiFolder },
  { name: 'ลูกค้า', href: '/dashboard/customers', icon: FiUsers },
  { name: 'ใบเสนอราคา', href: '/dashboard/quotations', icon: FiFileText },
  { name: 'ยอดขาย', href: '/dashboard/sales', icon: FiDollarSign },
  { name: 'รายงาน', href: '/dashboard/reports', icon: FiBarChart },
  { name: 'ตั้งค่า', href: '/dashboard/settings', icon: FiSettings },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className="relative flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-42 h-30 flex items-center justify-center">
              <img 
                src="/logo-sp.png" 
                alt="SP Kansard Logo" 
                className="w-36 h-36 object-contain"
              />
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 absolute top-2 right-2"
          >
            <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Version 1.0.0
          </div>
        </div>
      </div>
    </>
  )
}
