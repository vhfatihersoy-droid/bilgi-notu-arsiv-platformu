'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Editor({ noteId }: { noteId: string }) {
  const storageKey = `note-${noteId}`
  const [value, setValue] = useState('')

  useEffect(() => {
    const v = localStorage.getItem(storageKey)
    if (v) setValue(v)
  }, [storageKey])

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(storageKey, value)
    }, 500)
    return () => clearTimeout(id)
  }, [value, storageKey])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Başlık" />
        <textarea
          className="w-full h-72 p-2 border rounded font-mono"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Markdown içeriğini buraya yazın..."
        />
      </div>

      <div>
        <div className="mb-2 p-2 border rounded bg-gray-50">Önizleme</div>
        <div className="prose max-w-none p-4 border rounded bg-white h-72 overflow-auto">
          <ReactMarkdown>{value || 'Henüz içerik yok.'}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
