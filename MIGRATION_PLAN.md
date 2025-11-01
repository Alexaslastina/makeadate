# Nx React Migration Plan

## Project Overview
Converting the static HTML "Make a Date" website into a modern Nx-managed React SPA with client-side routing, React Bootstrap, and React hooks replacing jQuery functionality.

## Current Project Structure

### Existing Files
- **HTML Pages** (7 total):
  - `index.html` - Home page with carousel and date location grid
  - `about.html` - About page with team information
  - `gallery.html` - Media gallery
  - `faq.html` - Frequently asked questions
  - `contact.html` - Contact form
  - `rooftop.html` - Rooftop date details
  - `amusement.html` - Amusement park date details

- **Styles**: `_css/` directory
  - `general.css` - Global styles, header, footer
  - `home_nav.css` - Navigation styles
  - `about.css` - About page styles
  - `contact.css` - Contact page styles
  - `faq.css` - FAQ page styles
  - `gallery.css` - Gallery page styles

- **Scripts**:
  - `jquery-3.5.1.min.js` - jQuery library
  - `plugins/burger_plug.js` - Burger menu jQuery plugin
  - `bootstrap.min.css` - Bootstrap 4 CSS

- **Assets**:
  - `images/` - All website images

## Migration Goals

1. **Single Page Application (SPA)**: Convert all HTML pages into React components with client-side routing
2. **Modern Stack**: Use React 18, React Router, and Vite for fast builds
3. **React Bootstrap**: Replace Bootstrap CSS with React Bootstrap components
4. **No jQuery**: Replace all jQuery functionality with React hooks and state
5. **Nx Workspace**: Organize code in an Nx monorepo structure for scalability

## Target Architecture

```
makeadate/
├── apps/
│   └── frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   ├── Header.tsx
│       │   │   │   ├── Footer.tsx
│       │   │   │   ├── DateCard.tsx
│       │   │   │   └── TipCard.tsx
│       │   │   ├── pages/
│       │   │   │   ├── Home.tsx
│       │   │   │   ├── About.tsx
│       │   │   │   ├── Gallery.tsx
│       │   │   │   ├── FAQ.tsx
│       │   │   │   ├── Contact.tsx
│       │   │   │   ├── Rooftop.tsx
│       │   │   │   └── Amusement.tsx
│       │   │   ├── hooks/
│       │   │   │   └── useBurgerMenu.ts
│       │   │   ├── styles/
│       │   │   │   └── (migrated CSS files)
│       │   │   └── App.tsx (with routing)
│       │   └── assets/
│       │       └── images/
│       └── project.json
├── nx.json
└── package.json
```

## Implementation Steps

### Phase 1: Nx Workspace Setup
- [x] Initialize package.json
- [x] Install Nx and React plugins
- [ ] Generate React application named "frontend"
- [ ] Install dependencies:
  - react-router-dom
  - react-bootstrap
  - bootstrap
  - @fortawesome/react-fontawesome
  - @fortawesome/free-brands-svg-icons
  - @fortawesome/free-solid-svg-icons

### Phase 2: Project Structure
- [ ] Create folder structure in `apps/frontend/src/`:
  - `/app/components` - Shared components
  - `/app/pages` - Page components
  - `/app/hooks` - Custom hooks
  - `/app/styles` - CSS files
  - `/assets/images` - Image assets

### Phase 3: Shared Components

#### Header Component
- Convert navigation bar from HTML
- Implement responsive burger menu with React state
- Use React Router's `<Link>` for navigation
- Mobile-responsive behavior (hide nav on mobile, show burger icon)

**Key Features**:
- Logo image display
- Navigation links: Home, About, Media, FAQ, Contact
- Burger menu toggle for mobile devices
- Fade animation for mobile menu (CSS transitions)

#### Footer Component  
- Social media icon links (Instagram, Facebook, YouTube, Telegram)
- Font Awesome icons
- Responsive layout

### Phase 4: Page Components

#### Home Page (`pages/Home.tsx`)
**Components to create**:
- Carousel component (3 slides with images and captions)
- Date location grid (8 cards with background images)
- Sidebar tip cards (2 columns with 3 cards each)

**Content**:
- Hero carousel with dating tips
- Grid showcasing date types:
  - Rooftop date
  - Amusement park
  - Dance lesson
  - Yacht sailing
  - Ice skating
  - Horse riding tour
  - Weekend in Paris
  - Hot air balloon ride
- First date tips in sidebar cards

#### About Page (`pages/About.tsx`)
**Content**:
- Founder profile (Alexandra Slastina)
- Company history
- Team member cards (3 team members)
- Service description
- How the company works

#### Gallery Page (`pages/Gallery.tsx`)
- Media display component
- Image gallery layout

#### FAQ Page (`pages/FAQ.tsx`)
- FAQ accordion or list
- Common questions and answers

#### Contact Page (`pages/Contact.tsx`)
- Contact form
- Company contact information

#### Rooftop Page (`pages/Rooftop.tsx`)
- Rooftop date location details
- Images and description

#### Amusement Page (`pages/Amusement.tsx`)
- Amusement park date details
- Images and description

### Phase 5: Routing Setup
Configure React Router v6 in `App.tsx`:
```tsx
<BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/rooftop" element={<Rooftop />} />
    <Route path="/amusement" element={<Amusement />} />
  </Routes>
  <Footer />
</BrowserRouter>
```

### Phase 6: Style Migration
- Copy CSS files from `_css/` to `apps/frontend/src/app/styles/`
- Update CSS paths for images (change relative paths)
- Import Google Fonts (Dancing Script)
- Import Bootstrap CSS
- Configure global styles

### Phase 7: Asset Migration
- Copy `images/` folder to `apps/frontend/src/assets/images/`
- Update all image references in components
- Use Vite's asset imports: `import imageName from '../assets/images/...'`

### Phase 8: jQuery Replacement

#### Burger Menu
**Old jQuery approach** (`burger_plug.js`):
```javascript
$.fn.burgerNav = function(_navTag) {
  $(this).on("click",() => {
    $(_navTag).fadeToggle(800);
  })
}
```

**New React approach**:
```tsx
// Custom hook
function useBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return { isOpen, toggle };
}

// In Header component
const { isOpen, toggle } = useBurgerMenu();
<nav className={isOpen ? 'open' : ''}>...</nav>
<div className="burger" onClick={toggle}>...</div>
```

Use CSS transitions for fade effect instead of jQuery's fadeToggle.

### Phase 9: Nx Configuration
- Update `project.json` for frontend app
- Configure build and serve targets
- Set up asset paths in Vite configuration
- Configure development and production builds

### Phase 10: Testing & Quality Assurance
- [ ] Test all routes navigate correctly
- [ ] Verify responsive behavior on mobile/tablet/desktop
- [ ] Ensure all images load correctly
- [ ] Test burger menu functionality
- [ ] Verify carousel functionality
- [ ] Test forms (if applicable)
- [ ] Check browser compatibility

### Phase 11: Cleanup
- [ ] Remove old HTML files after verification
- [ ] Remove jQuery files
- [ ] Remove burger plugin
- [ ] Remove old Bootstrap CSS (after migrating to React Bootstrap)
- [ ] Clean up unused assets

## Technology Stack

### Current Stack
- HTML5
- CSS3
- Bootstrap 4
- jQuery 3.5.1
- Font Awesome 4.7

### Target Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Monorepo**: Nx
- **Routing**: React Router v6
- **UI Library**: React Bootstrap
- **Icons**: Font Awesome React
- **Styling**: CSS Modules / CSS
- **TypeScript**: Yes
- **Package Manager**: npm

## Key Technical Decisions

### 1. Why Nx?
- Scalable monorepo architecture
- Built-in tooling for React applications
- Fast builds with caching
- Easy to add more apps/libraries later
- Great developer experience

### 2. Why React Bootstrap?
- Better integration with React
- Component-based approach
- TypeScript support
- Maintains Bootstrap's visual consistency
- No jQuery dependency

### 3. Why Vite?
- Extremely fast development server
- Fast production builds
- Modern ES module support
- Better than Create React App
- First-class TypeScript support

### 4. Single Page Application (SPA)
- Better user experience (no page reloads)
- Faster navigation
- Modern web standard
- Better state management
- Easier to maintain

## Dependencies to Install

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "react-bootstrap": "^2.9.0",
    "bootstrap": "^5.3.0",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@fortawesome/free-brands-svg-icons": "^6.5.0",
    "@fortawesome/free-solid-svg-icons": "^6.5.0",
    "@fortawesome/fontawesome-svg-core": "^6.5.0"
  },
  "devDependencies": {
    "nx": "^22.0.2",
    "@nx/react": "^22.0.2",
    "@nx/vite": "^22.0.2",
    "@nx/workspace": "^22.0.2",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

## Migration Checklist

### Setup Phase
- [x] Create package.json
- [x] Add .gitignore
- [ ] Install Nx and dependencies
- [ ] Generate frontend app

### Development Phase
- [ ] Create folder structure
- [ ] Migrate assets (images, fonts)
- [ ] Migrate styles
- [ ] Create Header component
- [ ] Create Footer component
- [ ] Create reusable card components
- [ ] Implement routing
- [ ] Migrate Home page
- [ ] Migrate About page
- [ ] Migrate Gallery page
- [ ] Migrate FAQ page
- [ ] Migrate Contact page
- [ ] Migrate Rooftop page
- [ ] Migrate Amusement page
- [ ] Replace jQuery burger menu
- [ ] Test all functionality

### Finalization Phase
- [ ] Run production build
- [ ] Test production build
- [ ] Remove old HTML files
- [ ] Remove jQuery dependencies
- [ ] Update README with new instructions
- [ ] Deploy to hosting

## Expected Outcomes

1. **Modern React Application**: Professional, maintainable codebase
2. **Better Performance**: Faster load times with Vite
3. **Improved UX**: Smooth navigation without page reloads
4. **Scalable Architecture**: Easy to add new features/pages
5. **Better Developer Experience**: Hot module replacement, TypeScript support
6. **No jQuery Dependency**: Lighter bundle, better performance
7. **Responsive Design**: Maintained from original site
8. **SEO Ready**: Can add React Helmet for meta tags

## Timeline Estimate

- **Phase 1-2** (Setup & Structure): 30 minutes
- **Phase 3** (Shared Components): 1 hour
- **Phase 4** (Page Migration): 3-4 hours
- **Phase 5-8** (Routing, Styles, Assets, jQuery): 2 hours
- **Phase 9-11** (Configuration, Testing, Cleanup): 1 hour

**Total Estimated Time**: 7-8 hours

## Notes

- All original content will be preserved
- Visual design will remain the same
- URLs will change (client-side routing)
- Consider adding a 404 page
- May want to add loading states
- Consider adding error boundaries
- Could add React Helmet for SEO

