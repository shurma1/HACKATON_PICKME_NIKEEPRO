import {trustList} from "../constants/trustList";

class TrustService {
	public CheckDomain(domain: string): number {
		const { whiteList, blackList } = trustList;
		
		const isDomainInList = (domain: string, list: string[]): boolean => {
			return list.some(pattern => {
				const regexPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*');
				const regex = new RegExp(`^${regexPattern}$`);
				return regex.test(domain);
			});
		};
		
		if (isDomainInList(domain, blackList)) {
			return -1; // В черном списке
		}
		
		if (isDomainInList(domain, whiteList)) {
			return 1; // В белом списке
		}
		
		return 0;
	}
}

export default new TrustService();