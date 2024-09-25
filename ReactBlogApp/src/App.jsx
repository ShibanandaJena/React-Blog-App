import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './redux/authSlice';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components/index';

function App() {
  const [loading, setLoading] = useState(true); // Tracks the loading state
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const userData = await authService.getCurrentUser();
        
        if (userData) {
          dispatch(login({ userData })); // Dispatch login if user is authenticated
        } else {
          dispatch(logout()); // Dispatch logout if no user is found
        }
      } catch (error) {
        console.error('Error checking user authentication:', error); // Log errors
        dispatch(logout()); // Ensure logout is dispatched on error
      } finally {
        setLoading(false); // Set loading to false after checking
      }
    };

    checkUserAuthentication();
  }, [dispatch]);

  // Render a loading spinner or message while authentication is checked
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p> {/* You can replace this with a spinner if preferred */}
      </div>
    );
  }

  // Render the main layout once loading is complete
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-400">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Renders the nested route content */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
