import React from 'react';
import './../../css/app.css';
import Rooms from './rooms';
import PlayerRoom from './player-room';
import { socketClient, socket as io} from '../data/repo/room-repo';
import fetcher from './../fetcher';
import {roomRepo} from './../data/repo/room-repo';

//https://colorhunt.co/palette/152950
class HomePage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentRoom: {players: []},
      isRoomPropertyOfPlayer: false,
      roomsOfUser: []
    }

    this.onCurrentRoomChanged = this.onCurrentRoomChanged.bind(this);
    this.PlayerNameInput = this.PlayerNameInput.bind(this);
    this.onRoomCreated = this.onRoomCreated.bind(this);
  }


  onRoomCreated(roomName){
    console.log(`${roomName} is added to rooms of user !`);
    this.setState((state, props) => ({roomsOfUser: state.roomsOfUser.concat(roomName)}));
  }
  
  onCurrentRoomChanged(newRoom){   
    this.setState({
      currentRoom: newRoom,
      isRoomPropertyOfPlayer: false
    });
    console.log(`rooms of user: ${this.state.roomsOfUser}`);
    for(let roomName of this.state.roomsOfUser){
      if(roomName === newRoom.roomName){
        this.setState({isRoomPropertyOfPlayer: true})
      }
    }
  }


  PlayerNameInput(props){
    return(
      <div className="playerNameContainer">
        <span>
          Twój nick: 
        </span>
        <input type="text" value={this.props.playerName} onChange={this.props.onPlayerNameChange}/>
      </div>
    );
  }

  render(){
    return (
      <div className="homePageContainer">
        <header>
          <span>( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)</span>
          &nbsp;Strzelanka&nbsp;
          <span> ( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)</span>
        </header>
        <section className="mainPartContainer">
          <Rooms 
          onChangedRoom={this.onCurrentRoomChanged} 
          roomName={this.state.currentRoom.roomName}
          onRoomCreated={this.onRoomCreated}
          playerName={this.props.playerName}/>
          <this.PlayerNameInput/>
          <PlayerRoom 
          roomId={this.state.currentRoom._id} 
          roomName={this.state.currentRoom.roomName}
          playerName={this.props.playerName}
          isRoomPropertyOfPlayer={this.state.isRoomPropertyOfPlayer}
          onGameStarted={this.props.onGameStarted}/>
        </section>    
      </div>
    );
  }
}

export default HomePage;
