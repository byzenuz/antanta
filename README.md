# OurProject — Jamoa Loyiha Veb-Sayti

> **G'oyamiz. Loyihamiz. Natijamiz.**  
> Mobile-first, zamonaviy, professional jamoa taqdimot saytlari.

---

## 🚀 Ishga tushirish

```bash
# 1. Bog'liqliklarni o'rnating
npm install

# 2. Dev serverni ishga tushiring
npm run dev

# 3. Brauzerda oching
# http://localhost:5173
```

---

## 📝 Matnlarni tahrirlash

**Barcha ma'lumotlar bitta faylda:**

```
src/data/siteData.js
```

Bu faylda quyidagilarni o'zgartiring:
- Loyiha nomi va tavsifi
- Jamoa a'zolari ismlari va rollari
- Kontakt ma'lumotlari (Telegram, Email)
- Natijalar va statistikalar
- Galereya elementlari

---

## 🖼️ Rasmlar va fayllarni qo'shish

| Fayl | Joylashuv | Tavsif |
|------|-----------|--------|
| Jamoa fotosi | `public/images/team-photo.jpg` | Barcha 4 a'zo, 1200×800px |
| 1-a'zo portreti | `public/images/member-1.jpg` | 400×400px, kvadrat |
| 2-a'zo portreti | `public/images/member-2.jpg` | 400×400px, kvadrat |
| 3-a'zo portreti | `public/images/member-3.jpg` | 400×400px, kvadrat |
| 4-a'zo portreti | `public/images/member-4.jpg` | 400×400px, kvadrat |
| Loyiha rasmi | `public/images/project-photo.jpg` | About bo'limi uchun |
| Prezentatsiya | `public/files/presentation.pdf` | PDF fayl |
| Galereya rasmlari | `public/images/gallery/` | Istalgan nom |

**Galereya elementlarini qo'shish:** `src/data/siteData.js` faylidagi `gallery.items` massiviga:
```js
{ id: 1, category: "rasmlar", src: "/images/gallery/foto.jpg", thumb: "/images/gallery/foto.jpg", title: "Sarlavha", type: "image" },
```

---

## 🏗️ Loyiha tuzilmasi

```
src/
├── data/
│   └── siteData.js          ← Barcha ma'lumotlar shu yerda
├── components/
│   ├── Navbar.jsx / .css    ← Navigatsiya
│   ├── Hero.jsx / .css      ← Bosh sahifa
│   ├── About.jsx / .css     ← Loyiha haqida
│   ├── Team.jsx / .css      ← Jamoa
│   ├── Presentation.jsx / .css  ← Prezentatsiya
│   ├── Gallery.jsx / .css   ← Materiallar galereyasi
│   ├── Lightbox.jsx / .css  ← Rasm kattalashtirish
│   ├── Results.jsx / .css   ← Natijalar
│   ├── Contact.jsx / .css   ← Aloqa
│   ├── Footer.jsx / .css    ← Pastki bo'lim
│   └── BackToTop.jsx / .css ← Tepaga qaytish tugmasi
├── App.jsx                  ← Asosiy komponent
├── main.jsx                 ← Kirish nuqtasi
└── index.css                ← Global uslublar
public/
├── images/                  ← Rasmlar joylashuvi
│   ├── gallery/             ← Galereya rasmlari
│   └── slides/              ← Prezentatsiya slaydlari
└── files/                   ← PDF va boshqa fayllar
```

---

## 🌐 Deploy (Nashr qilish)

### Vercel orqali (tavsiya etiladi):
```bash
npm install -g vercel
vercel --prod
```

### Netlify orqali:
```bash
npm run build
# dist/ papkasini netlify.com ga drag-and-drop qiling
```

### GitHub Pages orqali:
```bash
npm install --save-dev gh-pages
# package.json ga qo'shing: "homepage": "https://username.github.io/repo"
npm run build && npx gh-pages -d dist
```

---

## ✅ Tekshirish ro'yxati

- [x] Mobil navigatsiya (ochiladi/yopiladi)
- [x] Silliq scroll bo'limlarga
- [x] Faol bo'lim belgilash (navbar)
- [x] Jamoa foto fallback (rasm yo'q bo'lsa)
- [x] A'zo portret fallback
- [x] PDF mavjudligini tekshirish
- [x] PDF yuklab olish tugmasi
- [x] Galereya filtrlari (ishlaydi)
- [x] Lightbox (klaviatura + backdrop yopish)
- [x] Escape tugmasi lightboxni yopadi
- [x] Back-to-top tugmasi
- [x] `npm run build` muvaffaqiyatli
- [x] 320px dan katta ekranlarda to'g'ri ko'rinish
- [x] Gorizontal scroll yo'q

---

## 🎨 Rang palitrasi

| Nom | Rang |
|-----|------|
| Deep Navy | `#071321` |
| Dark Blue | `#0B1B30` |
| Electric Blue | `#175CFF` |
| Light BG | `#F4F7FB` |
| White Card | `#FFFFFF` |
| Main Text | `#101C33` |
| Muted Text | `#64748B` |

---

*Loyiha yili: 2026*
