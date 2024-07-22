import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute, Association, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin } from 'sequelize';
import { type VoiceEvent } from './voiceEvent';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare userName: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

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
    voiceEvents: Association<User, VoiceEvent>;
  };

  static associate(models: Sequelize['models']) {
    User.hasMany(models['voiceEvent'], { foreignKey: { name: 'userId', allowNull: false } });
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );

  return User;
};