"use client"

import { listarMotoPorId } from '@/app/servicos/backforapp-api/listagem-motos';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buscarVendedorPorId } from '@/app/servicos/backforapp-api/vendedores';

import * as styles from './styles.module.css';
import Image from 'next/image';

export default function PaginaMotoPorId () {
    const params = useParams();
    const id = params.id;
    const [moto, setMoto] = useState(null);
    const [vendedor, setVendedor] = useState(null);

    const handleBuscarMotoPorId = async () => {
        const sessionToken = localStorage.getItem("session-token");
        const motoEncontrada = await listarMotoPorId(sessionToken, id);
        setMoto(motoEncontrada.data.results[0]);
        handleBuscarVendedorPorId(sessionToken, motoEncontrada.data.results[0].id_vendedor);
    }

    const handleBuscarVendedorPorId = async (sessionToken, id) => {
        const vendedor = await buscarVendedorPorId(sessionToken, id);
        setVendedor(vendedor.data.results[0]);
    }

    useEffect(() => {
        handleBuscarMotoPorId();
    }, [])

    return (
        <>
            <main>
                {moto && vendedor && (<>
                    <section className={styles.section_header}>
                        <div className={styles.imagens}>
                            <Image src={moto.fotos[0].trim()} width={970.5} height={647} alt="Primeira foto da moto" />
                            <div>
                                <Image src={moto.fotos[1].trim()} width={278.67} height={209} alt="Segunda foto da moto" />
                                <Image src={moto.fotos[2].trim()} width={278.67} height={209} alt="Terceira foto da moto" />
                                <Image src={moto.fotos[3].trim()} width={278.67} height={209} alt="Quarta foto da moto" />
                            </div>
                        </div>
                    </section>
                    <section className={styles.section_detalhes}>
                        <div className={styles.section_detalhes__divs}>
                            <h1>{moto.marca} {moto.modelo}</h1> <br />
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/quilometragem-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Quilometragem</span>
                                </div>
                                <span className={styles.span_dados}>{moto.quilometragem} km</span>
                            </div>
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/combustivel-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Combustível</span>
                                </div>
                                <span className={styles.span_dados}>{moto.tipo_combustivel} km</span>
                            </div>
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/data-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Ano</span>
                                </div>
                                <span className={styles.span_dados}>{moto.ano}</span>
                            </div>  
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/cor-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Cor</span>
                                </div>
                                <span className={styles.span_dados}>{moto.cor}</span>
                            </div> 
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/localizacao-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Localização</span>
                                </div>
                                <span className={styles.span_dados}>{moto.estado_venda}/{moto.cidade_venda}</span>
                            </div>  
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/cambio-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Câmbio</span>
                                </div>
                                <span className={styles.span_dados}>{moto.tipo_cambio}</span>
                            </div>  
                        </div>
                        <div className={styles.dados_vendedor}>
                            <span>R$ {Number(moto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            <p>Negociar com o vendedor?</p>
                            <p className={styles.nome_vendedor}>{vendedor.nome}</p>
                            <div className={styles.vendedor_whatsapp}>
                                <Image src={"/whatsapp-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                <a href={`https://api.whatsapp.com/send?phone=55${vendedor.celular}&text=Olá, gostaria de saber mais sobre a moto ${moto.marca} ${moto.modelo} que encontrei no site.`} target="_blank" rel="noopener noreferrer">{vendedor.celular}</a>
                            </div>
                            <div className={styles.vendedor_telefone}>
                                <Image src={"/telefone-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                <a href={`#`} target="_blank" rel="noopener noreferrer">{vendedor.celular}</a>
                            </div>
                            <div className={styles.vendedor_email}>
                                <Image src={"/email-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                <a href={`mailto:${vendedor.email}`} target="_blank" rel="noopener noreferrer">{vendedor.email}</a>
                            </div>
                        </div>
                    </section>
                </>)}
            </main>
        </>
    )
}