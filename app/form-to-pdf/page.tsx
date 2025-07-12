"use client";
import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'

export default function FormToPDF() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // สร้างข้อความ PDF จากข้อมูลที่กรอก
  const pdfText = `ชื่อ: ${name}\nอีเมล: ${email}`

  return (
    <React.Fragment>
      <form className="space-y-4 max-w-md mx-auto mt-10">
        <div>
          <label className="block mb-1 font-medium">ชื่อ</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="ชื่อ"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">อีเมล</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="อีเมล"
          />
        </div>
        <div>
          <Button
            pdfContent={pdfText}
            pdfTitle="ข้อมูลที่กรอกจากฟอร์ม"
            variant="primary"
            fullWidth
            type="button"
          >
            สร้าง PDF จากข้อมูลที่กรอก
          </Button>
        </div>
      </form>

      {/* โซนสรุปผลรวม/ราคาทั้งหมด */}
      <div className="mt-10 p-6 bg-white rounded shadow max-w-md mx-auto">
        <div className="mb-4">
          <div className="font-bold text-lg mb-2">ขั้นตอนการคำนวณ</div>
          <pre className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">{`วัสดุหลังคา: 5 × 4 × 2,650 = 53,000 บาท\n+ ฝ้า: 20.00 × 3,500 = 70,000 บาท\n\nรวมทั้งหมด: 123,000 บาท`}</pre>
        </div>
        <div className="mb-2">
          <span className="font-medium">พื้นที่ใช้งาน</span> <span className="text-blue-600 font-bold">20.00 ตารางเมตร</span>
        </div>
        <div className="mb-4">
          <span className="font-medium">ราคารวมทั้งหมด</span> <span className="text-2xl text-blue-700 font-bold">123,000 ฿</span>
        </div>
        <Button
          pdfContent={`ขั้นตอนการคำนวณ\n\nวัสดุหลังคา: 5 × 4 × 2,650 = 53,000 บาท\n+ ฝ้า: 20.00 × 3,500 = 70,000 บาท\n\nรวมทั้งหมด: 123,000 บาท\n\nพื้นที่ใช้งาน: 20.00 ตารางเมตร\nราคารวมทั้งหมด: 123,000 ฿`}
          pdfTitle="สรุปผลรวมและราคาทั้งหมด"
          variant="primary"
          fullWidth
          type="button"
        >
          บันทึก PDF โซนสรุปผลรวม
        </Button>
      </div>
    </React.Fragment>
  )
}
