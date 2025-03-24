import { useRef, useState } from "react";
import supabase from "../../../Supabase/Client"
import { Toast } from "primereact/toast";
import { Link } from "react-router";

export default function Chat({ gameDetails, session }) {
    const toast = useRef(null)
    const { setMessage } = useState("")
    const textareaRef = useRef(null)


    //* CHAT CON ALTEZZA DINAMICA
    const handleChange = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
        setMessage(e.target.value);
    };

    async function handleMessageSubmit(event) {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase
                .from("messages")
                .insert([
                    {
                        profile_id: session.user.id,
                        profile_username: session.user.user_metadata.username,
                        game_id: gameDetails.id,
                        content: message,
                    },
                ])
                .select();
            if (error) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Errore, messaggio non inviato.`,
                    life: 3000,
                    content: (props) => (
                        <div className="flex flex-column align-items-left" >
                            <div className="flex align-items-center gap-2">
                                <span className="big-body">Attenzione</span>
                            </div>
                            <div className="caption text-lg my-1">{props.message.detail}</div>
                        </div>
                    )
                })
            } else {
                inputMessage.reset();
                setMessage("");
                if (textareaRef.current) {
                    textareaRef.current.style.height = "auto"
                }
            }
        }
    }

    return (
        <>
            <div className="col-12 d-flex flex-column justify-content-start align-items-center">
                <Toast ref={toast} />
                <form
                    onSubmit={handleMessageSubmit}
                    className="w-100 container-message" >
                    <div className="w-100 d-flex align-items-end">
                        <textarea
                            onChange={handleChange}
                            ref={textareaRef}
                            className="w-100 border-0 rounded-3 py-2 me-2" type="text" name="message" placeholder="Scrivi un messaggio..." />
                        {session ? (
                            <button
                                className="mt-2 d-flex c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0"
                                type="submit"
                                value="Invia"
                            >
                                <i className="bi bi-send fs-6 c-text-acc me-2"></i> Invia
                            </button>
                        ) : (
                            <Link to="/login" >
                                <button
                                    className="mt-2 d-flex c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0"
                                    type="button"
                                >
                                    <i className="bi bi-lock fs-6 c-text-acc me-2"></i>  Accedi
                                </button>
                            </Link>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}
