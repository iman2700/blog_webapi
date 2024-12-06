import { applyDecorators, Post } from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';

export const PostSwaggerDecorator = () => {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'Create a new post',
      required: true,
      schema: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: {
            type: 'string',
            example: 'Sample Post Title',
            description: 'Title of the post',
          },
          content: {
            type: 'string',
            example: 'This is the post content.',
            description: 'Content of the post',
          },
          image: {
            type: 'string',
            format: 'binary',
            description: 'Optional image file for the post',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'The post has been successfully created.',
      type: Post,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Authentication required',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    }),
  );
};
