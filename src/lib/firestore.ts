import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore";
import { getDb } from "./firebase";
export type Hymn={id:string;number:number;title:string;author?:string;license:string;sourceId:string};
export type BibleTranslation={id:string;code:string;name:string;attribution:string;license:string};
export const builtInTranslation:BibleTranslation={id:"builtin-blivre",code:"BLIVRE",name:"Bíblia Livre",license:"CC BY 4.0 BR",attribution:"© Diego Santos, Mario Sérgio e Marco Teles — fevereiro de 2018 · eBible.org"};
export async function listHymns(){const snap=await getDocs(query(collection(getDb(),"hymns"),orderBy("number"),limit(50)));return snap.docs.map(d=>({id:d.id,...d.data()}) as Hymn);}
export async function listTranslations(){const snap=await getDocs(query(collection(getDb(),"bibleTranslations"),orderBy("name")));const translations=snap.docs.map(d=>({id:d.id,...d.data()}) as BibleTranslation);return translations.length?translations:[builtInTranslation];}
export async function toggleHymnFavorite(uid:string,hymnId:string){const ref=doc(getDb(),"users",uid,"favorites",`hymn_${hymnId}`);const current=await getDoc(ref);if(current.exists()) return import("firebase/firestore").then(({deleteDoc})=>deleteDoc(ref));return setDoc(ref,{hymnId,createdAt:new Date().toISOString()});}
