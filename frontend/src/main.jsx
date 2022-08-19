import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Index } from './whitexicans'
import { BrowserRouter } from 'react-router-dom'
import { AppTheme } from './UI/theme/AppTheme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppTheme>
  <Index/>
  </AppTheme>
  </BrowserRouter>
)
