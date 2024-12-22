import loading from '../assets/icons/loading.png';
import { useUser } from '@clerk/clerk-react';
import { useGetUserById } from '../hooks/data/useGetUserById';
import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
    const { user } = useUser();

    const { data, isLoading } = useGetUserById(user?.externalId ?? '');

    if (isLoading) {
        return (
            <div className="h-screen w-screen">
                <div className="flex h-full w-full items-center justify-center">
                    <img
                        src={loading}
                        alt="loading"
                        className="size-12 animate-spin md:size-14"
                    />
                </div>
            </div>
        );
    }

    if (!data?.paid) {
        return <Navigate to="/planos" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
