# SHOP.CO — React clone

Aapke screenshot ka pura functional React app, Vite + React Router se bana hua.

## Chalane ka tareeqa (how to run)

```bash
npm install
npm run dev
```

Browser me `http://localhost:5173` khol lein. Production build ke liye:

```bash
npm run build
npm run preview
```

## Kya kya features hain

- **Routes** (`react-router-dom`): `/` home, `/shop` listing + filters, `/product/:id` detail page,
  `/cart` cart page, aur ek `*` 404 page.
- **useState** har jagah: mobile menu, dropdown, quantity stepper, size/color pick, search box,
  newsletter form, testimonial carousel, filters, promo code — sab interactive.
- **Props**: `ProductCard`, `ProductGrid`, `StarRating`, `Reveal` sab reusable components hain jo
  props se data lete hain.
- **Context + localStorage**: cart aur wishlist `CartContext` me hain aur `localStorage` me save
  hote hain — page reload/refresh karne par bhi data wapis mil jata hai. Announcement bar ka
  "closed" state bhi localStorage me save hota hai.
- **Animations / hover effects**: scroll-in reveal animation (`useReveal` hook +
  IntersectionObserver), product image zoom on hover, quick-add button slide-up, wishlist heart,
  infinite brands marquee, sparkle float animation on hero, dropdown/mobile-menu slide, page fade
  transition, toast notification jab item cart me add ho.
- **Fully responsive**: mobile, tablet aur desktop teeno ke liye breakpoints (`index.css` ke bottom
  me media queries), hamburger menu chhote screens par.

## Folder structure

```
src/
  components/   -> Navbar, Footer, ProductCard, Hero, Testimonials, Newsletter, etc.
  pages/        -> Home, Shop, ProductDetail, Cart, NotFound
  context/      -> CartContext.jsx (cart + wishlist + localStorage)
  data/         -> products.js (mock catalogue — apna data yahan replace kar sakte hain)
  hooks/        -> useReveal.js (scroll animation hook)
  index.css     -> saara styling + animations + responsive rules
```

## Customize karna ho to

- Products change karne ke liye `src/data/products.js` edit karein — har product ka `image` field
  ek placeholder URL hai, apni product photos ke links waha daal dein.
- Colors/fonts `src/index.css` ke `:root` block me CSS variables se control hote hain.
