# 📁 Project Overview

**Project Name:** Flexrite World  
**Description:** A modern, interactive physiotherapy website showcasing services, doctors, testimonials, and health-related content. The site features advanced animations, 3D effects, and a sleek design to engage users and promote physiotherapy services.

**Framework and Version:** React 18.3.1 with Vite (build tool), TypeScript  
**Key Technologies:**
- **Routing:** React Router DOM v6.26.2
- **Styling:** Tailwind CSS v3.4.17 with custom design system
- **Animations:** Framer Motion v12.6.2, GSAP v3.13.0
- **3D Graphics:** Three.js v0.176.0, @react-three/fiber v8.18.0
- **UI Components:** Radix UI primitives
- **Forms:** React Hook Form v7.53.0
- **State Management:** React Query v5.56.2
- **Icons:** Lucide React v0.462.0

**Global Dependencies:**
- @paper-design/shaders-react: Custom shader effects
- aceternity-ui: Additional UI components
- animejs: Animation library
- emailjs-com: Contact form handling
- simplex-noise: Procedural generation

# 🧩 Project Structure & File Details

## `/client` (Main Application Directory)
**Purpose:** Contains the entire React application built with Vite.

### `/client/components`
**Purpose:** Reusable React components organized by functionality.

**Key Files:**
- `Header.tsx`: Navigation header with scroll effects
- `Hero.tsx`: Main hero section with complex animations and scroll-triggered effects
- `ParallaxSection.tsx`: Parallax scrolling effects
- `MeetOurDoctors.tsx`: Doctor profiles and information
- `BlogsAndNews.tsx`: Blog/news content display
- `CelebrityTestimonials.tsx`: Celebrity endorsements
- `ClientReviews.tsx`: Customer reviews carousel
- `ContactFooter.tsx`: Contact information and footer
- `LoadingPage.tsx`: Initial loading animation
- `VideoSection.tsx`: Video content display
- `AboutUs.tsx`: Company information section

**Relationships:** Components are imported into pages and other components. Many use custom hooks from `/hooks` and UI primitives from `/components/ui`.

### `/client/components/ui`
**Purpose:** Design system components based on Radix UI and custom implementations.

**Key Files:**
- `ShaderBackground.tsx`: WebGL shader background effects
- `ParticleBackground.tsx`: Particle animation backgrounds
- `AnimatedTitle.tsx`: Animated text components
- `GlassVideoCard.tsx`: Glassmorphism video cards
- `MistOverlay.tsx`: Atmospheric overlay effects
- `ThankYouCard.tsx`: Success/thank you messages
- Plus 40+ Radix UI primitive components (accordion, dialog, etc.)

**Global Styles:** `global.css` contains global animations, font imports, and utility classes.

### `/client/hooks`
**Purpose:** Custom React hooks for shared logic.

**Files:**
- `use-mobile.tsx`: Mobile device detection
- `use-toast.ts`: Toast notification management
- `useZoomOnScroll.tsx`: Scroll-based zoom effects

### `/client/lib`
**Purpose:** Utility functions and configurations.

**Files:**
- `utils.ts`: General utility functions (cn for class merging, etc.)
- `utils.spec.ts`: Unit tests for utilities

### `/client/pages`
**Purpose:** Page components for routing.

**Files:**
- `Index.tsx`: Homepage composition
- `Services.tsx`: Services offered
- `Careers.tsx`: Career opportunities
- `Perks.tsx`: Benefits/perks
- `Corporate.tsx`: Corporate services
- `Portfolio.tsx`: Work portfolio
- `FreeHealthCheckup.tsx`: Health checkup form
- `NotFound.tsx`: 404 error page

**Relationships:** Pages import components and are routed via `AnimatedRoutes.tsx`.

# 🎨 Design System & UI

## Color Palette
**Primary Colors:**
- Navy: `#0F172A` (navy), `#1E293B` (navy-light), `#020617` (navy-dark)
- Teal: `#0E7490` (teal), `#5EEAD4` (teal-light), `#0C4A6E` (teal-dark)
- Sky: `#7DD3FC`

**Neutral Colors:**
- Paper: `#F8FAFC`
- Charcoal: `#1E293B`
- Mist: `#E2E8F0`

**CSS Variables (from global.css):**
- Background: `hsl(0 0% 100%)`
- Foreground: `hsl(222.2 84% 4.9%)`
- Primary: `hsl(222.2 47.4% 11.2%)`
- Secondary: `hsl(210 40% 96.1%)`
- Accent: `hsl(210 40% 96.1%)`

## Typography
**Font Families:**
- Playfair Display: Serif font for headings (`'Playfair Display', serif`)
- Source Sans Pro: Sans-serif for body text (`'Source Sans Pro', sans-serif`)
- Lato: Alternative sans-serif (`'Lato', sans-serif`)
- Roboto: System font (`'Roboto', sans-serif`)

**Font Weights:** 400 (regular), 500 (medium), 600-700 (semi-bold to bold), 800-900 (extra-bold)

**Size Scale:** Responsive clamp() functions used extensively, e.g., `clamp(2rem, 8vw, 10rem)` for hero text

## Spacing & Layout Rules
**Container:** Centered with max-width `1400px`, padding `2rem`

**Grid/Flex Patterns:**
- Hero: Absolute positioning with flexbox for content alignment
- Cards: Grid layouts with responsive breakpoints
- Navigation: Flexbox with space-between alignment

**Breakpoints (Tailwind defaults):**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1400px

## Icons & Illustrations
**Libraries:**
- Lucide React: Modern icon set
- Custom SVGs: Hero images and illustrations in `/public`

**Usage:** Icons used in navigation, buttons, and feature highlights

# 🌈 Backgrounds, Gradients & Overlays

## Background Effects
**Watercolor Gradients (Tailwind custom):**
- `bg-watercolor-1`: Radial gradients with teal and white tones
- `bg-watercolor-2`: Multiple radial gradients for texture
- `bg-watercolor-cta`: High-contrast CTA gradient

**Vignette:** `bg-vignette` - radial gradient for depth

## Shader Backgrounds
**ShaderBackground Component:**
- Uses @paper-design/shaders-react
- WebGL-based animated backgrounds
- Applied to main sections for visual interest

**Particle Backgrounds:**
- Custom particle systems using Three.js
- Animated dots/points for atmosphere

**Mist Overlays:**
- Semi-transparent overlays for depth
- Used in sections for layering effect

**Parallax Effects:**
- CSS transforms based on scroll position
- Implemented in ParallaxSection component

# ⚙️ Components Documentation

## Core Components

### Header
**File:** `client/components/Header.tsx`  
**Purpose:** Navigation bar with scroll-based styling changes  
**Props:** None  
**Interactions:** Scroll detection for background changes  
**Child Components:** Navbar links, logo

### Hero
**File:** `client/components/Hero.tsx`  
**Purpose:** Main landing section with animated text and scroll effects  
**Props:** None  
**Renders:** Animated title "FLEXRITE WORLD", taglines, hero image, scroll indicator  
**Interactions:** Scroll-triggered line animations, mouse scroll indicator  
**Child Components:** VideoSection, AboutUs

### MeetOurDoctors
**File:** `client/components/MeetOurDoctors.tsx`  
**Purpose:** Display doctor profiles with images and information  
**Props:** None  
**Renders:** Grid of doctor cards with photos, names, specialties  
**Interactions:** Hover effects on cards

### BlogsAndNews
**File:** `client/components/BlogsAndNews.tsx`  
**Purpose:** Display blog posts and news articles  
**Props:** None  
**Renders:** Carousel of blog cards with images and excerpts  
**Interactions:** Navigation between blog items

### ShaderBackground
**File:** `client/components/ui/ShaderBackground.tsx`  
**Purpose:** WebGL shader background effects  
**Props:** `{ children: ReactNode }`  
**Renders:** Canvas with shader effects, wraps child content  
**Interactions:** Animated shader patterns

## UI Components (Selection)

### AnimatedTitle
**File:** `client/components/ui/AnimatedTitle.tsx`  
**Purpose:** Animated text with reveal effects  
**Props:** `{ children: ReactNode }`  
**Renders:** Text with CSS animations  
**Interactions:** Scroll-triggered reveals

### GlassVideoCard
**File:** `client/components/ui/GlassVideoCard.tsx`  
**Purpose:** Glassmorphism video display cards  
**Props:** `{ src: string, title?: string, description?: string }`  
**Renders:** Video in glassmorphism container  
**Interactions:** Hover effects

### MistOverlay
**File:** `client/components/ui/MistOverlay.tsx`  
**Purpose:** Atmospheric mist effects  
**Props:** None  
**Renders:** Animated mist particles  
**Interactions:** Continuous animation

# 🧠 Hooks & State Management

## Custom Hooks

### useZoomOnScroll
**File:** `client/hooks/useZoomOnScroll.tsx`  
**Purpose:** Provides zoom effects based on scroll position  
**Returns:** `{ ref: RefObject<HTMLDivElement>, style: CSSProperties }`  
**Logic:** Calculates transform scale based on scroll progress

### useIsMobile
**File:** `client/hooks/use-mobile.tsx`  
**Purpose:** Detects mobile devices  
**Returns:** `boolean`  
**Logic:** Window width < 768px

### useToast
**File:** `client/hooks/use-toast.ts`  
**Purpose:** Toast notification management  
**Returns:** Toast state and control functions

## State Management
**Approach:** React Query for server state, local component state for UI  
**Context Providers:** QueryClientProvider, TooltipProvider, Toaster providers  
**Global State:** Minimal, mostly component-level state

# 🪄 Animations & Transitions

## Libraries Used
- **Framer Motion:** Page transitions, component animations
- **GSAP:** Advanced timeline animations
- **Anime.js:** Lightweight animations
- **CSS Animations:** Keyframe animations in global.css

## Key Animations

### Page Transitions
**Implementation:** AnimatedRoutes with Framer Motion  
**Variants:** initial (opacity 0, y 30), enter (opacity 1, y 0), exit (opacity 0, y -20)  
**Duration:** 0.8s enter, 0.6s exit

### Scroll Animations
**Hero Lines:** Translate based on scroll progress  
**Reveal Effects:** Fade in on scroll in various components  
**Parallax:** Transform Y based on scroll position

### Hover Effects
**Cards:** Scale transforms, shadow changes  
**Buttons:** Color transitions, scale effects  
**Navigation:** Background and text color changes

# 🧰 Utilities & Configurations

## Tailwind Configuration
**File:** `tailwind.config.ts`  
**Custom Colors:** Navy, teal, sky variants  
**Fonts:** Playfair, Source Sans Pro, Lato, Roboto  
**Background Images:** Watercolor gradients, vignette  
**Animations:** Accordion animations  
**Plugins:** tailwindcss-animate

## Vite Configuration
**File:** `vite.config.ts`  
**React Plugin:** SWC for fast compilation  
**Path Aliases:** @/ points to client/

## Environment Variables
**Usage:** dotenv for configuration  
**Purpose:** API keys, environment-specific settings

## Helper Functions
**File:** `client/lib/utils.ts`  
**cn Function:** Class name merging with clsx and tailwind-merge  
**Purpose:** Consistent className handling

# 🧾 Page-by-Page Breakdown

## Homepage (/)
**Path:** `/`  
**File:** `client/pages/Index.tsx`  
**Description:** Main landing page with all major sections  
**Components Used:**
- Header
- Hero
- ParallaxSection
- MeetOurDoctors
- BlogsAndNews
- CelebrityTestimonials
- ClientReviews
- ContactFooter
- ShaderBackground
- Floating FreeHealthCheckup button

**Layout:** Full-screen sections with fixed header

## Services (/services)
**Path:** `/services`  
**File:** `client/pages/Services.tsx`  
**Description:** Detailed services offered by Flexrite World  
**Components:** Service cards, descriptions, CTAs

## Free Health Checkup (/freehealthcheckup)
**Path:** `/freehealthcheckup`  
**File:** `client/pages/FreeHealthCheckup.tsx`  
**Description:** Interactive health assessment form  
**Components:** Form fields, progress indicators, thank you cards  
**Layout:** Multi-step form with animations

## Other Pages
- **Careers (/careers):** Job listings and company culture
- **Perks (/perks):** Benefits calculator and information
- **Corporate (/corporate):** B2B services
- **Portfolio (/portfolio):** Case studies and work examples
- **Not Found:** 404 error page

# 🧪 Future Development / Notes

## Optimization Suggestions
- **Image Optimization:** Implement lazy loading for hero images
- **Bundle Splitting:** Code-split large components (Three.js, shaders)
- **Animation Performance:** Use `will-change` for animated elements
- **SEO:** Add meta tags and structured data

## Code Quality Improvements
- **TypeScript:** Add stricter typing for component props
- **Testing:** Expand unit test coverage
- **Accessibility:** Add ARIA labels and keyboard navigation
- **Performance:** Implement React.memo for expensive components

## Scalability Considerations
- **Component Library:** Extract reusable components to separate package
- **State Management:** Consider Zustand for complex state needs
- **API Integration:** Implement proper error handling and loading states

## Unused Components Found
- Several UI components in `/stash` appear unused
- Duplicate ThankYouCard components (ThankYouCard.tsx vs ThankYouCard1.tsx)

## Technical Debt
- Inline styles mixed with Tailwind classes
- Large Hero component could be split into smaller pieces
- Some components lack proper TypeScript interfaces
