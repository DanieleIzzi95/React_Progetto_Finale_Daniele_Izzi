import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import supabase from "../../Supabase/Client";
import { useNavigate, Link } from 'react-router';

export default function Login() {
    const toast = useRef(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault()
        const formRegister = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(formRegister));
        let { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            formRegister.reset();
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Accesso non riuscito a causa di un errore sconosciuto. Riprova',
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
                detail: 'Accesso avvenuto con successo, bentornato!',
                life: 3000,
                content: (props) => (
                    <div className="flex flex-column align-items-left w-100" >
                        <div className="flex align-items-center gap-2">
                            <span className="big-body">Ottimo!</span>
                        </div>
                        <div className="small-body text-lg my-1">{props.message.detail}</div>
                    </div>
                )
            });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            formRegister.reset();
            navigate(-1);
        }
    }

    return (
        <>
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
                <div className="form-container mb-5 pb-5">
                    <Toast ref={toast} />
                    <p className="title">Accedi</p>
                    <form
                        onSubmit={handleLogin}
                        className="form">
                        <div className="input-group">
                            <label className="caption mt-2" htmlFor="email">Mail</label>
                            <input required type="email" name="email" id="email" placeholder="" />
                        </div>
                        <div className="input-group">
                            <label className="caption mt-2" htmlFor="password">Password</label>
                            <input className='mb-3' required type="password" name="password" id="password" placeholder="" />
                        </div>
                        <button type="submit" className="sign">Accedi</button>
                    </form>
                    <p className="signup mt-3 caption">Non hai un account?
                        <Link to="/register" rel="noopener noreferrer" href="#" className="caption"> Registrati</Link>
                    </p>
                </div>
            </div>
        </>
    )
}