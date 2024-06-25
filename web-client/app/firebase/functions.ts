import exp from "constants";
import { response } from "express";
import {getFunctions,httpsCallable} from "firebase/functions";

const functions = getFunctions();

const generateUploadUrlFunction = httpsCallable(functions,`generateUploadUrl`);
// creaitnga  asynchoronosu wrapper

export async function uploadVideo(file:File) {

    const response: any = await generateUploadUrlFunction({

        fileExtension: file.name.split('.').pop()      
    });

    // upload the file via the signed URL

    await fetch (response?.data?.url,{
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type':file.type

        }


    }); // ? = if the data is undefined 

    return;
    
}

