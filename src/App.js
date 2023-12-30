import './App.css';
import './styles/CustomStyle.css'
import LandingPage from './components/Admin/LandingPage';
import LandingPageUser from './components/Users/LandingPageUser';
import MainRoutes from './route/index'
import {HashRouter} from 'react-router-dom';
import Popup from './components/Admin/Popup';
import { useSelector } from 'react-redux';

function App() {
  const openPopup = useSelector((state) => state.Elite.openPopup)
  return (
    <HashRouter >
    {/* <AdminHeader/> */}
      {openPopup && <Popup />}
      <MainRoutes />
  
    </HashRouter>
  );
}

export default App;
