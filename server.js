const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const logger = require('./logger');
const protos = require('./protos');
const services = require('./services');


logger.info('Loading Protos.');
const packageDefinition = protoLoader.loadSync(protos.getProtoPaths(logger));
grpc.loadPackageDefinition(packageDefinition);
logger.info('Protos loaded.');

const grpcServer = new grpc.Server();

logger.info('Begin RPC handlers load.');

const servicesKeys = Reflect.ownKeys(services);
for (const service of servicesKeys) {
  logger.info(`Loading service: ${service}`);
  grpcServer.addService(
    packageDefinition[service],
    services[service],
  );
}

logger.info('Finished RPC handlers load.');

const { SERVER_PORT } = process.env;
const valentinaPort = SERVER_PORT || '5001';

grpcServer.bindAsync(`127.0.0.1:${valentinaPort}`, grpc.ServerCredentials.createInsecure(), (error, _portNumber) => { // eslint-disable-line
  if (error) {
    logger.error(`Error while starting gRPC server: ${error.message}`);
    process.exit(0);
  }

  logger.info(`Valentina is alive @ ${valentinaPort}`);
});
