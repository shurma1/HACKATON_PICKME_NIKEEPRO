import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface QualityCreationAttributes{
  resource_id: string;
  index: number;
}
interface QualityAttributes{
  id: string;
  index: number;
  resource_id?: string;
  creationAt?: Date;
}

export interface QualityInstance
  extends Model<QualityAttributes, QualityCreationAttributes>,
	  QualityAttributes {}

const Quality = sequelize.define<QualityInstance>('quality', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Quality;