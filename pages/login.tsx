import { Box, Button, Container, Input } from '@chakra-ui/react';
import Link from 'components/link';

const Login = () => {
  return (
    <Box>
      <Container>
        <h1>Login</h1>
        <form>
          <Input type="text" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Link href="/">
            <Button>Login</Button>
          </Link>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
