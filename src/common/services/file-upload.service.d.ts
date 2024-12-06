export declare class FileUploadService {
    private readonly uploadDir;
    constructor();
    uploadImage(file: Express.Multer.File): Promise<string>;
    deleteImage(filePath: string): Promise<void>;
}
