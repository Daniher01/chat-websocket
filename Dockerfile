# Utiliza una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Elimina la carpeta node_modules si existe
RUN rm -rf node_modules

# Instala las dependencias como usuario "node"
RUN chown -R node:node /usr/src/app && npm install --quiet

# Cambia al usuario "node" para evitar problemas de permisos
USER node

# Copia el código fuente de tu aplicación al contenedor
COPY . .

# Expone el puerto en el que se ejecutará la aplicación (por ejemplo, 3000)
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "start"]
