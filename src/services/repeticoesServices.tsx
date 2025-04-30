import { Dict } from "styled-components/dist/types";


export const getRepeticoes = async () => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api-labor-5ee8ad3cd3aa.herokuapp.com/repeticoes/?usuario=${user_id}`,
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
            throw new Error(`Erro ao buscar repetições: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        return data['results'];
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar repetições");
    }
};

export const postRepeticoes = async(descricao:string, repeticoes:String[]) => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token || !descricao) {
        return null;
    }

    const dataRepeticoes = {
        'usuario': user_id,
        'descricao': descricao,
        'repeticoes': repeticoes
    }

    try {
        const response = await fetch('https://api-labor-5ee8ad3cd3aa.herokuapp.com/repeticoes/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataRepeticoes)
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao criar repetições: ${response.statusText}`);
        }

        return "Repetição Criada com Sucesso.";
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao criar repetição");
    }    
};

export const deleteRepeticoes = async(listaSelecionados: Number[]) => {
    const token = localStorage.getItem('token_acesso');

    if ( listaSelecionados.length === 0 || !token) {
        return null;
    }

    try {
        const response = await fetch('https://api-labor-5ee8ad3cd3aa.herokuapp.com/repeticoes/bulk-delete/', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listaSelecionados)
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao deletar repetições: ${response.statusText}`);
        }

        return "Repetições Deletadas com Sucesso.";
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao deletar repetição");
    }    
};

export const putRepeticoes = async(repeticao: Dict) => {
    const token = localStorage.getItem('token_acesso');

    if ( !token) {
        return null;
    }

    try {
        const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/repeticoes/${repeticao.id}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(repeticao)
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao atualizar repetições: ${response.statusText}`);
        }

        return "Repetições Atualizadas com Sucesso.";

    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao atualizar repetições");
    }    
};

export const rodarRepeticoes = async(usuario: number, lista: Number[] = []) => {
    const token = localStorage.getItem('token_acesso');

    if ( !token) {
        return null;
    }

    try {
        const url = new URL('https://api-labor-5ee8ad3cd3aa.herokuapp.com/repeticoes/roda-repeticoes/');

        url.searchParams.append('usuario', usuario.toString());

        if (lista.length > 0) {
            url.searchParams.append('lista', lista.join(','));
        }

        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao atualizar repetições: ${response.statusText}`);
        }

        return "Repetições executadas com Sucesso.";

    } catch (error) {
        console.error("Erro ao requisitar execução das repetições:", error);
        throw new Error("Erro ao executar repetições");
    }    
}; 