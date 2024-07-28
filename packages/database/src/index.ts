import { Sequelize, Options } from 'sequelize';
import config from './config';
import { associations, inits } from './models';

import { User } from './models/user';
import { Guild } from './models/guild';
import { Channel } from './models/channel';
import { VoiceEvent } from './models/voiceEvent';

const env = <keyof typeof config>process.env.NODE_ENV ?? 'development';

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, <Options>config[env]);

Object.values(inits).forEach(modelInit => modelInit(sequelize));
Object.values(associations).forEach(association => association.associate(sequelize.models));

export default sequelize;

export { User, Guild, Channel, VoiceEvent };
