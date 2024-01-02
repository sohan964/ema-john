import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './layouts/Main';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartloader } from './loaders/productsAndCartloader';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          loader: ()=> fetch('products.json'),
          element: <Shop></Shop>
        }, 
        {
          path:'/Orders',
          loader:productsAndCartloader,
          element: <Orders></Orders>
        },
        {
          path:'/About',
          element: <About></About>
        },
        {
          path: '/inventory',
          element: <Inventory></Inventory>
        }
      ]
    },
    
  ])
  return (
    <div >
        <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
