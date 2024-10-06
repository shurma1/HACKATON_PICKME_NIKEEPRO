import axios from "axios";
import config from "config";
import {SocksProxyAgent} from "socks-proxy-agent";

const useProxy = config.get('use_proxy')

const socksConfig = config.get('socks_config') as string;

let params = {}

if(useProxy) {
	const agent = new SocksProxyAgent(socksConfig);
	
	params = {
		httpAgent: agent,
		httpsAgent: agent,
		proxy: false,
	}
}

const $api = axios.create(params);

export default $api;