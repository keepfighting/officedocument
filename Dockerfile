FROM node:20-alpine as build-stage

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@10 --activate

RUN npm config set registry https://registry.npmmirror.com

COPY  package.json pnpm-lock.yaml ./
RUN pnpm install 

COPY . .
RUN pnpm build

FROM nginx as production-stage

COPY --from=build-stage /app/html /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]