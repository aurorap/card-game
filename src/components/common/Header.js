import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
    return(
        <nav className="navbar navbar-default">
                <ul className="nav navbar-nav">
                <li><IndexLink to="/">Home</IndexLink></li>
                <li><Link to="/game">Game</Link></li>
                <li><Link to="/create_game">Create Game</Link></li>
                <li><Link to="/about">About</Link></li>
                </ul>
        </nav>
    );
};

export default Header;