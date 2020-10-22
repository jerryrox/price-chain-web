import ICredential from "../models/ICredential";
import IItemPriceModel from "../models/IItemPriceModel";
import INewPriceModel from "../models/INewPriceModel";
import ApiRequest from "./ApiRequest";

class Api {

    readonly baseUrl = "http://localhost:5000/api";

    getItemPrices = async (sku: string, from?: number): Promise<IItemPriceModel[]> => {
        const request = await ApiRequest.get(
            this.getFullUrl("/get-item-prices"),
            { sku, from }
        );

        const models: IItemPriceModel[] = [];
        for (const value of Object.values(request.data as Record<string, any>)) {
            models.push(value);
        }
        return models;
    };

    getPriceHistory = async (sku: string, userAddress: string, from?: number, to?: number): Promise<IItemPriceModel[]> => {
        const request = await ApiRequest.get(
            this.getFullUrl("/get-price-history"),
            { sku, userAddress, from, to }
        );

        const models: IItemPriceModel[] = [];
        for (const value of request.data) {
            models.push(value);
        }
        return models;
    };

    getItems = async (userAddress: string): Promise<IItemPriceModel[]> => {
        const request = await ApiRequest.get(
            this.getFullUrl("/get-items"),
            { userAddress }
        );

        const models: IItemPriceModel[] = [];
        for (const value of request.data) {
            models.push(value);
        }
        return models;
    };

    getBalance = async (userAddress: string): Promise<number> => {
        const request = await ApiRequest.get(
            this.getFullUrl("/get-balance"),
            { userAddress }
        );
        return request.data;
    };

    getChain = async (): Promise<any> => {
        return (await ApiRequest.get(
            this.getFullUrl("/get-chain"),
        )).data;
    };

    getBlock = async (index: number): Promise<any> => {
        return (await ApiRequest.get(
            this.getFullUrl("/get-block"),
            { index }
        )).data;
    };

    getNewAddress = async (): Promise<ICredential> => {
        const data = await (await ApiRequest.get(this.getFullUrl("/get-new-address"))).data;
        return {
            privateAddress: data.privateKey,
            publicAddress: data.publicKey,
        };
    };

    addPrices = async (userAddress: string, prices: INewPriceModel[]): Promise<void> => {
        await ApiRequest.post(
            this.getFullUrl("/add-prices"),
            { userAddress, prices }
        );
    };

    sendToken = async (fromAddress: string, toAddress: string, amount: number): Promise<void> => {
        await ApiRequest.post(
            this.getFullUrl("/send-token"),
            { fromAddress, toAddress, amount }
        );
    };

    private getFullUrl = (path: string) => {
        if (!path.startsWith("/")) {
            path = `/${path}`;
        }
        return this.baseUrl + path;
    };
}
export default new Api();