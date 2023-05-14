import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { PrismaClient } from '@prisma/client';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

import ApplicationRepository from '@/repositories/ApplicationRepository';
import { initAppRouter } from '@/routers';

// Establish DB connection and initialize base repository for server
const prisma = new PrismaClient();
ApplicationRepository.client = prisma;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {};
};
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({
  errorFormatter: (opts) => {
    const { shape, error } = opts;

    return {
      ...shape,
      data: {
        code: error.code,
        message: error.message,
      },
    };
  },
});

// Initialize and aggregate routers
const appRouter = initAppRouter(t);
export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());
app.use(logger('common'));
app.use(
  '/rpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    onError(opts) {
      const { error } = opts;

      switch (error.code) {
        case 'NOT_FOUND':
          console.log('resource not found');
          break;
        case 'INTERNAL_SERVER_ERROR':
          console.log('internal error occured');
          console.error(error);
          break;
        default:
          break;
      }
    },
  }),
);

console.log('Server is running on localhost:3000.');
app.listen(3000);
