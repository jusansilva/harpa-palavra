const SHARPS = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const FLATS: Record<string,string> = {"C#":"Db","D#":"Eb","F#":"Gb","G#":"Ab","A#":"Bb"};
export type ChordLine = { type:"line"; segments:{chord?:string;text:string}[] };
export type ChordSection = { type:"section"; kind:string; label?:string; lines:ChordLine[] };
export type ChordDocument = { title?:string; key?:string; capo?:number; comments:string[]; sections:ChordSection[] };
export function transposeChord(chord:string, semitones:number, flats=false) {
  const match = chord.match(/^([A-G])([#b]?)(.*)$/); if (!match) return chord;
  const root = match[1] + match[2]; const index = SHARPS.indexOf(root.replace("Db","C#").replace("Eb","D#").replace("Gb","F#").replace("Ab","G#").replace("Bb","A#"));
  if (index < 0) return chord; const note=SHARPS[(index+semitones+120)%12]; return (flats ? FLATS[note] ?? note : note)+match[3];
}
export function parseChordPro(input:string):ChordDocument {
  const doc:ChordDocument={comments:[],sections:[]}; let current:ChordSection={type:"section",kind:"verse",lines:[]}; doc.sections.push(current);
  for (const raw of input.replace(/\r/g,"").split("\n")) {
    const d=raw.match(/^\{([^:}]+):?\s*(.*?)\}$/); if(d) { const key=d[1].toLowerCase(), value=d[2]; if(key==="title"||key==="t") doc.title=value; else if(key==="key") doc.key=value; else if(key==="capo") doc.capo=Number(value)||0; else if(["comment","c"].includes(key)) doc.comments.push(value); else if(["start_of_chorus","soc","start_of_verse","sov","start_of_bridge","sob"].includes(key)){ current={type:"section",kind:key.includes("chorus")?"chorus":key.includes("bridge")?"bridge":"verse",label:value||undefined,lines:[]};doc.sections.push(current); } continue; }
    const segments:{chord?:string;text:string}[]=[]; let last=0; for(const m of raw.matchAll(/\[([^\]]+)\]/g)){ if(m.index!>last)segments.push({text:raw.slice(last,m.index)}); segments.push({chord:m[1],text:""});last=m.index!+m[0].length; } segments.push({text:raw.slice(last)}); current.lines.push({type:"line",segments});
  } return doc;
}
