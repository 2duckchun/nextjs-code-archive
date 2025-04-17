'use client'

import { useState } from 'react'

export default function SortableList() {
  const [items, setItems] = useState([
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
  ])

  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (
    e: React.DragEvent<HTMLLIElement>,
    overId: string,
  ) => {
    e.preventDefault()

    const dragIndex = items.findIndex((i) => i.id === draggedId)
    const overIndex = items.findIndex((i) => i.id === overId)

    if (dragIndex === -1 || overIndex === -1) return

    // dragIndex < overIndex면 "아래", 반대면 "위"
    const newIndex = dragIndex < overIndex ? overIndex + 1 : overIndex
    if (newIndex !== placeholderIndex) {
      setPlaceholderIndex(newIndex)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault()
    if (placeholderIndex === null) return

    const draggedItem = items.find((item) => item.id === draggedId)
    if (!draggedItem) return
    const filtered = items.filter((item) => item.id !== draggedId)
    const updated = [...filtered]

    updated.splice(placeholderIndex, 0, draggedItem)

    setItems(updated)
    setDraggedId(null)
    setPlaceholderIndex(null)
  }

  return (
    <ul onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {items.map((item, index) => (
        <div key={item.id}>
          {/* Placeholder 위치 */}
          {placeholderIndex === index && (
            <li
              style={{
                height: '40px',
                margin: '4px 0',
                background: '#d0ebff',
                border: '2px dashed #339af0',
                borderRadius: '4px',
              }}
            >
              Drop Here
            </li>
          )}

          <li
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            style={{
              border: '1px solid #ccc',
              margin: '4px 0',
              padding: '12px',
              background: '#fff',
              borderRadius: '4px',
              cursor: 'grab',
              opacity: draggedId === item.id ? 0.1 : 1,
            }}
          >
            {item.title}
          </li>
        </div>
      ))}
      {/* 리스트 마지막에 떨어질 때 placeholder */}
      {placeholderIndex === items.length && (
        <li
          style={{
            height: '40px',
            margin: '4px 0',
            background: '#d0ebff',
            border: '2px dashed #339af0',
            borderRadius: '4px',
          }}
        >
          Drop Here
        </li>
      )}
    </ul>
  )
}
