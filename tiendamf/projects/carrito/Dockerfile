#FASE 1 Compilación del poryecto
#imagen de la que partimos ng 16 --> node 18
FROM node:18-alpine AS build
#dentro del contedor, definimos el directorio de trabajo
WORKDIR /app

#copiarmos los recursos del proyecto a directorio de trabajo definido
COPY package*.json ./
COPY angular.json tsconfig*.json ./
COPY projects ./projects

#instalamos/descargamos las depedencias
RUN npm install

#compilamos el proyecto
RUN npm run build carrito -- --configuration=production

#FASE 2  una vez compilado el proyecyo, preparamos el entorno de ejecución
#nginx como servidor por ser una app ligera
FROM nginx:1.27-alpine

#borramos la configuración por defecto que trae la imagen
RUN rm /etc/nginx/conf.d/default.conf

#copiamos nuestra configuración para que el servidor web escuche en el puerto que yo quiera
#la página de inicio, etc.
COPY projects/carrito/nginx.conf /etc/nginx/conf.d/default.conf

#copiamos el código fuente compilado a las carpetas del servidor web
COPY --from=build /app/dist/carrito /usr/share/nginx/html

#documentamos que este contenedor escucha en el puerto 80
#no publica el puerto por si solo, pero deja claro cuál usa la app
EXPOSE 80

#arrancamos el contenedor con el servidor web
# daemon off, hace que nginx se ejecute en primer plano, como necesita Docker
CMD [ "nginx", "-g", "daemon off;" ]