import React from 'react';
import './css/app.css';
import HomePage from './js/ui/home-page';
import GamePage from './js/ui/game-page';
import {gameRepo} from './js/data/repo/game-repo';
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
    gameRepo.observeForInitialPositions((players) =>{
      console.log('gotten positions: ',players);
      this.setState({isGameStarted: true})
    })
  }

  onPlayerNameChange(event){
    const playerName = event.target.value;
    this.setState({playerName: playerName});
  }

  getCurrentPage(){
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
