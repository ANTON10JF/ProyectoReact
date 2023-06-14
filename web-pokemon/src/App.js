import './App.css';
import { Header } from './layout/'
import { HomePage, Contact, NotFound, About, ProductsList, Product } from './pages/';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/products/product/:id' element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
