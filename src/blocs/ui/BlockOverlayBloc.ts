import Api from "../../api/Api";
import NotificationBloc from "../NotificationBloc";
import BlockOverlayState from "../states/BlockOverlayState";
import BaseOverlayBloc from "./BaseOverlayBloc";

interface IBlockOverlayDependency {
    blockOverlayState: BlockOverlayState;

    notificationBloc: NotificationBloc;
}

export default class BlockOverlayBloc extends BaseOverlayBloc<BlockOverlayState> {
    
    readonly deps: IBlockOverlayDependency;

    get blockIndex(): number {
        return this.deps.blockOverlayState.indexValue;
    }
    
    constructor(deps: IBlockOverlayDependency) {
        super(deps.blockOverlayState);
        this.deps = deps;
    }
    
    initState = () => {
        this.deps.blockOverlayState.blockIndex.value = "";
        this.deps.blockOverlayState.blockData.value = {};
    };

    setIndex = (index: string) => this.deps.blockOverlayState.blockIndex.value = index.trim();

    searchBlock = async () => {
        try {
            const index = this.blockIndex;
            const data = await Api.getBlock(index);
            this.deps.blockOverlayState.blockData.value = data;
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
        }
    };
}