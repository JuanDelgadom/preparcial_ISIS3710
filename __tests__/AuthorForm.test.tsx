import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AuthorForm from '../components/AuthorForm'

describe('AuthorForm - Validación Autores', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('Debe mostrar error cuando el nombre está vacío', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />)
    const submitButton = screen.getByRole('button', { name: /Guardar/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('El nombre es obligatorio')
    })
  })

  it('Debe mostrar error específico cuando solo hay espacios en el nombre', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />)
    const nameInput = screen.getByLabelText(/Nombre/i)
    const submitButton = screen.getByRole('button', { name: /Guardar/i })

    fireEvent.change(nameInput, { target: { value: '   ' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('El nombre es obligatorio')
    })
  })


  it('Debe mostrar error cuando la fecha es en el futuro', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />)
    const nameInput = screen.getByLabelText(/Nombre/i)
    const birthDateInput = screen.getByLabelText(/Fecha de nacimiento/i)
    const submitButton = screen.getByRole('button', { name: /Guardar/i })

    fireEvent.change(nameInput, { target: { value: 'Stephen King' } })
    
    const futureDate = new Date()
    futureDate.setFullYear(futureDate.getFullYear() + 1)
    const futureDateString = futureDate.toISOString().split('T')[0]
    fireEvent.change(birthDateInput, { target: { value: futureDateString } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('La fecha de nacimiento no puede ser en el futuro')
    })
  })

  it('El botón debe estar habilitado inicialmente', () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />)
    const submitButton = screen.getByRole('button', { name: /Guardar/i })

    expect(submitButton).not.toBeDisabled()
  })

  it('El botón debe estar deshabilitado durante el envío', () => {
    render(<AuthorForm onSubmit={mockOnSubmit} isSubmitting={true} />)
    const submitButton = screen.getByRole('button', { name: /Guardando.../i })

    expect(submitButton).toBeDisabled()
  })

  it('El botón no permite envío si el nombre es inválido', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />)
    const nameInput = screen.getByLabelText(/Nombre/i)
    const submitButton = screen.getByRole('button', { name: /Guardar/i })

    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('El botón permite envío solo cuando todos los datos son válidos', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />)
    const nameInput = screen.getByLabelText(/Nombre/i)
    const submitButton = screen.getByRole('button', { name: /Guardar/i })

    fireEvent.change(nameInput, { target: { value: 'Stephen King' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })
  })

  it('El error debe desaparecer cuando se corrigen los datos', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />)
    const nameInput = screen.getByLabelText(/Nombre/i)
    const submitButton = screen.getByRole('button', { name: /Guardar/i })

    // Crear error
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    // Corregir error
    fireEvent.change(nameInput, { target: { value: 'Stephen King' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('Flujo de Éxito - Datos Válidos', () => {
    it('Debe limpiar el mensaje de error cuando se ingresa un nombre válido', async () => {
      render(<AuthorForm onSubmit={mockOnSubmit} />)
      const nameInput = screen.getByLabelText(/Nombre/i)
      const submitButton = screen.getByRole('button', { name: /Guardar/i })

      // Primero generar error
      fireEvent.click(submitButton)
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      // Ingresar nombre válido
      fireEvent.change(nameInput, { target: { value: 'J.K. Rowling' } })
      
      // Hacer click para ejecutar validación
      fireEvent.click(submitButton)

      // El error debe desaparecer
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    it('El botón debe estar habilitado cuando el nombre es válido', async () => {
      render(<AuthorForm onSubmit={mockOnSubmit} />)
      const nameInput = screen.getByLabelText(/Nombre/i)
      const submitButton = screen.getByRole('button', { name: /Guardar/i })

      fireEvent.change(nameInput, { target: { value: 'Stephen King' } })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })
    })

    it('El formulario debe llamar onSubmit cuando los datos son válidos', async () => {
      render(<AuthorForm onSubmit={mockOnSubmit} />)
      const nameInput = screen.getByLabelText(/Nombre/i)
      const submitButton = screen.getByRole('button', { name: /Guardar/i })

      fireEvent.change(nameInput, { target: { value: 'Stephen King' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Stephen King'
          })
        )
      })
    })

    it('Debe permitir envío con nombre y fecha válidos', async () => {
      render(<AuthorForm onSubmit={mockOnSubmit} />)
      const nameInput = screen.getByLabelText(/Nombre/i)
      const birthDateInput = screen.getByLabelText(/Fecha de nacimiento/i)
      const submitButton = screen.getByRole('button', { name: /Guardar/i })

      fireEvent.change(nameInput, { target: { value: 'Stephen King' } })
      fireEvent.change(birthDateInput, { target: { value: '1947-09-21' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    it('Debe enviar todos los campos cuando son válidos', async () => {
      render(<AuthorForm onSubmit={mockOnSubmit} />)
      const nameInput = screen.getByLabelText(/Nombre/i)
      const birthDateInput = screen.getByLabelText(/Fecha de nacimiento/i)
      const descriptionInput = screen.getByLabelText(/Descripción/i)
      const submitButton = screen.getByRole('button', { name: /Guardar/i })

      fireEvent.change(nameInput, { target: { value: 'Stephen King' } })
      fireEvent.change(birthDateInput, { target: { value: '1947-09-21' } })
      fireEvent.change(descriptionInput, { target: { value: 'Autor de horror' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Stephen King',
            birthDate: '1947-09-21',
            description: 'Autor de horror'
          })
        )
      })
    })

    it('La interfaz debe estar limpia después de envío exitoso', async () => {
      render(<AuthorForm onSubmit={mockOnSubmit} />)
      const nameInput = screen.getByLabelText(/Nombre/i)
      const submitButton = screen.getByRole('button', { name: /Guardar/i })

      fireEvent.change(nameInput, { target: { value: 'Stephen King' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(submitButton).not.toBeDisabled()
      })
    })
  })
})
