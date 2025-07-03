'use client'

import { useEffect, useMemo, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

console.log(pdfjs.GlobalWorkerOptions.workerSrc)
console.log(import.meta.url)

export default function ReactPdfPage() {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    console.log(import.meta.url)
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url,
    ).toString()
  }, [])

  const file = useMemo(
    () => ({ url: 'https://pdfobject.com/pdf/sample.pdf' }),
    [],
  )

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
      <Page width={200} height={300} pageNumber={pageNumber} />
    </Document>
  )
}
