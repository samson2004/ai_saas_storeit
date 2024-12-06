// lib/utility/multer.js
import multer from 'multer';
import nc from 'next-connect';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), 'public/uploads');
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})



export const upload = multer({ storage });


// const handler=nc();

// handler.use(uploadFile);
// handler.post((req,res)=>{
//   console.log(req.file);
//   console.log(req.body);
//   res.status(200).send('Uploaded File')
// })
// export default handler;

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js default body parser to use multer
//   },
// };
