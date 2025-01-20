import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import BlogPage from '~/pages/BlogPage'
import HomePage from '~/pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/blogs' element={<BlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
