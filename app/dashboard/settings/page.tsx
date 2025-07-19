'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { PageHeader } from '@/components/Dashboard/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { ThemeToggle } from '@/components/ThemeToggle'
import { 
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiDollarSign,
  FiPercent,
  FiDatabase,
  FiShield,
  FiBell
} from 'react-icons/fi'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company')

  const tabs = [
    { id: 'company', name: 'ข้อมูลบริษัท', icon: FiUser },
    { id: 'pricing', name: 'การตั้งราคา', icon: FiDollarSign },
    { id: 'notifications', name: 'การแจ้งเตือน', icon: FiBell },
    { id: 'system', name: 'ระบบ', icon: FiDatabase },
    { id: 'security', name: 'ความปลอดภัย', icon: FiShield }
  ]

  const currencyOptions = [
    { value: 'THB', label: 'บาท (THB)' },
    { value: 'USD', label: 'ดอลลาร์ (USD)' },
    { value: 'EUR', label: 'ยูโร (EUR)' }
  ]

  const languageOptions = [
    { value: 'th', label: 'ไทย' },
    { value: 'en', label: 'English' }
  ]

  return (
    <DashboardLayout>
      <PageHeader
        title="ตั้งค่า"
        description="จัดการการตั้งค่าระบบและข้อมูลบริษัท"
      >
        <Button>
          <FiSave className="w-4 h-4 mr-2" />
          บันทึกการตั้งค่า
        </Button>
      </PageHeader>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            
            {/* Company Settings */}
            {activeTab === 'company' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ข้อมูลบริษัท
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="ชื่อบริษัท"
                    defaultValue="SP Kansard จำกัด"
                    placeholder="กรอกชื่อบริษัท"
                  />
                  <Input
                    label="เลขประจำตัวผู้เสียภาษี"
                    defaultValue="0123456789012"
                    placeholder="กรอกเลขประจำตัวผู้เสียภาษี"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="อีเมล"
                    type="email"
                    defaultValue="info@spkansard.com"
                    placeholder="กรอกอีเมลบริษัท"
                  />
                  <Input
                    label="โทรศัพท์"
                    defaultValue="02-123-4567"
                    placeholder="กรอกเบอร์โทรศัพท์"
                  />
                </div>

                <Input
                  label="ที่อยู่"
                  defaultValue="123 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110"
                  placeholder="กรอกที่อยู่บริษัท"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="เว็บไซต์"
                    defaultValue="https://www.spkansard.com"
                    placeholder="กรอกเว็บไซต์บริษัท"
                  />
                  <Select
                    label="สกุลเงิน"
                    options={currencyOptions}
                    defaultValue="THB"
                  />
                </div>
              </div>
            )}

            {/* Pricing Settings */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  การตั้งราคา
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="VAT (%)"
                    type="number"
                    defaultValue="7"
                    placeholder="อัตรา VAT"
                  />
                  <Input
                    label="ค่าจัดส่ง (บาท)"
                    type="number"
                    defaultValue="500"
                    placeholder="ค่าจัดส่งพื้นฐาน"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="ส่วนลดสูงสุด (%)"
                    type="number"
                    defaultValue="20"
                    placeholder="ส่วนลดสูงสุดที่อนุญาต"
                  />
                  <Input
                    label="ค่าบริการติดตั้ง (%)"
                    type="number"
                    defaultValue="15"
                    placeholder="เปอร์เซ็นต์ค่าติดตั้ง"
                  />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    การคำนวณราคาอัตโนมัติ
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                      <span className="text-gray-700 dark:text-gray-300">เพิ่มค่าแรงงานอัตโนมัติ</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                      <span className="text-gray-700 dark:text-gray-300">คำนวณค่าจัดส่งตามระยะทาง</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">แสดงราคาแยกตาม VAT</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  การแจ้งเตือน
                </h3>

                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      แจ้งเตือนทางอีเมล
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                        <span className="text-gray-700 dark:text-gray-300">ใบเสนอราคาใหม่</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                        <span className="text-gray-700 dark:text-gray-300">สต็อกสินค้าต่ำ</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">รายงานยอดขายรายสัปดาห์</span>
                      </label>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      แจ้งเตือนในระบบ
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                        <span className="text-gray-700 dark:text-gray-300">อัปเดตสถานะโปรเจ็ค</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                        <span className="text-gray-700 dark:text-gray-300">ลูกค้าใหม่</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">เตือนความจำใบเสนอราคาหมดอายุ</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ตั้งค่าระบบ
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="ภาษา"
                    options={languageOptions}
                    defaultValue="th"
                  />
                  <Input
                    label="จำนวนรายการต่อหน้า"
                    type="number"
                    defaultValue="20"
                    placeholder="จำนวนรายการ"
                  />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    ธีมและการแสดงผล
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">ธีมของระบบ</span>
                      <ThemeToggle showLabel />
                    </div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                      <span className="text-gray-700 dark:text-gray-300">ใช้ animation และ transition</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">แสดงผลโหมดประหยัดข้อมูล</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    การสำรองข้อมูล
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                      <span className="text-gray-700 dark:text-gray-300">สำรองข้อมูลอัตโนมัติรายวัน</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">ลบข้อมูลเก่าอัตโนมัติ (เก่ากว่า 2 ปี)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ความปลอดภัย
                </h3>

                <div className="space-y-4">
                  <Input
                    label="รหัสผ่านใหม่"
                    type="password"
                    placeholder="กรอกรหัสผ่านใหม่"
                  />
                  <Input
                    label="ยืนยันรหัสผ่าน"
                    type="password"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                  />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    การรักษาความปลอดภัย
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                      <span className="text-gray-700 dark:text-gray-300">เปิดใช้งาน Two-Factor Authentication</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                      <span className="text-gray-700 dark:text-gray-300">บันทึกประวัติการเข้าใช้งาน</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">ล็อกบัญชีอัตโนมัติหลังพยายามเข้าสู่ระบบผิด 5 ครั้ง</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    เซสชัน
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="ระยะเวลาเซสชัน (นาที)"
                      type="number"
                      defaultValue="60"
                      placeholder="ระยะเวลาก่อนออกจากระบบอัตโนมัติ"
                    />
                    <div className="flex items-end">
                      <Button variant="outline" className="w-full">
                        ออกจากระบบทุกอุปกรณ์
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
