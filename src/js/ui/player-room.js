import React from 'react';
import './../../css/app.css';
import {socketClient} from './../socket-client';
import fetcher from './../fetcher';

class PlayerRoom extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      players: []
    }

    this.onNewPlayerInRoom = this.onNewPlayerInRoom.bind(this);
    this.onStartButtonClick = this.onStartButtonClick.bind(this);
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
    if(this.props.roomId !== newProps.roomId){
        this.onCurrentRoomChange(newProps.roomId,this.props.roomId);
    }
  }

  onNewPlayerInRoom(playerName){
      this.updatePlayers([playerName]);
  }

  updatePlayers(newPlayers){
    this.setState((state, props) => ({
        players: state.players.concat(newPlayers)
    }))
  }

  onCurrentRoomChange(roomId, oldRoomId){
    socketClient.observeNewPlayersInRoom(oldRoomId,roomId,this.onNewPlayerInRoom)
    socketClient.emitNewPlayer(this.props.playerName,roomId);

    fetcher.fetchPlayers(roomId).then(players =>{
      this.setState({players: players})
    })   
  }

  onStartButtonClick(event){
    if(this.isGameReadyToStart()){
        this.props.onGameShouldStart();
    }
  }

  isGameReadyToStart(){
      return this.state.players.length >=2;
  }

  render(){
    let container;
    if(this.props.roomName !== undefined){
      const players = this.state.players;
      const uiPlayers = players.map(player => <li key={player}>{player}</li>);
      const startGameButton = this.getStartGameButtonOrNull();
      container = <div className="currentRoomContainer">
        <h3>{this.props.roomName}</h3>
        <p>Gracze: </p>
        <ul>
          {uiPlayers}
        </ul>
        {startGameButton}
      </div>;
    }
    else {
      container = null;
    }
    return container;
  }

  getStartGameButtonOrNull(){
      if(this.props.isRoomPropertyOfPlayer){
          return (
          <div className="startGameButtonContainer">
              <button onClick={this.onStartButtonClick}>Start</button>
          </div>
          );
      }
      else{
          return null;
      }
  }
}

export default PlayerRoom;
