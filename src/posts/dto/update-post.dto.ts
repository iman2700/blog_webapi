import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdatePostDto {
    @ApiProperty({ description: 'Title of the blog post', required: false })
    @IsOptional()
    @IsString()
    title?: string;
  
    @ApiProperty({ description: 'Content of the blog post', required: false })
    @IsOptional()
    @IsString()
    content?: string;
  
    @ApiProperty({ description: 'Image URL for the blog post', required: false })
    @IsOptional()
    @IsUrl()
    image?: string;
  }