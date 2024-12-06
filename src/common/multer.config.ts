import { diskStorage } from 'multer';
import { extname } from 'path';

// Multer configuration for file storage
export const multerDiskStorage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = extname(file.originalname);
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
    const filename = `${sanitizedFilename}-${uniqueSuffix}${ext}`;
    callback(null, filename);
  },
});
