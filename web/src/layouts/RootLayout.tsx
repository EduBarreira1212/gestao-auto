import { Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';

const CLERK_API_KEY = import.meta.env.VITE_CLERK_API_KEY;

if (!CLERK_API_KEY) {
    throw new Error('Missing Publishable Key');
}

export default function RootLayout() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            publishableKey={CLERK_API_KEY}
        >
            <SignedIn>
                <Outlet />
            </SignedIn>
            <SignedOut>
                <Outlet />
            </SignedOut>
        </ClerkProvider>
    );
}
