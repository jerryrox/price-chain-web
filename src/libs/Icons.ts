import Menu from "@material-ui/icons/Menu";
import Home from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Link from "@material-ui/icons/Link";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import Search from "@material-ui/icons/Search";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";

class Icons {

    get home(): any {
        return Home;
    }

    get menu(): any {
        return Menu;
    }

    get logout(): any {
        return ExitToApp;
    }

    get blockChain(): any {
        return Link;
    }

    get block(): any {
        return ViewAgenda;
    }

    get search(): any {
        return Search;
    }
    
    get wallet(): any {
        return AccountBalanceWallet;
    }
}
export default new Icons();