import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessStep } from '../entities/process-step.entity';
import { ProcessStepService } from './process-step.service';
import { ProcessStepController } from './process-step.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessStep])],
  providers: [ProcessStepService],
  controllers: [ProcessStepController],
  exports: [ProcessStepService],
})
export class ProcessStepModule {}
