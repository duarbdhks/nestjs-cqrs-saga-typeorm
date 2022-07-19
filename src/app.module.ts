import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '@server/config'
import { UserModule } from '@server/modules/user/user.module'
import { SharedModule } from './shared.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    UserModule,
    TerminusModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.db.connectionString,
      entities: [`${__dirname}/**/entity/**/*.entity{.ts,.js}`],
      synchronize: false,
      logging: ['error'],
      extra: { max: config.db.max },
      keepConnectionAlive: true,
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
