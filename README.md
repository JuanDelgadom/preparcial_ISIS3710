# Examen - Gestión de Autores

## Reuisitos 

- Node.js 18+ instalado
- npm o yarn como gestor de paquetes
- Git (opcional, para clonar el repositorio)

## Guía de Ejecución

# Instalar dependencias
npm install


 ## Ejecutar la Aplicación 

npm run dev

# La aplicación estará disponible en http://localhost:3000


### 3. Ejecutar la Suite de Pruebas

# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo vigilancia (watch mode)
npm run test:watch

# Ejecutar pruebas con cobertura
npx jest --coverage

## 🔧 Reporte de Cambios Técnicos

### Estrategia de Persistencia de Datos

La persistencia de datos entre rutas se logra mediante el servicio `authorService.ts`, que implementa un patrón de API mock basado en JSON. El flujo es el siguiente:

1. **Almacenamiento**: Los autores se almacenan en una colección interna del servicio que simula una base de datos en memoria.
2. **CRUD Operations**: Todas las operaciones (crear, leer, actualizar, eliminar) se realizan a través de funciones asincrónicas (`getAuthors()`, `getAuthor(id)`, `createAuthor()`, `updateAuthor()`, `deleteAuthor()`).
3. **Consistencia**: Cada página que necesita datos de autores llama a `getAuthors()`, garantizando que siempre obtiene la versión más reciente.
4. **Revalidación**: Después de operaciones de escritura (crear, editar, eliminar), la aplicación invoca `loadAuthors()` para refrescar el estado en memoria.

Esta arquitectura permite que los cambios realizados en una ruta (ej: crear en `/crear`) se reflejen inmediatamente en otras rutas (ej: listado en `/authors`).

### Sistema de Filtrado en Tiempo Real

El filtrado de autores se implemento:

1. **Un único estado**: Se mantiene un único estado `searchTerm` en el componente `AuthorsPage`.
2. **Cálculo directo durante renderizado**: El filtrado se realiza usando `.filter()` directamente en el JSX, sin crear un estado adicional para la lista filtrada.
3. **Case-Insensitive**: Se usan `.toLowerCase()` tanto en el nombre como en el término de búsqueda para lograr búsquedas insensibles a mayúsculas/minúsculas.
4. **Mensaje al usuario**: Si no hay resultados, se muestra un mensaje explícito: `"No se encontraron autores con '[término]'"`.



Esta estrategia es eficiente para listas pequeñas-medianas y mejora la experiencia de usuario al proporcionar resultados instantáneos.

## 🧪 Suite de Pruebas

La aplicación incluye **23 pruebas unitarias** divididas en dos grupos:

### Pruebas de Validación (`validation.test.ts`)

### Pruebas del Formulario (`AuthorForm.test.tsx`)

Para ejecutar las pruebas:
npm test
