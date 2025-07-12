import jsPDF from 'jspdf'

export function generatePDF(content: string, title?: string) {
  const doc = new jsPDF()
  let y = 20
  if (title) {
    doc.setFontSize(18)
    doc.text(title, 10, y)
    y += 10
    doc.setFontSize(12)
  }
  // รองรับการขึ้นบรรทัดใหม่
  const lines = doc.splitTextToSize(content, 180)
  doc.text(lines, 10, y)
  doc.save(title ? `${title}.pdf` : 'document.pdf')
}
