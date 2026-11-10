import BibleClient from "./bible-client";
import OfflineDownload from "../offline-download";
export default function Bible(){return <section><p className="eyebrow">ESCRITURAS</p><h1>Bíblia</h1><p>Busca e leitura ficam disponíveis por tradução autorizada, com créditos preservados.</p><OfflineDownload/><BibleClient/></section>}
