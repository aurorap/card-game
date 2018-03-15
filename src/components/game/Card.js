import React, {PropTypes} from 'react';

function Card(props){
    return(
        <div className="cardContainer" 
            style={{"width": props.cardSize, "height": props.cardSize}} 
            onClick={() => props.flipCard(props.cardId)}>
            <div className={"card" + (props.isFlipped ? " flipped" : "")}>
                <div className="front"></div>
                <div className="back">
                    <div className="cardTextContainer">
                        <div className="cardText">
                        <img style={{width: props.cardSize, height: props.cardSize}} 
                            src={props.imagePath}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    cardSize: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired,
    flipCard: PropTypes.func.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    imagePath: PropTypes.string.isRequired
  };

export default Card;