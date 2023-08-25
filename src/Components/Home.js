import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AlbumDetails from './AlbumDetails';
import Listennow from './Listennow';
import Header from './Header';
import BrowseNow from './BrowseNow';
import Sidebar from './Sidebar';
import Music from './Music';
import Song from './Song/Song';
import './Home.css';

import Subscription from './SubscriptionPage/Subscription';
import Artist from './Artist/Artist';
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [currentSong, setCurrentSong] = useState({
    link: null,
    image: null,
    title: null,
    songData: null,
    songId:null,
    allSong:null,
  });


  return (
    <Router>
      <div className='home'>
        <div className='flex-container'>
          <div className='item1'>
          <Sidebar isSidebarOpen={isSidebarOpen} />
          </div>
          <div className='item2'>
            <div className='header-flex'>
            <Header currentSong={currentSong} toggleSidebar={toggleSidebar} />
            </div>
            <div className='container-flex'>
            <Switch>
              <Route path="/Listen" component={Listennow} />
              <Route path="/browse" component={BrowseNow} />
              <Route path="/radio" component={Music} />
              <Route path="/subscription" component={Subscription} />
              <Route path="/artist/:id" component={Artist} />
              <Route path="/song/:id" component={Song} />
              <Route
                path="/album/:id"
                render={(props) => (
                  <AlbumDetails
                    {...props}
                    setCurrentSong={setCurrentSong}
                  />
                )}
              />
                            
              <Redirect exact from="/" to="/Listen" />
            </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Home;
