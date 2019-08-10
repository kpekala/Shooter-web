import {baseUrl} from './utils';

class Fetcher{

    postData(url, data){
        return fetch(url, {
            method:  'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        })
    }

    fetchRooms(){
        const url = `${baseUrl}/rooms`;
        return fetch(url).then(response => response.json());
    }

    addRoom(roomName){
        const url = `${baseUrl}/rooms`;
        return this.postData(url, {roomName: roomName});
    }

    fetchPlayers(roomId){
        const url = `${baseUrl}/rooms/${roomId}/players`;
        return fetch(url).then(response => response.json());
    }
}

export default new Fetcher();