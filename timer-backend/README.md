# timers Timer Backend

This is the user facing component of the timers Timer Challenge. 

It uses Typescript, and Fastify for the backend. 

This is a simple RESTful API that simply handles things like persistance of the timers. Creating new timers, and getting them.

This is a rather slim service, as a lot of the actual logic is done in timer-consumer, and Rabbit MQ. 

## Validation ##

Validation is done via class-validator. 

In order to add Validation to a class, you must add a config object to the Fastify Route. (See below.)

```
app.route({
  url: '/timers',
  method: 'POST',
  config: { ValidationType: CreateTimer },
  handler: getLabels,
});
```


