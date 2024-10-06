import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface EssenceToResourceCreationAttributes{
  uri: string;
  resourceId: string;
  essenceId: string;
}
interface EssenceToResourceAttributes{
  id: string;
  uri: string;
  resourceId?: string;
  essenceId?: string;
}

export interface EssenceToResourceInstance
  extends Model<EssenceToResourceAttributes, EssenceToResourceCreationAttributes>,
	  EssenceToResourceAttributes {}

const EssenceToResource = sequelize.define<EssenceToResourceInstance>('essence_to_resource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  uri: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

export default EssenceToResource;