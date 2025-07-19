'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { PageHeader } from '@/components/Dashboard/PageHeader'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { 
  FiDownload, 
  FiCalendar,
  FiTrendingUp,
  FiPieChart,
  FiBarChart,
  FiDollarSign
} from 'react-icons/fi'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('sales')
  const [dateRange, setDateRange] = useState('month')

  const reportTypes = [
    { value: 'sales', label: 'รายงานยอดขาย' },
    { value: 'customers', label: 'รายงานลูกค้า' },
    { value: 'inventory', label: 'รายงานสต็อก' },
    { value: 'projects', label: 'รายงานโปรเจ็ค' }
  ]

  const dateRanges = [
    { value: 'week', label: 'สัปดาห์นี้' },
    { value: 'month', label: 'เดือนนี้' },
    { value: 'quarter', label: 'ไตรมาสนี้' },
    { value: 'year', label: 'ปีนี้' },
    { value: 'custom', label: 'กำหนดเอง' }
  ]

  return (
    <DashboardLayout>
      <PageHeader
        title="รายงาน"
        description="สร้างและดาวน์โหลดรายงานต่างๆ"
      >
        <Button>
          <FiDownload className="w-4 h-4 mr-2" />
          ส่งออกรายงาน
        </Button>
      </PageHeader>

      {/* Report Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          เลือกประเภทรายงาน
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            options={reportTypes}
            label="ประเภทรายงาน"
          />
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            options={dateRanges}
            label="ช่วงเวลา"
          />
          <div className="flex items-end">
            <Button className="w-full">
              สร้างรายงาน
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <FiDollarSign className="w-8 h-8 text-green-600" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">รายงานยอดขาย</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">วิเคราะห์ยอดขายรายวัน/เดือน</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <FiTrendingUp className="w-8 h-8 text-blue-600" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">รายงานการเติบโต</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">แนวโน้มการเติบโตของธุรกิจ</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <FiPieChart className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">รายงานผลิตภัณฑ์</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">สัดส่วนยอดขายแต่ละผลิตภัณฑ์</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <FiBarChart className="w-8 h-8 text-yellow-600" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">รายงานลูกค้า</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">วิเคราะห์พฤติกรรมลูกค้า</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ยอดขายรายเดือน
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <FiBarChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                กราฟยอดขายรายเดือน
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            สัดส่วนผลิตภัณฑ์
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <FiPieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                กราฟวงกลมสัดส่วนผลิตภัณฑ์
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          รายงานล่าสุด
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <FiDollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">รายงานยอดขายเดือนกรกฎาคม</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">สร้างเมื่อ 2025-07-19</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <FiDownload className="w-4 h-4 mr-1" />
              ดาวน์โหลด
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <FiTrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">รายงานการเติบโตไตรมาส 2</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">สร้างเมื่อ 2025-07-15</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <FiDownload className="w-4 h-4 mr-1" />
              ดาวน์โหลด
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <FiPieChart className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">รายงานผลิตภัณฑ์ยอดนิยม</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">สร้างเมื่อ 2025-07-10</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <FiDownload className="w-4 h-4 mr-1" />
              ดาวน์โหลด
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
