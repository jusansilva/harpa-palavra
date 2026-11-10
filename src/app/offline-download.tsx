"use client";
import { useState } from "react";
import { downloadOffline } from "@/lib/offline";
export default function OfflineDownload(){const [status,setStatus]=useState("");return <div className="offline"><button onClick={()=>downloadOffline(setStatus).catch(()=>setStatus("Não foi possível concluir o download. Tente novamente online."))}>Baixar para uso offline</button>{status&&<small role="status">{status}</small>}</div>}
