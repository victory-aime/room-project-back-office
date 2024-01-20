import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Center } from '@chakra-ui/react';
import { MoonLoader } from 'react-spinners';
import ErrorModalComponent from '../components/modal/errorModal'; // Import your ModalComponent

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (!session) {
        const oauthError = router.query?.error;
        if (oauthError === 'OAuthSignin') {
          setError('OAuth Signin error. Please try again.');
        } else {
          setError('Authentication error. Please try again.');
        }
      }
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [session, router.query?.error]);

  const closeModal = () => setError(null);

  if (status === 'loading') {
    return (
      <Center minHeight="100vh">
        <MoonLoader size={100} color="blue" />
      </Center>
    );
  }

  // If there's an error, display the modal
  if (error) {
    return (
      <ErrorModalComponent
        isOpen={true}
        onClose={closeModal}
        title="Error"
        description={error}
      />
    );
  }

  // If the user is not authenticated, don't render the children
  if (!session) {
    signIn('keycloak');
    return (
      <Center minHeight="100vh">
        <MoonLoader size={100} color="blue" />
      </Center>
    );
  }

  // If the user is authenticated, render the children
  return <div>{children}</div>;
}
