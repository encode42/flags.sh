import { StandardLayout, StandardLayoutProps } from "@encode42/mantine-extras";
import { SiteDetails } from "../../util/util";

/**
 * The primary layout for this app.
 */
export function Layout({ children, ...others }: StandardLayoutProps) {
    return (
        <>
            <StandardLayout details={SiteDetails} { ...others }>
                {children}
            </StandardLayout>
        </>
    );
}
