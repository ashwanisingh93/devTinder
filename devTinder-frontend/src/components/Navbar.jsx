import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      <div className="navbar bg-base-300 px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            🧑‍💻DevTinder
          </Link>
        </div>

        {user && (
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <p className="px-4">Welcome {user.firstName}</p>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="user photo" src={user.photoUrl} />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests">Requests</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="btn btn-ghost btn-circle">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {user && isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-base-300 z-50 shadow-lg">
          <div className="p-4 flex flex-col gap-4">
            <p className="text-center font-semibold">Welcome {user.firstName}</p>
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img alt="user photo" src={user.photoUrl} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link 
                to="/profile" 
                className="btn btn-ghost justify-between"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
                <span className="badge">New</span>
              </Link>
              <Link 
                to="/connections" 
                className="btn btn-ghost"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Connections
              </Link>
              <Link 
                to="/requests" 
                className="btn btn-ghost"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Requests
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }} 
                className="btn btn-ghost"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;