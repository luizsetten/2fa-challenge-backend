# Imagem base
FROM node:alpine3.13 

# Diretório de trabalho no container
WORKDIR /usr/app

# Copia os arquivos <arquivos> <destino> (no caso como WORKDIR é /usr/app o arquivo vai pra essa pasta)
COPY package.*json ./

# Roda o comando de instalação das dependiencias
RUN npm install

# Copia tudo para /usr/app
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# É única para cada container, é é qual o comando que precisa executar assim que ele iniciar
CMD ["npm", "start"]