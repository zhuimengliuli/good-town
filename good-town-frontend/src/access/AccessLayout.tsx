import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {usePathname} from "next/navigation";
import {findAllMenuItemByPath} from "../../config/menu";
import {ACCESS_ENUM} from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";

const AccessLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({ children }) => {
    const pathname = usePathname();
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const menu = findAllMenuItemByPath(pathname);
    const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
    const canAccess = checkAccess(loginUser, needAccess);
    if (!canAccess) {
        return <Forbidden/>;
    }
    return <>{children}</>;
};

export default AccessLayout;