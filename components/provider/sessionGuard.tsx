import Loading from 'components/loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type ProtectedRoute = {
  [key: string]: 'user' | 'admin' | 'user-only';
};

/*
user : for logged user and admin
admin : for admin only
user-only : for user only
*/
const protectedRoute: ProtectedRoute = {
  '/calendar': 'user',
  '/admin': 'admin',
  '/profile': 'user-only',
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
      if (accessLevel === 'user-only' && data.user.nim === 'admin') {
        router.push('/');
        return <Loading />;
      }
      return children;
    }
  } else {
    return children;
  }
};

export default SessionGuard;
