import Resource from "./databaseModels/Resource";
import Quality from "./databaseModels/Quality";
import Prompt from "./databaseModels/Prompt";
import Essence from "./databaseModels/Essence";
import EssenceToResource from "./databaseModels/EssenceToResource";


Resource.hasMany(Quality);
Quality.belongsTo(Resource)

Prompt.hasMany(Essence);
Essence.belongsTo(Prompt)

Resource.belongsToMany(Essence, {
  through: EssenceToResource
})
Essence.belongsToMany(Resource, {
  through: EssenceToResource
});



export {
	Resource,
	Quality,
	Prompt,
	Essence,
	EssenceToResource
}