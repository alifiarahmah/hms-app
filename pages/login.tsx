import { Box, Button, Container, Input } from '@chakra-ui/react';

const Login = () => {
  return (
    <Box>
      <Container>
        <h1>Login</h1>
        <form>
          <Input type="text" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Button>Login</Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
