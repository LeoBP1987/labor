import { Dict } from "styled-components/dist/types";
import { Semana } from "../compartilhado/interfaces/ISemana";

export const getSemana = async (indicador: string) => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api-labor-5ee8ad3cd3aa.herokuapp.com/semana/?usuario=${user_id}&indicador=${indicador}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao buscar a semana: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        return data['results'][0] as Semana;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar a semana");
    }
};

export const postMontaSemana = async(indicador: string) => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token) {
        return null;
    }

    try {
        const response = await fetch('https://api-labor-5ee8ad3cd3aa.herokuapp.com/semana/monta-semana/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "usuario":Number(user_id),
                "indicador":indicador
            })
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao buscar a semana: ${response.statusText}`);
        }

        const data = await response.json();
        
        return data as Semana;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar a semana");
    }    
};

export const deleteSemana = async(semana_id: string) => {
    const token = localStorage.getItem('token_acesso');

    if ( !semana_id || !token) {
        return null;
    }

    try {
        const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/semana/${semana_id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao deletar semana: ${response.statusText}`);
        }

        return "Semanas Deletadas com Sucesso.";
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao deletar semana");
    }    
};

export const putSemana = async(semana: Dict) => {
    const token = localStorage.getItem('token_acesso');

    if ( !token) {
        return null;
    }

    try {
        const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/semana/${semana.id}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(semana)
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao atualizar semana: ${response.statusText}`);
        }

        return "Semanas Atualizadas com Sucesso.";
        
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao atualizar semanas");
    }    
};