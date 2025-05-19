"use client"

import Image from "next/image"

import * as styles from "./styles.module.css";  

export default function Carros () {
    const carrosFake = [
        { localizacao: { estado: "Pernambuco", cidade: "Recife" }, ano: "17/02/2006", marca: "Hyundai", modelo: "HB20", cambio: "Manual", tipoCombustivel: "Gasolina", cor: "Branco", categoria: "A", quilometragem: "200", imagem: "https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.jpg", preco: 800000},
        { localizacao: { estado: "Pernambuco", cidade: "Recife" }, ano: "17/02/2006", marca: "Hyundai", modelo: "HB20", cambio: "Manual", tipoCombustivel: "Gasolina", cor: "Branco", categoria: "A", quilometragem: "200", imagem: "https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.jpg", preco: 800000},
        { localizacao: { estado: "Pernambuco", cidade: "Recife" }, ano: "17/02/2006", marca: "Hyundai", modelo: "HB20", cambio: "Manual", tipoCombustivel: "Gasolina", cor: "Branco", categoria: "A", quilometragem: "200", imagem: "https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.jpg", preco: 800000},
        { localizacao: { estado: "Pernambuco", cidade: "Recife" }, ano: "17/02/2006", marca: "Hyundai", modelo: "HB20", cambio: "Manual", tipoCombustivel: "Gasolina", cor: "Branco", categoria: "A", quilometragem: "200", imagem: "https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.jpg", preco: 800000},
        { localizacao: { estado: "Pernambuco", cidade: "Recife" }, ano: "17/02/2006", marca: "Hyundai", modelo: "HB20", cambio: "Manual", tipoCombustivel: "Gasolina", cor: "Branco", categoria: "A", quilometragem: "200", imagem: "https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.jpg", preco: 800000},
        { localizacao: { estado: "Pernambuco", cidade: "Recife" }, ano: "17/02/2006", marca: "Hyundai", modelo: "HB20", cambio: "Manual", tipoCombustivel: "Gasolina", cor: "Branco", categoria: "A", quilometragem: "200", imagem: "https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.jpg", preco: 800000},
    ]

    return (
        <>
            <main className={styles.container_principal}>
                <section className={`${styles.section} ${styles.section_principal}`}>
                    <div className={styles.localizacao}>
                        <p>Localização:</p>    
                        <div>
                            <select>
                                <option value="Acre">Acre</option>
                                <option value="Alagoas">Alagoas</option>
                                <option value="Amapá">Amapá</option>
                                <option value="Amazonas">Amazonas</option>
                                <option value="Bahia">Bahia</option>
                                <option value="Ceará">Ceará</option>
                                <option value="Distrito Federal">Distrito Federal</option>
                                <option value="Espírito Santo">Espírito Santo</option>
                                <option value="Goiás">Goiás</option>
                                <option value="Maranhão">Maranhão</option>
                                <option value="Mato Grosso">Mato Grosso</option>
                                <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                                <option value="Minas Gerais">Minas Gerais</option>
                                <option value="Pará">Pará</option>
                                <option value="Paraíba">Paraíba</option>
                                <option value="Paraná">Paraná</option>
                                <option value="Pernambuco">Pernambuco</option>
                                <option value="Piauí">Piauí</option>
                                <option value="Rio de Janeiro">Rio de Janeiro</option>
                                <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                                <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                                <option value="Rondônia">Rondônia</option>
                                <option value="Roraima">Roraima</option>
                                <option value="Santa Catarina">Santa Catarina</option>
                                <option value="São Paulo">São Paulo</option>
                                <option value="Sergipe">Sergipe</option>
                                <option value="Tocantins">Tocantins</option>
                            </select>
                            <input placeholder="Digite o nome de uma cidade"/>
                        </div>
                    </div>
                    <div className={styles.ano}>
                        <p>Ano:</p>
                        <div>
                            <div>
                                <label>De: </label>
                                <input type="date" />
                            </div>
                            <div>
                                <label>Até: </label>
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.marca}>
                        <label>Marca:</label>
                        <select className="completo">
                            <option>Hyundai</option>
                        </select>
                    </div>
                    <div className={styles.modelo}>
                        <label>Modelo:</label>
                        <select className="completo">
                            <option>HB20</option>
                        </select>
                    </div>
                    <div className={styles.div_inputs_radio}>
                        <label>Câmbio:</label>
                        <div>
                            <input id="radio_1" type="radio" name="cambio"/>
                            <input id="radio_2" type="radio" name="cambio"/>
                        </div>
                    </div>
                    <div className={styles.combustivel}>
                        <label>Combustível</label>
                        <select className="completo">
                            <option>Gasolina</option>
                        </select>
                    </div>
                    <div className={styles.cor}>
                        <label>Cor: </label>
                        <input type="text" className="completo" placeholder="Ex.: branco"/>
                    </div>
                    <div className={styles.categoria}>
                        <label>Categoria: </label>
                         <select className="completo">
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                        </select>
                    </div>
                </section>
                <section>
                    <h1>Carros encontrados</h1>
                    <div>
                        {carrosFake.map((carro, index) =>(
                            <div key={index}>
                                <Image src={"https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.jpg"} alt="Foto do carro" width={275} height={387}/>
                                <p>{carro.marca} {carro.modelo}</p>
                                <div>
                                    <Image src="/quilometragem-icon.svg" alt="Ícone quilometragem" width={17} height={17} />
                                    <p>{carro.quilometragem} KM</p>
                                </div>
                                <div>
                                    <Image src="/data-icon.svg" alt="Ícone de data" width={17} height={17} />
                                    <p>{carro.ano}</p>
                                </div>
                                <div>
                                    <Image src="/localizacao-icon.svg" alt="Ícone de localização" width={17} height={17} />
                                    <p>{carro.localizacao.estado}/{carro.localizacao.cidade}</p>
                                </div>
                                <button>{carro.preco}</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}