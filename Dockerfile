FROM php:8.1-cli

WORKDIR /app

# Copia todo el repo al contenedor
COPY . /app

# Puerto por defecto (Render inyecta $PORT en tiempo de ejecución)
ENV PORT=8080

EXPOSE 8080

# Ejecuta el servidor PHP integrado apuntando a la carpeta backend
# Usamos sh -c para que se expanda $PORT en tiempo de ejecución
CMD ["sh", "-c", "php -S 0.0.0.0:$PORT -t backend"]
