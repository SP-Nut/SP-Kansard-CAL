'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { PageHeader } from '@/components/Dashboard/PageHeader'
import { DataTable } from '@/components/Dashboard/DataTable'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  FiPlus, 
  FiSearch, 
  FiEye, 
  FiEdit3, 
  FiTrash2,
  FiPhone,
  FiMail
} from 'react-icons/fi'

// Mock data
const customers = [
  {
    id: 'C001',
    name: 'บริษัท ABC จำกัด',
    contact: 'คุณสมชาย',
    phone: '02-123-4567',
    email: 'somchai@abc.com',
    address: 'กรุงเทพฯ',
    totalProjects: 5,
    totalValue: '฿2,500,000',
    lastContact: '2025-07-19'
  },
  {
    id: 'C002',
    name: 'คุณสมหญิง มั่นคง',
    contact: 'คุณสมหญิง',
    phone: '081-234-5678',
    email: 'somying@email.com',
    address: 'นนทบุรี',
    totalProjects: 2,
    totalValue: '฿850,000',
    lastContact: '2025-07-18'
  },
  {
    id: 'C003',
    name: 'บริษัท XYZ จำกัด',
    contact: 'คุณวิไล',
    phone: '02-987-6543',
    email: 'wilai@xyz.com',
    address: 'สมุทรปราการ',
    totalProjects: 8,
    totalValue: '฿4,200,000',
    lastContact: '2025-07-17'
  }
]

const customerColumns = [
  { key: 'id', label: 'รหัส' },
  { key: 'name', label: 'ชื่อลูกค้า' },
  { key: 'contact', label: 'ผู้ติดต่อ' },
  {
    key: 'phone',
    label: 'โทรศัพท์',
    render: (value: string) => (
      <div className="flex items-center space-x-2">
        <FiPhone className="w-4 h-4 text-gray-400" />
        <span>{value}</span>
      </div>
    )
  },
  {
    key: 'email',
    label: 'อีเมล',
    render: (value: string) => (
      <div className="flex items-center space-x-2">
        <FiMail className="w-4 h-4 text-gray-400" />
        <span>{value}</span>
      </div>
    )
  },
  { key: 'totalProjects', label: 'โปรเจ็ค' },
  { key: 'totalValue', label: 'มูลค่ารวม' },
  {
    key: 'actions',
    label: 'การดำเนินการ',
    render: () => (
      <div className="flex items-center space-x-2">
        <button className="p-1 text-blue-600 hover:text-blue-800">
          <FiEye className="w-4 h-4" />
        </button>
        <button className="p-1 text-gray-600 hover:text-gray-800">
          <FiEdit3 className="w-4 h-4" />
        </button>
        <button className="p-1 text-red-600 hover:text-red-800">
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <PageHeader
        title="จัดการลูกค้า"
        description="รายการลูกค้าและข้อมูลการติดต่อ"
      >
        <Button>
          <FiPlus className="w-4 h-4 mr-2" />
          เพิ่มลูกค้าใหม่
        </Button>
      </PageHeader>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="ค้นหาลูกค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            ส่งออกข้อมูล
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">ลูกค้าทั้งหมด</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-green-600">23</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">ลูกค้าใหม่เดือนนี้</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-blue-600">89%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">อัตราความพึงพอใจ</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-purple-600">฿8.5M</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">มูลค่ารวมทั้งหมด</div>
        </div>
      </div>

      {/* Customer Table */}
      <DataTable
        columns={customerColumns}
        data={filteredCustomers}
        emptyMessage="ไม่พบลูกค้าที่ค้นหา"
      />
    </DashboardLayout>
  )
}
