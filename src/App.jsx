import { useState } from 'react'
import './styles/App.css'
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import ScrollToHash from './utilities/ScrollToHash';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <ScrollToHash />
        <ProtectedRoute>

        </ProtectedRoute>
      </BrowserRouter>
    </>
  )
}

export default App
