"use client"

import { useState } from "react"
import { Author } from "../types/Author"
import { validateAuthorName, validateBirthDate } from "../utils/validation"

interface AuthorFormProps {
  initialData?: Author
  onSubmit: (author: Author) => void
  isSubmitting?: boolean
}

export default function AuthorForm({
  initialData,
  onSubmit,
  isSubmitting = false
}: AuthorFormProps) {

  const [name, setName] = useState(initialData?.name || "")
  const [birthDate, setBirthDate] = useState(initialData?.birthDate || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [image, setImage] = useState(initialData?.image || "")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError(null)

    const nameValidation = validateAuthorName(name)
    if (!nameValidation.valid) {
      setError(nameValidation.error || "Error de validación")
      return
    }

    const dateValidation = validateBirthDate(birthDate)
    if (!dateValidation.valid) {
      setError(dateValidation.error || "Error de validación")
      return
    }

    onSubmit({
      name,
      birthDate,
      description,
      image
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-gray-900 rounded-lg"
      aria-describedby={error ? "form-error" : undefined}
    >

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-gray-300">
          Nombre
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!error}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="birthDate" className="text-sm text-gray-300">
          Fecha de nacimiento
        </label>

        <input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="image" className="text-sm text-gray-300">
          Imagen (URL)
        </label>

        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-indigo-500 focus:outline-none"
        />

        {image && (
          <div className="mt-2 overflow-hidden rounded-lg h-32">
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm text-gray-300">
          Descripción
        </label>

        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {error && (
        <p
          id="form-error"
          role="alert"
          className="text-sm text-red-400"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-lg bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>

    </form>
  )
}