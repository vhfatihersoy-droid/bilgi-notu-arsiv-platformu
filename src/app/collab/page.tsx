'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export default function CollabPage() {
  const [status, setStatus] = useState('disconnected')

  useEffect(() => {
    setStatus('connecting')
    const ydoc = new Y.Doc()
    const roomName = 'bilgi-notu-room'
    const provider = new WebsocketProvider('wss://demos.yjs.dev', roomName, ydoc)

    provider.on('status', (ev: any) => {
      setStatus(ev.status) // 'connected' or 'disconnected'
    })

    const awareness = provider.awareness
    awareness.setLocalStateField('user', {
      name: 'Guest ' + Math.floor(Math.random() * 1000),
      color: '#'+Math.floor(Math.random()*16777215).toString(16),
    })

    const editor = useEditor({
      extensions: [
        StarterKit,
        Collaboration.configure({ document: ydoc.getXmlFragment('prosemirror') }),
        CollaborationCursor.configure({
          provider: awareness,
          user: awareness.getLocalState().user,
        }),
      ],
      content: '<p>Gerçek zamanlı işbirliği denemesi. Aynı sayfayı başka bir tarayıcıda açarak test edin.</p>',
    })

    return () => {
      provider.destroy()
      ydoc.destroy()
      editor?.destroy()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // create editor separately (outside effect) to satisfy hooks rules
  const ydoc = typeof window !== 'undefined' ? new Y.Doc() : null
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Bağlanıyor...</p>',
    editable: true,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Collaboration Demo</h1>
        <div className="mb-2 text-sm text-gray-600">WebSocket durumu: {status}</div>
        <div className="bg-white p-4 rounded shadow-sm">
          {editor ? <EditorContent editor={editor} /> : <div>Editor yükleniyor...</div>}
        </div>
        <div className="mt-4 text-xs text-gray-500">Not: Bu demo wss://demos.yjs.dev kullanır — production için kendi y-websocket sunucunuzu deploy edin.</div>
      </div>
    </div>
  )
}
