"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { createProfile, getProfileById } from "@/app/api/ProfileApi";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { DiscordLogoIcon } from "@radix-ui/react-icons";

export const UserAvatar = ({profileId}:{profileId : string}) =>{

    const [profile,setProfile] = useState([])
    const [imageSrc,setImageSrc] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            if(token!=null){
                const response = await getProfileById(token)
                .then((res) => {
                    if(res.status == 200 && res.data !=null){
                        setProfile(res.data)
                        setImageSrc(res.data.imageUrl)
                    }
                    if(res.status == 200 && res.data.name == ""){
                        const res2 = createProfile(res.data.user.displayName, token);
                        fetchData();
                    }
                })
            }
        };
        fetchData();
    }, [profileId]);

   return (
        <div>
        <button className="group flex relative items-center mb-3">
            <div className="relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden">
                {imageSrc !== "" &&<Image
                    fill
                    src= {imageSrc}
                    alt= "https://utfs.io/f/f80a95aa-c01a-4049-9563-baf30e9b1ad2-ar4agn.png"
                />}
                {imageSrc === "" && <DiscordLogoIcon className="m-auto"/>}
            </div>
        </button>

    </div>
   )
}