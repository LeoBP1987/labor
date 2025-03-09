import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component: React.ComponentType) => {
    return () => {
        const navigate = useNavigate();

        useEffect(() => {
            const token_acesso = localStorage.getItem('token_acesso');
            if (!token_acesso) {
                navigate('/login');
            }
        }, [navigate]);

        return <Component />;
    };
};

export default withAuth;