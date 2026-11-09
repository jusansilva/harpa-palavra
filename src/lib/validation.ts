import { z } from "zod";
export const credentialsSchema = z.object({ email:z.string().email().max(254), password:z.string().min(12).max(128), name:z.string().trim().min(2).max(80).optional() });
export const hymnImportRowSchema = z.object({ number:z.coerce.number().int().positive().max(640), title:z.string().trim().min(1).max(180), author:z.string().trim().max(160).optional(), lyrics:z.string().trim().min(1).max(30000), chordPro:z.string().trim().max(30000).optional(), license:z.string().trim().min(3).max(500), source:z.string().trim().min(2).max(120) });
export const favoriteSchema = z.object({ hymnId:z.string().cuid().optional(), verseId:z.string().cuid().optional(), note:z.string().max(2000).optional() }).refine(v => Boolean(v.hymnId || v.verseId), "Informe um hino ou versículo");
