import {store} from "@/store";
import {
	useCheckReliabilityMutation
} from "@/services/ApiService";
import {updateReliability} from "@/store/reducers/ReliabilitySlice";
import {ITextAnalysisRequest} from "@/types/ITextAnalysisRequest";

class ReliabilityService {
	public check() {
		const [check] = useCheckReliabilityMutation();
		
		return async (data: ITextAnalysisRequest) => {
			try{
				const response = await check(data).unwrap();
				store.dispatch(updateReliability(response));
			}
			catch(err){
				console.log(err);
			}

		}
	}
	
}

export default new ReliabilityService();