import React from 'react';

class GameOptions extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
    return(
    <div className="gameOptionsContainer">
        <div className="btn btn-primary" onClick={() => this.props.resetGame(this.props.selectedGridOption)}>
            Reset
        </div>
        <div className="btn-group" role="group" aria-label="button list">
            <button type="button" className="btn btn-primary" aria-label="Left Align">
            <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
            </button>
            {
            this.props.gridOptions.map((option, i) =>
                <button type="button" 
                    className={"btn btn-secondary " 
                                + (this.props.selectedGridOption.numberOfCards == option.numberOfCards ? "active" : "")} 
                    onClick={() => this.props.resetGame(option)}>{option.numberOfCards}</button>
            ) 
            }
        </div>
      </div>
    );
    }
}

export default GameOptions

