'use client'

import { showModal } from '@/components/test/ModalManager'
import { FunctionComponent } from 'react'

interface ModalPageProps {}

const ModalPage: FunctionComponent<ModalPageProps> = ({}) => {
  const handleOpenModal1 = () => {
    showModal({
      title: '커스텀 버튼 1',
      content: <p>커스텀 버튼 1 테스트</p>,
      label: '버튼1 라벨',
      onClose: () => console.log('눌1리셨다.'),
    })
  }

  const handleOpenModal2 = () => {
    showModal({
      title: '커스텀 버튼 2',
      content: <p>커스텀 버튼 2 테스트</p>,
      label: '버튼2 라벨',
    })
  }

  console.log('메인 렌더링')

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
