import path from 'path';
import multer from 'multer';

const storage = (distName) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `../public/images/${distName}`));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });
};

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uplaod = distName => multer({ storage: storage(distName), fileFilter });

export default uplaod;
export { fileFilter };
