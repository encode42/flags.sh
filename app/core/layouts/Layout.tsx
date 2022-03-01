import { BlitzLayout } from "blitz";
import MinimalLayout, { MinimalLayoutProps } from "./MinimalLayout";

const Layout: BlitzLayout<MinimalLayoutProps> = ({ title, description, prefixed = true, containerize = true, children }: MinimalLayoutProps) => {
    return (
        <>
            <MinimalLayout title={title} description={description} prefixed={prefixed} containerize={containerize}>
                {children}
            </MinimalLayout>
        </>
    );
};

export default Layout;
