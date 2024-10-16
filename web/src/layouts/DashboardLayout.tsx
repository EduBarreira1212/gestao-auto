import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/sign-in');
        }

        if (isLoaded && userId) {
            navigate('/dashboard');
        }
    }, [isLoaded]);

    if (!isLoaded) return 'Loading...';

    return <Outlet />;
}
