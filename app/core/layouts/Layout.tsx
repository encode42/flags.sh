import { BlitzLayout } from "blitz";
import MinimalLayout, { MinimalLayoutProps } from "./MinimalLayout";

const Layout: BlitzLayout<MinimalLayoutProps> = ({ title, containerize, children }: MinimalLayoutProps) => {
    return (
        <>
            <MinimalLayout title={title} containerize={containerize}>
                {children}
            </MinimalLayout>
        </>
    );
};

export default Layout;
