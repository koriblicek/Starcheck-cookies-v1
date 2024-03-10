import { Fragment, useState } from "react";
import { useAppSelector } from "src/store/hooks";
import { EnumUserAction } from "src/types";
import { CookiesFab } from "./cookies-fab";
import { BasicConsentDialog } from "./basic-consent-dialog";
import { MoreDetailsConsentDialog } from "./more-details-consent-dialog";

type LayoutType = "fab" | "basic" | "details";

export function Layout() {

    const { userData } = useAppSelector(state => state.cookiesUserData);

    //select what is displayed first
    const [openedDialog, setOpenedDialog] = useState<LayoutType>(userData.action === EnumUserAction.NO_ACTION ? "basic" : "fab");

    return (
        <Fragment>
            <CookiesFab isOpened={openedDialog === "fab"} onClick={() => setOpenedDialog("basic")} />
            <BasicConsentDialog isOpened={openedDialog === "basic"} onClose={() => setOpenedDialog("fab")} onMoreDetails={() => setOpenedDialog("details")} />
            <MoreDetailsConsentDialog isOpened={openedDialog === "details"} onClose={() => setOpenedDialog("fab")} />
        </Fragment>
    );
}
