"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthorForm from "../../components/AuthorForm"
import { createAuthor } from "../../services/authorService"
import { Author } from "../../types/Author"

export default function CreatePage() {

  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate(author: Author) {
    try {
      setSaving(true)
      await createAuthor(author)
      router.push("/authors")
    } catch {
      setError("Error creando el autor")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">

      <div className="w-full max-w-md rounded-2xl bg-gray-900 shadow-xl">

        <div className="border-b border-gray-800 px-6 py-5">
          <h1 className="text-xl font-semibold text-white">
            Crear Autor
          </h1>
        </div>

        {error && (
          <div className="px-6 pt-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <AuthorForm
          onSubmit={handleCreate}
          isSubmitting={saving}
        />

        <div className="px-6 pb-6">
          <button
            onClick={() => router.push("/authors")}
            className="w-full rounded-lg border border-gray-800 bg-black px-4 py-2 text-sm text-white hover:bg-gray-900 transition"
          >
            Volver
          </button>
        </div>

      </div>

    </div>
  )
}