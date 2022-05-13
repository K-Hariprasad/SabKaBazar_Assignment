import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/home';
import Login from './pages/login';
import Products from './pages/products';
import SignUp from './pages/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<Login />} /> 
      </Route>
    </Routes>
  );
}

export default App;
