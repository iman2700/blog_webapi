import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
 

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: '@p123' ,
  database: process.env.DB_NAME || 'blog_db',
  entities: [Post],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
};