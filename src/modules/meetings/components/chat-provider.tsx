import { LoadingState } from "@/components/loading-state"
import { authClient } from "@/lib/auth-client"
import { ChatUi } from "./chat-ui";


interface Props{
    meetingId: string;
    meetingName: string;
}


export const ChatProvider = ({meetingId,meetingName}:Props) => {

const {data,isPending} = authClient.useSession()


if(isPending|| !data?.user){
    return(
        <LoadingState title="Loading" description="Please wait while we load chat"/>
    )
}


return(
    <ChatUi
    meetingId={meetingId}
    meetingName={meetingName}
    userId={data.user.id}
    userName={data.user.name}
    userImage={data.user.image ?? ""}
    />
)








}