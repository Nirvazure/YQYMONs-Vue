import axios from "axios";
import { getRandomId } from "@/utils/Index";
//API地址
const api = "api/gateway";
//请求封装
function gatewayAPI(methodName: string, params: Object) {
  let id = getRandomId();
  return axios.post(api, { id, methodName, params });
}

export { gatewayAPI };
