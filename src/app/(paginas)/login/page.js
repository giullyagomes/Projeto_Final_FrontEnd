"use client"

import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import * as styles from "./styles.module.css";
import useMenuLateralEstaAberto from "@/app/servicos/hooks/useMenuLateralEstaAberto";
import { fazerLogin } from "@/app/servicos/backforapp-api/api";

export default function Login() {
    const menuLateralAberto = useMenuLateralEstaAberto(estado => estado.menuLateralAberto);
    const [largura, setLargura] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    const schema = z.object({
        email: z.string().email({ message: "Email inválido." }),
        senha: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres." }),
    });

    const { handleSubmit, register, formState } = useForm({
        resolver: zodResolver(schema),
    }); 

    const onSubmit =  async (data) => {
        try {
            const resultado = await fazerLogin(data.email, data.senha);
            localStorage.setItem("session-token", resultado.data.sessionToken);
        } catch (erro) {
            console.error(`Algo deu errado ao tentar fazer login. Tente novamente mais tarde.`);
        }
    }

    useEffect(() => {
        const handleResize = () => setLargura(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <main className={styles.container}>
                <div className={`${styles.div_separadora} ${menuLateralAberto && largura <= 885 ? styles.div_blur : ""}`}>
                    <div className={styles.container_formulario}>
                        <h1>Que bom te ver de volta!</h1>
                        <h2>Faça login e continue sua busca pelo carro ideal.</h2>
                        <p>Não tem uma conta? <span>Cadastre-se.</span></p>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
                            <section className={styles.inputs_principais}>
                                <div>
                                    <label>E-mail:</label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder="Digite seu e-mail"
                                    />
                                    {formState.errors.email && <span className={styles.input_erro}>{formState.errors.email.message}</span>}
                                </div>
                                <div>
                                    <label>Senha:</label>
                                    <input
                                        type="password"
                                        {...register("senha")}
                                        placeholder="Digite sua senha"
                                    />
                                    {formState.errors.senha && <span className={styles.input_erro}>{formState.errors.senha.message}</span>}
                                </div>
                            </section>
                            <section className={styles.inputs_secundarios}>
                                <div>
                                    <input type="checkbox" />
                                    <label>Mantenha-me conectado</label>
                                </div>
                                <Link href="#">Esqueceu sua senha?</Link>
                            </section>
                            <input type="submit" value="Entrar" />
                        </form>        
                        <p className={styles.p_politica_privacidade}>Verifique a nossa <u>Política de Privacidade</u> e <u>Termos de Uso</u>.</p> 
                    </div>
                    <Image src="imagem-principal-login.svg" alt="Imagem principal" width={732} height={935.81}  />     
                </div>
            </main>            
        </>
    )
}