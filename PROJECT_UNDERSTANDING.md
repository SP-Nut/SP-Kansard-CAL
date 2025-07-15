# SP-Kansard-CAL Project Understanding
## ความเข้าใจโปรเจ็ค SP-Kansard-CAL

### Project Overview / ภาพรวมโปรเจ็ค

**SP-Kansard-CAL** เป็นระบบคำนวณราคาวัสดุก่อสร้างแบบออนไลน์ที่พัฒนาด้วย Next.js 15 และ TypeScript โดยเฉพาะอย่างยิ่งเป็นเครื่องมือคำนวณราคาสำหรับ:

- **หลังคา** (Roofing materials)
- **ฝ้า** (Ceiling materials) 
- **ระแนง** (Louver materials)
- **งานเสริมต่างๆ** (Additional construction services)

### Key Features / ฟีเจอร์หลัก

#### 1. Material Selection / การเลือกวัสดุ
- **วัสดุโปร่งแสง (Translucent Materials)**: 
  - หลังคาอะคริลิค Shinkolite รุ่นต่างๆ
  - หลังคาโพลีชีทตัน
  - หลังคาไฟเบอร์กลาส
  - หลังคาโพลีคาร์บอเนต
  
- **วัสดุทึบแสง (Opaque Materials)**:
  - หลังคาเมทัลชีทลอนคลื่น
  - หลังคาเมทัลชีทลอนเรียบ
  - หลังคาเมทัลชีทลอนอิฐ

#### 2. Structure Size Options / ตัวเลือกขนาดโครงสร้าง
- **M**: โครงสร้างขนาดเล็ก
- **M+**: โครงสร้างขนาดเล็กพลัส
- **L**: โครงสร้างขนาดใหญ่
- **L+**: โครงสร้างขนาดใหญ่พลัส
- **Stainless_S**: โครงสร้างสเตนเลสขนาดเล็ก
- **Stainless_M**: โครงสร้างสเตนเลสขนาดกลาง

#### 3. Dimension Input / การระบุขนาด
- **ความกว้าง (Width)**: ระบุเป็นเมตร
- **ความยาว (Length)**: ระบุเป็นเมตร
- **พื้นที่รวม**: คำนวณอัตโนมัติ (ตร.ม.)

#### 4. Additional Services / บริการเพิ่มเติม
- **งานฝ้า (Ceiling Work)**: เพิ่มการติดตั้งฝ้า
- **งานระแนง (Louver Work)**: เพิ่มการติดตั้งระแนง
- **งานรางน้ำ (Gutter Work)**: เพิ่มระบบระบายน้ำ
- **งานไฟฟ้า (Electrical Work)**: เพิ่มระบบไฟฟ้า
- **งานราวกันตก (Railing Work)**: เพิ่มระบบรั้วกันตก
- **งานระบายอากาศ (Ventilation Work)**: เพิ่มระบบระบายอากาศ
- **เสา (Posts)**: เพิ่มเสาโครงสร้าง
- **ฐานราก (Foundations)**: เพิ่มงานฐานราก
- **สี (Colors)**: เพิ่มงานทาสี

### Technical Architecture / สถาปัตยกรรมเทคนิค

#### Technology Stack / เทคโนโลยีที่ใช้
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom React components
- **Analytics**: Vercel Analytics
- **Build Tool**: Turbopack
- **Font**: Geist (Google Fonts)

#### Project Structure / โครงสร้างโปรเจ็ค
```
/app                 # Next.js App Router pages
  ├── page.tsx       # Main homepage
  ├── layout.tsx     # Root layout
  ├── globals.css    # Global styles
  └── FormToPDF.tsx  # PDF generation component

/components          # React components
  ├── MaterialCalculator/  # Main calculator components
  ├── ThemeProvider.tsx   # Theme context
  ├── ThemeToggle.tsx     # Theme switcher
  └── ui/                 # UI components

/data               # Static data and pricing
  ├── materials.ts    # Material definitions and pricing
  ├── ceilings.ts     # Ceiling options
  ├── louvers.ts      # Louver options
  ├── gutters.ts      # Gutter options
  ├── electricity.ts  # Electrical options
  ├── railingExtras.ts # Railing options
  ├── ventilators.ts  # Ventilation options
  ├── posts.ts        # Post options
  ├── foundations.ts  # Foundation options
  └── colors.ts       # Color options

/types              # TypeScript type definitions
  └── index.ts        # All type definitions

/utils              # Utility functions
  └── calculations.ts # Price calculation logic
```

### Key Components / คอมโพเนนต์หลัก

#### 1. MaterialCalculator (Main Component)
- **Purpose**: คอมโพเนนต์หลักที่รวมทุกฟีเจอร์
- **Features**: 
  - Material selection
  - Dimension input
  - Additional options
  - Price calculation
  - Result display

#### 2. MaterialSelector
- **Purpose**: เลือกประเภทวัสดุและขนาดโครงสร้าง
- **Features**:
  - Toggle between translucent/opaque materials
  - Material dropdown selection
  - Structure size selection

#### 3. DimensionInput
- **Purpose**: รับค่าขนาดพื้นที่
- **Features**:
  - Width/Length input
  - Real-time area calculation
  - Validation

#### 4. AdditionalOptions
- **Purpose**: เลือกบริการเพิ่มเติม
- **Features**:
  - Checkbox toggles for each service
  - Dynamic dropdown selections
  - Conditional rendering

#### 5. PriceDisplay & ResultDisplay
- **Purpose**: แสดงผลราคาและสรุป
- **Features**:
  - Real-time price updates
  - Detailed cost breakdown
  - Total price calculation

### Data Structure / โครงสร้างข้อมูล

#### Material Interface
```typescript
interface Material {
  id: number
  name: string
  prices: {
    M: number
    'M+': number
    L: number
    'L+': number
    Stainless_S: number | null
    Stainless_M: number
  }
}
```

#### Calculation Result
```typescript
interface CalculationResult {
  materialCost: number
  ceilingCost?: number
  louverCost?: number
  gutterCost?: number
  electricityCost?: number
  railingExtraCost?: number
  ventilatorCost?: number
  postCost?: number
  foundationCost?: number
  colorCost?: number
  totalCost: number
  area: number
  steps: string
}
```

### Business Logic / ตรรกะทางธุรกิจ

#### Price Calculation Process
1. **Base Cost**: Material cost × Area × Structure size multiplier
2. **Additional Costs**: Each optional service adds specific cost
3. **Final Total**: Sum of all selected services

#### Validation Rules
- Material must be selected
- Width and Length must be positive numbers
- Structure size must be compatible with selected material
- Optional services are calculated only if selected

### User Experience / ประสบการณ์ผู้ใช้

#### Workflow / ขั้นตอนการใช้งาน
1. **เลือกวัสดุ**: เลือกประเภทและชนิดวัสดุ
2. **ระบุขนาด**: กรอกความกว้างและความยาว
3. **เลือกบริการเพิ่มเติม**: เลือกงานเสริมที่ต้องการ
4. **คำนวณราคา**: กดปุ่มคำนวณเพื่อดูผลลัพธ์
5. **ดูสรุป**: ตรวจสอบรายละเอียดและราคารวม

#### UI/UX Features
- **Responsive Design**: รองรับทุกขนาดหน้าจอ
- **Real-time Updates**: อัปเดตราคาแบบเรียลไทม์
- **Input Validation**: ตรวจสอบข้อมูลที่กรอก
- **Clear Layout**: จัดวางแบบเข้าใจง่าย (70% form, 30% results)

### Target Users / กลุ่มเป้าหมาย

#### Primary Users
- **ผู้รับเหมาก่อสร้าง**: สำหรับประเมินราคางาน
- **สถาปนิก/วิศวกร**: สำหรับการออกแบบและประมาณราคา
- **เจ้าของโครงการ**: สำหรับเปรียบเทียบราคา

#### Use Cases
- **ประเมินราคาเบื้องต้น**: ก่อนการเสนอราคาจริง
- **เปรียบเทียบวัสดุ**: เลือกวัสดุที่เหมาะสม
- **การวางแผนงบประมาณ**: ประมาณค่าใช้จ่าย

### Current Status / สถานะปัจจุบัน

#### Working Features ✅
- Material selection system
- Price calculation engine
- Responsive UI layout
- Additional services integration
- Real-time updates

#### Known Issues ⚠️
- Google Fonts loading issues in build (network dependency)
- ESLint configuration needed
- No automated tests

#### Future Enhancements 🚀
- PDF quotation generation
- User authentication
- Price history tracking
- Multi-language support
- Mobile app version

### Conclusion / สรุป

**SP-Kansard-CAL** เป็นเครื่องมือคำนวณราคาวัสดุก่อสร้างที่มีประสิทธิภาพ ออกแบบมาเพื่อใช้งานง่าย มีฟีเจอร์ครบถ้วน และสามารถปรับแต่งได้ตามความต้องการ เหมาะสำหรับใช้ในธุรกิจก่อสร้างและการให้บริการประเมินราคา

The application successfully serves as a comprehensive construction material pricing calculator with a user-friendly interface, extensive material database, and flexible additional services system.