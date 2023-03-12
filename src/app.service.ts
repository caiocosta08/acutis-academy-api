import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Log, LogDocument } from './app.schema';
import { Model } from 'mongoose';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Log.name) private logsModel: Model<LogDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(log: any): Promise<Log> {
    const createdLog = new this.logsModel(log);
    return createdLog.save().catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(): Promise<Log[]> {
    return this.logsModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }
}
