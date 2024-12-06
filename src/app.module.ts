import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env']
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}