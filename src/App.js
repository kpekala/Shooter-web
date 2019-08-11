import React from 'react';
import './css/app.css';
import HomePage from './js/ui/home-page';
import GamePage from './js/ui/game-page';
//https://colorhunt.co/palette/152950
class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      playerName: '',
      isGameStarted: false
    }

    this.onGameShouldStart = this.onGameShouldStart.bind(this);
  }

  onGameShouldStart(){
    this.setState({isGameStarted: true})
  }

  getCurrentPage(){
    if(this.state.isGameStarted === true){
      return <GamePage/>;
    }
    else{
      return <HomePage onGameShouldStart={this.onGameShouldStart}/>;
    }
  }

  render(){
    const currentPage = this.getCurrentPage();

    return (
      <div className="appContainer">
        <GamePage/>
      </div>
    );
  }
}

export default App;
