"use client"

import Image from "next/image"
import * as styles from "./styles.module.css";  
import { listarMotos } from "@/app/servicos/backforapp-api/listagem-motos";
import { useState, useEffect } from "react";
import { favoritar, trazerTodosOsFavoritos } from "@/app/servicos/backforapp-api/favoritar";
import Link from "next/link";

const TIPOS_CAMBIO = [
    "Manual",
    "Automático",
    "Automatizado",
    "CVT",
    "Semi-automático"
];

const TIPOS_COMBUSTIVEL = [
    "Gasolina",
    "Etanol",
    "Flex",
    "Diesel",
    "GNV",
    "Elétrico",
    "Híbrido"
];

export default function Motos () {
    const [motos, setMotos] = useState([]);
    const [filtroMarca, setFiltroMarca] = useState('');
    const [filtroModelo, setFiltroModelo] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroCidade, setFiltroCidade] = useState('');
    const [filtroAnoDe, setFiltroAnoDe] = useState('');
    const [filtroAnoAte, setFiltroAnoAte] = useState('');
    const [filtroCambio, setFiltroCambio] = useState('');
    const [filtroCombustivel, setFiltroCombustivel] = useState('');
    const [filtroCor, setFiltroCor] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [favoritos, setFavoritos] = useState([]);

    const handleTrazerTodosOsFavoritos = async () => {
        try {
            const objectId = localStorage.getItem("objectId");
            const resposta = await trazerTodosOsFavoritos(objectId);
            setFavoritos(resposta.data.results);
        } catch (error) {
            console.error("Erro ao trazer todos os favoritos:", error);
        }
    }

    useEffect(() => {
        const sessionToken = localStorage.getItem("session-token");
        handleTrazerTodosOsFavoritos()
        listarMotos(sessionToken)
            .then(result => {
                setMotos(result.data.results);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const motosFiltradas = motos.filter(moto => {
        return (
            (!filtroMarca || moto.marca === filtroMarca) &&
            (!filtroModelo || moto.modelo === filtroModelo) &&
            (!filtroEstado || moto.estado_venda === filtroEstado) &&
            (!filtroCidade || moto.cidade_venda?.toLowerCase().includes(filtroCidade.toLowerCase())) &&
            (!filtroAnoDe || Number(moto.ano) >= Number(filtroAnoDe)) &&
            (!filtroAnoAte || Number(moto.ano) <= Number(filtroAnoAte)) &&
            (!filtroCambio || moto.cambio?.toLowerCase().trim() === filtroCambio.toLowerCase().trim()) &&
            (!filtroCombustivel || moto.tipo_combustivel === filtroCombustivel) &&
            (!filtroCor || moto.cor === filtroCor) &&
            (!filtroCategoria || moto.categoria === filtroCategoria)
        );
    });

    const handleFavoritar = async (motoId) => {
        try {
            const objectId = localStorage.getItem("objectId");
            await favoritar(motoId, objectId);
            handleTrazerTodosOsFavoritos();
        } catch (error) {
            console.error("Erro ao favoritar moto:", error);
        }
    }

    const modelosDisponiveis = filtroMarca
        ? [...new Set(motos.filter(c => c.marca === filtroMarca).map(c => c.modelo))]
        : [...new Set(motos.map(c => c.modelo))];

    const idsFavoritos = new Set(favoritos.map(fav => fav.id_veiculo));

    return (
        <>
            <main className={styles.container_principal}>
                <section className={`${styles.section} ${styles.section_principal}`}>
                    <div className={styles.localizacao}>
                        <p>Localização:</p>    
                        <div>
                            <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
                                <option value="">Todos</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PR">PR</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                                <option value="SE">SE</option>
                                <option value="TO">TO</option>
                            </select>
                            <input
                                placeholder="Digite o nome de uma cidade"
                                value={filtroCidade}
                                onChange={e => setFiltroCidade(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.ano}>
                        <p>Ano:</p>
                        <div>
                            <div>
                                <label>De: </label>
                                <input
                                    type="number"
                                    min="1900"
                                    max="2100"
                                    value={filtroAnoDe}
                                    onChange={e => setFiltroAnoDe(e.target.value)}
                                    placeholder="Ano inicial"
                                />
                            </div>
                            <div>
                                <label>Até: </label>
                                <input
                                    type="number"
                                    min="1900"
                                    max="2100"
                                    value={filtroAnoAte}
                                    onChange={e => setFiltroAnoAte(e.target.value)}
                                    placeholder="Ano final"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.marca}>
                        <label>Marca:</label>
                        <select
                            className="completo"
                            value={filtroMarca}
                            onChange={e => {
                                setFiltroMarca(e.target.value);
                                setFiltroModelo('');
                            }}
                        >
                            <option value="">Todas</option>
                            {[...new Set(motos.map(moto => moto.marca))].map(marca => (
                                <option key={marca}>{marca}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.modelo}>
                        <label>Modelo:</label>
                        <select
                            className="completo"
                            value={filtroModelo}
                            onChange={e => setFiltroModelo(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {modelosDisponiveis.map(modelo => (
                                <option key={modelo}>{modelo}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.cambio}>
                        <label>Câmbio:</label>
                        <select
                            className="completo"
                            value={filtroCambio}
                            onChange={e => setFiltroCambio(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {TIPOS_CAMBIO.map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.combustivel}>
                        <label>Combustível</label>
                        <select
                            className="completo"
                            value={filtroCombustivel}
                            onChange={e => setFiltroCombustivel(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {TIPOS_COMBUSTIVEL.map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.cor}>
                        <label>Cor: </label>
                        <select
                            className="completo"
                            value={filtroCor}
                            onChange={e => setFiltroCor(e.target.value)}
                        >
                            <option value="">Todas</option>
                            {[...new Set(motos.map(moto => moto.cor))].map(cor => (
                                <option key={cor}>{cor}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.categoria}>
                        <label>Categoria: </label>
                        <select
                            className="completo"
                            value={filtroCategoria}
                            onChange={e => setFiltroCategoria(e.target.value)}
                        >
                            <option value="">Todas</option>
                            {[...new Set(motos.map(moto => moto.categoria))].map(categoria => (
                                <option key={categoria}>{categoria}</option>
                            ))}
                        </select>
                    </div>
                </section>
                <section className={styles.section_secundaria}>
                    <h1>Motos encontradas</h1>
                    <div className={styles.cards_container}>
                        {motosFiltradas.length > 0 ? motosFiltradas.map((moto, index) =>(
                                <div key={index} className={styles.card}>
                                    <Image className={styles.card_logo} src={moto.fotos[0]} alt="Foto da moto" width={275} height={387}/>
                                    <div className={styles.card_header}>
                                        <Link href={`/veiculos/motos/${moto.objectId}`} className={styles.card_title}>{moto.marca} {moto.modelo}</Link>
                                        <Image
                                            src={idsFavoritos.has(moto.objectId) ? "/coracao-preenchido-icon.svg" : "/coracao-icon.svg"}
                                            alt="Ícone coração"
                                            width={15}
                                            height={15}
                                            onClick={() => handleFavoritar(moto.objectId)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                    <div className={styles.card_quilometragem}>
                                        <Image src="/quilometragem-icon.svg" alt="Ícone quilometragem" width={17} height={17} />
                                        <p>{moto.quilometragem} KM</p>
                                    </div>
                                    <div className={styles.card_ano}>
                                        <Image src="/data-icon.svg" alt="Ícone de data" width={17} height={17} />
                                        <p>{moto.ano}</p>
                                    </div>
                                    <div className={styles.card_localizacao}>
                                        <Image src="/localizacao-icon.svg" alt="Ícone de localização" width={17} height={17} />
                                        <p>{moto.cidade_venda}/{moto.estado_venda}</p>
                                    </div>
                                    <button>R$ {moto.preco}</button>
                                </div>
                        )) : <p>Nenhuma moto encontrada.</p>}
                    </div>
                </section>
            </main>
        </>
    )
}