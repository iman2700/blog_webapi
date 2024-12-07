import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    try {
      const post = this.postsRepository.create({
        ...createPostDto,
        userId
      });
      return await this.postsRepository.save(post);
    } catch (error) {
      this.logger.error(`Error finding create new post": ${error.message}`);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ posts: Post[], total: number }> {
    const [posts, total] = await this.postsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' }
    });

    return { 
      posts, 
      total 
    };
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });
      if (!post) {
        this.logger.warn(`Post with ID "${id}" not found`);
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    }
    catch (error) {
      this.logger.error(`Error finding post with ID "${id}": ${error.message}`);
      throw error;
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<{ updatedPost: Post; previousImage?: string }> {
    try {
      const post = await this.findOne(id);
      if (!post) {
        this.logger.warn(`Post with ID "${id}" not found`);
        throw new NotFoundException('Post not found');
      }
      if (post.userId !== userId) {
        throw new UnauthorizedException('you are not authorized.');
      }
      // store the current image path before updating
      const previousImage = post.image;
      const updatedPost = { ...post, ...updatePostDto };
      const savedPost = await this.postsRepository.save(updatedPost);
      return { updatedPost: savedPost, previousImage };

    }
    catch (error) {
      this.logger.error(`Error finding update post with ID "${id}": ${error.message}`);
      throw error;
    }
  }


  async remove(id: string, userId: string): Promise<void> {
    const post = await this.findOne(id);
    if (post.userId !== userId) {
      throw new UnauthorizedException('you are not authorized.');
    }

    await this.postsRepository.remove(post);
  }
}