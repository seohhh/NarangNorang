#FROM openjdk:11-jdk-slim
#
#ARG JAR_FILE=build/libs/*.jar
#
#COPY ${JAR_FILE} app.jar
#
#EXPOSE 8080
#
#ENTRYPOINT ["java", "-jar", "/app.jar"]

# jdk 이미지 불러오기
FROM openjdk:11-jdk-slim

# Docker Container에서 작업이 이루어지는 위치
WORKDIR /root

ENV
DB_URL=3.36.126.169:3306/narang_norang \
DB_USERNAME=root \
DB_PASSWORD=Ssafy123!@# \
SERVER_PORT=8080 \
ACCESS_KEY=AKIATO2TQR4HIQ7LYLXP \
BUCKET_NAME=narangnorang \
SECRET_KEY=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 \
JWT_SECRET=dyAeHubOOc8KaOfYB6XEQoEj1QzRlVgtjNL8PYs1A1tymZvvqkcEU7L1imkKHeDa \
REDIS_HOST=3.36.126.169 \
REDIS_PORT=6378 \
REDIS_PASSWORD=ssafy1234 \
OPENVIDU_URL=https://i9c208.p.ssafy.io/ \
OPENVIDU_SECREY=ssafy1234

ARG JAR_FILE=build/libs/*.jar

# 현재 경로/target/be-0.0.1-SNAPSHOT.jar에 해당하는 파일을 Docker Container의 WORKDIR 위치로 복사 (이미지 생성할 때 동작)
COPY ${JAR_FILE} app.jar

# COPY된 jar파일 실행하기 (컨테이너 실행할 때 동작)
CMD ["java", "-jar", "./app.jar"]