# 👑 Crown Barber Studio

**Premium luxury barbershop landing page** for a fictional brand — Crown Barber Studio.  
Designed for the modern gentleman. Built with HTML5, CSS3, and Vanilla JavaScript.

---

## 🌐 Live Preview
Open `index.html` in any browser or publish via the **Publish tab**.

---

## ✅ Completed Features

| Section | Status |
|---|---|
| Sticky Navigation Bar (scroll + mobile) | ✅ |
| Hero Section with Ken Burns + Parallax | ✅ |
| Animated Statistics Counter | ✅ |
| About Section | ✅ |
| Services Section with Pricing | ✅ |
| Why Choose Us Section | ✅ |
| Gallery with Filter + Lightbox | ✅ |
| Testimonials Section | ✅ |
| Booking Process (4 Steps) | ✅ |
| Location Section with Google Maps | ✅ |
| Contact & Booking Information Section | ✅ |
| Premium Footer | ✅ |
| Floating WhatsApp Button | ✅ |
| Back to Top Button | ✅ |
| Fully Responsive (Desktop / Tablet / Mobile) | ✅ |
| Smooth Scroll | ✅ |
| Gold shimmer text effect | ✅ |
| Card hover tilt effect (desktop) | ✅ |
| Lazy image loading | ✅ |

---

## 📁 Project Structure

```
/
├── index.html          # Main landing page (all sections)
├── css/
│   └── style.css       # Complete luxury design system
├── js/
│   └── main.js         # All JavaScript interactions
└── README.md
```

---

## ✏️ How to Edit Content

### 🟢 Change WhatsApp Number (Updates ALL Buttons)
Open `js/main.js`, find the `WA_CONFIG` object at the very top:

```js
const WA_CONFIG = {
  phone:   '6281234567890',  // ← Change this number
  message: 'Halo Crown Barber Studio! ...'  // ← Change default message
};
```

> **All WhatsApp buttons across the entire website will update automatically.**

---

### 💰 Change Service Prices
Open `index.html` and search for `<!-- EDITABLE PRICE -->`.  
Change the text inside `<span class="service-price">` tags:

```html
<!-- EDITABLE PRICE -->
<span class="service-price">Rp 50.000</span>
```

---

### 📍 Change Address / Hours
Open `index.html` and search for:
- `<!-- EDITABLE ADDRESS -->` — to change the address
- `<!-- EDITABLE HOURS -->` — to change business hours
- `<!-- EDITABLE EMAIL -->` — to change email address
- `<!-- EDITABLE INSTAGRAM LINK -->` — to change Instagram

---

### 🗺️ Change Google Maps
In `index.html`, find the `<iframe>` inside `.location-map` and replace the `src` attribute with your actual Google Maps embed URL:

```html
<!-- EDITABLE: Replace src with your actual Google Maps embed URL -->
<iframe src="YOUR_GOOGLE_MAPS_EMBED_URL" ...></iframe>
```

---

### 🖼️ Change Gallery / Section Images
Images use `<img src="...">` tags. Replace the `src` attributes with your own image URLs. Each image has a comment describing what it shows.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background Black | `#111111` |
| Dark Gray | `#1C1C1C` |
| Gold Accent | `#D4AF37` |
| Gold Light | `#E5C96A` |
| White | `#FFFFFF` |
| Display Font | Playfair Display |
| Body Font | Inter |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `> 1024px` | Desktop (full layout) |
| `≤ 1024px` | Tablet |
| `≤ 768px` | Mobile |
| `≤ 480px` | Small Mobile |

---

## 🔗 Contact Information (Placeholders)

| Channel | Placeholder |
|---|---|
| WhatsApp | +62 812-3456-7890 |
| Email | hello@crownbarberstudio.com |
| Instagram | @crownbarberstudio |
| Address | Jakarta, Indonesia |
| Hours | 10:00 AM – 9:00 PM |

---

## 🚀 Next Steps / Recommended Improvements

1. **Replace placeholder images** with your actual barbershop photos
2. **Update contact info** with your real WhatsApp number and email
3. **Embed real Google Maps** with your actual studio address
4. **Add more gallery images** to showcase your work
5. **Connect a booking form** (optional) using a third-party service like Calendly or Booksy
6. **SEO optimization** — add real meta tags, Open Graph, and Schema.org markup
7. **Add Google Analytics** for visitor tracking
8. **Customize service prices** to match real pricing

---

## ⚡ Technologies Used

- **HTML5** — Semantic markup, accessibility (ARIA)
- **CSS3** — Custom Properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** — No frameworks, zero dependencies
- **Google Fonts** — Playfair Display + Inter
- **Font Awesome 6** — Icons via CDN

---

*Crafted with ♥ for gentlemen by Crown Barber Studio*
