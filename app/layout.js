import { Inter } from "next/font/google";
import "./globals.css";
import NextUiProvider from "@/components/providers/NextUiProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "@/components/RouteProtection";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next JWT Auth | Mongodb | Express",
  description: "This user authentication is built on next JWT authentication with mongodb as database.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ReduxProvider>
            <ProtectedRoute>
              <NextUiProvider>
                <ToastContainer />
                {children}
              </NextUiProvider>
            </ProtectedRoute>
          </ReduxProvider>
      </body>
    </html>
  );
}
