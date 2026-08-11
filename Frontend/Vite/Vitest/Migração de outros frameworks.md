# Migração de outros frameworks

### [[Jest]] + [[React Testing Library]]

Como a maioria da API é similar é possível fazer a migração apenas mudando o caminho de importação.

```
// Before (Jest)
import { render, screen } from '@testing-library/react'

// After (Vitest)
import { render } from 'vitest-browser-react'
```