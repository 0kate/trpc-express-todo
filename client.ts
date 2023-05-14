import { TRPCClientError, createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/rpc',
    }),
  ],
});

(async () => {
  // list users before add new one
  const users = await client.listUsers.query();
  console.log(users);

  // add new user named by 'hoge'
  const newUser = await client.createUser.mutate({ name: 'hoge' });
  console.log(newUser);

  // list users after added new one
  const newusers = await client.listUsers.query();
  console.log(newusers);

  // fetch added user by name
  const user = await client.getUser.query({ name: 'hoge' });
  console.log(user);

  // fetch non-exists user
  const nonExistsUser = await client.getUser.query({ name: 'invalid' });
  console.log(nonExistsUser);

  // fetch user with invalida request
  try {
    const _ = await client.getUser.query({ name: 'invalid' });
  } catch (e) {
    if (e instanceof TRPCClientError) {
      console.log(e.message);
    }
  } finally {
    console.log('finally');
  }
})();
