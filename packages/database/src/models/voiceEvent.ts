import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, Association } from 'sequelize';
import { type User } from './user';
import { type Guild } from './guild';
import { type Channel } from './channel';

export class VoiceEvent extends Model<InferAttributes<VoiceEvent>, InferCreationAttributes<VoiceEvent>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare channelId: ForeignKey<Channel['id']>;
  declare guildId: ForeignKey<Guild['id']>;
  declare eventType: 'JOIN'|'LEAVE';

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare user?: NonAttribute<User>;
  declare guild?: NonAttribute<Guild>;
  declare channel?: NonAttribute<Channel>;

  declare static associations: {
    user: Association<VoiceEvent, User>;
    guild: Association<VoiceEvent, Guild>;
    channel: Association<VoiceEvent, Channel>;
  };

  static associate(models: Sequelize['models']) {
    VoiceEvent.belongsTo(models['user'], { foreignKey: { name: 'userId', allowNull: false } });
    VoiceEvent.belongsTo(models['guild'], { foreignKey: { name: 'guildId', allowNull: false } });
    VoiceEvent.belongsTo(models['channel'], { foreignKey: { name: 'channelId', allowNull: false } });
  }
}

export default (sequelize: Sequelize) => {
  VoiceEvent.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      eventType: {
        type: DataTypes.ENUM('JOIN', 'LEAVE'),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'voiceEvent',
    },
  );

  return VoiceEvent;
};