import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute, Association, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin } from 'sequelize';
import { type Channel } from './channel';
import { type VoiceEvent } from './voiceEvent';

export class Guild extends Model<InferAttributes<Guild>, InferCreationAttributes<Guild>> {
  declare id: string;
  declare guildName: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getChannels: HasManyGetAssociationsMixin<Channel>;
  declare addChannel: HasManyAddAssociationMixin<Channel, string>;
  declare addChannels: HasManyAddAssociationsMixin<Channel, string>;
  declare setChannels: HasManySetAssociationsMixin<Channel, string>;
  declare removeChannel: HasManyRemoveAssociationMixin<Channel, string>;
  declare removeChannels: HasManyRemoveAssociationsMixin<Channel, string>;
  declare hasChannel: HasManyHasAssociationMixin<Channel, string>;
  declare hasChannels: HasManyHasAssociationsMixin<Channel, string>;
  declare countChannels: HasManyCountAssociationsMixin;
  declare createChannel: HasManyCreateAssociationMixin<Channel>;

  declare channels?: NonAttribute<Channel[]>;

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
    channels: Association<Guild, Channel>;
    voiceEvents: Association<Guild, VoiceEvent>;
  };

  static associate(models: Sequelize['models']) {
    Guild.hasMany(models['voiceEvent'], { foreignKey: { name: 'guildId', allowNull: false } });
    Guild.hasMany(models['channel'], { foreignKey: { name: 'guildId', allowNull: false } });
  }
}

export default (sequelize: Sequelize) => {
  Guild.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      guildName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'guild',
    },
  );

  return Guild;
};