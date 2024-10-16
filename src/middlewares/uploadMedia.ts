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
				// if (file.fieldname === 'wedding_media') {
				// } else if (file.fieldname === 'man_media' || file.fieldname === 'woman_media') {
				// 	location = '../assets/broom_bride_media'
				// }
        const filePath = path.join(__dirname, location, `${date}-${file.originalname}`); // Define file path

        // Push a promise to upload the file
        uploadPromises.push(new Promise((resolve, reject) => {
          fs.rename(file.path, filePath, (err) => { // Move file to the desired location
            if (err) {
              return reject(err);
            }
            const {receptionId} = req.params
            if (file.fieldname === 'wedding_media') {
              req.headers.photoLocations.weddingMedia.push({photo_url: `${process.env.BASE_URL}/wedding_media/${date}-${file.originalname}`, wedding_reception_id:+receptionId})
            } else if (file.fieldname === 'man_media') {
              req.headers.photoLocations.manMedia.push({photo_url: `${process.env.BASE_URL}/wedding_media/${date}-${file.originalname}`, wedding_reception_id:+receptionId})
            } else if (file.fieldname === 'woman_media') {
              req.headers.photoLocations.womanMedia.push({photo_url: `${process.env.BASE_URL}/wedding_media/${date}-${file.originalname}`, wedding_reception_id: +receptionId})
            } else if (file.fieldname === 'our_story_man') {
              req.headers.photoLocations.ourStoryMan.push({photo_url: `${process.env.BASE_URL}/wedding_media/${date}-${file.originalname}`, wedding_reception_id: +receptionId})
            } else if (file.fieldname === 'our_story_woman') {
              req.headers.photoLocations.ourStoryWoman.push({photo_url: `${process.env.BASE_URL}/wedding_media/${date}-${file.originalname}`, wedding_reception_id: +receptionId})
            }
            resolve({ Location: `${date}-${file.originalname}` })
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
};

// const uploadMultiple = (req: any, res: any, next: any) => {
// 	console.log("ini upload multiple");
//   upload.array("wedding_media", 5)(req, res, (err: any) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     const files = req.files;

//     if (!files || files.length === 0) {
//       req.s3FileUrls = []
//       return next()
//     }

//     // Upload each file to the local 'assets' folder
//     const uploadPromises = files.map((file: any) => {
//       const myFile = file.originalname.split(".");
//       const fileType = myFile[myFile.length - 1];
//       const filePath = path.join(__dirname, '../assets/', `${uuid()}.${fileType}`); // Define file path

//       return new Promise((resolve, reject) => {
//         fs.writeFile(filePath, file.buffer, (err) => { // Write file to local folder
//           if (err) {
// 						console.log(err, '<<<< err')
//             return reject(err);
//           }
//           resolve({ Location: filePath }); // Resolve with file path
//         });
//       });
//     });

// 		Promise.all(uploadPromises)
//   });
// 	return next()
// };
export {
	upload, uploadMultiple
}
// Initialize upload

