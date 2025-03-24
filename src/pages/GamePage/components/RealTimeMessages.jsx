import { useEffect, useState, useRef } from "react";
import supabase from "../../../Supabase/Client";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat);

export default function RealtimeMessages({ gameDetails }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    function scrollSmoothToBottom() {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    const getInitialMessages = async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", gameDetails.id);
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    };

    useEffect(() => {
        if (gameDetails) {
            getInitialMessages();
        }
        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [gameDetails]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    return (
        <>
            <div ref={messageRef}>
            {loadingInitial && <progress></progress>}
            {error && <article>{error}</article>}
            {messages &&
                messages.map((message) => (
                    <article key={message.id}  className="px-3 d-flex align-items-baseline gap-2">
                        <p className="message-chat-date">{dayjs(message.created_at).format('kk:mm')}</p>
                        <p className="username-chat">{message.profile_username}:</p>
                        <p className="message-chat mb-1 p-0">{message.content}</p>
                    </article>
                ))}
        </div>
        </>
    );
}