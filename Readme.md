npm i @adonisjs/lucid
node ace configure @adonisjs/lucid

npm i node-jsonwebtoken
https://www.npmjs.com/package/node-jsonwebtoken

npm i
cp .env.example .env
node ace migration:fresh
npm run build
cp .env.example build/.env
cd build
npm ci --production
npm start

pm2 start server.js --name adonis-api-jwt-articles
