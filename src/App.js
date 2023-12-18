import './App.css';
import './styles/CustomStyle.css'
import LandingPage from './components/Admin/LandingPage';
import LandingPageUser from './components/Users/LandingPageUser';
import MainRoutes from './route/index'
import {HashRouter} from 'react-router-dom';

function App() {
  return (
    <HashRouter >
    {/* <AdminHeader/> */}
      <MainRoutes />
    </HashRouter>
  );
}

export default App;
