'use client'

import { getPdf } from '@/actions/pdf'
import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// 워커 경로 (방법 ①: public 폴더에 복사해 두었다고 가정)
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export default function ReactPdfPromisePage() {
  const [pageNumber, setPageNumber] = useState(1)
  const [pdf, setPdf] = useState<string>('')
  useEffect(() => {
    const file = getPdf()
    file.then((res) => {
      console.log(res)
      setPdf(URL.createObjectURL(res))
    })
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPageNumber(1)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page height={1000} pageNumber={pageNumber} />
      </Document>
    </div>
  )
}
