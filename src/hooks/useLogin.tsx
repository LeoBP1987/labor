import { useState } from "react";
import { useNavigate } from "react-router-dom";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (usuario: string, senha: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://api-labor-5ee8ad3cd3aa.herokuapp.com/login/get-login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                                        "username": usuario,
                                        "password": senha                                         
                                    }),
            });

            if (!response.ok) {
                throw new Error("Credenciais inválidas");
            }

            const data = await response.json();
            const token_acesso = data.access_token;
            const token_refresh = data.refresh_token;
            const user = data.user_id;

            if(!token_acesso || !token_refresh || !user) {
                throw new Error("Payload inválido");
            }

            localStorage.setItem("token_acesso", token_acesso);
            localStorage.setItem("token_refresh", token_refresh);
            localStorage.setItem("user", user);

            navigate("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao fazer login");
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;