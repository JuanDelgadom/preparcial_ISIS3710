"use client"

import { useEffect, useState } from "react"
import { getAuthors, deleteAuthor } from "../../services/authorService"
import { Author } from "../../types/Author"
import Link from "next/link"

export default function AuthorsPage() {

  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAuthors()
  }, [])

  async function loadAuthors() {
    const data = await getAuthors()
    setAuthors(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await deleteAuthor(id)
    loadAuthors()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        Cargando autores...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Autores</h1>

        <Link
          href="create"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500 transition"
        >
          Crear Autor
        </Link>
      </div>

      {authors.length === 0 && (
        <p className="text-gray-400">No hay autores registrados.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {authors.map((author) => (

          <div
            key={author.id}
            className="rounded-xl bg-slate-800 p-6 shadow-lg flex flex-col justify-between"
          >

            <div>
              <h3 className="text-lg font-semibold mb-2">
                {author.name}
              </h3>

              {author.birthDate && (
                <p className="text-sm text-gray-400 mb-2">
                  {author.birthDate}
                </p>
              )}

              <p className="text-sm text-gray-300 line-clamp-3">
                {author.description}
              </p>
            </div>

            <div className="flex gap-3 mt-4">

              <Link
                href={`edit/${author.id}`}
                className="flex-1 text-center rounded-lg bg-slate-700 py-2 text-sm hover:bg-slate-600"
              >
                Editar
              </Link>

              <button
                onClick={() => handleDelete(author.id!)}
                className="flex-1 rounded-lg bg-red-600 py-2 text-sm hover:bg-red-500"
              >
                Eliminar
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}