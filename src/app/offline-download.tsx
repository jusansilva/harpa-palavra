"use client";
import { useEffect,useState } from "react";
import { downloadOffline,hasBibleOfflineCopy } from "@/lib/offline";
export default function OfflineDownload(){const [status,setStatus]=useState(""),[downloaded,setDownloaded]=useState(false);useEffect(()=>setDownloaded(hasBibleOfflineCopy()),[]);async function download(){try{await downloadOffline(setStatus);setDownloaded(true)}catch{setStatus("Não foi possível concluir o download. Tente novamente online.")}}if(downloaded)return <div className="offline"><small role="status">Bíblia disponível para leitura offline neste dispositivo.</small></div>;return <div className="offline"><button onClick={download}>Baixar para uso offline</button>{status&&<small role="status">{status}</small>}</div>}
