// data/gutters.ts

export type GutterMaterial = 'stainless' | 'aluminum' | 'vinyl' | 'pvc'

export interface GutterItem {
  id: number
  label: string
  material: GutterMaterial
  price: number
}

export const gutters: GutterItem[] = [
  { id: 1, label: 'รางน้ำพิเศษ สำหรับหลังบ้าน (L1)', material: 'stainless', price: 2600 },
  { id: 2, label: 'รางน้ำพิเศษ สำหรับหลังบ้าน (L2)', material: 'stainless', price: 1600 },
  { id: 3, label: 'รางน้ำพิเศษ สำหรับหน้าบ้าน (L3)', material: 'stainless', price: 1500 },
  { id: 4, label: 'รางน้ำมาตรฐาน 6" เกรด 304', material: 'stainless', price: 850 },
  { id: 5, label: 'รางน้ำมาตรฐาน 5" เกรด 304', material: 'stainless', price: 700 },
  { id: 6, label: 'รางน้ำไวนิล VG (สีขาว)', material: 'vinyl', price: 900 },
  { id: 7, label: 'รางน้ำไวนิล VG 3" (สีขาว)', material: 'vinyl', price: 900 },
  { id: 8, label: 'รางน้ำไวนิล Lion (สีขาว)', material: 'vinyl', price: 700 },
  { id: 9, label: 'ท่อน้ำลงไวนิล Lion 3" (สีขาว)', material: 'vinyl', price: 700 },
  { id: 10, label: 'ท่อน้ำ PVC 3"', material: 'pvc', price: 550 },
]
