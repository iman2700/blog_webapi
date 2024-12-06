import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Post]),
  MulterModule.register({
    dest: './uploads', // Temporary destination for multer
  })
],
  controllers: [PostsController],
  providers: [PostsService, FileUploadService]
})
export class PostsModule {}
