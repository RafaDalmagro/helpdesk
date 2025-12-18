import fs from "node:fs";
import path from "node:path";

import UploadConfig from "@/configs/UploadConfig";

class DiskStorage {
    async saveFile(file: string) {
        const tmpPath = path.resolve(UploadConfig.TMP_FOLDER, file);
        const distPath = path.resolve(UploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.access(tmpPath);
        } catch (error) {
            throw new Error(`Arquivo não encontrado: ${tmpPath}`);
        }

        await fs.promises.mkdir(UploadConfig.UPLOADS_FOLDER, {
            recursive: true,
        });
        await fs.promises.rename(tmpPath, distPath);
        return file;
    }

    async deleteFile(file: string, type: "tmp" | "upload") {
        const pathFile =
            type === "tmp"
                ? UploadConfig.TMP_FOLDER
                : UploadConfig.UPLOADS_FOLDER;

        const filePath = path.resolve(pathFile, file);

        try {
            await fs.promises.stat(filePath);
        } catch (error) {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

export { DiskStorage };
