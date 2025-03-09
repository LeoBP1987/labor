import { useEffect } from "react";
import { useSemana } from "../context/SemanaContext"
import { getSemana, postMontaSemana } from "../services/semanaServices";


export const useGetSemanaAtual = () => {
    const { semanaAtual, setSemanaAtual, carregando, setCarregando, carregarSemana, setCarregarSemana } = useSemana();

    useEffect(() => {

        const getSemanaAtual = async () => {
        
            if (semanaAtual) {
                return semanaAtual;
            }
    
            try {
                setCarregando(true);
    
                const semana = await getSemana('A');
                if (semana) {
                    setSemanaAtual(semana);
                    setCarregando(false);
                    setCarregarSemana(false);
                    return semana;
                }
    
                const nova_semana = await postMontaSemana('A');
                if (nova_semana) {
                    setSemanaAtual(nova_semana);
                    setCarregando(false);
                    setCarregarSemana(false);
                    return nova_semana;
                }
            } catch (error) {
                setCarregando(false);
                setCarregarSemana(false);
                throw new Error("Erro ao carregar Semana Atual")
            }
        };

        if(carregarSemana){
            getSemanaAtual();
        };

    }, [carregarSemana]);

    return { carregando, semanaAtual, setCarregarSemana }
}
