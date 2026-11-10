import HymnsClient from "./hymns-client";
import OfflineDownload from "../offline-download";
export default function Hymns(){return <section><p className="eyebrow">REPERTÓRIO</p><h1>Hinos</h1><p>Pesquise e salve obras cuja fonte e licença tenham sido confirmadas.</p><OfflineDownload/><HymnsClient/></section>}
