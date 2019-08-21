import React from 'react';
import './../../css/game.css';
import { socketClient, socket as io} from './../socket-client';
import fetcher from './../fetcher';
import {startGame} from './../game/game';


class GamePage extends React.Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
    startGame();
  }

  render(){
      return (
          <div id="gamePageContainer">
          </div>
      );
  }
}

export default GamePage;
