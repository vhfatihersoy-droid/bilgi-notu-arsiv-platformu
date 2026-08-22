name: feat(collab): add TipTap + Yjs collaboration demo

Eklenenler:
- package.json — TipTap, Yjs, y-websocket bağımlılıkları
- src/app/collab/page.tsx — TipTap + Yjs demo (varsayılan WebSocket: wss://demos.yjs.dev)

Nasıl test edilir:
1. git checkout feat/collab-yjs
2. npm install
3. npm run dev
4. /collab sayfasını iki pencerede açıp eş zamanlı düzenlemeyi test edin.

Not:
- demos.yjs.dev yalnızca test amaçlıdır; production için kendi y-websocket sunucunuzu deploy edin.
- Yeni paketler eklendiği için branch’e geçtiğinizde mutlaka npm install çalıştırın.
