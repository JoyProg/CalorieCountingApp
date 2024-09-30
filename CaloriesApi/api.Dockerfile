FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

COPY pom.xml ./
RUN mvn dependency:go-offline

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/CaloriesApi-0.0.1-SNAPSHOT.jar /app/CaloriesApi.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/CaloriesApi.jar"]
