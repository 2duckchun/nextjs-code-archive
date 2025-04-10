'use server'

export async function getPdf() {
  const response = await fetch('https://pdfobject.com/pdf/sample.pdf')
  const blob = await response.blob()
  return blob
}
export async function getMultiPagePdf() {
  const response = await fetch(
    'https://sccrtc.org/wp-content/uploads/2010/09/SampleContract-Shuttle.pdf',
  )
  const blob = await response.blob()
  return blob
}
