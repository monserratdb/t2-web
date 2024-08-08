import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductFormPage from './pages/ProductFormPage/ProductFormPage';
import ProductPage from './pages/ProductPage/ProductPage';

function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<ProductsPage />}/>
        <Route path={"/product-form"} element={<ProductFormPage/>}/>
        <Route path={"/product/:id"} element={<ProductPage/>}/>
        <Route path={"/product-form/:id"} element={<ProductFormPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;