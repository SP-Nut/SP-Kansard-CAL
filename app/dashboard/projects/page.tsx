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
  FiCalendar,
  FiUser,
  FiDollarSign
} from 'react-icons/fi'

// Mock data
const projects = [
  {
    id: 'P001',
    name: 'โครงการโรงงานผลิตชิ้นส่วนยานยนต์',
    customer: 'บริษัท ABC จำกัด',
    manager: 'คุณสมชาย',
    status: 'in-progress',
    startDate: '2025-07-01',
    endDate: '2025-09-30',
    budget: 2500000,
    actualCost: 1200000,
    progress: 45
  },
  {
    id: 'P002',
    name: 'หลังคาบ้านพักอาศัย',
    customer: 'คุณสมหญิง มั่นคง',
    manager: 'คุณวิไล',
    status: 'completed',
    startDate: '2025-06-15',
    endDate: '2025-07-15',
    budget: 285000,
    actualCost: 275000,
    progress: 100
  },
  {
    id: 'P003',
    name: 'อาคารคลังสินค้า',
    customer: 'บริษัท XYZ จำกัด',
    manager: 'คุณสมศักดิ์',
    status: 'planning',
    startDate: '2025-08-01',
    endDate: '2025-11-30',
    budget: 4200000,
    actualCost: 0,
    progress: 0
  },
  {
    id: 'P004',
    name: 'หลังคาโรงจอดรถ',
    customer: 'คุณสมใจ ใจดี',
    manager: 'คุณมานะ',
    status: 'cancelled',
    startDate: '2025-06-01',
    endDate: null,
    budget: 150000,
    actualCost: 25000,
    progress: 10
  }
]

const projectColumns = [
  { key: 'id', label: 'รหัส' },
  { key: 'name', label: 'ชื่อโปรเจ็ค' },
  { key: 'customer', label: 'ลูกค้า' },
  { key: 'manager', label: 'ผู้จัดการ' },
  {
    key: 'status',
    label: 'สถานะ',
    render: (value: string) => {
      const statusColors = {
        'planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        'completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }
      const statusLabels = {
        'planning': 'วางแผน',
        'in-progress': 'ดำเนินการ',
        'completed': 'เสร็จสิ้น',
        'cancelled': 'ยกเลิก'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
          {statusLabels[value as keyof typeof statusLabels]}
        </span>
      )
    }
  },
  {
    key: 'progress',
    label: 'ความคืบหน้า',
    render: (value: number) => (
      <div className="flex items-center space-x-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400">{value}%</span>
      </div>
    )
  },
  {
    key: 'budget',
    label: 'งบประมาณ',
    render: (value: number) => `฿${value.toLocaleString()}`
  },
  { key: 'startDate', label: 'วันเริ่ม' },
  {
    key: 'actions',
    label: 'การดำเนินการ',
    render: () => (
      <div className="flex items-center space-x-2">
        <button className="p-1 text-blue-600 hover:text-blue-800" title="ดูรายละเอียด">
          <FiEye className="w-4 h-4" />
        </button>
        <button className="p-1 text-gray-600 hover:text-gray-800" title="แก้ไข">
          <FiEdit3 className="w-4 h-4" />
        </button>
        <button className="p-1 text-red-600 hover:text-red-800" title="ลบ">
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const statusOptions = [
    { value: 'all', label: 'สถานะทั้งหมด' },
    { value: 'planning', label: 'วางแผน' },
    { value: 'in-progress', label: 'ดำเนินการ' },
    { value: 'completed', label: 'เสร็จสิ้น' },
    { value: 'cancelled', label: 'ยกเลิก' }
  ]

  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'in-progress').length
  const completedProjects = projects.filter(p => p.status === 'completed').length
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="จัดการโปรเจ็ค"
        description="ติดตามและจัดการโปรเจ็คก่อสร้างทั้งหมด"
      >
        <Button>
          <FiPlus className="w-4 h-4 mr-2" />
          สร้างโปรเจ็คใหม่
        </Button>
      </PageHeader>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="ค้นหาโปรเจ็ค..."
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

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <FiCalendar className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalProjects}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">โปรเจ็คทั้งหมด</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <FiUser className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{activeProjects}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">กำลังดำเนินการ</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <FiCalendar className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{completedProjects}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">เสร็จสิ้นแล้ว</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <FiDollarSign className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-600">฿{totalBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">งบประมาณรวม</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Table */}
      <DataTable
        columns={projectColumns}
        data={filteredProjects}
        emptyMessage="ไม่พบโปรเจ็คที่ค้นหา"
      />
    </DashboardLayout>
  )
}
