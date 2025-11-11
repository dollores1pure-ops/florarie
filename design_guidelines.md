# Design Guidelines: Flower Shop E-Commerce Website

## Design Approach
**Reference-Based Approach** drawing inspiration from premium e-commerce platforms (Etsy, The Bouqs, Bloomscape) combined with modern checkout experiences (Stripe, Shopify). Focus on elegant, photography-first design that showcases floral products beautifully while maintaining trust and usability through the purchase journey.

## Core Design Elements

### Typography
- **Primary Font**: Playfair Display (serif) for headings - elegant, refined
- **Secondary Font**: Inter (sans-serif) for body text, buttons, UI elements
- **Scale**: 
  - Hero headlines: text-5xl to text-6xl (48-60px)
  - Product titles: text-2xl (24px)
  - Section headers: text-3xl to text-4xl (30-36px)
  - Body text: text-base to text-lg (16-18px)
  - Small text (prices, meta): text-sm (14px)

### Layout System
**Tailwind Spacing Units**: Consistently use 4, 6, 8, 12, 16, 20, 24 for spacing
- Container: max-w-7xl with px-4 md:px-8
- Section padding: py-12 md:py-20
- Component spacing: gap-6 md:gap-8
- Card padding: p-6
- Button padding: px-6 py-3

### Component Library

**Navigation**
- Sticky header with logo (left), main navigation (center), cart icon with count badge (right)
- Categories: Bouquets, Occasions, Seasonal, About, Contact
- Mobile: Hamburger menu with slide-in drawer
- Include search icon for product discovery

**Homepage Components**
- Hero section (70vh): Full-width floral image with overlay, headline + subheadline, primary CTA button
- Featured Collections: 3-column grid (mobile: 1 col, tablet: 2 col) with large category images
- Best Sellers: 4-column product grid with hover effects
- Testimonials: 2-column layout with customer photos and quotes
- Instagram Feed: 4-5 images in row showcasing recent arrangements
- Newsletter signup with floral accent graphic

**Product Catalog**
- Filter sidebar (desktop) / drawer (mobile): Categories, price range, occasions, flower types
- Product grid: 3-4 columns (responsive), each card shows image, name, price, quick-add button
- Sort options: Featured, Price (low-high), Newest, Best Selling

**Product Detail Page**
- 2-column layout: Image gallery (left 60%), product info (right 40%)
- Image gallery: Main image + thumbnail strip, zoom on hover
- Product info: Name, price, description, size/customization options, quantity selector, Add to Cart CTA
- Below fold: Tabs for Care Instructions, Delivery Info, Reviews
- Related products carousel

**Shopping Cart**
- Slide-out drawer (right side) with line items showing thumbnail, name, price, quantity controls
- Subtotal, estimated delivery, Continue Shopping + Checkout CTAs
- Empty state with suggested products

**Checkout Flow (Stripe Integration)**
- Single-page checkout with progress indicator (Contact → Delivery → Payment)
- Left: Order summary with images
- Right: Form sections with validation
- Stripe Elements embedded seamlessly
- Trust badges (secure checkout, money-back guarantee)

**Footer**
- 4-column grid: About, Shop, Support, Connect
- Newsletter signup form
- Social media links
- Contact info, delivery info, return policy links
- Payment method icons

### Interactions & Animations
**Minimal, purposeful motion:**
- Product card hover: Subtle scale (scale-105) + shadow increase
- Image crossfade on product gallery transitions
- Cart drawer slide-in (transform-translate)
- Smooth scroll to sections
- Button hover: Slight brightness shift, no complex animations

### Images
**Hero Section**: Large, vibrant full-width image of a beautiful seasonal bouquet with soft focus background, flowers in sharp focus. Natural lighting, professional photography aesthetic.

**Product Images**: High-quality square/vertical product photos with white or naturally lit backgrounds. Showcase arrangements from multiple angles in galleries.

**Category Cards**: Lifestyle images showing occasions (weddings, birthdays) or flower types in beautiful settings.

**Testimonials**: Small circular customer photos alongside quotes.

**Throughout**: Use fresh, natural flower photography with soft botanical color inspiration. Avoid stock photos - aim for cohesive, professionally-shot catalog aesthetic.

### Visual Hierarchy
- Product images are the primary focus - large, high-quality, prominent
- Clear price display with original/sale pricing when applicable
- Strong CTAs in consistent positions (Add to Cart, Proceed to Checkout)
- Breadcrumb navigation on product pages
- Product names in elegant serif, prices in clean sans-serif

### E-Commerce Specifics
- Price display: Always visible, formatted with currency symbol
- Stock indicators: "In Stock", "Low Stock", "Sold Out" badges
- Quick view option on product cards for fast browsing
- Save to wishlist functionality (heart icon)
- Delivery date selector with calendar integration
- Gift message option at checkout
- Rating stars on products (5-star system)

### Trust Elements
- Customer reviews with verified purchase badges
- Delivery guarantee messaging
- Secure payment icons (Stripe, credit cards accepted)
- Free delivery threshold indicator
- Return policy highlight
- Live chat/support contact visible

This design creates an elegant, trustworthy shopping experience that puts beautiful floral photography center stage while ensuring seamless navigation through browsing, selection, and checkout.