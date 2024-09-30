import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children }) {

    return (
        <div>
            <Header />
            {children}
            <Footer />

        </div>
    )
}