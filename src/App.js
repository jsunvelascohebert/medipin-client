import React, {useEffect, useState} from 'react';
import HeaderNav from './sections/general/components/HeaderNav';
import Home from './sections/general/pages/Home';
import './index.css';
import Footer from './sections/general/components/Footer';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import About from './sections/general/pages/About';
import Search from './sections/search/pages/Search';
import Topics from './sections/pins/pages/Topics';
import { BannerProvider } from './contexts/BannerContext';
import Banner from './sections/utility/Banner';
import AuthContext from './contexts/AuthContext';
import jwtDecode from "jwt-decode";
import PinnedArticles from './sections/pins/pages/PinnedArticles';
import ArticleNotes from './sections/notes/pages/ArticleNotes';

const EMPTY_USER = {
  userId: 0,
  username: '',
  roles: []
};

function App() {

  const [user, setUser] = useState(EMPTY_USER);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    localStorage.setItem('jwt_token', token);
    const { sub: username, authorities: authoritiesString, userId } = jwtDecode(token);
    const roles = authoritiesString.split(',');
    const user = {
      userId,
		  username,
		  roles,
		  token,
		  hasRole(role) {
			return this.roles.includes(role);
		  }
    };
    setUser(user);
		return user;
  }

  const auth = {
    user: user.username ? { ...user } : EMPTY_USER,
    isLoggedIn() {
      return !!user.username;
    },
    hasRole(role){
      return this.user.roles.includes(role);
    },
    onAuthenticated(user) {
      setUser(user);
    },
    signOut() {
      localStorage.removeItem('jwt_token');
      setUser(EMPTY_USER);
    }
  };

  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (<>
    <AuthContext.Provider value={auth}>
      <Router>
        <BannerProvider>
          <HeaderNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/topics"
              element={auth.isLoggedIn()
                ? <Topics />
                : <Navigate to="/" />
              } />
            <Route path="/topics/:topicId/:topicName"
              element={auth.isLoggedIn()
                ? <PinnedArticles />
                : <Navigate to='/' /> 
              }/>
            <Route path="/notes/:topicId/:topicName/:articleId/:articleName"
              element={auth.isLoggedIn()
                ? <ArticleNotes />
                : <Navigate to='/' />
              } />
          </Routes>
          <Footer />
          <Banner />
        </BannerProvider>
      </Router>
    </AuthContext.Provider>
  </>);
}

export default App;
