import { postUsuario } from "../services/usuarioServices";
import { useChamaModal } from "./useChamaModal";


export const usePostUsuario = () => {
    const { aoFecharModal } = useChamaModal();

    const cadastrarUsuario = async (nome:string, login:string, email:string, senha:string, confirma_senha:string): Promise<void> => {
        
        if (senha !== confirma_senha) {
            alert('As senhas não são iguais.');
            return;
        }
        try {
            const cadastro = await postUsuario(nome, login, email, senha);

            alert(cadastro);

            aoFecharModal();
            
            
        } catch (error) {
            alert(`Erro ao cadastrar usuário: ${error}`);
        }
    };

    return { cadastrarUsuario };
};