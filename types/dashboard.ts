// Project related types
export interface Project {
  id: string
  name: string
  customer: string
  status: 'planning' | 'in-progress' | 'completed' | 'cancelled'
  startDate: string
  endDate?: string
  budget: number
  actualCost?: number
  description?: string
  manager: string
}

// Customer related types
export interface Customer {
  id: string
  name: string
  contact: string
  phone: string
  email: string
  address: string
  totalProjects: number
  totalValue: number
  lastContact: string
}

// Quotation related types
export interface Quotation {
  id: string
  customer: string
  projectName: string
  amount: number
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  date: string
  validUntil: string
  items: QuotationItem[]
}

export interface QuotationItem {
  id: string
  name: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
}

// Inventory related types
export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  price: number
  supplier: string
  lastUpdated: string
  status: 'available' | 'low-stock' | 'out-of-stock'
  minStock: number
}

// User related types
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user'
  avatar?: string
  lastLogin: string
}

// Dashboard stats types
export interface DashboardStats {
  totalSales: number
  totalCustomers: number
  totalQuotations: number
  growthRate: number
}
