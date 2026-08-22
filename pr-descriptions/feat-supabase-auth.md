---
name: feat(supabase): Supabase auth + notes CRUD
---

Eklenenler:
- `src/lib/supabaseClient.ts` — Supabase client helper
- `.env.example` — gerekli NEXT_PUBLIC_* değişkenleri
- `src/app/auth/page.tsx` — Magic link e‑posta akışı + GitHub/Google OAuth butonları (placeholder)
- `src/lib/notes.ts` — notes CRUD helper

Nasıl test edilir:
1. `.env.local` oluşturun (repoya commit etmeyin) ve `.env.example`’daki değerleri koyun.
2. `npm install` ve `npm run dev`.
3. `/auth` sayfasında magic link veya OAuth akışını test edin (Supabase proje ayarları gerekebilir).

Checklist:
- [ ] .env.local oluşturuldu mu? (developer)
- [ ] Supabase proje ve auth provider’lar yapılandırıldı mı? (owner)
