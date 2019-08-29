import io from 'socket.io-client';
import {baseUrl} from './../utils';

export const socket = io(baseUrl);
