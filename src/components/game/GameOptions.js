import React, {PropTypes} from 'react';

function GameOptions(props){
    return(
        <div className="gameOptionsContainer">
            <div className="gameOption  pull-left">
                <div className="btn btn-primary" onClick={() =>props.resetGame(props.selectedGridOption)}>
                    Reset
                </div>
            </div>
            <div className="gameOption">
                <div className="btn-group" role="group" aria-label="button list">
                    {
                        props.gridOptions.map((option, i) =>
                            <button key={i} type="button" 
                                className={"btn btn-secondary " 
                                            + (props.selectedGridOption.numberOfCards == 
                                                option.numberOfCards ? "active" : "")} 
                                onClick={() => props.resetGame(option)}>{option.numberOfCards}</button>)
                    }
                </div>
            </div>
        </div>
    );
}

GameOptions.propTypes = {
    resetGame: PropTypes.func.isRequired,
    selectedGridOption: PropTypes.object.isRequired,
    gridOptions: PropTypes.array.isRequired
  };

export default GameOptions

