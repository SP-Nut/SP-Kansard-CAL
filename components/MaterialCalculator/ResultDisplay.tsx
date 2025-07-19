import React from 'react'
import { Button } from '@/components/ui/Button'
import { CalculationResult } from '@/types'
import { formatPrice } from '@/utils/calculations'

interface ResultDisplayProps {
  result: CalculationResult | null
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [pdfText, setPdfText] = React.useState('');
  React.useEffect(() => {
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">ผลการคำนวณ</h3>
        <p className="text-base text-gray-500 dark:text-gray-400">กรุณากรอกข้อมูลให้ครบถ้วนแล้วกดคำนวณ</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Total Price Display */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-8 text-center">
        <h3 className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-2">ราคารวมทั้งหมด (โดยประมาณ)</h3>
        <div className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-400">
          {formatPrice(result.totalCost)} ฿
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">รายละเอียดค่าใช้จ่าย</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
            <span className="text-gray-700 dark:text-gray-300 text-lg">ค่าวัสดุหลังคา</span>
            <span className="font-semibold text-gray-900 dark:text-white text-lg">
              {formatPrice(result.materialCost)} ฿
            </span>
          </div>
          {result.ceilingCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่าฝ้า</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.ceilingCost)} ฿
              </span>
            </div>
          )}
          {result.louverCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่าระแนง</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.louverCost)} ฿
              </span>
            </div>
          )}
          {result.gutterCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่ารางน้ำ</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.gutterCost)} ฿
              </span>
            </div>
          )}
          {result.electricityCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่าไฟฟ้า</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.electricityCost)} ฿
              </span>
            </div>
          )}
          {result.railingExtraCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่างานราวกันตก</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.railingExtraCost)} ฿
              </span>
            </div>
          )}
          {result.ventilatorCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่างานระบายอากาศ</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.ventilatorCost)} ฿
              </span>
            </div>
          )}
          {result.postCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่าเสา</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.postCost)} ฿
              </span>
            </div>
          )}
          {result.foundationCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่าฐานราก</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.foundationCost)} ฿
              </span>
            </div>
          )}
          {result.colorCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 col-span-2">
              <span className="text-gray-700 dark:text-gray-300">ค่าสี</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatPrice(result.colorCost)} ฿
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center py-4 bg-gray-50 dark:bg-gray-700 rounded-lg px-6 mt-4">
          <span className="text-xl font-bold text-gray-800 dark:text-white">รวมทั้งหมด</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {formatPrice(result.totalCost)} ฿
          </span>
        </div>
      </div>

      {/* Calculation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">ขั้นตอนการคำนวณ</h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
          <pre className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono">
            {result.steps}
          </pre>
        </div>
      </div>

      {/* Area Info */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 text-center mb-4">
        <p className="text-base text-gray-500 dark:text-gray-400 font-medium">พื้นที่ใช้งาน</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          {result.area.toFixed(2)} ตารางเมตร
        </p>
      </div>
      {/* PDF Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="md"
          pdfContent={pdfText}
          pdfTitle={`สรุปผลรวมและขั้นตอนการคำนวณ`}
        >
          ออกรายงาน PDF
        </Button>
      </div>
    </div>
  )
}
