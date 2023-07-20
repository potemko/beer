import './App.css';
import AppLayout from './Compotents/layout/AppLayout';
import Card from './Compotents/Card/Card';
import Reciept from './Compotents/Reciept/Reciept';
import { Route, Routes } from 'react-router-dom';
import Author from './Compotents/Author/Author';



function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
      <Route index element={<Card/>} />
      <Route path="/reciept/:id" element={<Reciept/>}/>
      <Route path="/author" element={<Author/>}/>
      </Route>
    </Routes>
  );
}

export default App;
