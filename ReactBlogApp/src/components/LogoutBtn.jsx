import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../redux/authSlice'



function LogoutBtn() {

    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
          await authService.logout(); // Logout from auth service
          dispatch(logout()); // Dispatch logout action to update the state
        } catch (error) {
          console.error("Logout failed:", error); // Handle error if logout fails
        }
      };

    return (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      );
    }

export default LogoutBtn