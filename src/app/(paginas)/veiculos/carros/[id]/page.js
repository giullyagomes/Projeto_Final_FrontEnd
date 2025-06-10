"use client"

import { listarCarrosPorId } from '@/app/servicos/backforapp-api/listagem-veiculos';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buscarVendedorPorId } from '@/app/servicos/backforapp-api/vendedores';

import * as styles from './styles.module.css';
import Image from 'next/image';

export default function PaginaCarroPorId () {
    const params = useParams();
    const id = params.id;
    const [carro, setCarro] = useState(null);
    const [vendedor, setVendedor] = useState(null);

    const handleBuscarCarroPorId = async () => {
        const sessionToken = localStorage.getItem("session-token");
        const carroEncontrado = await listarCarrosPorId(sessionToken, id);
        setCarro(carroEncontrado.data.results[0]);
        handleBuscarVendedorPorId(sessionToken, carroEncontrado.data.results[0].id_vendedor);
    }

    const handleBuscarVendedorPorId = async (sessionToken, id) => {
        const vendedor = await buscarVendedorPorId(sessionToken, id);
        setVendedor(vendedor.data.results[0]);
    }

    useEffect(() => {
        handleBuscarCarroPorId();
    }, [])

    return (
        <>
            <main>
                {carro && vendedor && (<>
                    <section className={styles.section_header}>
                        <div className={styles.imagens}>
                            <Image src={carro.fotos[0]} width={970.5} height={647} alt="Primeira foto do carro" />
                            <div>
                                <Image src={carro.fotos[1]} width={278.67} height={209} alt="Segunda foto do carro" />
                                <Image src={carro.fotos[2]} width={278.67} height={209} alt="Terceira foto do carro" />
                                <Image src={carro.fotos[3]} width={278.67} height={209} alt="Quarta foto do carro" />
                            </div>
                        </div>
                    </section>
                    <section className={styles.section_detalhes}>
                        <div className={styles.section_detalhes__divs}>
                            <h1>{carro.marca} {carro.modelo}</h1> <br />
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/quilometragem-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Quilometragem</span>
                                </div>
                                <span className={styles.span_dados}>{carro.quilometragem} km</span>
                            </div>
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/combustivel-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Combustível</span>
                                </div>
                                <span className={styles.span_dados}>{carro.tipo_combustivel} km</span>
                            </div>
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/data-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Ano</span>
                                </div>
                                <span className={styles.span_dados}>{carro.ano}</span>
                            </div>  
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/cor-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Cor</span>
                                </div>
                                <span className={styles.span_dados}>{carro.cor}</span>
                            </div> 
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/localizacao-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Localização</span>
                                </div>
                                <span className={styles.span_dados}>{carro.estado_venda}/{carro.cidade_venda}</span>
                            </div>  
                            <div className={styles.section_detalhes__descricao}>
                                <div className={styles.section_detalhes__descricao__icone}>
                                    <Image src={"/cambio-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                    <span>Câmbio</span>
                                </div>
                                <span className={styles.span_dados}>{carro.tipo_cambio}</span>
                            </div>  
                        </div>
                        <div className={styles.dados_vendedor}>
                            <span>R$ {Number(carro.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            <p>Negociar com o vendedor?</p>
                            <p className={styles.nome_vendedor}>{vendedor.nome}</p>
                            <div className={styles.vendedor_whatsapp}>
                                <Image src={"/whatsapp-icon.svg"} width={24} height={24} alt="Ícone de quilometragem" />
                                <a href={`https://api.whatsapp.com/send?phone=55${vendedor.celular}&text=Olá, gostaria de saber mais sobre o carro ${carro.marca} ${carro.modelo} que encontrei no site.`} target="_blank" rel="noopener noreferrer">{vendedor.celular}</a>
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

