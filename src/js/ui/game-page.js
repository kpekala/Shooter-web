import React from 'react';
import './../../css/game.css';
import {startGame} from './../game/game';
import { WinnerDialog } from './dialog-winner';


class GamePage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      ended: false,
      winnerName: ''
    }

    this.handleGameEnd = this.handleGameEnd.bind(this);
  }

  componentDidMount(){
    let playerData = {
      playerName: this.props.playerName
    }
    startGame(playerData, this.handleGameEnd);
  }

  handleGameEnd(winnerName){
    this.setState({ended: true,winnerName: winnerName})
  }

  getWinnerDialogOrNull(){
    if(this.state.ended){
      return <WinnerDialog winnerName={this.state.winnerName}/>
    }else{
      return null;
    }
  }

  render(){
    let winnerDialog = this.getWinnerDialogOrNull()

      return (
          <div className="gamePageContainer">
            {winnerDialog}
            <div id="canvasWrapper"></div>
          </div>
      );
  }
}

export default GamePage;
