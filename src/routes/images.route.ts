import express from 'express';
import path from 'path';

const router = express.Router();
// ruta para responder a las imagenes de los lideres
router.get('/:name',
async(req,res,next)=>{
   try {
    const nameImg = req.params.name;
    const imagePath = path.join(__dirname, '../../images', nameImg);
    res.sendFile(imagePath);
   } catch (error) {
    next(error);
   }
});


export default router;