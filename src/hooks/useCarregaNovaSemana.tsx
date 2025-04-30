import { useEffect } from "react";
import { deleteSemana, getSemana, putSemana } from "../services/semanaServices";
import { Semana } from "../compartilhado/interfaces/ISemana";
import { useUteis } from "../context/UteisContext";
import { useGetSemanaAtual } from "./useGetSemanaAtual";
import { useGetDataAtual } from "./useGetDataAtual";


export const useCarregaNovaSemana = () => {
    const { setCarregarSemana } = useGetSemanaAtual();
    const { carregaSemana, setCarregaSemana } = useUteis();
    const { dataFormatada } = useGetDataAtual(); // Data Formatada é a data atual no formato 'YYYY-MM-DD'

    useEffect(() => {
        const carregaNovaSemana = async () => {
            
            const hoje = new Date(dataFormatada).getDay();
            let dia_semana: keyof Semana = "segunda";
            const semanaA = await getSemana('A');

            switch(hoje) {
                case 0:
                    dia_semana = 'segunda';
                    break;
                case 1:
                    dia_semana = 'terca';
                    break;
                case 2:
                    dia_semana = 'quarta';
                    break;
                case 3:
                    dia_semana = 'quinta';
                    break;
                case 4:
                    dia_semana = 'sexta';
                    break;
                case 5:
                    dia_semana = 'sabado';
                    break;
                case 6:
                    dia_semana = 'domingo';
                    break;
                default:
                    break;
            }

            if(semanaA?.[dia_semana] === dataFormatada){
                return
            }

            if(semanaA){
                await deleteSemana(semanaA.id)
            }
    
            const semanaB = await getSemana('B');

            if(!semanaB){
                return
            }

            if(semanaB?.[dia_semana] !== dataFormatada){
                await deleteSemana(semanaB.id)
                return
            }

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