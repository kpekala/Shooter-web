import React from 'react';
import './../../css/app.css';
import  {roomRepo} from '../data/repo/room-repo';
import  {gameRepo} from '../data/repo/game-repo';
import fetcher from './../fetcher';
import Button from '@material/react-button';

import './../../scss/test.scss'

class PlayerRoom extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      players: []
    }

    this.onNewPlayerInRoom = this.onNewPlayerInRoom.bind(this);
    this.onStartButtonClick = this.onStartButtonClick.bind(this);
  }

  componentDidMount(){
    gameRepo.observeGameStarting(() => {
      console.log('received info that game is starting!');
      this.props.onGameStarted(this.state.players);
    });
  }

  componentWillReceiveProps(newProps){
    if(this.props.roomId !== newProps.roomId){
        this.onCurrentRoomChange(newProps.roomId,this.props.roomId);
    }
  }

  onNewPlayerInRoom(playerName){
      this.updatePlayers([playerName]);
      console.log('onNewPlayerInRoom');
  }

  updatePlayers(newPlayers){
    this.setState((state, props) => ({
        players: state.players.concat(newPlayers)
    }))
  }

  onCurrentRoomChange(roomId, oldRoomId){
    fetcher.fetchPlayers(roomId).then(players =>{
      this.setState({players: players})
    }).catch(err => {
      this.setState({players: []})
    }).finally(() =>{
      roomRepo.observeNewPlayersInRoom(oldRoomId,roomId,this.onNewPlayerInRoom)
      roomRepo.emitNewPlayer(this.props.playerName,roomId);
    })   
  }

  onStartButtonClick(event){
    if(this.isGameReadyToStart()){
        gameRepo.emitStartGame();
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
              <Button onClick={this.onStartButtonClick}>Start</Button>
          </div>
          );
      }
      else{
          return null;
      }
  }
}

export default PlayerRoom;
