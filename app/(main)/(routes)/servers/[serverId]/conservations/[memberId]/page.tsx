import ChatHeader from "@/components/chat/chatheader";
import { redirect } from "next/navigation";
import { getOrCreateConversation } from '@/app/api/ConservationApi';
import { getCurrentMember } from "@/app/api/MemberApi";


interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  },
  searchParams: {
    video?: boolean;
  }
}

const MemberIdPage = async ({
  params,
  searchParams,
}: MemberIdPageProps) => {
  
  const profile = 
  {
    id: "1",
    name: "John Doe",
    imageUrl: "https://randomuser.me/api/port"
  }

  if (!profile) {
    return redirect("/login");
  }

  const currentMember = await getCurrentMember(params.serverId,process.env.NEXT_PUBLIC_TOKEN);

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId,process.env.NEXT_PUBLIC_TOKEN);

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;


const MemberIdPage = () =>{
    return (
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
      </div>
      )
}
}

export default MemberIdPage;

