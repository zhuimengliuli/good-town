import {menus} from "../../config/menu";
import checkAccess from "@/access/checkAccess";

const getAccessMenu = (loginUser: API.LoginUserVO, menuItems = menus) => {
    return menuItems.filter((item) => {
        if (!checkAccess(loginUser, item.access)) {
            return false;
        }
        if (item.children) {
            item.children = getAccessMenu(loginUser, item.children);
        }
        return true;
    });
};

export default getAccessMenu;