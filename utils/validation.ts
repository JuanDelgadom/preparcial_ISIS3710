/**
 * Función para validar que un nombre de autor sea válido
 * - No debe estar vacío
 * - Debe tener al menos 2 caracteres
 * - No debe contener números
 */
export function validateAuthorName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return {
      valid: false,
      error: "El nombre es obligatorio"
    }
  }

  if (name.trim().length < 2) {
    return {
      valid: false,
      error: "El nombre debe tener al menos 2 caracteres"
    }
  }

  if (/\d/.test(name)) {
    return {
      valid: false,
      error: "El nombre no debe contener números"
    }
  }

  return {
    valid: true
  }
}

/**
 * Función para validar que una fecha de nacimiento sea válida
 */
export function validateBirthDate(date: string): { valid: boolean; error?: string } {
  if (!date) {
    return {
      valid: true // La fecha de nacimiento es opcional
    }
  }

  const birthDate = new Date(date)
  const today = new Date()

  if (isNaN(birthDate.getTime())) {
    return {
      valid: false,
      error: "Fecha inválida"
    }
  }

  if (birthDate > today) {
    return {
      valid: false,
      error: "La fecha de nacimiento no puede ser en el futuro"
    }
  }

  return {
    valid: true
  }
}
