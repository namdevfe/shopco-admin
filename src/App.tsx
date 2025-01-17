import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routers/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((item, index) => {
          const Component = item.component
          return <Route key={index} path={item.path} element={<Component />} />
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
