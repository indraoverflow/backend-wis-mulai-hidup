import multer from "multer";
import fs from 'fs'; // Add fs import
import path from 'path'; // Add path import
import { Request } from "express";
import PhotoLocations from "../modules/wedding_reception/controller/recepction.controller";
// const storage = multer.memoryStorage();
// Set up storage engine
const storage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		// if (file.fieldname === 'wedding_media') {
			cb(null, 'src/assets/wedding_media');
		// } else if (file.fieldname === 'man_media' || file.fieldname === 'woman_media') {
		// 	cb(null, 'src/assets/broom_bride_media');
		// } else {
		// 	cb(null, 'src/assets/');
		// }
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});
const upload = multer({ storage });

const uploadMultiple = (req : any, res: any, next:any) => {
  const uploadDir = path.join(__dirname, '../assets/wedding_media');
  fs.access(uploadDir, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(uploadDir, { recursive: true }, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to create upload directory' });
        }
        proceedWithUpload(req, res, next);
      })
    } else {
      proceedWithUpload(req, res, next);
    }
  })
};


function proceedWithUpload(req: any, res: any, next: any) {
  upload.fields([
    { name: 'wedding_media', maxCount: 20 },
    { name: 'man_media', maxCount: 20 },
    { name: 'woman_media', maxCount: 20 },
    { name: 'our_story_man', maxCount: 20 },
    { name: 'our_story_woman', maxCount: 20 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    req.headers.photoLocations = {
      weddingMedia: [],
      manMedia: [],
      womanMedia: [],
      ourStoryMan: [],
      ourStoryWoman: [],
    } as PhotoLocations;
    const files = req.files; // Access uploaded files
    const uploadPromises: any[] = [];
    
    // Process each file
    for (const field in files) {
      files[field].forEach((file: any) => {
        const myFile = file.filename.split(".");
        const fileType = myFile[myFile.length - 1];
        let location = '../assets';	
        location = '../assets/wedding_media'
        const date = Date.now()
        const nameFile = `${date}-${file.originalname}`
        const filePath = path.join(__dirname, location, nameFile);

        uploadPromises.push(new Promise((resolve, reject) => {
          fs.rename(file.path, filePath, (err) => {
            if (err) {
              return reject(err);
            }
            const {receptionId} = req.params
            if (file.fieldname === 'wedding_media') {
              req.headers.photoLocations.weddingMedia.push({photo_url: `${process.env.BASE_URL}/wedding_media/${nameFile}`, wedding_reception_id:+receptionId})
            } else if (file.fieldname === 'man_media') {
              req.headers.photoLocations.manMedia.push({photo_url: `${process.env.BASE_URL}/wedding_media/${nameFile}`, wedding_reception_id:+receptionId})
            } else if (file.fieldname === 'woman_media') {
              req.headers.photoLocations.womanMedia.push({photo_url: `${process.env.BASE_URL}/wedding_media/${nameFile}`, wedding_reception_id: +receptionId})
            } else if (file.fieldname === 'our_story_man') {
              req.headers.photoLocations.ourStoryMan.push({photo_url: `${process.env.BASE_URL}/wedding_media/${nameFile}`, wedding_reception_id: +receptionId})
            } else if (file.fieldname === 'our_story_woman') {
              req.headers.photoLocations.ourStoryWoman.push({photo_url: `${process.env.BASE_URL}/wedding_media/${nameFile}`, wedding_reception_id: +receptionId})
            }
            resolve({ Location: `${nameFile}` })
          });
        }));
      });
    }

    Promise.all(uploadPromises)
      .then((results) => {
        next()
      }) // Call next middleware after all uploads are done
      .catch((error) => res.status(500).json({ error: error.message }));
  });
}
export {
	upload, uploadMultiple
}

