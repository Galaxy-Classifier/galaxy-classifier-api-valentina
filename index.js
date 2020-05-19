const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const logger = require('./logger');
const protos = require('./protos');
const { resize } = require('./handlers');

logger.info('Loading Protos.');

const packageDefinition = protoLoader.loadSync(protos.getProtoPaths(logger), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const { valentina } = protoDescriptor;

logger.info('Protos loaded.');

const grpcServer = new grpc.Server();

logger.info('Begin RPC handlers load.');

grpcServer.addService(valentina.Valentina.service, { Resize: resize });

logger.info('Finished RPC handlers load.');

const { SERVER_PORT } = process.env;
const valentinaPort = SERVER_PORT || '4001';

const bindPort = grpcServer.bind(`0.0.0.0:${valentinaPort}`, grpc.ServerCredentials.createInsecure());
grpcServer.start();
logger.info(`Valentina is alive @ ${bindPort}`);
