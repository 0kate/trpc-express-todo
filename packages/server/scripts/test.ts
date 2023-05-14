import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../src/main';

(async () => {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/rpc',
      }),
    ],
  });

  // list users before add new one
  // @ts-ignore
  const res = await client.users.list.query();
  console.log(res.users);

  // create new user
  // @ts-ignore
  const newUser = await client.users.create.mutate({
    email: `hogehoge+${res.users.length}@example.com`,
    name: 'hoge-san',
  });
  console.log(newUser);

  // get created user by id
  // @ts-ignore
  const user = await client.users.find.query({ id: newUser.id });
  console.log(user);
})();
