import { useNavigate } from "react-router-dom";

const useLogoff = () => {
    const navigate = useNavigate();

    const logoff = async () => {
        try {
            localStorage.clear();
            navigate("/login");
        } catch (err) {
            console.error(err instanceof Error ? err.message : "Erro ao fazer logoff");
        }
    };

    return { logoff };
};

export default useLogoff;