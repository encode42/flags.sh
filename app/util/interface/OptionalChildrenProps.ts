import { ReactChildren, ReactElement } from "react";

export default interface OptionalChildrenProps {
    /**
     * The children of the component.
     */
    "children"?: ReactElement | ReactElement[] | ReactChildren
};
