'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatHeader from "@/components/chat/chatheader";
import { getOrCreateConversation } from '@/app/api/ConservationApi';
import { getCurrentMember } from "@/app/api/MemberApi";
import { getProfileById } from '@/app/api/ProfileApi';
import { ChatMessages } from '@/components/chat/chat-message';
import ChatInput from '@/components/chat/chat-input';
import { MediaRoom } from '@/components/media-room';

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

  const baseUrl = process.env.BASE_URL || "http://localhost";

  const apiUrl = `${baseUrl}:4869/api/direct-messages`;


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
      const fetchedConversation = await getOrCreateConversation(fetchedCurrentMember.id, params.memberId, token);
      if (!fetchedConversation) {
        router.push(`/servers/${params.serverId}`);
        return;
      }
      setConversation(fetchedConversation);
      const { memberOne, memberTwo } = fetchedConversation;
      setOtherMember(memberOne.profileId === fetchedProfile.data.id ? memberTwo : memberOne);


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
      {searchParams.video && (
        <MediaRoom
          chatId={conversation.id}
          video={true}
          audio={true}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type='conversation'
            apiUrl={apiUrl}
            socketUrl="/api/socket/direct-messages"
            paramKey='conversationId'
            paramValue={conversation.id}
            socketQuery={{ conversationId: conversation.id }} />
          <ChatInput name={otherMember.profile.name}
            type='conversation'
            apiUrl={apiUrl}
            query={{ conversationId: conversation.id }} />
        </>
      )}
    </div>
  );
};

export default MemberIdPage;
