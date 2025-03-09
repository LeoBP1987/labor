import { Dict } from "styled-components/dist/types";
import { useGetDataAtual } from "../hooks/useGetDataAtual";

export const getTarefasHoje = async () => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');
    const { dataFormatada } = useGetDataAtual();

    if (!user_id || !token) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/?usuario=${user_id}&agendamento=${dataFormatada}`,
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
            throw new Error(`Erro ao buscar tarefas de hoje: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        return data['results'];
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar tarefas de hoje");
    }
};

export const getTarefasPilha = async () => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/?usuario=${user_id}&agendamento=9999-12-31`,
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
            throw new Error(`Erro ao buscar tarefas da pilha: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        return data['results'];
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar tarefas da pilha");
    }
};

export const getTarefasAgenda = async (dataInicio: string, dataFinal:string) => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/get-periodo/?usuario=${user_id}&agendamento_range=${dataInicio}__${dataFinal}`,
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
            throw new Error(`Erro ao buscar tarefas por data: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        return data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar tarefas por data");
    }
};

export const getTarefasDataMenoresQue = async (dataPesquisa:string) => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token || !dataPesquisa) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/?usuario=${user_id}&agendamento_lt=${dataPesquisa}`,
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
            throw new Error(`Erro ao buscar tarefas por data menores que: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        return data['results'];
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar tarefas por data menores que");
    }
};

export const getTarefasPorData = async (dataPesquisa:string) => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token || !dataPesquisa) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/?usuario=${user_id}&agendamento=${dataPesquisa}`,
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
            throw new Error(`Erro ao buscar tarefas por data: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        return data['results'];
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar tarefas por data");
    }
};

export const getTarefasPesquisa = async (descricao:string) => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token || !descricao) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/?usuario=${user_id}&descricao=${descricao}`,
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
            throw new Error(`Erro ao buscar tarefas por pesquisa: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        return data['results'];
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar tarefas por pesquisa");
    }
};

export const postTarefas = async(descricao:string, agendamento?:string) => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token) {
        return null;
    }

    try {
        const response = await fetch('https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "usuario":Number(user_id),
                "descricao":descricao,
                "agendamento":agendamento
            })
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao criar tarefa: ${response.statusText}`);
        }

        return "Tarefa Criada com Sucesso.";
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao criar tarefa");
    }    
}

export const deleteTarefas = async(listaSelecionados: Number[]) => {
    const token = localStorage.getItem('token_acesso');

    if ( listaSelecionados.length === 0 || !token) {
        return null;
    }

    try {
        const response = await fetch('https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/bulk-delete/', {
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
            throw new Error(`Erro ao deletar tarefas: ${response.statusText}`);
        }

        return "Tarefas Deletadas com Sucesso.";
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao deletar tarefas");
    }    
}

export const putTarefas = async(tarefa: Dict) => {
    const token = localStorage.getItem('token_acesso');

    if ( !token) {
        return null;
    }

    try {
        const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/${tarefa.id}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarefa)
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao atualizar tarefas: ${response.statusText}`);
        }

        return "Tarefas Atualizadas com Sucesso.";
        
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao atualizar tarefas");
    }    
};

export const patchAgendamentoTarefas = async(listaSelecionados: Dict[]) => {
    const token = localStorage.getItem('token_acesso');

    if ( listaSelecionados.length === 0 || !token) {
        return null;
    }

    try {
        const response = await fetch('https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/bulk-update/', {
            method: 'PATCH',
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
            throw new Error(`Erro ao reagendamento tarefas: ${response.statusText}`);
        }

        return "Tarefas Reagendamento com Sucesso.";
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao reagendamento tarefas");
    }    
}

export const patchAgendamentoTarefa = async(tarefa: Dict) => {
    const token = localStorage.getItem('token_acesso');

    if ( !tarefa.id || !token || !tarefa.agendamento) {
        return null;
    }


    try {
        const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/tarefas/${tarefa.id}/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarefa)
        });

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro a reagendar tarefa: ${response.statusText}`);
        }

        return "Tarefa Reagendada com Sucesso.";
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao reagendar tarefa");
    }    
}