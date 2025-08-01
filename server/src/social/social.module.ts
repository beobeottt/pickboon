import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Social } from './entity/social.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Social])],
  providers: [SocialService],
  controllers: [SocialController],
})
export class SocialModule {}
