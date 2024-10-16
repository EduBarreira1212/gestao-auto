import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();

    console.log('id', userId);
    console.log('User', user?.externalId);

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
