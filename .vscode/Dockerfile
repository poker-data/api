FROM node:alpine
WORKDIR /app
env NODE_ENV=development
env DATABASE_USER="bbz-api"
env DATABASE_PASSWORD="BBZlatam654654"
env DATABASE_HOST="bbzlatamapp-api.uool30b.mongodb.net "
env DB_NAME="BBZLatamApp-api"
env MONGOOSE="set('useFindAndModify', true)"
env SEED_AUTENTICACION = 'seed_autenticacion'
env USERNAMEAPI = 'bbzlatam@gmail.com'
env PASSWORDAPI = '5b33a53c48de380f34ea5c0863bb37a2'
env TOKEN_SECRET='pokerData-Api'
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
#RUN npm ci --only production
RUN npm i
# Set the env to "production"
#ENV NODE_ENV production
EXPOSE 8081
CMD ["npm", "run", "start"]