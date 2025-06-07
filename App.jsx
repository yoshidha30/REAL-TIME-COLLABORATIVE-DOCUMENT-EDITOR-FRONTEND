import { Routes, Route } from 'react-router-dom'
import Editor from './Editor'

function App() {
  return (
    <Routes>
      <Route path="/doc/:id" element={<Editor />} />
    </Routes>
  )
}

export default App
