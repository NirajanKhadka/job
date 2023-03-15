import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {Register,Landing,Error} from "./Pages";
import {SharedLayout, AddJob, AllJobs, Stats, Profile} from './Pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element = {<SharedLayout />} >
          <Route index element = {<Stats />} />
          <Route path='add-job' element = {<AddJob />} />
          <Route path='all-jobs' element = {<AllJobs />} />
          <Route path='profile' element = {<Profile />} />
        </Route>

        <Route path='landing' element = {<Landing />} />
        <Route path='register' element = {<Register />} />
        <Route path='*' element = {<Error />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={850}/>
    </BrowserRouter>
  );
}

export default App;
