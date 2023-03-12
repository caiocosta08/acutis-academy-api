/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Log, LogDocument } from '../app.schema';
import {
  PaidPayment,
  PaidPaymentDocument,
} from './schemas/paid-payment.schema';
import {
  PendingPayment,
  PendingPaymentDocument,
} from './schemas/pending-payment.schema';
import { Model } from 'mongoose';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Log.name) private logsModel: Model<LogDocument>,
    @InjectModel(PaidPayment.name)
    private paidPaymentModel: Model<PaidPaymentDocument>,
    @InjectModel(PendingPayment.name)
    private pendingPaymentModel: Model<PendingPaymentDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(log: any): Promise<Log> {
    const createdLog = new this.logsModel(log);
    return createdLog.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createPendingPayment(pendingPayment: any): Promise<PendingPayment> {
    const createdPendingPayment = new this.pendingPaymentModel(pendingPayment);
    return createdPendingPayment.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createPaidPayment(paidPayment: any) {
    const oldPaidPayment = await this.paidPaymentModel
      .find({ 'data.code': paidPayment.data.code })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });

    console.log({ oldPaidPayment });

    if (oldPaidPayment.length > 0)
      return { message: 'Paid payment code already exists.' };

    const createdPaidPayment = new this.paidPaymentModel(paidPayment);
    return createdPaidPayment.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createCreditCardPendingPayment(
    pendingPayment: any,
  ): Promise<PendingPayment> {
    const createdPendingPayment = new this.pendingPaymentModel(pendingPayment);
    return createdPendingPayment.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createCreditCardPaidPayment(paidPayment: any): Promise<PaidPayment> {
    const createdPaidPayment = new this.paidPaymentModel(paidPayment);
    return createdPaidPayment.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async createPixPayment(pixPayment: any) {
    if (pixPayment.data.status == 'pending') {
      const createdPendingPayment = new this.pendingPaymentModel(pixPayment);
      return createdPendingPayment.save().catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    } else if (pixPayment.data.status == 'paid') {
      const createdPaidPayment = new this.paidPaymentModel(pixPayment);
      return createdPaidPayment.save().catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    }
  }

  async getPaidPayments() {
    return this.paidPaymentModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async getPendingPayments() {
    return this.pendingPaymentModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async getCreditCardPayments() {
    const pendingPayments = await this.pendingPaymentModel
      .find({ 'data.payment_method': 'credit_card' })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    console.log({ pendingPayments });
    const paidPayments = await this.paidPaymentModel
      .find({ 'data.payment_method': 'credit_card' })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    console.log({ paidPayments });

    return [...paidPayments, ...pendingPayments];
  }

  async getPixPayments() {
    const pendingPayments = await this.pendingPaymentModel
      .find({ 'data.payment_method': 'pix' })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    console.log({ pendingPayments });
    const paidPayments = await this.paidPaymentModel
      .find({ 'data.payment_method': 'pix' })
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    console.log({ paidPayments });

    return [...paidPayments, ...pendingPayments];
  }

  async deleteAllPendingPayments(params: any = null) {
    return this.pendingPaymentModel.remove(params).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async deleteAllPaidPayments(params: any = null) {
    return this.paidPaymentModel.remove(params).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async deleteAllPayments() {
    const pendingPaymentsDeleted = await this.pendingPaymentModel
      .remove()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const paidPaymentsDeleted = await this.paidPaymentModel
      .remove()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });

    return { pendingPaymentsDeleted, paidPaymentsDeleted };
  }

  async getPaymentsWithParams(params: any = null) {
    console.log({ params });
    const paidPayments = await this.paidPaymentModel
      // .find({ 'data.payment_method': 'pix' })
      .find(params)
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const pendingPayments = await this.pendingPaymentModel
      // .find({ 'data.payment_method': 'pix' })
      .find(params)
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });

    return [...[paidPayments, ...pendingPayments]];
  }

  async getPaymentsData() {
    const paidPayments = await this.paidPaymentModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const pendingPayments = await this.pendingPaymentModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    const paidPaymentsTotalValue = paidPayments
      .map((p) => p.data.amount)
      .reduce((a, b) => a + b, 0);
    const paidPaymentsQuantity = paidPayments.length;
    const pendingPaymentsTotalValue = pendingPayments
      .map((p) => p.data.amount)
      .reduce((a, b) => a + b, 0);
    const pendingPaymentsQuantity = pendingPayments.length;

    return {
      paidPaymentsTotalValue,
      paidPaymentsQuantity,
      pendingPaymentsTotalValue,
      pendingPaymentsQuantity,
    };
  }

  async findAll(): Promise<Log[]> {
    return this.logsModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async createSubscription(data: any): Promise<any> {
    // PLANO MENSAL plan_1lEWqKvi2iRrAkDQ
    // PLANO ANUAL plan_KJOV6nQS8XcnVZnr
    const {
      nome,
      email,
      endereco,
      cep,
      cidade,
      estado,
      card_number,
      card_cvv,
      card_expiration_month,
      card_expiration_year,
      card_holder_name,
      plano,
    } = data;
    const plans = [
      { id: 1, recorrencia: 'mensal', key: 'plan_1lEWqKvi2iRrAkDQ' },
      { id: 2, recorrencia: 'anual', key: 'plan_KJOV6nQS8XcnVZnr' },
    ];

    const options = {
      method: 'POST',
      url: 'https://api.pagar.me/core/v5//subscriptions',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        // authorization: 'Basic sk_bWY3BpumzFr6an65', // PROD
        authorization: 'Basic c2tfdGVzdF8wblZPdjdITXlpQno0QXllOg==', // TESTE
      },
      data: {
        customer: { name: nome, email },
        card: {
          billing_address: {
            line_1: endereco,
            zip_code: cep,
            city: cidade,
            state: estado,
            country: 'br',
          },
          number: card_number,
          exp_month: card_expiration_month,
          exp_year: card_expiration_year,
          cvv: card_cvv,
          holder_name: card_holder_name,
        },
        installments: 1,
        plan_id: plano == 'mensal' ? plans[0].key : plans[1].key,
        payment_method: 'credit_card',
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
        return error;
      });
  }
}
