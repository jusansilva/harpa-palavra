import { describe, expect, it } from "vitest";
import { parseChordPro, transposeChord } from "../src/lib/chordpro";
describe("ChordPro",()=>{it("transpõe acordes complexos preservando sufixo",()=>expect(transposeChord("F#m7/B",2)).toBe("G#m7/B"));it("lê título, refrão e acordes",()=>{const song=parseChordPro("{title: Exemplo}\n{start_of_chorus: Refrão}\n[C]Graça");expect(song.title).toBe("Exemplo");expect(song.sections[1].kind).toBe("chorus");expect(song.sections[1].lines[0].segments[0].chord).toBe("C");});});
