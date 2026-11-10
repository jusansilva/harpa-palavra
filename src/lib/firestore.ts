import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { getDb } from "./firebase";
export type Hymn={id:string;number:number;title:string;author?:string;license:string;sourceId:string;key?:string;chordDataJson?:string};
export type BibleTranslation={id:string;code:string;name:string;attribution:string;license:string};
export const builtInTranslation:BibleTranslation={id:"builtin-blivre",code:"BLIVRE",name:"Bíblia Livre",license:"CC BY 4.0 BR",attribution:"© Diego Santos, Mario Sérgio e Marco Teles — fevereiro de 2018 · eBible.org"};
export async function listHymns(){const snap=await getDocs(query(collection(getDb(),"hymns"),orderBy("number")));return snap.docs.map(d=>({id:d.id,...d.data()}) as Hymn);}
export async function listTranslations(){const snap=await getDocs(query(collection(getDb(),"bibleTranslations"),orderBy("name")));const translations=snap.docs.map(d=>({id:d.id,...d.data()}) as BibleTranslation);return translations.length?translations:[builtInTranslation];}
export type BibleBook={id:string;name:string;position:number};
export type BibleVerse={id:string;number:number;text:string};
export async function listBibleBooks(translationId:string){const snap=await getDocs(query(collection(getDb(),"bibleBooks"),where("translationId","==",translationId)));return snap.docs.map(d=>({id:d.id,...d.data()}) as BibleBook).sort((a,b)=>a.position-b.position);}
export async function readChapter(translationId:string,bookPosition:number,chapterNumber:number){const snap=await getDocs(query(collection(getDb(),"bibleVerses"),where("translationId","==",translationId),where("bookPosition","==",bookPosition),where("chapterNumber","==",chapterNumber),orderBy("number")));return snap.docs.map(d=>({id:d.id,...d.data()}) as BibleVerse);}
export async function toggleHymnFavorite(uid:string,hymnId:string){const ref=doc(getDb(),"users",uid,"favorites",`hymn_${hymnId}`);const current=await getDoc(ref);if(current.exists()) return import("firebase/firestore").then(({deleteDoc})=>deleteDoc(ref));return setDoc(ref,{hymnId,createdAt:new Date().toISOString()});}
export type StudyNote={id:string;translationId:string;bookPosition:number;bookName:string;chapter:number;verse:number;quote:string;body:string;createdAt:string;updatedAt:string};
export async function createStudyNote(uid:string,note:Omit<StudyNote,"id"|"createdAt"|"updatedAt">){const now=new Date().toISOString();return addDoc(collection(getDb(),"users",uid,"studyNotes"),{...note,createdAt:now,updatedAt:now});}
export async function listStudyNotes(uid:string){const snapshot=await getDocs(query(collection(getDb(),"users",uid,"studyNotes"),orderBy("updatedAt","desc")));return snapshot.docs.map(item=>({id:item.id,...item.data()}) as StudyNote);}
export type BibleStudyProgress={completedDays:number[];quizScores:Record<string,number>;dailyNotes?:Record<string,string>;updatedAt?:string};
export async function getBibleStudyProgress(uid:string){const snapshot=await getDoc(doc(getDb(),"users",uid,"studyProgress","foundations-month-1"));return (snapshot.exists()?snapshot.data():{completedDays:[],quizScores:{}}) as BibleStudyProgress;}
export async function saveBibleStudyProgress(uid:string,progress:BibleStudyProgress){return setDoc(doc(getDb(),"users",uid,"studyProgress","foundations-month-1"),{...progress,updatedAt:new Date().toISOString()});}
export async function upsertUserProfile(user:{uid:string;email:string|null;displayName:string|null;photoURL:string|null}){const now=new Date().toISOString();return setDoc(doc(getDb(),"users",user.uid),{email:user.email,displayName:user.displayName,photoURL:user.photoURL,lastLoginAt:now,updatedAt:now},{merge:true});}
export async function logApplicationEvent(user:{uid:string;email:string|null},action:string){return addDoc(collection(getDb(),"applicationLogs"),{uid:user.uid,email:user.email,action,createdAt:new Date().toISOString()});}
