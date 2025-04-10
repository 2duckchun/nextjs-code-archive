'use client'

import { useMemo, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// 워커 경로 (방법 ①: public 폴더에 복사해 두었다고 가정)
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export default function ReactPdfPage() {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

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
      <Page height={1000} pageNumber={pageNumber} />
    </Document>
  )
}
