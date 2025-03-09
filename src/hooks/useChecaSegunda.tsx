import { useState } from "react"
import { useGetDataAtual } from "./useGetDataAtual"
import { useCarregaNovaSemana } from "./useCarregaNovaSemana";


export const useChecaSegunda = () => {
    const { dataFormatada } = useGetDataAtual();
    const [ loading, setLoading ] = useState(false);
    const { setCarregaSemana } = useCarregaNovaSemana();

    const checaSegunda = async () => {

            setLoading(true)
            const hoje = new Date(dataFormatada).getDay();
            if(hoje === 0) {
                setCarregaSemana(true);
            }

            setLoading(false);
        }

    return { loading, checaSegunda }
};