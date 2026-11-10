import "./styles.css";
import type { Metadata } from "next";
import AccountNav from "./account-nav";
import PwaRegister from "./pwa-register";
export const metadata:Metadata={title:"Harpa & Palavra",description:"Leitura bíblica e repertório autorizado",manifest:"/manifest.webmanifest",icons:{icon:"/images/harpa-palavra-app-icon.png",apple:"/images/harpa-palavra-app-icon.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><PwaRegister/><header><a className="brand" href="/"><img src="/images/harpa-palavra-app-icon.png" alt=""/>Harpa &amp; Palavra</a><nav><a className="hymns-header-link" href="/hinos">Hinos</a><a className="bible-header-link" href="/biblia">Bíblia</a><AccountNav/></nav></header><main>{children}</main><footer>Conteúdo exibido somente quando autorizado e devidamente creditado.</footer></body></html>}
