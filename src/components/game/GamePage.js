import React from 'react';
import Card from './Card';
import GameOptions from './GameOptions';
import gameData from '../../data/gameData';

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CardList: [],
            GridOption: {}
          };
        this.resetGame = this.resetGame.bind(this);
        this.getRandomCardList = this.getRandomCardList.bind(this);
        this.isFlippedOrMatched = this.isFlippedOrMatched.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.flippedCardsMatch = this.flippedCardsMatch.bind(this);
        this.allCardsMatched = this.allCardsMatched.bind(this);
        this.checkFlippedCards = this.checkFlippedCards.bind(this);
        this.updateMatchedCards = this.updateMatchedCards.bind(this);
        this.resetFlippedCards = this.resetFlippedCards.bind(this);
        this.numberOfCardsFlipped = this.numberOfCardsFlipped.bind(this);
    }
    componentDidMount(){
      //intialize game
      const defaultGameOption = gameData.gridOptions.find(x => x.isDefault);
      this.resetGame(defaultGameOption);
    }
    componentDidUpdate(){
      //wait until all child components have rendered
      this.checkFlippedCards();
    }
    resetGame(selectedOption){
      this.setState({
        CardList: this.getRandomCardList(selectedOption.numberOfCards),
        GridOption: selectedOption
      });
    }
    getRandomCardList(numberOfCards){
      let numberOfImagesToSelect = numberOfCards/2;
      let cardList = [];
      let array = [];

      //get new random number while number was not aready selected
      for(let i = 0; i < numberOfImagesToSelect; i++){
        let num = -1;
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

      //create card list object from shuffled numbers
      array.map((num, i) => {
        cardList.push({
          "id": i, 
          "imageId": num,
          isFlipped: false,
          isMatched: false});
        });
      return cardList;
    }
    checkFlippedCards(){
      if(this.allCardsMatched()){
        this.resetGame(this.state.GridOption);
      }

      if(this.numberOfCardsFlipped() < 2){
        return;
      }

      if(this.flippedCardsMatch()){
        setTimeout(() => this.updateMatchedCards(), 1000);
      }
      else{
        setTimeout(() => this.resetFlippedCards(),1000);
      }
    }
    updateMatchedCards(){
      this.setState((prevState, props) => {
        return{CardList : prevState.CardList.map(
          card => card.isFlipped ? Object.assign(
            card, {isMatched:true, isFlipped:false}) : card)};
      });
    }
    resetFlippedCards(){
      this.setState((prevState, props) => {
        return{CardList : prevState.CardList.map(
          card => card.isFlipped ? Object.assign(card, {isFlipped:false}) : card)};
      });
    }
    flipCard(cardId){
        //dont flip card if it has already been flipped
        if(this.isFlippedOrMatched(cardId) || this.numberOfCardsFlipped() > 1){
          return;
        }

        this.setState((prevState, props) => {
          return{CardList : prevState.CardList.map(
            card => card.id == cardId ? Object.assign(card, {isFlipped:true}) : card)};
        }); 
    }
    isFlippedOrMatched(cardId){
      const card = this.state.CardList.find(card => card.id == cardId);
      return (card.isFlipped || card.isMatched);
    }
    numberOfCardsFlipped(){
      return this.state.CardList.filter(card => card.isFlipped).length;
    }
    flippedCardsMatch(){
        let flippedCards = this.state.CardList.filter(card => card.isFlipped);
        return flippedCards[0].imageId == flippedCards[1].imageId;  
    }
    allCardsMatched(){
      return this.state.CardList.length == this.state.CardList.filter(card => card.isMatched).length;
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
                        isFlipped={this.isFlippedOrMatched(card.id)}
                        flipCard={this.flipCard}
                        cardSize={this.state.GridOption.cardSize}/>
                )
              }
            </div>
          </div>
        );
    }
}

export default Game;