FROM node:18

WORKDIR /app
COPY ./backend /app

RUN npm install
RUN npx prisma generate

EXPOSE 3001
CMD ["node", "server.js"]
