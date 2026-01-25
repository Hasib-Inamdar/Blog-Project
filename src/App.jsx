import { useState } from 'react'
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <ProtectedRoute></ProtectedRoute>
      </BrowserRouter>
    </>
  )
}

export default App
