import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {Register,Landing,Error,Dashboard} from "./Pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Dashboard />} />
        <Route path='Landing' element = {<Landing />} />
        <Route path='Register' element = {<Register />} />
        <Route path='*' element = {<Error />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={850}/>
    </BrowserRouter>
  );
}

export default App;
