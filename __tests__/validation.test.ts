import { validateAuthorName, validateBirthDate } from '../utils/validation'

describe('Validación de Autores', () => {
  describe('validateAuthorName', () => {
    it('debe rechazar nombres vacíos', () => {
      const result = validateAuthorName('')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('El nombre es obligatorio')
    })

    it('debe rechazar nombres con solo espacios', () => {
      const result = validateAuthorName('   ')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('El nombre es obligatorio')
    })

    it('debe rechazar nombres muy cortos', () => {
      const result = validateAuthorName('J')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('El nombre debe tener al menos 2 caracteres')
    })

    it('debe rechazar nombres con números', () => {
      const result = validateAuthorName('John123')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('El nombre no debe contener números')
    })

    it('debe aceptar nombres válidos', () => {
      const result = validateAuthorName('J.K. Rowling')
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('debe aceptar nombres con espacios válidos', () => {
      const result = validateAuthorName('Stephen King')
      expect(result.valid).toBe(true)
    })
  })

  describe('validateBirthDate', () => {
    it('debe permitir fechas de nacimiento vacías', () => {
      const result = validateBirthDate('')
      expect(result.valid).toBe(true)
    })

    it('debe rechazar fechas inválidas', () => {
      const result = validateBirthDate('fecha-invalida')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Fecha inválida')
    })

    it('debe rechazar fechas en el futuro', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      const result = validateBirthDate(futureDate.toISOString().split('T')[0])
      expect(result.valid).toBe(false)
      expect(result.error).toBe('La fecha de nacimiento no puede ser en el futuro')
    })

    it('debe aceptar fechas válidas del pasado', () => {
      const result = validateBirthDate('1965-07-31')
      expect(result.valid).toBe(true)
    })
  })
})
