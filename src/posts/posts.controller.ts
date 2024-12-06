import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    UseGuards, 
    Request, 
    Query, 
    UseInterceptors,
    UploadedFile,
    
  } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import {Post as PostEntity } from './post.entity';
import { Roles, UserRole } from 'src/auth/roles-based';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostSwaggerDecorator } from './decorators/post-swagger.decorator';
import { multerDiskStorage } from 'src/common/multer.config';
 
  @ApiTags('posts')
  @Controller('posts')
  export class PostsController {
    constructor(
      private readonly postsService: PostsService,
      private readonly fileUploadService: FileUploadService
    ) {}
  
  @Post()
  @UseGuards(FirebaseAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.WRITER)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image', { storage: multerDiskStorage }))
  @PostSwaggerDecorator()
  @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(ImageValidationPipe) image?: Express.Multer.File,
    @Request() req?: any,
  ): Promise<PostEntity> {
    // Assign the image path if an image is uploaded
    if (image) {
      createPostDto.image = `/uploads/${image.filename}`;
    }

    // Delegate to the service for business logic
    return this.postsService.create(createPostDto, req.user.uid);
  }
    @Get()
    @ApiResponse({ status: 200, description: 'List of posts' })
    async findAll(
      @Query('page') page: number = 1, 
      @Query('limit') limit: number = 10
    ): Promise<{ posts: PostEntity[], total: number }> {
      return this.postsService.findAll(page, limit);
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Details of a specific post' })
    async findOne(@Param('id') id: string): Promise<PostEntity> {
      return this.postsService.findOne(id);
    }
  
    @Put(':id')
    @UseGuards(FirebaseAuthGuard)
    @Roles(UserRole.ADMIN, UserRole.WRITER)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('image', { storage: multerDiskStorage }))
    @PostSwaggerDecorator()
    @ApiResponse({ status: 200, description: 'The post has been successfully updated.' })
    async update(
      @Param('id') id: string, 
      @Body() updatePostDto: UpdatePostDto, 
      @UploadedFile(ImageValidationPipe) image?: Express.Multer.File,
      @Request() req?: any,
    )  {
      if (image) {
        updatePostDto.image = `/uploads/${image.filename}`; 
      }
    
       
      const updatedPost = await this.postsService.update(id, updatePostDto, req.user.uid);
    
      // if a new image was uploaded, delete the old one after the update is complete
      if (image && updatedPost.previousImage) {
        await this.fileUploadService.deleteImage(updatedPost.previousImage);
      }
    
      return updatedPost;
    }
  
    @Delete(':id')
    @UseGuards(FirebaseAuthGuard)
    @Roles(UserRole.ADMIN, UserRole.WRITER)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
    async remove(@Param('id') id: string, @Request() req): Promise<void> {
      return this.postsService.remove(id, req.user.uid);
    }
  }