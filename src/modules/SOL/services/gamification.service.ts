import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gamification } from '../schemas/gamification.schema';
import { AddPointsDto } from '../dtos/addpoints.dto';

export interface UserRanking {
  id: string;
  name: string;
  email: string;
  points: number;
}

@Injectable()
export class GamificationService {
  constructor(
    @InjectModel(Gamification.name) private gamificationModel: Model<Gamification>,
  ) {}

  async getUserGamification(userId: string): Promise<Gamification[]> {
    return this.gamificationModel.find({ userId }).exec();
  }
  
  async getAllGamification(): Promise<Gamification[]> {
    return this.gamificationModel.find().exec();
  }

  // async addPoints(userId: string, points: number): Promise<Gamification> {
  //   const gamification = await this.gamificationModel.findOneAndUpdate(
  //     { userId },
  //     { $inc: { points }, $setOnInsert: { userId } },
  //     { upsert: true, new: true },
  //   );

  //   gamification.level = Math.floor(gamification.points / 100) + 1;
  //   await gamification.save();
  //   return gamification;
  // }

  async addPoints(addPointsDto: AddPointsDto): Promise<Gamification> {
    try {
      const { userId, points, rewards } = addPointsDto;
      console.log('Adding points:', { userId, points, rewards }); // Log dos dados recebidos
  
      const gamification = await this.gamificationModel.findOneAndUpdate(
        { userId },
        {
          $inc: { points },
          $setOnInsert: { userId },
          $push: { rewards: { $each: rewards } },
        },
        { upsert: true, new: true },
      );
  
      if (!gamification) {
        throw new Error('Gamification record not found or created');
      }
  
      // Atualizar o nível do usuário com base nos pontos
      gamification.level = Math.floor(gamification.points / 100) + 1;
      await gamification.save();
  
      console.log('Successfully added points:', gamification); // Log do sucesso
      return gamification;
    } catch (error) {
      console.error('Error adding points:', error); // Log do erro
      throw new Error('Failed to add points and rewards: ' + error.message);
    }
  }

  async getRanking(): Promise<UserRanking[]> {
    // Supondo que `name` e `email` sejam armazenados no schema `Gamification`.
    const gamifications = await this.gamificationModel.find().exec();
    
    return gamifications.map(gamification => ({
      id: gamification._id.toString(),
      name: gamification.name,
      email: gamification.email,
      points: gamification.points,
    }));
  }
}

