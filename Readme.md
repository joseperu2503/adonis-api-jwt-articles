npm i @adonisjs/lucid
node ace configure @adonisjs/lucid

npm i node-jsonwebtoken
https://www.npmjs.com/package/node-jsonwebtoken


node ace migration:fresh
cp .env.example build/.env
cd build
npm ci --production
npm start
