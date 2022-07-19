import { AggregateRoot } from '@nestjs/cqrs'
import { IAggregateEvent } from 'nestjs-eventstore'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class AbstractEntity extends AggregateRoot<IAggregateEvent> {
  @CreateDateColumn({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at?: Date
}
