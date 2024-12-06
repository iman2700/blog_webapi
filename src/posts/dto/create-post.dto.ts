import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'Sample Post Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Content of the post',
    example: 'This is a post content.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Image path',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;
}
