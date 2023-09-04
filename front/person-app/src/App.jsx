import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import People from './pages/People';
import Address from './pages/Address';
import SaveRecord from './pages/SaveRecord';
import SaveAddress from './pages/SaveAddress';
import Professor from './pages/Professor';
import Student from './pages/Student';

const rout = createBrowserRouter([
  {
    path: '/people',
    element: <People />
  },
  {
    path: '/professors',
    element: <Professor />
  },
  {
    path: '/students',
    element: <Student />
  },
  {
    path: '/new',
    element: <SaveRecord />
  },
  {
    path: '/new-address',
    element: <SaveAddress />
  },
  {
    path: '/address',
    element: <Address />
  },
  {
    path: '/',
    element: <Index/>
  }
]);

function App() {
  return (
    <RouterProvider router={rout}/>
  )
}

export default App;
