import Menu from "@material-ui/icons/Menu";
import Home from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";

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
}
export default new Icons();