import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, NonAttribute, Association, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin } from 'sequelize';
import { type Guild } from './guild';
import { type VoiceEvent } from './voiceEvent';

export class Channel extends Model<InferAttributes<Channel>, InferCreationAttributes<Channel>> {
  declare id: string;
  declare channelName: string;
  declare guildId: ForeignKey<Guild['id']>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare guild?: NonAttribute<Guild>;

  declare getVoiceEvents: HasManyGetAssociationsMixin<VoiceEvent>;
  declare addVoiceEvent: HasManyAddAssociationMixin<VoiceEvent, number>;
  declare addVoiceEvents: HasManyAddAssociationsMixin<VoiceEvent, number>;
  declare setVoiceEvents: HasManySetAssociationsMixin<VoiceEvent, number>;
  declare removeVoiceEvent: HasManyRemoveAssociationMixin<VoiceEvent, number>;
  declare removeVoiceEvents: HasManyRemoveAssociationsMixin<VoiceEvent, number>;
  declare hasVoiceEvent: HasManyHasAssociationMixin<VoiceEvent, number>;
  declare hasVoiceEvents: HasManyHasAssociationsMixin<VoiceEvent, number>;
  declare countVoiceEvents: HasManyCountAssociationsMixin;
  declare createVoiceEvent: HasManyCreateAssociationMixin<VoiceEvent>;

  declare voiceEvents?: NonAttribute<VoiceEvent[]>;

  declare static associations: {
    voiceEvents: Association<Channel, VoiceEvent>;
    guild: Association<Channel, Guild>;
  };

  static associate(models: Sequelize['models']) {
    Channel.hasMany(models['voiceEvent'], { foreignKey: { name: 'channelId', allowNull: false } });
    Channel.belongsTo(models['guild'], { foreignKey: { name: 'guildId', allowNull: false } });
  }
}

export default (sequelize: Sequelize) => {
  Channel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      channelName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'channel',
    },
  );

  return Channel;
};