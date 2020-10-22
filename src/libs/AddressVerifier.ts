import * as EC from "elliptic";
import Utils from "./Utils";

class AddressVerifier {

    private readonly dummyText = "lolz";
    
    private ec = new EC.ec("secp256k1");


    verify(publicAddress: string, privateAddress: string): boolean {
        try {
            const privateKey = this.ec.keyFromPrivate(privateAddress);
            const publicKey = this.ec.keyFromPublic(publicAddress, "hex");
            const signature = Utils.toHexString(privateKey.sign(this.dummyText).toDER());
            return publicKey.verify(this.dummyText, signature);
        }
        catch (e) {
            return false;
        }
    }
}
export default new AddressVerifier();