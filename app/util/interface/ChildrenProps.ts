import { ReactChildren, ReactElement } from "react";

export default interface ChildrenProps {
    /**
     * The children of the component.
     */
    "children": ReactElement | ReactElement[] | ReactChildren
};
