"use client"

import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useState } from "react";

import * as styles from "./styles.module.css";
import { trazerLocalizacao } from "@/app/servicos/open-cage-api/api";
import useLocalizacao from "@/app/servicos/hooks/useLocalizacao";

export default function Header() {
    const [textoLocalizacao, setTextoLocalizacao] = useState("");
    const setNavegadorSuportaGeolocalizacao = useLocalizacao((state) => state.setNavegadorSuportaGeolocalizacao);
    const navegadorSuportaGeolocalizacao = useLocalizacao((state) => state.navegadorSuportaGeolocalizacao);

    useEffect(() => {
        if (!navigator.geolocation) {
            setNavegadorSuportaGeolocalizacao(false);
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
                alert("Erro ao obter localização");
            }
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }, []);

    return (
        <header>
            <nav>
                <ul className={styles.ul}>
                    <li><Link href="#">Ajuda</Link></li>
                    <li><Link href="#">Vender</Link></li>
                    <li><Link href="#">Comprar</Link></li>
                    <li><Link href="#">Carros</Link></li>
                    <li><Link href="#">Motos</Link></li>
                    {navegadorSuportaGeolocalizacao && (
                        <li className={styles.localization_li}><Image width={37} height={37} alt="Ícone de localização" src="localizacao-icon.svg"/> <span>{textoLocalizacao}</span></li>
                        )
                    }
                    <li><button className={styles.anunciar_veiculo_botao}>Anuncie seu veículo!</button></li>
                    <li><Image width={37} height={37} alt="Ícone de perfil" src="perfil-icon.svg"/></li>
                </ul>
                <hr/>
            </nav>
        </header>
    )
}