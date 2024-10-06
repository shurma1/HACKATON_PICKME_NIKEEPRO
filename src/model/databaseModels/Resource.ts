import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface ResourceCreationAttributes{
	url: string;
}
interface ResourceAttributes{
  id: string;
  url: string;
}

export interface ResourceInstance
  extends Model<ResourceAttributes, ResourceCreationAttributes>,
	  ResourceAttributes {}

const Resource = sequelize.define<ResourceInstance>('resource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false
});

export default Resource;