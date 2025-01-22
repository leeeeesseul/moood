FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY www.smgames.co.kr_cert.crt /etc/certificate/www.smgames.co.kr_cert.crt
COPY www.smgames.co.kr_chain.crt /etc/certificate/www.smgames.co.kr_chain.crt
COPY www.smgames.co.kr_key.key /etc/certificate/www.smgames.co.kr_key.key

EXPOSE 8001
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]