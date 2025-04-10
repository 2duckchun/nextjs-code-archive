'use client'

import { getMultiPagePdf } from '@/actions/pdf'
import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// 워커 경로 (방법 ①: public 폴더에 복사해 두었다고 가정)
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export default function ReactPdfPromisePage() {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pdf, setPdf] = useState<string>('')

  useEffect(() => {
    setIsLoading(true)
    const file = getMultiPagePdf()
    file.then((res) => {
      console.log(res)
      setPdf(URL.createObjectURL(res))
      setIsLoading(false)
    })
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log(numPages)
    setNumPages(numPages)
  }

  function onDocumentLoadError(error: Error) {
    console.log('error', error)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center overflow-y-auto">
      <Document
        file={pdf}
        onLoadError={onDocumentLoadError}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              scale={1.5}
              key={`page_${i + 1}`}
              pageNumber={i + 1}
              className="mb-10 max-w-full shadow-md"
            />
          ))}
      </Document>
    </div>
  )
}
