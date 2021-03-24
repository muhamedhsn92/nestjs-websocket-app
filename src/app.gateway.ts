import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // this decorator is used to make message published to all not for every one seperated 
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('appGateWay');
  afterInit(server: Server) {
    this.logger.log('init');
    // throw new Error('Method not implemented.');
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected is ${client.id}`)
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected id ${client.id}`)
    // throw new Error('Method not implemented.');
  }  
  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('msgToClient', text)
    // return { event: 'msgToClient', data: text };
  }

  /* this method is to send messages seperated not to every one  */
  // @SubscribeMessage('messageToServer')
  // handleMessage(client: Socket, text: string): WsResponse<string> {
  //   return { event: 'msgToClient', data: text };
  // }
}
