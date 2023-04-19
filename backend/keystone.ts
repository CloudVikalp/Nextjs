import { config } from '@keystone-6/core';
import { withAuth, session } from './auth';
import User from './Schemas/User'
import Product from './Schemas/Product';
import Cart from './Schemas/Cart';
import * as dotenv from 'dotenv';
dotenv.config({path: '.env'})

export default config(
  withAuth( {
    server: {
      cors: { origin: ['http://localhost:3001'], credentials: true }
    },
    db: {
        provider: 'postgresql',
        url: 'postgres://postgres:Vikalp@99@localhost:5432/firstproject',
    },
    lists: {
      User,
      Product,
      Cart
    },
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
  })
);