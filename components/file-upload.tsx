"use client"
import { UploadDropzone } from "@/app/api/uploadthing/uploadthing";
import {X} from "lucide-react";
import "@uploadthing/react/styles.css"
import Image from "next/image";
interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImageUploader";
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps)=>{
    const fileType = value?.split(".").pop();
    if(value && fileType !=="pdf"){
        return(
            <div className="relative h-24 w-24 ">
                <Image
                    fill
                    src={value}
                    alt="Uploading"
                    className="rounded-full"
                />
                <button
                    onClick={()=>onChange("")}
                    className = "bg-rose-600 text-white p-1 rounded-full absolute top-0 right-0"
                    type="button"
                >
                    <X className ="h-4 w-4 " />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint = {endpoint}
            onClientUploadComplete=
            {(res:any)=>{
                onChange(res?.[0].url);
            }}
            onUploadError={
                (error:Error)=>{
                    console.log(error);
                }
            }
        />     
    )
}