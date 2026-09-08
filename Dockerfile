# Imagen base ultraligera Nginx Alpine para producción
FROM nginx:alpine

# Eliminar los archivos estáticos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar el sitio web estático al directorio publico de Nginx
COPY . /usr/share/nginx/html/

# Exponer el puerto 80 para Coolify / Nginx Reverse Proxy
EXPOSE 80

# Ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
