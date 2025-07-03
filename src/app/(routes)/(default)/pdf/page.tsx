'use client'

import styles from './styles.module.css'

export default function PdfPage() {
  return (
    <div className={styles.container}>
      <iframe
        src="https://pdfobject.com/pdf/sample.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH"
        className={styles.pdfViewer}
        title="PDF Viewer"
        sandbox="allow-scripts"
      />
    </div>
  )
}
