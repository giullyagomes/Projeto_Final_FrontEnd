"use client"

import * as styles from './styles.module.css';
import { cadastroUsuario } from '@/app/servicos/backforapp-api/cadastro';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export default function Cadastro () {
    const router = useRouter();

    const schema = z.object({
        nome: z.string().min(2, { message: "Digite um sobrenome com 2 ou mais caracteres." }),
        sobrenome: z.string().min(2, { message: "Digite um sobrenome com 2 ou mais caracteres." }),
        email: z.string().email({ message: "Digite um e-mail válido." }),
        cpf: z.string().min(11, { message: "Digite um CPF válido." }),
        data_nascimento: z.string().min(1, { message: "Informe a data de nascimento." }),
        senha: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
        confirmar_senha: z.string().min(6, { message: "Confirme sua senha." }),
        celular: z.string().min(11, { message: "Digite um celular válido." }),
    }).refine((data) => data.senha === data.confirmar_senha, {
        message: "As senhas não coincidem.",
        path: ["confirmar_senha"],
    });

    const { handleSubmit, register, formState } = useForm({
        resolver: zodResolver(schema),
    }); 

    const onSubmit =  async (data) => {
        try {
            console.log(data)
            const sessionToken = localStorage.getItem("session-token");
            const resultado = await cadastroUsuario(
                data.nome,
                data.sobrenome,
                data.email,
                data.cpf,
                data.data_nascimento,
                data.celular,
                data.senha
            );

            localStorage.setItem("session-token", resultado.data.sessionToken);

            router.push("/");
        } catch (erro) {
            console.error(`Algo deu errado ao tentar fazer login. Tente novamente mais tarde. ${erro}`);
        }
    }

    return (
        <main className={styles.container}>
            <h1>Seja bem-vindo ao AutoFácil! </h1>
            <h2>Cadastre-se agora e comece a explorar seu veículo ideal!</h2>
            <section className={styles.inputs_principais}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                {...register("nome")}
                                placeholder="Digite seu nome"
                            />
                            {formState.errors.nome && <span className={styles.input_erro}>{formState.errors.nome.message}</span>}
                        </div>
                        <label>Sobrenome:</label>
                        <input
                            type="text"
                            {...register("sobrenome")}
                            placeholder="Digite seu sobrenome"
                        />
                        {formState.errors.sobrenome && <span className={styles.input_erro}>{formState.errors.sobrenome.message}</span>}
                    </div>
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
                        <label>Celular:</label>
                        <input
                            {...register("celular")}
                            placeholder="Digite seu celular"
                        />
                        {formState.errors.celular && <span className={styles.input_erro}>{formState.errors.celular.message}</span>}
                    </div>
                    <div>
                        <label>CPF:</label>
                        <input
                            type="text"
                            {...register("cpf")}
                            placeholder="Digite seu CPF"
                        />
                        {formState.errors.cpf && <span className={styles.input_erro}>{formState.errors.cpf.message}</span>}
                    </div>
                    <div>
                        <label>Data de nascimento:</label>
                        <input
                            type="date"
                            {...register("data_nascimento")}
                            placeholder="Data de nascimento"
                        />
                        {formState.errors.data_nascimento && <span className={styles.input_erro}>{formState.errors.data_nascimento.message}</span>}
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
                    <div>
                        <label>Confirmar senha:</label>
                        <input
                            type="password"
                            {...register("confirmar_senha")}
                            placeholder="Confirme sua senha"
                        />
                        {formState.errors.confirmar_senha && <span className={styles.input_erro}>{formState.errors.confirmar_senha.message}</span>}
                    </div>
                    <input type="submit" value="Cadastrar" />
                </form>
            </section>
        </main>
    )
}