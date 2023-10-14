
#FROM nginx
#
#WORKDIR /app
#
#RUN mkdir ./build
#
#ADD ./build ./build
#
#RUN rm /etc/nginx/conf.d/default.conf
#
#COPY ./nginx.conf /etc/nginx/conf.d
#
#EXPOSE 3000
#
#CMD ["nginx", "-g", "daemon off;"]

# node 이미지 불러오기
FROM node:14.17.0

# Docker Container에서 작업이 이루어지는 위치
WORKDIR /usr/src/app

# 현재 경로에 있는 실행에 필요한 파일들을 Docker Container의 WORKDIR 위치로 모두 복사 (이미지 생성할 때 동작)
COPY . .

# 번들 파일 실행하기 (컨테이너 실행할 때 동작)
CMD ["npm", "start"]
