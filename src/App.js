import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import { auth } from './Config/Firebase';
import db from './Config/Firebase'; // Import your Firebase configuration
import { useStateValue } from './Context/StateProvider';
import BrowseNow from './Components/BrowseNow';

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    
    const fetchUserData = async (userId) => {
      try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
        
          dispatch({
            type: 'SET_USER',
            user: {...userData},
          });
        } else {
          console.log('User document not found in "users" collection.');
        
          dispatch({
            type: 'SET_USER',
            user: null,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    };

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const providerId = authUser.providerData[0].providerId;
        if (providerId === 'password') {
          fetchUserData(authUser.uid);
        } else {
           dispatch({
            type: 'SET_USER',
            user: authUser,
          });
        }
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="app">
      <div className="app__top"></div>
      <div className="app__container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/browsenow" component={BrowseNow} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
