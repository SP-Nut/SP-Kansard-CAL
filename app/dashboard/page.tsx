import React from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { PageHeader } from '@/components/Dashboard/PageHeader'
import { StatsCard } from '@/components/Dashboard/StatsCard'
import { DataTable } from '@/components/Dashboard/DataTable'
import { Button } from '@/components/ui/Button'
import { 
  FiDollarSign, 
  FiUsers, 
  FiFileText, 
  FiTrendingUp,
  FiPlus,
  FiEye,
  FiEdit3
} from 'react-icons/fi'

// Mock data
const stats = [
  {
    title: 'ยอดขายรวม',
    value: '฿2,450,000',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: <FiDollarSign className="w-6 h-6" />,
    color: 'green' as const
  },
  {
    title: 'ลูกค้า',
    value: '156',
    change: '+8',
    changeType: 'positive' as const,
    icon: <FiUsers className="w-6 h-6" />,
    color: 'blue' as const
  },
  {
    title: 'ใบเสนอราคา',
    value: '24',
    change: '+3',
    changeType: 'positive' as const,
    icon: <FiFileText className="w-6 h-6" />,
    color: 'purple' as const
  },
  {
    title: 'อัตราการเติบโต',
    value: '18.2%',
    change: '+2.4%',
    changeType: 'positive' as const,
    icon: <FiTrendingUp className="w-6 h-6" />,
    color: 'yellow' as const
  }
]

const recentQuotations = [
  {
    id: 'Q001',
    customer: 'บริษัท ABC จำกัด',
    amount: '฿125,000',
    status: 'รอดำเนินการ',
    date: '2025-07-19'
  },
  {
    id: 'Q002',
    customer: 'คุณสมชาย มั่นคง',
    amount: '฿85,000',
    status: 'อนุมัติ',
    date: '2025-07-18'
  },
  {
    id: 'Q003',
    customer: 'บริษัท XYZ จำกัด',
    amount: '฿200,000',
    status: 'รอดำเนินการ',
    date: '2025-07-17'
  }
]

const quotationColumns = [
  { key: 'id', label: 'รหัส' },
  { key: 'customer', label: 'ลูกค้า' },
  { key: 'amount', label: 'จำนวนเงิน' },
  {
    key: 'status',
    label: 'สถานะ',
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'อนุมัติ' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      }`}>
        {value}
      </span>
    )
  },
  { key: 'date', label: 'วันที่' },
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
      </div>
    )
  }
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="แดชบอร์ด"
        description="ภาพรวมระบบจัดการงานก่อสร้าง"
      >
        <Button>
          <FiPlus className="w-4 h-4 mr-2" />
          สร้างโปรเจ็คใหม่
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Quotations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            ใบเสนอราคาล่าสุด
          </h2>
          <Button variant="outline" size="sm">
            ดูทั้งหมด
          </Button>
        </div>
        <DataTable
          columns={quotationColumns}
          data={recentQuotations}
          emptyMessage="ไม่มีใบเสนอราคา"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            การดำเนินการด่วน
          </h3>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FiFileText className="w-4 h-4 mr-2" />
              สร้างใบเสนอราคา
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FiUsers className="w-4 h-4 mr-2" />
              เพิ่มลูกค้าใหม่
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FiDollarSign className="w-4 h-4 mr-2" />
              คำนวณราคา
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            กิจกรรมล่าสุด
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-900 dark:text-white">สร้างใบเสนอราคา Q003</p>
                <p className="text-gray-500 dark:text-gray-400">5 นาทีที่แล้ว</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-900 dark:text-white">อนุมัติใบเสนอราคา Q002</p>
                <p className="text-gray-500 dark:text-gray-400">1 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-900 dark:text-white">เพิ่มลูกค้าใหม่</p>
                <p className="text-gray-500 dark:text-gray-400">2 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            สถิติวันนี้
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">ใบเสนอราคาใหม่</span>
              <span className="font-semibold text-gray-900 dark:text-white">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">ลูกค้าใหม่</span>
              <span className="font-semibold text-gray-900 dark:text-white">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">ยอดขาย</span>
              <span className="font-semibold text-gray-900 dark:text-white">฿125,000</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
