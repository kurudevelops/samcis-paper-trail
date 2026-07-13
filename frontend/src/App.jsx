import Sidebar from './features/Sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='home'>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
