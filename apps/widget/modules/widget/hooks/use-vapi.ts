import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage{
    role: "user" | "assistant";
    text: string;
};

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);


    useEffect(() => {
        //for testing vapi, but customer will provide their own api key
        const vapiInstance = new Vapi("adf9efa5-75fd-4c68-bfc2-05b8ed2cf8c1");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
           setIsConnected(true);
           setIsConnecting(false);
           setTranscript([]); 
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
            setTranscript([]);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.log(error, "vapi error");
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) => {
            if(message.type === "transcript" && message.transcriptType === "final"){
                setTranscript((prev) => [
                    ...prev, 
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript}
                ]);
            }
        });

        return () => {
            vapiInstance.stop(); 
        }
    }, [])


    const startCall = async () => {
        setIsConnecting(true);
        
        //for testing vapi, but customer will provide their own assistance ID
        if(vapi){
            vapi.start("c89a2b3e-7d62-4b76-a886-93f4a5ddf247");
        }
    }

    const endCall = () => {
        if(vapi){
            vapi.stop();
        }
    }

    return { isConnected, isConnecting, isSpeaking, transcript, startCall, endCall };
}