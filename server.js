import path from 'path';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';

import { createServer } from 'http';
import schema from './schema/schema';
import dbServer from './data/db';
import cors from 'cors';

const PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', cors(), graphqlExpress((req, res) => {
  const query = req.query.query || req.body.query;

  // authenticate - get user and add to context
  let user = {
    id: 'testuser',
    roles: ['admin', 'user']
  }

  // get db object and add to context
  let db = dbServer();

  return {
    schema,
    context: {
      db,
      user
    }
  }
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
