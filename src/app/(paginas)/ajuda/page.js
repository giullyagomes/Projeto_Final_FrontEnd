"use client"

import * as styles from './styles.module.css';
import { useState, useEffect } from "react";
import Image from "next/image";
import { listarDuvidas } from '@/app/servicos/backforapp-api/duvidas';

const duvidas = [
    {
        titulo: "Comprar",
        icone: "/comprar-icon.svg",
        conteudo: [
            {
                subtitulo: "Como comprar um veículo?",
                texto: (
                    <>
                        <strong>Passo a passo para comprar:</strong>
                        <ol>
                            <li>Crie uma conta ou faça login na plataforma.</li>
                            <li>Utilize os filtros para encontrar o veículo ideal.</li>
                            <li>Clique no anúncio desejado para ver mais detalhes.</li>
                            <li>Entre em contato com o vendedor pelo WhatsApp, telefone ou e-mail disponíveis no anúncio.</li>
                            <li>Negocie diretamente com o vendedor e combine a melhor forma de pagamento e entrega.</li>
                        </ol>
                        <br />
                        <strong>Dica:</strong> Sempre verifique a procedência do veículo e, se possível, faça uma vistoria antes de fechar negócio.
                    </>
                )
            }
        ]
    },
    {
        titulo: "Anunciar",
        icone: "/anunciar-icon.svg",
        conteudo: [
            {
                subtitulo: "Como anunciar meu veículo?",
                texto: (
                    <>
                        <strong>Para anunciar seu veículo:</strong>
                        <ol>
                            <li>Faça login ou crie uma conta na plataforma.</li>
                            <li>Clique em “Anunciar” no menu principal.</li>
                            <li>Preencha todos os dados do veículo, incluindo fotos, preço, descrição e informações de contato.</li>
                            <li>Revise as informações e publique o anúncio.</li>
                        </ol>
                        <br />
                        <strong>Importante:</strong> Anúncios com fotos de boa qualidade e informações completas têm mais chances de venda!
                    </>
                )
            }
        ]
    },
    {
        titulo: "Negociar com o vendedor",
        icone: "/negociar-icon.svg",
        conteudo: [
            {
                subtitulo: "Como negociar com o vendedor?",
                texto: (
                    <>
                        <strong>Negociando com segurança:</strong>
                        <ol>
                            <li>Utilize os canais de contato disponíveis no anúncio (WhatsApp, telefone ou e-mail).</li>
                            <li>Marque uma visita para conhecer o veículo pessoalmente.</li>
                            <li>Negocie valores, formas de pagamento e condições diretamente com o vendedor.</li>
                            <li>Evite pagamentos antecipados sem garantias.</li>
                        </ol>
                        <br />
                        <strong>Dica:</strong> Prefira negociar em locais públicos e, se possível, leve alguém de confiança.
                    </>
                )
            }
        ]
    },
    {
        titulo: "Carros",
        icone: "/carro-icon.svg",
        conteudo: [
            {
                subtitulo: "Dúvidas sobre carros",
                texto: (
                    <>
                        <strong>Principais dúvidas:</strong>
                        <ul style={{ listStyle: "none" }}>
                            <li>Como saber se o carro anunciado está em bom estado?</li>
                            <li>Posso financiar um carro pelo site?</li>
                            <li>Como faço para transferir a documentação?</li>
                        </ul>
                        <br />
                        <strong>Respostas:</strong>
                        <ul style={{ listStyle: "none" }}>
                            <li>Verifique as fotos, descrição e, se possível, agende uma vistoria.</li>
                            <li>O site não faz financiamento direto, mas você pode negociar com o vendedor.</li>
                            <li>A transferência deve ser feita no Detran após a negociação.</li>
                        </ul>
                    </>
                )
            }
        ]
    },
    {
        titulo: "Motocicletas",
        icone: "/moto-icon.svg",
        conteudo: [
            {
                subtitulo: "Dúvidas sobre motocicletas",
                texto: (
                    <>
                        <strong>Principais dúvidas:</strong>
                        <ul style={{ listStyle: "none" }}>
                            <li>Como conferir a procedência da moto?</li>
                            <li>Quais documentos preciso para comprar ou vender uma moto?</li>
                            <li>Posso anunciar motos de qualquer cilindrada?</li>
                        </ul>
                        <br />
                        <strong>Respostas:</strong>
                        <ul style={{ listStyle: "none" }}>
                            <li>Solicite o histórico da moto e faça uma vistoria.</li>
                            <li>É necessário RG, CPF, comprovante de residência e documento da moto.</li>
                            <li>Sim, você pode anunciar motos de qualquer cilindrada.</li>
                        </ul>
                    </>
                )
            }
        ]
    },
    {
        titulo: "Termos de uso",
        icone: "/termos-icon.svg",
        conteudo: [
            {
                subtitulo: "Sobre os termos de uso",
                texto: (
                    <>
                        <strong>O que são os termos de uso?</strong>
                        <br />
                        Os termos de uso são as regras e condições para utilizar a plataforma. Eles garantem a segurança e o bom funcionamento do site para todos os usuários.
                        <br /><br />
                        <strong>Principais pontos:</strong>
                        <ul style={{ listStyle: "none" }}>
                            <li>Respeite as regras de publicação de anúncios.</li>
                            <li>Não publique informações falsas ou enganosas.</li>
                            <li>O descumprimento dos termos pode resultar em banimento da plataforma.</li>
                        </ul>
                        <br />
                        <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer">Clique aqui para ler os termos completos.</a>
                    </>
                )
            }
        ]
    }
];

export default function Ajuda() {
    const [aberto, setAberto] = useState(0);
    const [faqAberto, setFaqAberto] = useState(-1);
    const [duvidasFrequentes, setDuvidasFrequentes] = useState([]);

    useEffect(() => {
        async function fetchDuvidas() {
            try {
                const duvidasApi = await listarDuvidas();
                setDuvidasFrequentes(duvidasApi.data.results);
            } catch (error) {
                setDuvidasFrequentes([]);
            }
        }
        fetchDuvidas();
    }, []);

    return (
        <main className={styles.ajuda_main}>
            <div className={styles.ajuda_container}>
                <h2 className={styles.ajuda_titulo}>Sobre o que é a sua dúvida?</h2>
                <div className={styles.ajuda_acordion_lista}>
                    {duvidas.map((item, idx) => (
                        <div
                            className={`${styles.ajuda_acordion_item} ${aberto === idx ? styles.ajuda_acordion_item_ativo : ""}`}
                            key={item.titulo}
                        >
                            <button
                                className={styles.ajuda_acordion_btn}
                                onClick={() => setAberto(aberto === idx ? -1 : idx)}
                            >
                                <span>
                                    <Image src={item.icone} alt="" width={28} height={28} />
                                    {item.titulo}
                                </span>
                                <span className={styles.ajuda_acordion_seta}>{aberto === idx ? "▲" : "▼"}</span>
                            </button>
                            {aberto === idx && item.conteudo.length > 0 && (
                                <div className={styles.ajuda_acordion_conteudo}>
                                    {item.conteudo.map((conteudo, i) => (
                                        <div key={i}>
                                            <h4>
                                                <Image src="/cadastro-icon.svg" alt="" width={20} height={20} style={{marginRight: 8}} />
                                                {conteudo.subtitulo}
                                            </h4>
                                            <div className={styles.ajuda_acordion_texto}>{conteudo.texto}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.ajuda_faq}>
                <h3>Dúvidas frequentes:</h3>
                <div className={styles.ajuda_faq_lista}>
                    {duvidasFrequentes.length === 0 && (
                        <p style={{ color: "#888", textAlign: "center" }}>Nenhuma dúvida frequente encontrada.</p>
                    )}
                    {duvidasFrequentes && duvidasFrequentes.map((item, idx) => (
                        <div
                            key={idx}
                            className={`${styles.ajuda_faq_item} ${faqAberto === idx ? styles.ajuda_faq_item_ativo : ""}`}
                        >
                            <button
                                className={styles.ajuda_faq_btn}
                                onClick={() => setFaqAberto(faqAberto === idx ? -1 : idx)}
                            >
                                <span>{item.titulo}</span>
                                <span className={styles.ajuda_acordion_seta}>{faqAberto === idx ? "▲" : "▼"}</span>
                            </button>
                            {faqAberto === idx && (
                                <div className={styles.ajuda_faq_resposta}>
                                    {item.resposta}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}