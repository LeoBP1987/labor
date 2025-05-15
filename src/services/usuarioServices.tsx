import { Usuario } from "../compartilhado/interfaces/IUsuario";

export const getUsuario = async (): Promise<Usuario | null> => {
    const user_id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');
    
    if(!user_id || !token) {
        return null
    }

    const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/usuarios/${user_id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar leitor');
    }

    return response.json() as Promise<Usuario>;
};

export const postUsuario = async (nome: string, login: string, email: string, senha: string) => {
    const data = {
        "username": login,
        "password": senha,
        "email": email,
        "first_name": nome,
    };

    const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/usuarios/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar usuario");
    }

    return 'Cadastro realizado com sucesso!';
};

export const patchDadosUsuario = async (id: number, nome: string, login: string, email: string) => {
    const token = localStorage.getItem('token_acesso');
    
    if(!token) {
        return null
    }

    const data = {
        "username": login,
        "email": email,
        "first_name": nome,
    };

    const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/usuarios/${id}/`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar usuario");
    }

    return 'Usuario Atualizado com Sucesso';
};

export const patchSenhaUsuario = async (password:string) => {
    const id = localStorage.getItem('user');
    const token = localStorage.getItem('token_acesso');
    
    if(!id || !token) {
        return null
    }

    const data = {
        "password": password,
    };

    const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/usuarios/${id}/`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Erro ao alterar senha");
    }

    return await response.json() as Promise<Usuario>;
};

export const recuperarSenha = async (email:string) => {
    
    const data = {
        "email": email,
    };

    const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/recuperar-senha/recuperar-senha/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao alterar senha");
    }

    return await response.json();
};

export const alterarSenha = async (email:string, senha:string) => {
    
    if (!email) {
        throw new Error("E-mail é obrigatório.");
    }
    if (!senha) {
        throw new Error("Senha é obrigatória.");
    }

    const data = {
        "email": email,
        "senha": senha,
    };

    const response = await fetch(`https://api-labor-5ee8ad3cd3aa.herokuapp.com/alterar-senha/alterar-senha/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao alterar senha");
    }

    return await response.json();
};