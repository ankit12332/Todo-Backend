import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Injectable } from '@nestjs/common';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Allow frontend to connect
    },
  })
  @Injectable()
  export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    // Emit an event to update tasks
    sendTaskUpdate(tasks: any[]) {
      console.log('Emitting WebSocket event: tasksUpdated', tasks);
      this.server.emit('tasksUpdated', tasks);
    }
  }
