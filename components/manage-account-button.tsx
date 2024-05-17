"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { UserAvatar } from "./UserAvatar"

export const  ManageAccountButton = ({profileId}:{profileId : string})  => {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        router.push('/login');
      };

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="rounded-full overflow-hidden">
                <UserAvatar profileId={profileId} />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                Tài khoản
                </DropdownMenuItem>
            <DropdownMenuItem>
                Hồ sơ
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
                Đăng xuất
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}
