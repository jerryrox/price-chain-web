export interface ICredential {
    publicAddress: string;
    privateAddress: string;
}

export enum UserType {
    anonymous,
    customer,
    shopOwner,
}