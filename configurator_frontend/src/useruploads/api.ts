import client from "@/lib/api/client";
import { CreateResponse } from "@/payload-other-types";
import { UserMedia } from "@/payload-types";

export async function uploadImage(image: File) {
    const formData = new FormData();
    formData.set('file', image);
    const { data } = await client.post<CreateResponse<UserMedia>>('/user_medias', formData);
    return data;
}

export async function uploadBase64Image(image: string) {
    const imageFile = dataURLtoFile(image, 'image.jpg');
    return uploadImage(imageFile);
}

function dataURLtoFile(dataurl: string, filename: string) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)![1];
    let bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}