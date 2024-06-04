"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { createProfile, getProfileById } from "@/app/api/ProfileApi";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";

export const UserAvatar = ({ profileId }: { profileId: string }) => {
    const { onOpen } = useModal();

    const [profile, setProfile] = useState([])
    const [imageSrc, setImageSrc] = useState("");
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        router.push('/login');
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            if (token != null) {
                const response = await getProfileById(token)
                    .then((res) => {
                        if (res.status == 200 && res.data != null) {
                            setProfile(res.data)
                            if (typeof window !== 'undefined') {
                                sessionStorage.setItem('profileId', res.data.id);
                                sessionStorage.setItem('name', res.data.name);
                                sessionStorage.setItem('avatarUrl', res.data.imageUrl);
                            }
                            setImageSrc(res.data.imageUrl)

                        }
                        try{
                        if (res.status == 200 && res.data.name == "") {
                            const res2 = createProfile(res.data.user.displayName, token);
                            fetchData();
                        }}
                        catch(err){
                            window.location.href = "/error/user"
                        }
                    })
            }
        };
        fetchData();
    }, [profileId]);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="group flex relative items-center mb-3">
                        <div className="relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden">
                            {imageSrc !== "" && <Image
                                fill
                                src={imageSrc}
                                alt="Ảnh"
                            />}
                            {imageSrc === "" && <DiscordLogoIcon className="m-auto" />}
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => onOpen("changePassword")}>
                            Đổi mật khẩu
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onOpen("editProfile")}>
                            Hồ sơ
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        Đăng xuất
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}