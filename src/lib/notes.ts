import { supabase } from './supabaseClient'

export type Note = {
  id?: string
  title: string
  content: string
  tags?: string[]
  created_at?: string
  updated_at?: string
}

export async function createNote(note: Note) {
  const { data, error } = await supabase.from('notes').insert([{ ...note }]).select().single()
  if (error) throw error
  return data
}

export async function getNotes() {
  const { data, error } = await supabase.from('notes').select('*').order('updated_at', { ascending: false })
  if (error) throw error
  return data as Note[]
}

export async function getNote(id: string) {
  const { data, error } = await supabase.from('notes').select('*').eq('id', id).single()
  if (error) throw error
  return data as Note
}

export async function updateNote(id: string, updates: Partial<Note>) {
  const { data, error } = await supabase.from('notes').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteNote(id: string) {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) throw error
  return true
}
