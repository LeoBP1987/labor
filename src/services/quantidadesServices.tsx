
export const getQuantidades = async () => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');

    if (!user_id || !token) {
        return null;
    }

    try {
        const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/quantidades/get-quantidades/?usuario=${user_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Erro ao buscar quantidades: ${response.statusText}`);
        }

        const data = await response.json();
                
        return data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw new Error("Erro ao buscar quantidades");
    }
};