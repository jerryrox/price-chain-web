import axios, { AxiosResponse } from "axios";
import Utils from "../libs/Utils";

export default class ApiRequest {
    
    readonly data: any;

    private constructor(data: any) {
        this.data = data;
    }
    
    static get = async (url: string, data?: Record<string, any>): Promise<ApiRequest> => {
        try {
            const queryParam = data === undefined ? "" : Utils.recordToQueryParam(data);
            const response = await axios.get(url + queryParam);

            console.log(response.data);
            return ApiRequest.parseResponse(response);
        }
        catch (e) {
            throw new Error(e.message);
        }
    }

    static post = async (url: string, data?: any): Promise<ApiRequest> => {
        try {
            const response = await axios.post(url, data);
            return ApiRequest.parseResponse(response);
        }
        catch (e) {
            throw new Error(e.message);
        }
    };

    private static parseResponse = (response: AxiosResponse<any>): ApiRequest => {
        return new ApiRequest(response.data.data);
    };
}