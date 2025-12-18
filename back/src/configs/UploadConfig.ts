import fs from "node:fs";
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MAX_SIZE = 5;
const MAX_FILE_SIZE = MAX_SIZE * 1024 * 1024;
const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MULTER = {
    storage: multer.diskStorage({
        destination(req, file, callback) {
            // cria TMP_FOLDER dinamicamente antes de gravar
            fs.promises
                .mkdir(TMP_FOLDER, { recursive: true })
                .then(() => callback(null, TMP_FOLDER))
                .catch((err) => callback(err as any, TMP_FOLDER));
        },
        filename(req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter(req: any, file: any, callback: any) {
        if (ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Tipo de arquivo não suportado"));
        }
    },
};

export default {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MAX_FILE_SIZE,
    ACCEPTED_MIME_TYPES,
    MULTER,
    MAX_SIZE,
};
