import { SetMetadata, Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

// Define possible user roles
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  WRITER = 'writer',
  READER = 'reader'
}

// Decorator to set roles for specific routes
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = Reflect.getMetadata(ROLES_KEY, context.getHandler());
    
    // If no roles are specified, allow access
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if user has any of the required roles
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);

    if (!hasRequiredRole) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }

    return true;
  }
}