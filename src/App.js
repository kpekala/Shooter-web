import React from 'react';
import './css/app.css';
import HomePage from './js/ui/home-page';
import GamePage from './js/ui/game-page';
import {roomRepo} from './js/data/repo/room-repo';
//https://colorhunt.co/palette/152950
class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      playerName: '',
      isGameStarted: false
    }
    this.onGameStarted = this.onGameStarted.bind(this);
  }

  onGameStarted(){
    console.log('game started! ;)')
    this.setState({isGameStarted: true})
  }

  componentDidMount(){
    roomRepo.observeGameStarting(this.onGameStarted);
  }

  getCurrentPage(){
    if(this.state.isGameStarted === true){
      return <GamePage/>;
    }
    else{
      return <HomePage/>;
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
