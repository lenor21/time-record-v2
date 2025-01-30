import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='drawer'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <Navbar />
        {/* Page content here */}
        <main className='min-h-[100vh] pt-20'>
          <div className='container mx-auto px-4'>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default App;
