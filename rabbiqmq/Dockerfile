FROM rabbitmq:3.9-management

EXPOSE 15672
# Define environment variables.
ENV RABBITMQ_USER tom
ENV RABBITMQ_PASSWORD timers

ADD rabbitmq.config /etc/rabbitmq/
ADD definitions.json /etc/rabbitmq/
RUN chown rabbitmq:rabbitmq /etc/rabbitmq/rabbitmq.config /etc/rabbitmq/definitions.json
EXPOSE 15672

ADD init.sh /init.sh
RUN chmod +x /init.sh


CMD ["/init.sh"]

