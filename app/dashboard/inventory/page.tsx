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
  FiPackage,
  FiAlertTriangle
} from 'react-icons/fi'

// Mock data
const inventory = [
  {
    id: 'SKU001',
    name: 'หลังคาอะคริลิค Shinkolite รุ่น Prime หนา 10 มม.',
    category: 'หลังคาโปร่งแสง',
    quantity: 150,
    unit: 'ตร.ม.',
    price: 8350,
    supplier: 'บริษัท ชินโคไลท์',
    lastUpdated: '2025-07-19',
    status: 'พร้อมจำหน่าย',
    minStock: 50
  },
  {
    id: 'SKU002',
    name: 'หลังคาเหล็กเคลือบสี COLORBOND',
    category: 'หลังคาทึบแสง',
    quantity: 25,
    unit: 'ตร.ม.',
    price: 1250,
    supplier: 'บริษัท บลูสโคป',
    lastUpdated: '2025-07-18',
    status: 'สต็อกต่ำ',
    minStock: 30
  },
  {
    id: 'SKU003',
    name: 'รางน้ำสแตนเลส 6 นิ้ว',
    category: 'รางน้ำ',
    quantity: 80,
    unit: 'เมตร',
    price: 450,
    supplier: 'บริษัท เมทัล โปร',
    lastUpdated: '2025-07-17',
    status: 'พร้อมจำหน่าย',
    minStock: 20
  },
  {
    id: 'SKU004',
    name: 'ฝ้าอะลูมิเนียม 60x60 ซม.',
    category: 'ฝ้า',
    quantity: 0,
    unit: 'แผ่น',
    price: 185,
    supplier: 'บริษัท อลูมิเนียม ซัพพลาย',
    lastUpdated: '2025-07-16',
    status: 'หมดสต็อก',
    minStock: 100
  }
]

const inventoryColumns = [
  { key: 'id', label: 'รหัสสินค้า' },
  { key: 'name', label: 'ชื่อสินค้า' },
  { key: 'category', label: 'หมวดหมู่' },
  {
    key: 'quantity',
    label: 'คงเหลือ',
    render: (value: number, row: any) => (
      <div className="flex items-center space-x-2">
        <span>{value} {row.unit}</span>
        {value <= row.minStock && (
          <FiAlertTriangle className="w-4 h-4 text-red-500" />
        )}
      </div>
    )
  },
  {
    key: 'price',
    label: 'ราคา',
    render: (value: number) => `฿${value.toLocaleString()}`
  },
  {
    key: 'status',
    label: 'สถานะ',
    render: (value: string) => {
      const statusColors = {
        'พร้อมจำหน่าย': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        'สต็อกต่ำ': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        'หมดสต็อก': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
          {value}
        </span>
      )
    }
  },
  { key: 'supplier', label: 'ผู้จำหน่าย' },
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

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categoryOptions = [
    { value: 'all', label: 'หมวดหมู่ทั้งหมด' },
    { value: 'หลังคาโปร่งแสง', label: 'หลังคาโปร่งแสง' },
    { value: 'หลังคาทึบแสง', label: 'หลังคาทึบแสง' },
    { value: 'ฝ้า', label: 'ฝ้า' },
    { value: 'รางน้ำ', label: 'รางน้ำ' }
  ]

  const statusOptions = [
    { value: 'all', label: 'สถานะทั้งหมด' },
    { value: 'พร้อมจำหน่าย', label: 'พร้อมจำหน่าย' },
    { value: 'สต็อกต่ำ', label: 'สต็อกต่ำ' },
    { value: 'หมดสต็อก', label: 'หมดสต็อก' }
  ]

  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock && item.quantity > 0).length
  const outOfStockItems = inventory.filter(item => item.quantity === 0).length
  const totalItems = inventory.length
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="คลังสินค้า"
        description="จัดการสต็อกสินค้าและวัสดุก่อสร้าง"
      >
        <Button>
          <FiPlus className="w-4 h-4 mr-2" />
          เพิ่มสินค้าใหม่
        </Button>
      </PageHeader>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categoryOptions}
          />
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

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <FiPackage className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalItems}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">รายการสินค้า</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <FiAlertTriangle className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">สต็อกต่ำ</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <FiAlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">หมดสต็อก</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-green-600">฿{totalValue.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">มูลค่าสต็อกรวม</div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <FiAlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              คำเตือน: มีสินค้า {lowStockItems} รายการที่สต็อกต่ำ
            </h3>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
            กรุณาสั่งซื้อสินค้าเพิ่มเติมเพื่อไม่ให้เกิดการขาดแคลน
          </p>
        </div>
      )}

      {/* Inventory Table */}
      <DataTable
        columns={inventoryColumns}
        data={filteredInventory}
        emptyMessage="ไม่พบสินค้าที่ค้นหา"
      />
    </DashboardLayout>
  )
}
