import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App userRole="client" />} />
          <Route path="/server" element={<App userRole="server" />} />
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
