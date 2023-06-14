import logo from './logo.svg';
import './App.css';
import {Header} from './layout/'
import { HomePage, Contact, NotFound, About } from './pages/';
import {BrowserRouter, Routes, Route, } from 'react-router-dom';
import Animals from './pages/Animals/Animals';
import Animal from './pages/Animale/Animal';


function App() {
  return (
    <BrowserRouter>
    <div id='container-app'>
      <Header/>
      <div id='container-body-app'>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/animals' element={<Animals/>}/>
            <Route path='/animals/animal/:id' element={<Animal/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/not-found' element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
