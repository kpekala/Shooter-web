import React from 'react';
import './css/app.css';
import HomePage from './js/ui/home-page';
import GamePage from './js/ui/game-page';
import {gameRepo} from './js/data/repo/game-repo';
import gameSession from './js/data/game-session';
//https://colorhunt.co/palette/152950
class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      playerName: '',
      isGameStarted: false
    }
    this.onGameStarted = this.onGameStarted.bind(this);
    this.onPlayerNameChange = this.onPlayerNameChange.bind(this);
  }

  onGameStarted(players){
    console.log('sending readiness for battle!')
    gameRepo.emitPlayerReady();
    gameRepo.observeForInitialPositions((data) =>{
      console.log('gotten positions: ',data.players);
      console.log('gotten map: ',data.map);
      gameSession.mapId = data.map;
      this.setState({isGameStarted: true})
    })
    gameRepo.observeNewGuns((guns) =>{
      gameSession.guns = guns;
    })
  }

  onPlayerNameChange(event){
    const playerName = event.target.value;
    this.setState({playerName: playerName});
  }

  getCurrentPage(){
    //return <GamePage playerName={this.state.playerName}/>;
    if(this.state.isGameStarted === true){
      return <GamePage playerName={this.state.playerName}/>;
    }
    else{
      return <HomePage onGameStarted={this.onGameStarted} 
      onPlayerNameChange={this.onPlayerNameChange}
      playerName={this.state.playerName}/>;
    }
  }

  render(){
    const currentPage = this.getCurrentPage();

    return (
      <div className="appContainer">
        {currentPage}
      </div>
    );
  }
}

export default App;
