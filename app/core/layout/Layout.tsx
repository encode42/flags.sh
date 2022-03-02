import MinimalLayout, { MinimalLayoutProps } from "./MinimalLayout";

/**
 * The primary layout for this app.
 */
export default function Layout({ title, description, prefixed = true, containerize = true, children }: MinimalLayoutProps) {
    return (
        <>
            <MinimalLayout title={title} description={description} prefixed={prefixed} containerize={containerize}>
                {children}
            </MinimalLayout>
        </>
    );
}
