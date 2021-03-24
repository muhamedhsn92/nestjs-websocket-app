import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AlertGateway } from './alert.gateway';

@Controller('alert')
export class AlertController {

    constructor(private alert: AlertGateway) { }
    @Post()
    @HttpCode(200)
    sendAlertToAll(@Body() dto: { message: string }) {
        this.alert.sendToAll(dto.message);
        return dto
    }
}
