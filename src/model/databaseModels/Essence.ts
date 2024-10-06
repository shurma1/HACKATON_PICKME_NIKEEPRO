import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface EssenceCreationAttributes{
  text: string;
}
interface EssenceAttributes{
  id: string;
  text: string;
  promptId?: boolean;
}

export interface EssenceInstance
  extends Model<EssenceAttributes, EssenceCreationAttributes>,
	  EssenceAttributes {}

const Essence = sequelize.define<EssenceInstance>('essence', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

export default Essence;