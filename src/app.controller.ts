import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as pagarme from 'pagarme';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    // const pg = pagarme.client.connect({api_key: 'ek_test_3Q9pbDlTywEQo2A3xJMCg0amNqehZ9'});
  }

  @Get('/get_all_logs')
  async getAllLogs(): Promise<any> {
    return await this.appService.findAll();
  }
  @Post('/create_log')
  async create(@Body() log: any): Promise<any> {
    return await this.appService.create(log);
  }
  @Post('/pay')
  async pay(@Body() log: any): Promise<any> {
    console.log(log);

    let pay = await pagarme.client.connect({
      api_key: 'ak_test_feufm9KxLBMNsoXo8qVr0KuP8u6btZ',
    });

    // console.log(pay);
    // log.card.card_expiration_date = log.card.card_expiration_month + (log.card.card_expiration_year)[2] + (log.card.card_expiration_year)[3]
    // console.log(log.card)

    try {
      let payment = await pay.transactions.create({
        amount: 10000,
        card_hash: log.card_hash,
        payment_method: 'credit_card',
        card_expiration_date: log.card.card_expiration_date,
        // card_expiration_date: '0822',
        card_holder_name: log.card.card_holder_name,
        card_number: log.card.card_number,
        card_cvv: log.card.card_cvv,

        // amount: 21000,
        // card_number: "4111111111111111",
        // card_cvv: "123",
        // card_expiration_date: "0922",
        // card_holder_name: "Morpheus Fishburne",
      });
      console.log(payment);
    } catch (e) {
      console.log(e.response.errors);
    }

    // pagarme.transactions.create({
    //   amount: 10000,
    //   card_hash: log.card_hash,
    //   payment_method: 'credit_card',

    // })
    // return await this.appService.create(log);
  }
}
