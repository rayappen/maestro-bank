#Start with a base image containing Java runtime
FROM openjdk:21-jdk-slim

#Information around who maintaines the image
MAINTAINER ecommerce-owner

#Add the application's jar to the image
COPY target/accounts-0.0.1-SNAPSHOT.jar accounts-0.0.1-SNAPSHOT.jar

#Execute the application = Maintains the command to execute the program (in this case java -jar)
ENTRYPOINT ["java", "-jar", "accounts-0.0.1-SNAPSHOT.jar"]