FROM node:alpine AS builder

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine

WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build .
RUN ls

EXPOSE 3000

CMD ["serve", "-l", "3000"]