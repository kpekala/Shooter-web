import './../../css/rooms.css';
import React from 'react';
import fetcher from './../fetcher';
import {socket, socketClient} from './../socket-client';

class RoomForm extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          roomName: ''       
    };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSumbit = this.handleSumbit.bind(this);
    }
  
    handleInputChange(event){
      this.setState({roomName: event.target.value})
      event.preventDefault();
    }

    handleSumbit(event){
      event.preventDefault();
      const roomName = this.state.roomName;
      fetcher.addRoom(roomName).then(() =>{
        console.log('sending room ended with success!')
        this.props.onRoomCreated(roomName);
      }).catch(err =>{
        console.log('sending room ended with error!: ' + err);
      })

      this.setState({roomName: ''});
    }
  
    render(){
      return (
        <form className="roomForm" onSubmit={this.handleSumbit}>
          <label>
            <input  type="text" placeholder="Nazwa pokoju" value={this.state.roomName} onChange={this.handleInputChange}/>
          </label>
          <input type="submit" value="Dodaj"/>
        </form>
      );
    }
  }


class Rooms extends React.Component{
    constructor(props){
        super(props);
        this.onRoomClick = this.onRoomClick.bind(this);
        this.onRoomCreated = this.onRoomCreated.bind(this);

        this.state = {
            rooms: []
        }
    }

    componentDidMount(){
      fetcher.fetchRooms().then(rooms =>{
        this.setState({rooms: rooms})
      }).catch(err =>{
        console.log('error when fetching rooms')
      })

      socket.on('new room', (room) => {
        const rooms = this.state.rooms;
        rooms.push(room);
        this.setState({rooms: rooms})
      })
    }

    onRoomCreated(roomName){
        this.props.onRoomCreated(roomName);
    }

    onRoomClick(clickedId){
      const rooms = this.state.rooms;
      const clickedItemIndex = this.getClickedItemIndex(clickedId);   
      const clickedRoom = rooms[clickedItemIndex];

      if(clickedRoom.roomName !== this.props.roomName){
        this.updateWithClickedRoom(clickedItemIndex);
        this.props.onChangedRoom(clickedRoom);
      }
    }

    getClickedItemIndex(clickedId){
      const rooms = this.state.rooms;
      return rooms.findIndex(room => room._id=== clickedId)
    }

    updateWithClickedRoom(clickedIndex){
      const rooms = this.state.rooms;

      for(let room of rooms){
        room.clicked = false;
      }
      rooms[clickedIndex].clicked = true;
      this.setState({rooms: rooms});
    }

    generateListItem(room){
      const style = room.clicked === true ? 'itemRoom clicked' : 'itemRoom';
       return (
        <li className={style} key={room._id} onClick={() => this.onRoomClick(room._id)}> 
          {room.roomName}
        </li>
       );
    }

    render(){
        const uiRooms = this.state.rooms.map((room) => this.generateListItem(room));

        return (
            <div className="roomsContainer">
              <div className="roomsTitleContainer">
                <span>Pokoje:</span>
              </div>
              <div className="listContainer">
                  <ul>
                      {uiRooms}
                  </ul>
              </div>
              <RoomForm onRoomCreated={this.props.onRoomCreated}/>

            </div>
        );
    }
  }
  
  export default Rooms;