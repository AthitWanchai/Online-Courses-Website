
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Navbar from "./components/Navbar"
import Python from './pages/Python'
import Data from './pages/Data'
import Machine from './pages/Machine'
import Web from './pages/Web'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/course/python' element={<Python />} /> {/* เส้นทางเฉพาะสำหรับ Python */}
        <Route path='/course/web' element={<Web />} /> {/* เส้นทางเฉพาะสำหรับ Web Development */}
        <Route path='/course/machine' element={<Machine />} /> {/* เส้นทางเฉพาะสำหรับ Machine Learning */}
        <Route path='/course/data' element={<Data />} /> {/* เส้นทางเฉพาะสำหรับ Data Science */}
      </Routes>
    </>
  )
}

export default App
