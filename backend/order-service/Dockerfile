FROM amazoncorretto:17

WORKDIR /app
COPY target/order-service-0.0.1-SNAPSHOT.jar /app

EXPOSE 8081

CMD ["java", "-jar", "order-service-0.0.1-SNAPSHOT.jar"]