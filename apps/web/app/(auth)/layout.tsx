import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthGuard>
            {children}
        </AuthGuard>
    )
}

export default Layout;