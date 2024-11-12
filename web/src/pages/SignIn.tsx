import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <SignIn signUpUrl="/cadastro" />
        </div>
    );
};

export default SignInPage;
