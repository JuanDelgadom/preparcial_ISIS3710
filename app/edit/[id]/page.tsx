"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getAuthor, updateAuthor } from "../../../services/authorService"
import AuthorForm from "../../../components/AuthorForm"
import { Author } from "../../../types/Author"

export default function EditPage() {

  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [author, setAuthor] = useState<Author | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAuthor()
  }, [])

  async function loadAuthor() {
    try {
      const data = await getAuthor(id)
      setAuthor(data)
    } catch {
      setError("No se pudo cargar el autor")
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(updated: Author) {
    try {
      setSaving(true)
      await updateAuthor(id, updated)
      router.push("/authors")
    } catch {
      setError("Error actualizando el autor")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        Cargando autor...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">

      <div className="w-full max-w-md rounded-2xl bg-slate-800 shadow-xl">

        <div className="border-b border-slate-700 px-6 py-5">
          <h1 className="text-xl font-semibold text-white">
            Editar Autor
          </h1>
        </div>

        {author && (
          <AuthorForm
            initialData={author}
            onSubmit={handleUpdate}
            isSubmitting={saving}
          />
        )}

        <div className="px-6 pb-6">
          <button
            onClick={() => router.push("/authors")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700 transition"
          >
            Volver
          </button>
        </div>

      </div>

    </div>
  )
}