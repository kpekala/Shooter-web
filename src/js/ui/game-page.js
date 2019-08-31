import React from 'react';
import './../../css/game.css';
import { socketClient, socket as io} from '../data/repo/room-repo';
import fetcher from './../fetcher';
import {startGame} from './../game/game';


class GamePage extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    let playerData = {
      playerName: this.props.playerName
    }
    startGame(playerData);
  }

  render(){
      return (
          <div id="gamePageContainer">
          </div>
      );
  }
}

export default GamePage;
