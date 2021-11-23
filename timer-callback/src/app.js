const fastify = require('fastify');

const app = fastify();

app.listen(8001, '0.0.0.0', (err) => {
  if (err) console.error(err);
  console.log('server listening on 8001');
});

app.route({
  method: 'POST',
  url: '/:id',
  handler: (request, reply) => {
    console.log(request.params);
    reply.send();
  }
});
