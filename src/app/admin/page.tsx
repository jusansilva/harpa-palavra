import ImportClient from "./import-client";
export default function Admin(){return <section className="auth"><p className="eyebrow">ADMINISTRAÇÃO</p><h1>Importar conteúdo</h1><p>Envie somente dados que você tenha autorização para publicar. O arquivo não é enviado a nenhum servidor Next.js: o root grava diretamente no Firestore.</p><ImportClient/></section>}
