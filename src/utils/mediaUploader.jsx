const url = "https://syayalaeaslqjftarggl.supabase.co"
const key="sb_publishable_jxSOIGidm8ni0Tk-CjW5Eg_LwOaZ5uA"

import { createClient } from "@supabase/supabase-js"
const supabase =createClient(url,key);

export default function uploadFile(file){

    const promise=new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("Please select a file to upload");
                return;
            }
            const timeStamp =new Date().getTime();
            const fileName = timeStamp +"-"+ file.name

            supabase.storage.from("profile images").upload(fileName,file,{
cacheControl:"3600",
upsert:false
            }).then(
                ()=>{

           const publicUrl =  supabase.storage.from("profile images").getPublicUrl(fileName).data.publicUrl;
           
            resolve(publicUrl)
        }
    ).catch(
        ()=>{
           
            reject("Failed to uplaod file");
        }
    )
}
)

    return promise;
}