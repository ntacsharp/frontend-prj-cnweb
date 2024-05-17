'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatHeader from "@/components/chat/chatheader";
import { getOrCreateConversation } from '@/app/api/ConservationApi';
import { getCurrentMember } from "@/app/api/MemberApi";
import { getProfileById } from '@/app/api/ProfileApi';
import { ChatMessages } from '@/components/chat/chat-message';
import ChatInput from '@/components/chat/chat-input';

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  },
  searchParams: {
    video?: boolean;
  }
}

const MemberIdPage = ({ params, searchParams }: MemberIdPageProps) => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);
  const [conversation, setConversation] = useState<any>();
  const [otherMember, setOtherMember] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('token');
      
      if (!token) {
        router.push("/login");
        return;
      }

      const fetchedProfile = await getProfileById(token);
      if (!fetchedProfile) {
        router.push("/login");
        return;
      }
      setProfile(fetchedProfile.data);
    
      const fetchedCurrentMember = await getCurrentMember(params.serverId, token);
      if (!fetchedCurrentMember) {
        router.push("/");
        return;
      }
      setCurrentMember(fetchedCurrentMember);
      console.log("b")
      console.log(fetchedCurrentMember)
      const fetchedConversation = await getOrCreateConversation(fetchedCurrentMember.id, params.memberId, token);
      if (!fetchedConversation) {
        router.push(`/servers/${params.serverId}`);
        return;
      }
      setConversation(fetchedConversation);
      console.log("c")
      const { memberOne, memberTwo } = fetchedConversation;
      setOtherMember(memberOne.profileId === fetchedProfile.data.id ? memberTwo : memberOne);
      console.log("d")
    };

    fetchData();
  }, [params.memberId, params.serverId, router]);

  if (!profile || !currentMember || !conversation || !otherMember) {
    return <div>Loading...</div>;
  }
  // Chua co api

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
      <ChatMessages member={currentMember} 
                    name={otherMember.profile.name} 
                    chatId={conversation.id} 
                    type='conversation' 
                    apiUrl='http://localhost:4869/api/direct-messages' 
                    socketUrl="/api/direct-messages" 
                    paramKey='conversationId' 
                    paramValue={conversation.id} 
                    socketQuery={{conversationId : conversation.id}}/>
      <ChatInput name={otherMember.profile.name}
                type='conversation'
                apiUrl='http://localhost:4869/api/direct-messages' 
                query={{conversationId:conversation.id}}/>
    </div>
  );
};

export default MemberIdPage;
