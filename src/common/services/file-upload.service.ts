import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileUploadService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir);
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    // Generate unique filename
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    const filepath = path.join(this.uploadDir, filename);

    // Save file
    await fs.promises.writeFile(filepath, file.buffer);

    // Return relative URL path
    return `/uploads/${filename}`;
  }

  async deleteImage(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(process.cwd(), filePath.replace(/^\//, ''));
      await fs.promises.unlink(fullPath);
    } catch (error) {
      // Silently handle if file not found
      console.warn(`Failed to delete file: ${filePath}`, error);
    }
  }
}