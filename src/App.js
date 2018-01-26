import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Router from 'react-router-dom/Router';
import Switch from 'react-router-dom/Switch';
import {createBrowserHistory as BrowserHistory} from 'history';
import {applyMiddleware,createStore} from 'redux';
import {Provider} from 'react-redux';
import {save,load} from 'redux-localstorage-simple';
import FontAwesome from 'react-fontawesome';
import AsyncComponent from './components/async_component';
import SearchBar from './components/search_bar';
import Button from './components/button';
import appReducer from './redux/reducers';

import './App.css';

const browserHistory = BrowserHistory();
let store = applyMiddleware(save())(createStore)(appReducer,load());

class App extends Component {
  componentDidMount () {
    var self = this;
    window.onresize = function (evt) {
      self.forceUpdate();
    };
  }
  handleFavorites () {
    browserHistory.push('/myalbums');
  }
  handleSearch (artist) {
    if (artist) {
      browserHistory.push('/search/artists/'+artist.name);
    }
  }
  render() {
    let isSmallScreen = !window.matchMedia('(min-width : 745px)').matches;
    let styles = {
      searchBarContainer : {
        width : '80vw',
        maxWidth : '450px',
        minWidth : '300px',
        margin : 'auto',
        padding : '20px 0px'
      },
      buttonContainer : {
        float : isSmallScreen?null:'right',
        textAlign : 'right',
        padding : '20px 10px'
      },
      heart : {
        color : '#ef5350'
      }
    };
    return (<Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <div>
          <div style={styles.buttonContainer}>
            <Button label={<span>My Favourites <FontAwesome style={styles.heart} name='heart'/></span>}
              primary
              onClick={this.handleFavorites} />
          </div>
          <div style={styles.searchBarContainer}><SearchBar onSearch={this.handleSearch} /></div>
          <Switch>
            <Route exact path='/' />
            <Route path='/search/artists/:searchTerm'>
              <AsyncComponent key='/search/artists/:searchTerm' getComponent={function  () {
                return new Promise(function (res,rej) {
                  require(['./artist_search'],function (ArtistSearch) {
                    res(ArtistSearch.default);
                  });
                });
              }} />
            </Route>
            <Route path='/myalbums'>
              <AsyncComponent key='/myalbums' getComponent={function  () {
                return new Promise(function (res,rej) {
                  require(['./my_albums'],function (MyAlbums) {
                    res(MyAlbums.default);
                  });
                });
              }} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    </Provider>);
  }
}

export default App;
