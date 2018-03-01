import React from 'react';

class Card extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
    return(
        <div className="cardContainer" style={{"width": this.props.cardSize, "height": this.props.cardSize}} onClick={() => this.props.flipCard(this.props.cardId)}>
              <div className={"card" + (this.props.isFlipped ? " flipped" : "")}>
                  <div className="front">
                    <div className="cardTextContainer">
                        <div className="cardText">
                            {this.props.imageId}
                        </div>
                    </div>
                  </div>
                  <div className="back">
                    <div className="cardTextContainer">
                        <div className="cardText">
                            {this.props.imageId}
                        </div>
                    </div>
                  </div>
              </div>
        </div>
    );
    }
}

export default Card;