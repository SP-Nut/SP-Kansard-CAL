import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import type { CalculationResult } from '@/types'
import { formatPrice } from '@/utils/calculations'
interface ResultDisplayProps {
  result: CalculationResult | null;
  onDiscountChange?: (discount: number) => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onDiscountChange }) => {
  const [pdfText, setPdfText] = useState('');
  useEffect(() => {
    if (!result) return;
    let text = '';
    text += `ราคารวมทั้งหมด (โดยประมาณ): ${result.totalCost.toLocaleString()} ฿\n`;
    text += `พื้นที่ใช้งาน: ${result.area.toFixed(2)} ตารางเมตร\n`;
    text += '\n--- รายละเอียดค่าใช้จ่าย ---\n';
    if (result.materialCost) text += `ค่าวัสดุหลังคา: ${result.materialCost.toLocaleString()} ฿\n`;
    if (result.ceilingCost) text += `ค่าฝ้า: ${result.ceilingCost.toLocaleString()} ฿\n`;
    if (result.louverCost) text += `ค่าระแนง: ${result.louverCost.toLocaleString()} ฿\n`;
    if (result.gutterCost) text += `ค่ารางน้ำ: ${result.gutterCost.toLocaleString()} ฿\n`;
    if (result.electricityCost) text += `ค่าไฟฟ้า: ${result.electricityCost.toLocaleString()} ฿\n`;
    if (result.railingExtraCost) text += `ค่างานราวกันตก: ${result.railingExtraCost.toLocaleString()} ฿\n`;
    if (result.ventilatorCost) text += `ค่างานระบายอากาศ: ${result.ventilatorCost.toLocaleString()} ฿\n`;
    if (result.postCost) text += `ค่าเสา: ${result.postCost.toLocaleString()} ฿\n`;
    if (result.foundationCost) text += `ค่าฐานราก: ${result.foundationCost.toLocaleString()} ฿\n`;
    if (result.colorCost) text += `ค่าสี: ${result.colorCost.toLocaleString()} ฿\n`;
    text += '\n--- ขั้นตอนการคำนวณ ---\n';
    text += result.steps;
    setPdfText(text);
  }, [result]);


  if (!result) {
    return (
      <div className="bg-gray-50 rounded-xl shadow-sm p-8 border border-gray-200 text-center font-sans">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">ผลการคำนวณ</h3>
        <p className="text-base text-gray-500">กรุณากรอกข้อมูลให้ครบถ้วนแล้วกดคำนวณ</p>
      </div>
    )
  }

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center px-2 sm:px-0 bg-gray-50 font-sans">
      <div className="space-y-8 max-w-2xl mx-auto py-8">
        {/* Summary Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sm:p-8 text-center flex flex-col items-center gap-3 max-w-lg mx-auto transition-all">
          <h3 className="text-lg text-gray-700 font-semibold mb-2 tracking-tight">สรุปราคาทั้งหมด</h3>
          <div className="flex flex-col gap-2 w-full mt-2">
            <div className="flex justify-between text-base text-gray-600 w-full">
              <span>ราคารวม (ก่อนส่วนลด)</span>
              <span className="font-semibold text-gray-800">{formatPrice(result.totalCost)} ฿</span>
            </div>
            <div className="flex justify-between text-base w-full">
              <span>ส่วนลด</span>
              <span className="font-semibold text-green-500">- {formatPrice(result.discount)} ฿</span>
            </div>
            <div className="flex justify-between text-base w-full">
              <span>VAT ({result.vatRate}%)</span>
              <span className="font-semibold text-yellow-500">+ {formatPrice(result.vatAmount)} ฿</span>
            </div>
          </div>
          <div className="border-t border-gray-100 w-full my-3"></div>
          <div className="flex justify-between items-center w-full">
            <span className="text-base font-semibold text-gray-700">ราคาสุทธิ</span>
            <span className="text-xl font-bold text-blue-600">{formatPrice(result.grandTotal)} ฿</span>
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <span className="text-base text-gray-500">พื้นที่ใช้งาน</span>
            <span className="text-base font-semibold text-gray-700">{result.area.toFixed(2)} ตร.ม.</span>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-2 mt-6">
            <Button
              variant="ghost"
              size="md"
              className="w-full sm:w-auto border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100"
              pdfContent={pdfText}
              pdfTitle={`สรุปผลรวมและขั้นตอนการคำนวณ`}
            >
              ออกรายงาน PDF
            </Button>
          </div>
        </div>

        {/* Calculation Steps */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 max-w-lg mx-auto mt-6">
          <h3 className="text-base font-semibold text-gray-700 mb-2">รายละเอียดและขั้นตอนการคำนวณ</h3>
          <pre className="text-sm text-gray-700 whitespace-pre-line font-mono bg-gray-50 rounded-lg p-3 overflow-x-auto">
            {result.steps}
          </pre>
        </div>
      </div>
    </section>
  )
}
