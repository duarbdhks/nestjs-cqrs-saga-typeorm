const { env: ENV } = process

export const config = {
  env: ENV.NODE_ENV || 'development',
  port: ENV.PORT || 4000,
  host: ENV.HOST || '0.0.0.0',
  transport_port: ENV.TRANSPORT_PORT || 5000,
  swagger: {
    path: ENV.SWAGGER_PATH || '/api/docs',
    title: ENV.SWAGGER_TITLE || 'B2H Microservice API',
    description: ENV.SWAGGER_DESCRIPTION,
    version: ENV.SWAGGER_VERSION || '0.0.1',
    scheme: ENV.SWAGGER_SCHEME === 'https' ? 'https' : 'http',
  },
  db: {
    connectionString: ENV.DB_URL,
    max: +ENV.DB_POOLSIZE || 1,
  },
  event_store: {
    protocol: ENV.EVENT_STORE_PROTOCOL || 'http',
    username: ENV.ENV_STORE_USERNAME || 'admin',
    password: ENV.ENV_STORE_PASSWORD || 'changeit',
    host: ENV.ENV_STORE_HOST || 'localhost',
    tcp_port: ENV.ENV_STORE_TCP_PORT || 1113,
    http_port: ENV.ENV_STORE_HTTP_PORT || 2113,
    pool: {
      min: ENV.EVEMT_STORE_POOL_MIN || 1,
      max: ENV.EVEMT_STORE_POOL_MAX || 1,
    },
  },
  s3: {
    credentials: {
      accessKeyId: ENV.S3_KEY,
      secretAccessKey: ENV.S3_SECRET,
    },
    region: ENV.S3_REGION || 'ap-northeast-1',
    bucket: ENV.S3_BUCKET || 'boilerplate-bucket',
  },
}
