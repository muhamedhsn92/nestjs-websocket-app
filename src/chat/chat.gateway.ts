import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('chatGateWay')
  afterInit(server: any) {
    this.logger.log('initialized!');
  }
  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, message: String }) {
    this.wss.emit('chatToClient', message)
  }
}
