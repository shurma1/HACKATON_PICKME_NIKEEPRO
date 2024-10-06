import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface PromptCreationAttributes{
  text: number;
}
interface PromptAttributes{
  id: string;
  text: string;
}

export interface PromptInstance
  extends Model<PromptAttributes, PromptCreationAttributes>,
	  PromptAttributes {}

const Prompt = sequelize.define<PromptInstance>('prompt', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

export default Prompt;