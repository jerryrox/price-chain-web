import Api from "../../api/Api";
import NotificationBloc from "../NotificationBloc";
import BlockchainOverlayState from "../states/BlockchainOverlayState";
import BaseOverlayBloc from "./BaseOverlayBloc";

interface IBlockchainOverlayDependency {
    blockchainOverlayState: BlockchainOverlayState;

    notificationBloc: NotificationBloc;
}

export default class BlockchainOverlayBloc extends BaseOverlayBloc<BlockchainOverlayState> {
    
    readonly deps: IBlockchainOverlayDependency;
    
    constructor(deps: IBlockchainOverlayDependency) {
        super(deps.blockchainOverlayState);
        this.deps = deps;
    }

    initState = async () => {
        this.deps.blockchainOverlayState.chainData.value = {};

        try {
            const data = await Api.getChain();
            this.deps.blockchainOverlayState.chainData.value = data;
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
        }
    };
}