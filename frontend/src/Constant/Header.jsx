import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext/AuthProvider';
import { axiosInstance } from '../API/axiosApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Header({ handleGoBack }) {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/user/logout');
      localStorage.clear();
      setAuthUser(undefined);
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="flex items-center justify-between">

        {/* Left side */}
        <div className="flex items-center gap-3">
          {handleGoBack && (
            <button
              onClick={handleGoBack}
              className="p-2 border rounded"
            >
              <FaArrowLeft />
            </button>
          )}
          <h1 className="text-xl font-semibold">Hello</h1>
        </div>

        {/* Right side */}
        <button
          onClick={handleLogout}
          className="text-red-600 font-medium"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Header;
