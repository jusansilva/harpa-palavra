import "./styles.css";
import type { Metadata } from "next";
export const metadata:Metadata={title:"Harpa & Palavra",description:"Leitura bíblica e repertório autorizado"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><header><a href="/">Harpa &amp; Palavra</a><nav><a href="/hinos">Hinos</a><a href="/biblia">Bíblia</a><a href="/entrar">Entrar</a><a href="/admin">Admin</a></nav></header><main>{children}</main><footer>Conteúdo exibido somente quando autorizado e devidamente creditado.</footer></body></html>}
