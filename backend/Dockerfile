FROM node:22-alpine

# Habilitamos pnpm usando corepack (nativo en Node)
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

# carpeta de trabajo
WORKDIR /app

# Copiamos los archivos de configuración
COPY package.json pnpm-lock.yaml* ./

# Instalamos las dependencias usando pnpm
RUN pnpm install

# Copiamos todo el resto de tu código fuente
COPY . .

# Compilamos el proyecto (esto genera la carpeta /dist a partir de tu TypeScript)
RUN pnpm run build

# Exponemos tu puerto
EXPOSE 3000

# Arrancamos usando el comando "start" de tu package.json (node dist/index.js)
CMD ["pnpm", "start"]