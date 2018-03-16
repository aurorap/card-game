import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
    render(){
        return (
            <div className="jumbotron">
                <h1>Welcome</h1>
                <Link to="game" className="btn btn-primary btn-lg">Play Game</Link>
            </div>
        );
    }
}

export default HomePage;