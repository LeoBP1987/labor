import { useState } from "react";

export const useArrastarMenu = () => {
    const [posicaoY, setPosicaoY] = useState(0);
    const [distanciaArrastada, setDistanciaArrastada] = useState(0);
    const [arrastando, setArrastando] = useState(false);
    const [menuMobileAtivo, setMenuMobileAtivo] = useState(false);
    const [concluido, setConcluido] = useState('none');

    const aoIniciarArrasto = (evento: React.TouchEvent<HTMLDivElement>) => {
        if (!menuMobileAtivo) {
            setPosicaoY(evento.touches[0].clientY);
            setArrastando(true);
        }
    };

    const aoArrastar = (evento: React.TouchEvent<HTMLDivElement>) => {
        const posicaoAtual = evento.touches[0].clientY;
        const distancia = posicaoAtual - posicaoY;

        setDistanciaArrastada(distancia);
    };

    const aoFinalizarArrasto = () => {
        if (distanciaArrastada < 200) {
            setDistanciaArrastada(0);
        } else {
            setDistanciaArrastada(500);
            setMenuMobileAtivo(true);
            setConcluido('flex');
        }
        setArrastando(false);
    };

    const aoFecharMenu = (evento: React.MouseEvent<HTMLButtonElement>) => {
        if (evento.clientY > 630 || evento.clientX < 60 || evento.clientX > 360) {
            setPosicaoY(0);
            setDistanciaArrastada(0);
            setMenuMobileAtivo(false);
            setConcluido('none');
        }
    };

    return {
        aoIniciarArrasto,
        aoArrastar,
        aoFinalizarArrasto,
        aoFecharMenu,
        setDistanciaArrastada,
        arrastando,
        distanciaArrastada,
        concluido
    }
}