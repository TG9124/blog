import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const HeaderComponent = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const userName = user?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userName ? (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={handleLogout}>
              Logout ({userName})
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default HeaderComponent;