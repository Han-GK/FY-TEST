FROM node:16.15.1
RUN mkdir -p /home/www/node-demo
WORKDIR /home/www/node-demo
COPY . /home/www/node-demo
#RUN apt-get update
#RUN apt-get install -y vim wget
RUN npm install
# 设置时区
RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
EXPOSE 49101
ENTRYPOINT ["npm","run"]
CMD ["start"]
#测试一下