import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import supabase from "../../Supabase/Client";
import { useNavigate, Link } from 'react-router';

export default function SignUp() {
    const toast = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formRegister = event.currentTarget;
        const { username, email, password, first_name, last_name } = Object.fromEntries(new FormData(formRegister));
        let { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name,
                    last_name,
                    username
                }
            }
        })
        if (error) {
            formRegister.reset();
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Registrazione non riuscita a causa di un errore sconosciuto. Riprova',
                life: 3000,
                content: (props) => (
                    <div className="flex flex-column align-items-left" >
                        <div className="flex align-items-center gap-2">
                            <span className="big-body">Attenzione</span>
                        </div>
                        <div className="caption text-lg my-1">{props.message.detail}</div>
                    </div>
                )
            });
        } else {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Registrazione avvenuta con successo, benvenuto a bordo!',
                life: 2000,
                content: (props) => (
                    <div className="flex flex-column align-items-left" >
                        <div className="flex align-items-center gap-2">
                            <span className="big-body">Ottimo!</span>
                        </div>
                        <div className="small-body text-lg my-1">{props.message.detail}</div>
                    </div>
                )
            });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate("/");
        }
    }

    return (
        <>
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
                <div className="form-container mb-5 pb-5">
                    <Toast ref={toast} />
                    <p className="title">Registrati</p>
                    <form
                        onSubmit={handleSubmit}
                        className="form">
                        <div className="input-group">
                            <label className="caption mt-2" htmlFor="username">Username</label>
                            <input required type="text" name="username" id="username" placeholder="" />
                        </div>
                        <div className="input-group">
                            <label className="caption mt-2" htmlFor="first_name">Nome</label>
                            <input required type="text" name="first_name" id="first_name" placeholder="" />
                        </div>
                        <div className="input-group">
                            <label className="caption mt-2" htmlFor="last_name">Cognome</label>
                            <input required type="text" name="last_name" id="last_name" placeholder="" />
                        </div>
                        <div className="input-group">
                            <label className="caption mt-2" htmlFor="email">Mail</label>
                            <input required type="email" name="email" id="email" placeholder="" />
                        </div>
                        <div className="input-group">
                            <label className="caption mt-2" htmlFor="password">Password</label>
                            <input className='mb-4' required type="password" name="password" id="password" placeholder="" />
                        </div>
                        <button type="submit" className="sign">Registrati</button>
                    </form>

                    <p className="signup mt-3 caption">Hai già un account?
                        <Link to="/login" rel="noopener noreferrer" href="#" className="caption"> Accedi</Link>
                    </p>
                </div>
            </div>
        </>
    )
}