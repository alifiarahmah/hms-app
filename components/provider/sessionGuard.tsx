import Loading from 'components/loading';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type ProtectedRoute = {
  [key: string]: 'user' | 'admin';
};

const protectedRoute: ProtectedRoute = {
  '/calendar': 'user',
  '/admin': 'admin',
};

interface SessionGuardProps {
  children: JSX.Element;
}

const SessionGuard = ({ children }: SessionGuardProps) => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === 'loading' || !router.isReady) {
    return <Loading />;
  }

  let accessLevel = null;
  for (let keys in protectedRoute) {
    if (router.pathname.includes(keys)) {
      accessLevel = protectedRoute[keys];
    }
  }

  if (accessLevel) {
    if (!data) {
      router.push('/');
      return <Loading />;
    }
    if (accessLevel === 'admin') {
      if (data.user.nim !== 'admin') {
        router.push('/');
        return <Loading />;
      } else {
        return children;
      }
    } else {
      return children;
    }
  } else {
    return children;
  }
};

export default SessionGuard;
