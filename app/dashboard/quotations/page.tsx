'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { PageHeader } from '@/components/Dashboard/PageHeader'
import { DataTable } from '@/components/Dashboard/DataTable'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { 
  FiPlus, 
  FiSearch, 
  FiEye, 
  FiEdit3, 
  FiTrash2,
  FiDownload,
  FiSend
} from 'react-icons/fi'

// Mock data
const quotations = [
  {
    id: 'Q001',
    customer: 'บริษัท ABC จำกัด',
    projectName: 'โรงงานผลิตชิ้นส่วนยานยนต์',
    amount: '฿1,250,000',
    status: 'รอดำเนินการ',
    date: '2025-07-19',
    validUntil: '2025-08-19',
    items: 15
  },
  {
    id: 'Q002',
    customer: 'คุณสมชาย มั่นคง',
    projectName: 'หลังคาบ้านพักอาศัย',
    amount: '฿285,000',
    status: 'อนุมัติ',
    date: '2025-07-18',
    validUntil: '2025-08-18',
    items: 8
  },
  {
    id: 'Q003',
    customer: 'บริษัท XYZ จำกัด',
    projectName: 'อาคารคลังสินค้า',
    amount: '฿2,100,000',
    status: 'ร่าง',
    date: '2025-07-17',
    validUntil: '2025-08-17',
    items: 22
  },
  {
    id: 'Q004',
    customer: 'คุณสมหญิง ใจดี',
    projectName: 'หลังคาโรงจอดรถ',
    amount: '฿95,000',
    status: 'ปฏิเสธ',
    date: '2025-07-16',
    validUntil: '2025-08-16',
    items: 5
  }
]

const quotationColumns = [
  { key: 'id', label: 'รหัส' },
  { key: 'customer', label: 'ลูกค้า' },
  { key: 'projectName', label: 'โปรเจ็ค' },
  { key: 'amount', label: 'จำนวนเงิน' },
  { key: 'items', label: 'รายการ' },
  {
    key: 'status',
    label: 'สถานะ',
    render: (value: string) => {
      const statusColors = {
        'รอดำเนินการ': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        'อนุมัติ': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        'ร่าง': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        'ปฏิเสธ': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
          {value}
        </span>
      )
    }
  },
  { key: 'date', label: 'วันที่สร้าง' },
  { key: 'validUntil', label: 'หมดอายุ' },
  {
    key: 'actions',
    label: 'การดำเนินการ',
    render: (value: any, row: any) => (
      <div className="flex items-center space-x-2">
        <button className="p-1 text-blue-600 hover:text-blue-800" title="ดูรายละเอียด">
          <FiEye className="w-4 h-4" />
        </button>
        <button className="p-1 text-gray-600 hover:text-gray-800" title="แก้ไข">
          <FiEdit3 className="w-4 h-4" />
        </button>
        <button className="p-1 text-green-600 hover:text-green-800" title="ดาวน์โหลด PDF">
          <FiDownload className="w-4 h-4" />
        </button>
        {row.status === 'ร่าง' && (
          <button className="p-1 text-purple-600 hover:text-purple-800" title="ส่งให้ลูกค้า">
            <FiSend className="w-4 h-4" />
          </button>
        )}
        <button className="p-1 text-red-600 hover:text-red-800" title="ลบ">
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }
]

export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const statusOptions = [
    { value: 'all', label: 'สถานะทั้งหมด' },
    { value: 'ร่าง', label: 'ร่าง' },
    { value: 'รอดำเนินการ', label: 'รอดำเนินการ' },
    { value: 'อนุมัติ', label: 'อนุมัติ' },
    { value: 'ปฏิเสธ', label: 'ปฏิเสธ' }
  ]

  return (
    <DashboardLayout>
      <PageHeader
        title="ใบเสนอราคา"
        description="จัดการใบเสนอราคาและติดตามสถานะ"
      >
        <Button>
          <FiPlus className="w-4 h-4 mr-2" />
          สร้างใบเสนอราคา
        </Button>
      </PageHeader>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="ค้นหาใบเสนอราคา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
          <Button variant="outline">
            ส่งออกข้อมูล
          </Button>
        </div>
      </div>

      {/* Quotation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">ใบเสนอราคาทั้งหมด</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-yellow-600">8</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">รอดำเนินการ</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">อนุมัติแล้ว</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-blue-600">75%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">อัตราการอนุมัติ</div>
        </div>
      </div>

      {/* Quotation Table */}
      <DataTable
        columns={quotationColumns}
        data={filteredQuotations}
        emptyMessage="ไม่พบใบเสนอราคาที่ค้นหา"
      />
    </DashboardLayout>
  )
}
