import io from 'socket.io-client';
import {baseUrl} from '../../utils';

export const socket = io(baseUrl);

class RoomRepo{
    observeNewPlayersInRoom(lastRoomId, roomId, onNewPlayerInRoom){
        const lastEventName = `newPlayer ${lastRoomId}`;
        const newEventName = `newPlayer ${roomId}`;
        socket.removeListener(lastEventName, onNewPlayerInRoom);
        socket.on(newEventName, onNewPlayerInRoom);
    }

    emitNewPlayer(playerName, roomId){
        console.log(`emitting new player: ${playerName}, roomId: ${roomId}`)
        const newEventName = `newPlayer`;
        const data = {
            playerName: playerName,
            roomId: roomId
        }
        socket.emit(newEventName,data);
    }
}

export const roomRepo = new RoomRepo();

