import logo from './logo.svg';
import './App.css';
import {Header} from './layout/'
import { HomePage, Contact, NotFound, About, Vehiculos } from './pages/';
import {BrowserRouter, Routes, Route, } from 'react-router-dom';
import Vehicles from './pages/Vehicles/Vehicles';
// import Vehicle from './pages/Vehicle/Vehicle';
import Vehicle from './pages/Vehicle/Vehicle';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/vehicles' element={<Vehicles/>}/>
          {/* <Route path='/vehicles/vehicle/:id' element={<Vehicle/>}/> */}
          <Route path='/vehicles/vehicle/:id' element={<Vehicle/>}></Route>
          <Route path='/not-found' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
