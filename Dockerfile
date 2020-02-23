FROM articulate/articulate-node:12-stretch-slim
ARG NPM_TOKEN=secret

USER $SERVICE_USER

COPY --chown=service:service .npmrc package.json yarn.lock $SERVICE_ROOT/
RUN yarn install --frozen-lockfile

COPY --chown=service:service . $SERVICE_ROOT/
RUN rm -f $SERVICE_ROOT/.npmrc

EXPOSE 3000
CMD ["yarn", "start"]
