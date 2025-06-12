"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import * as styles from "./styles.module.css";
import { trazerLocalizacao } from "@/app/servicos/open-cage-api/api";
import useLocalizacao from "@/app/servicos/hooks/useLocalizacao";
import useMenuLateralEstaAberto from "@/app/servicos/hooks/useMenuLateralEstaAberto";
import useSessionToken from "@/app/servicos/hooks/useSessionToken";

export default function Header() {
    const [textoLocalizacao, setTextoLocalizacao] = useState("");
    const setNavegadorSuportaGeolocalizacao = useLocalizacao((state) => state.setNavegadorSuportaGeolocalizacao);
    const navegadorSuportaGeolocalizacao = useLocalizacao((state) => state.navegadorSuportaGeolocalizacao);
    const [menuLateralEstaAberto, setMenuLateralEstaAberto] = useState(false);
    const setMenuLateralAberto = useMenuLateralEstaAberto((estado) => estado.setMenuLateralAberto);
    const temSessionToken = useSessionToken((estado) => estado.temSessionToken);
    const [nomeUsuario, setNomeUsuario] = useState(null);

    const mostrarEsconderMenuLateral = () => {
        setMenuLateralEstaAberto(valorAnterior => !valorAnterior);
        setMenuLateralAberto();
    }

    useEffect(() => {
        const atualizarNome = () => {
            const nome = localStorage.getItem("nome_usuario");
            setNomeUsuario(nome);
        };

        atualizarNome();

        window.addEventListener("storage", atualizarNome);
        window.addEventListener("atualizar_nome_usuario", atualizarNome);

        if (!navigator.geolocation) {
            setNavegadorSuportaGeolocalizacao(false);
            setTextoLocalizacao("Geolocalização não suportada");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (posicao) => {
                const { latitude, longitude } = posicao.coords;
                setNavegadorSuportaGeolocalizacao(true);
                try {
                    const resultado = await trazerLocalizacao(latitude, longitude);
                    setTextoLocalizacao(resultado);
                } catch (err) {
                    console.error("Erro ao obter localização:", err);
                    setTextoLocalizacao("Localização não disponível");
                    alert("Erro ao obter localização");
                }
            },
            (err) => {
                console.error("Geolocation error:", err);
                setNavegadorSuportaGeolocalizacao(false);
                setTextoLocalizacao("Localização não disponível");
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );

        return () => {
            window.removeEventListener("storage", atualizarNome);
            window.removeEventListener("atualizar_nome_usuario", atualizarNome);    
        }
    }, []);

    return (
        <header>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li>
                        <Link href="/">
                            <Image width={37} height={37} alt="Ícone de início" src="/home-icon.svg"/>
                        </Link>
                    </li>
                    <li><Link href="/ajuda">Ajuda</Link></li>
                    <li><Link href="/veiculos/carros">Carros</Link></li>
                    <li><Link href="/veiculos/motos">Motos</Link></li>
                    {!temSessionToken && (
                        <>
                            <li><Link href="/cadastro">Cadastre-se</Link></li>
                            <li><Link href="/login">Login</Link></li>
                        </>
                    )}
                    {navegadorSuportaGeolocalizacao && (
                        <li className={styles.localization_li}>
                            <Image width={37} height={37} alt="Ícone de localização" src="/localizacao-icon.svg"/>
                            <span>{textoLocalizacao}</span>
                        </li>
                    )}
                    {temSessionToken && (
                        <>
                            <li>
                                <Link href="/anunciar-veiculo">
                                    <button className={styles.anunciar_veiculo_botao}>Anuncie seu veículo!</button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/perfil" className={styles.perfil_link}>
                                    <Image width={37} height={37} alt="Ícone de perfil" src="/perfil-icon.svg"/>
                                    {nomeUsuario && <span>{nomeUsuario}</span>}
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
                <Image
                    src="menu-icon.svg" 
                    alt="Ícone de menu" 
                    width={37}
                    height={37} 
                    className={styles.menu_icon}
                    onClick={mostrarEsconderMenuLateral}
                />
                <div className={styles.menu_lateral} style={{right: `${menuLateralEstaAberto ? "0" : "-50%"}`}}>
                    <ul className={styles.ul_menu_lateral}>
                        <li>
                            <Link href="/">
                                <Image width={37} height={37} alt="Ícone de início" src="/home-icon.svg"/>
                            </Link>
                        </li>
                        <li><Link href="/ajuda">Ajuda</Link></li>
                        <li><Link href="/veiculos/carros">Carros</Link></li>
                        <li><Link href="/veiculos/motos">Motos</Link></li>
                        {!temSessionToken && (
                            <>
                                <li><Link href="/cadastro">Cadastre-se</Link></li>
                                <li><Link href="/login">Login</Link></li>
                            </>
                        )}
                        {navegadorSuportaGeolocalizacao && (
                            <li className={styles.localization_li}>
                                <Image width={37} height={37} alt="Ícone de localização" src="/localizacao-icon.svg"/>
                                <span>{textoLocalizacao}</span>
                            </li>
                        )}
                        {temSessionToken && (
                            <>
                                <li>
                                    <Link href="/anunciar-veiculo">
                                        <button className={styles.anunciar_veiculo_botao}>Anuncie seu veículo!</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/perfil" className={styles.perfil_link}>
                                        <Image width={37} height={37} alt="Ícone de perfil" src="/perfil-icon.svg"/>
                                        {nomeUsuario && <span>{nomeUsuario}</span>}
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <hr className={styles.hr}/>
        </header>
    )
}