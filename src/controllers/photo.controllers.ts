import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';


import photo from '../models/photo';


// export function mensaje(req: Request, res: Response): Response {
//     return res.send('hello world');
// }

export async function getPhotos(req: Request, res: Response): Promise<Response>{
    const Photo = await photo.find();
    return res.json(Photo);   
}

export async function getPhoto(req: Request, res: Response): Promise<Response>{
    const Photo = await photo.findById(req.params.id);
    return res.json(Photo);
}

export async function createPhoto(req: Request, res: Response): Promise<Response>{

    const { title, description } = req.body;
    
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file?.path
    };
    const Photo = new photo(newPhoto);
    await Photo.save();

    return res.json({
        message: 'Photo successfully saved',
        Photo
    })
};

export async function deletePhoto(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const Photo = await photo.findByIdAndRemove(id);
    if (Photo){
        await fs.unlink(path.resolve(Photo.imagePath))
    }

    return res.json({
        message: 'Photo successfully deleted',
        Photo
    });
};

export async function updatePhoto(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.body);
    const updatePhoto = await photo.findByIdAndUpdate(id, {
        title,
        description
    }, {new: true});

    return res.json({
        message: 'Photo successfully updated',
        updatePhoto
    })
}

