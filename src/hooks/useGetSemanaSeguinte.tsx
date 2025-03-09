import { useEffect } from "react";
import { useSemana } from "../context/SemanaContext"
import { getSemana, postMontaSemana } from "../services/semanaServices";


export const useGetSemanaSeguinte = () => {
    const { semanaSeguinte, setSemanaSeguinte, carregando, setCarregando, carregarSemanaSeguinte, setCarregarSemanaSeguinte } = useSemana();

    useEffect(() => {
        const getSemanaSeguinte = async () => {
        
            if (semanaSeguinte) {
                return semanaSeguinte;
            }
    
            try {
                setCarregando(true);
    
                const semana = await getSemana('B');
                if (semana) {
                    setSemanaSeguinte(semana);
                    setCarregarSemanaSeguinte(false);
                    setCarregando(false);
                    return semana;
                }
    
                const nova_semana = await postMontaSemana('B');
                if (nova_semana) {
                    setSemanaSeguinte(nova_semana);
                    setCarregarSemanaSeguinte(false);
                    setCarregando(false);
                    return nova_semana;
                }
            } catch (error) {
                setCarregarSemanaSeguinte(false);
                setCarregando(false);
                throw new Error("Erro ao carregar Semana Seguinte")
            }
        };
    
        if(carregarSemanaSeguinte){
            getSemanaSeguinte();
        }
        
    
    }, [carregarSemanaSeguinte]);

    return { carregando, semanaSeguinte, setCarregarSemanaSeguinte, setSemanaSeguinte }
};