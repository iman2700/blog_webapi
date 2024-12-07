import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch() // marks this class as an exception filter that catches all exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // access the HTTP-specific context
    const ctx = host.switchToHttp();
    const response = ctx.getResponse(); // HTTP response object
    const request = ctx.getRequest(); // HTTP request object

    // determine the HTTP status code:
    // if the exception is an instance of HttpException, get its status; otherwise, use 500 (internal server error).
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // determine the error message:
    // if the exception is an instance of HttpException, get its response; otherwise, use a default error message.
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // send a structured JSON response back to the client with error details
    response.status(status).json({
      statusCode: status, // hTTP status code (404, 500)
      timestamp: new Date().toISOString(), // current timestamp
      path: request.url, // requested URL path
      message, // error message (can be string or object)
    });
  }
}
