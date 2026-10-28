import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// limpia entre pruebas
afterEach(() => {
  cleanup()
  localStorage.clear()
})
