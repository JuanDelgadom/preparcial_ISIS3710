"use client"

import { useEffect, useState } from "react"
import { getAuthors, deleteAuthor } from "../../services/authorService"
import { Author } from "../../types/Author"
import Link from "next/link"

export default function AuthorsPage() {

  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)


  const[searchTerm, setSearchTerm] = useState("")
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
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Cargando autores...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Autores</h1>

        <Link
          href="crear"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500 transition"
        >
          Crear Autor
        </Link>
      </div>

      {authors.length === 0 && (
        <p className="text-gray-400">No hay autores registrados.</p>
      )}

      {authors.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar autores por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition"
          />
        </div>
      )}

      {(() => {
        const filteredAuthors = authors.filter((author) =>
          author.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

        if (filteredAuthors.length === 0 && authors.length > 0) {
          return (
            <p className="text-gray-400 text-center py-8">
              No se encontraron autores con &quot;{searchTerm}&quot;
            </p>
          )
        }

        return (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {filteredAuthors.map((author) => (

          <div
            key={author.id}
            className="rounded-xl bg-gray-900 p-6 shadow-lg flex flex-col justify-between"
          >

            {author.image && (
              <div className="mb-4 overflow-hidden rounded-lg h-48">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

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
                className="flex-1 text-center rounded-lg bg-gray-800 py-2 text-sm hover:bg-gray-700"
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
        )
      })()}

    </div>
  )
}