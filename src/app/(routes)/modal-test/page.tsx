'use client'

import { showModal } from '@/components/test/ModalManager'
import { FunctionComponent } from 'react'

interface ModalPageProps {}

const ModalPage: FunctionComponent<ModalPageProps> = ({}) => {
  const handleOpenModal1 = () => {
    showModal('커스텀 버튼 1', <p>1번 버튼 클릭 레스고</p>)
  }

  const handleOpenModal2 = () => {
    showModal('커스텀 버튼 2', <p>2번 버튼 클릭 레스고</p>)
  }

  return (
    <main>
      <button
        onClick={handleOpenModal1}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        1번 모달 오픈
      </button>
      <button
        onClick={handleOpenModal2}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        2번 모달 오픈
      </button>
    </main>
  )
}

export default ModalPage
