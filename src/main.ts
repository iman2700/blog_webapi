import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Serve static files from uploads directory
   app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


   // Swagger configuration
  const config = new DocumentBuilder()
  .setTitle('Post API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
