import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import GamePage from './components/game/GamePage';
import CreateGamePage from './components/game/CreateGamePage';
import AboutPage from './components/about/AboutPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="game" component={GamePage}/>
        <Route path="create_game" component={CreateGamePage}/>
        <Route path="about" component={AboutPage}/>
    </Route>
);