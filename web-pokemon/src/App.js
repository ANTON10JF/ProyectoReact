import logo from './logo.svg';
import './App.css';
import {Header} from './layout/'
import { HomePage, Contact, NotFound, About } from './pages/';
import {BrowserRouter, Routes, Route, } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/not-found' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
