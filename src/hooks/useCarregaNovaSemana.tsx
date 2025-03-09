import { useEffect } from "react";
import { deleteSemana, getSemana, putSemana } from "../services/semanaServices"
import { useUteis } from "../context/UteisContext";
import { useGetSemanaAtual } from "./useGetSemanaAtual";
import { useGetDataAtual } from "./useGetDataAtual";


export const useCarregaNovaSemana = () => {
    const { setCarregarSemana } = useGetSemanaAtual();
    const { carregaSemana, setCarregaSemana } = useUteis();
    const { dataFormatada } = useGetDataAtual();

    useEffect(() => {
        const carregaNovaSemana = async () => {
            
            const semanaA = await getSemana('A');

            if(semanaA?.segunda === dataFormatada){
                return
            }
            if(semanaA){
                await deleteSemana(semanaA.id)
            }
    
            const semanaB = await getSemana('B');
            if(semanaB){
                const semanaParaAtualizar = {
                    ...semanaB,
                    indicador: 'A'
                };
                await putSemana(semanaParaAtualizar);
            } else {
                setCarregarSemana(true);
            }

            setCarregaSemana(false);
        };

        if(carregaSemana) {
            carregaNovaSemana();
        }

    }, [carregaSemana]);
    
    return {setCarregaSemana}

};