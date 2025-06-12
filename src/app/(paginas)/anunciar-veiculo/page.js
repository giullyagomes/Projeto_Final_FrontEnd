"use client"

import * as styles from "./styles.module.css"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { criarVeiculo } from "@/app/servicos/criar-veiculo";
import { useEffect } from "react";

export default function AnunciarVeiculo() {
    const schema = z.object({
        marca: z.string().nonempty({ message: "Digite a marca." }),
        preco: z.preprocess(
            (val) => Number(val),
            z.number().min(0, { message: "Digite um preço válido." })
        ),
        tipo: z.enum(["Carro", "Moto"], { message: "Selecione o tipo do veículo." }),
        modelo: z.string().nonempty({ message: "Digite o modelo." }),
        ano: z.string().nonempty({ message: "Digite o ano." }),
        quilometragem: z.preprocess(
            (val) => Number(val),
            z.number().min(0, { message: "Digite quilometragem válida." })
        ),
        cidadeVenda: z.string().nonempty({ message: "Digite a cidade da venda." }),
        estadoVenda: z.string().nonempty({ message: "Digite o estado da venda." }),
        combustivel: z.string().nonempty({ message: "Digite o tipo de combustível." }),
        contato: z.string().nonempty({ message: "Digite o número para contato." }),
        cambio: z.string().nonempty({ message: "Digite o tipo de câmbio." }),
        whatsapp: z.string().nonempty({ message: "Digite o número do WhatsApp." }),
        cor: z.string().nonempty({ message: "Digite a cor." }),
        categoria: z.enum(["A", "B", "C", "D", "E"], { message: "Selecione a categoria." }),
        fotos: z.string().nonempty({ message: "Insira os links para as fotos" }),
    });

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    }); 

    const onSubmit =  async (data) => {
        const idVendedor = localStorage.getItem("id_vendedor")
        await criarVeiculo(data, idVendedor);
    }

    useEffect(() => {
        const sessionToken = localStorage.getItem("session-token");
        if (!sessionToken) {
            window.location.href = "/login";
        }
    }, []);

    return (
        <main>
            <section className={styles.container}>
                <section className={styles.inputs}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
                        <h1>Venda seu veículo com facilidade ou descubra as melhores ofertas <br /> Anuncie já e comece a negociar!</h1> <br />
                        <div>
                            <label>Marca:</label>
                            <input
                                type="text"
                                {...register("marca")}
                                placeholder="Digite a marca"
                            />
                            {errors.marca && <span className={styles.input_erro}>{errors.marca.message}</span>}
                        </div>
                        <div>
                            <label>Preço:</label>
                            <input
                                type="number"
                                {...register("preco")}
                                placeholder="Digite o preço"
                            />
                            {errors.preco && <span className={styles.input_erro}>{errors.preco.message}</span>}
                        </div>
                        <div>
                            <label>Tipo de veículo:</label>
                            <select {...register("tipo")}>
                                <option value="">Selecione</option>
                                <option value="Carro">Carro</option>
                                <option value="Moto">Moto</option>
                            </select>
                            {errors.tipo && <span className={styles.input_erro}>{errors.tipo.message}</span>}
                        </div>
                        <div>
                            <label>Modelo:</label>
                            <input
                                type="text"
                                {...register("modelo")}
                                placeholder="Digite o modelo"
                            />
                            {errors.modelo && <span className={styles.input_erro}>{errors.modelo.message}</span>}
                        </div>
                        <div>
                            <label>Ano:</label>
                            <input
                                type="text"
                                {...register("ano")}
                                placeholder="Digite o ano"
                            />
                            {errors.ano && <span className={styles.input_erro}>{errors.ano.message}</span>}
                        </div>
                        <div>
                            <label>Quilometragem:</label>
                            <input
                                type="number"
                                {...register("quilometragem")}
                                placeholder="Digite a quilometragem"
                            />
                            {errors.quilometragem && <span className={styles.input_erro}>{errors.quilometragem.message}</span>}
                        </div>
                        
                        <div>
                            <label>Cidade da venda:</label>
                            <input
                                type="text"
                                {...register("cidadeVenda")}
                                placeholder="Digite a cidade da venda"
                            />
                            {errors.cidadeVenda && <span className={styles.input_erro}>{errors.cidadeVenda.message}</span>}
                        </div>
                        <div>
                            <label>Estado da venda:</label>
                            <input
                                type="text"
                                {...register("estadoVenda")}
                                placeholder="Digite o estado da venda"
                            />
                            {errors.estadoVenda && <span className={styles.input_erro}>{errors.estadoVenda.message}</span>}
                        </div>
                        <div>
                            <label>Tipo de combustível:</label>
                            <input
                                type="text"
                                {...register("combustivel")}
                                placeholder="Digite o tipo de combustível"
                            />
                            {errors.combustivel && <span className={styles.input_erro}>{errors.combustivel.message}</span>}
                        </div>
                        <div>
                            <label>Número para contato:</label>
                            <input
                                type="text"
                                {...register("contato")}
                                placeholder="Digite o número para contato"
                            />
                            {errors.contato && <span className={styles.input_erro}>{errors.contato.message}</span>}
                        </div>
                        <div>
                            <label>Tipo de câmbio:</label>
                            <input
                                type="text"
                                {...register("cambio")}
                                placeholder="Digite o tipo de câmbio"
                            />
                            {errors.cambio && <span className={styles.input_erro}>{errors.cambio.message}</span>}
                        </div>
                        <div>
                            <label>Número do WhatsApp:</label>
                            <input
                                type="text"
                                {...register("whatsapp")}
                                placeholder="Digite o número do WhatsApp"
                            />
                            {errors.whatsapp && <span className={styles.input_erro}>{errors.whatsapp.message}</span>}
                        </div>
                        <div>
                            <label>Cor:</label>
                            <input
                                type="text"
                                {...register("cor")}
                                placeholder="Digite a cor"
                            />
                            {errors.cor && <span className={styles.input_erro}>{errors.cor.message}</span>}
                        </div>
                        <div>
                            <label>Categoria:</label>
                            <select {...register("categoria")}>
                                <option value="">Selecione</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>
                            {errors.categoria && <span className={styles.input_erro}>{errors.categoria.message}</span>}
                        </div>
                        <div>
                            <label>Fotos:</label>
                            <input
                                type="text"
                                {...register("fotos")}
                                placeholder="Links separados por vírgula"
                            />
                            {errors.fotos && <span className={styles.input_erro}>{errors.fotos.message}</span>}
                        </div>
                        <button type="submit">Anunciar</button>
                    </form>
                </section>
            </section>
        </main>
    )
}