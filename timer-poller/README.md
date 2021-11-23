# timers Timer Poller

This servie polls against a RabbitMQ Queue. It uses RXJS Streams so that in later implementations we could multiplex the messages. 

It also ensures that no more than 100 invokes can be made to a URL at a time to ensure that we do not overwhelm the underlying Network. 

We also timeout requests after 1 seconds to avoid back-pressure. 
