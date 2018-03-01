import React from 'react';
import Card from './Card';
import GameOptions from './GameOptions';
import gameData from '../../data/gameData';

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CardList: [],
            CardsFlipped: [], 
            CardsMatched:[],
            GridOption: gameData.gridOptions.find(x => x.isDefault)
          };
        this.resetGame = this.resetGame.bind(this);
        this.getRandomCardList = this.getRandomCardList.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.isFlipped = this.isFlipped.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.flippedCardsMatch = this.flippedCardsMatch.bind(this);
        this.allCardsMatched = this.allCardsMatched.bind(this);
        this.getCardById = this.getCardById.bind(this);
    }
    resetGame(selectedOption){
      this.setState({
        CardList: this.getRandomCardList(selectedOption.numberOfCards),
        CardsFlipped:[], 
        CardsMatched:[],
        GridOption: selectedOption
      });
    }
    getRandomCardList(numberOfCards){
      //get randomly selected numbers
      let numberOfImagesToSelect = numberOfCards/2;
      let cardList = [];
      let array = [];

      for(let i = 0; i < numberOfImagesToSelect; i++){
        let num = -1;
        //while number was not aready selected
        while (num == -1 || array.indexOf(num) != -1) {
          num = Math.floor(Math.random() * Math.floor(numberOfImagesToSelect));
        }
        array.push(num, num);
      }

      //shuffle number array
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      } 

      //create card list
      array.map((num, i) => {
        cardList.push({"id": i, "imageId": num});
        });
      return cardList;
    }
    componentDidUpdate(){
      //wait until all child components have rendered before
      //checking for matches and resetting cards
      if(this.allCardsMatched()){
        this.resetGame(this.state.GridOption);
      }

      if(this.state.CardsFlipped.length < 2){
        return;
      }

      if(this.flippedCardsMatch()){
        setTimeout(function()
        {
            this.setState((prevState, props) => {
              return{CardsMatched : prevState.CardsMatched.concat(this.state.CardsFlipped), 
                      CardsFlipped: []};
            });
        }.bind(this), 1000);
      }
      else{
        setTimeout(function()
        {
          this.setState({CardsFlipped : []});
        }.bind(this), 1000);
      }
    }
    flipCard(cardId){
        //dont flip card if it has already been flipped
        if(this.isFlipped(cardId)){
          return;
        }
        if(this.state.CardsFlipped.length < 2){
          this.setState((prevState, props) => {
              return{CardsFlipped : prevState.CardsFlipped.concat(this.getCardById(cardId))};
          });
        } 
    }
    isFlipped(cardId){
        let card = this.getCardById(cardId);
        return (this.state.CardsFlipped.indexOf(card) === -1 
                && this.state.CardsMatched.indexOf(card) === -1? "" : "true");
    }
    getCardById(cardId){
      return this.state.CardList.find(c => c.id == cardId);
    }
    flippedCardsMatch(){
        return this.state.CardsFlipped[0].imageId == this.state.CardsFlipped[1].imageId;  
    }
    allCardsMatched(){
      return this.state.CardList.length == this.state.CardsMatched.length;
    }
    render(){
        return(
          <div>
            <GameOptions
              gridOptions={gameData.gridOptions}
              resetGame={this.resetGame}
              selectedGridOption={this.state.GridOption}
            />
            <div style={{"width": this.state.GridOption.containerWidth}}>
              {
                this.state.CardList.map((card, i) => 
                  <Card key={card.id}
                        cardId={card.id} 
                        imageId={card.imageId}
                        isFlipped={this.isFlipped(card.id)}
                        flipCard={this.flipCard}
                        cardSize={this.state.GridOption.cardSize}
                        />
                )
              }
            </div>
          </div>
        );
    }
}

export default Game;