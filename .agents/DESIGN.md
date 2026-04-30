# Design System: Nexcellence Academy™

This document formalizes the existing design system of the Nexcellence Academy™ website. It is derived from the current implementation and should be used as a reference for maintaining visual consistency.

---

## 🎨 Design Tokens

### 1. Colors

#### Primary (Academic & Authority)
Used for main headings, navigation, primary actions, and branding.
- `--color-primary`: `hsl(222.2 47.4% 11.2%)` (Deep Slate Blue)
- `--color-primary-foreground`: `hsl(210 40% 98%)` (Off-white)
- `--color-academic-navy`: `#0a192f` (Deep Navy, used in heroes/sidebars)

#### Secondary (Elite & Gold)
Used for highlights, accents, call-to-action buttons, and progress indicators.
- `--color-secondary`: `hsl(40 100% 57%)` (Refined Gold)
- `--color-secondary-dark`: `#c2820a` (Used for button borders/shadows)
- `--color-secondary-foreground`: `hsl(222.2 47.4% 11.2%)` (Deep Slate Blue)

#### Surface Tiers
- `--surface-background`: `hsl(210 20% 98%)` (Light Gray base)
- `--surface-card`: `hsl(0 0% 100%)` (Pure White)
- `--surface-muted`: `hsl(210 20% 96%)` (Soft Gray)
- `--surface-dark`: `hsl(222.2 84% 4.9%)` (Slate 900)

#### Borders & States
- `--border-base`: `hsl(214.3 31.8% 91.4%)` (Subtle Gray)
- `--input-border`: `hsl(214.3 31.8% 91.4%)`
- `--ring-focus`: `hsl(40 100% 57%)` (Secondary Gold)

---

### 2. Typography

#### Font Families
- **Sans-Serif**: `Lato`, sans-serif (Weights: 300, 400, 700, 900)
- **Serif**: `Noto Serif`, serif (Used for branding and headings)

#### Type Scale
| Role | Size | Weight | Tracking | Case | Font |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Heading** | `2.25rem` (4xl) | 700/800 | Tight | Uppercase | Serif |
| **Section Heading** | `1.5rem` (2xl) | 700 | Normal | Mixed (Italic) | Serif |
| **Nav Link** | `13px` | 700 | Wide | Uppercase | Sans |
| **Label / Accent** | `10px` | 700 | Widest | Uppercase | Sans |
| **Body Text** | `1rem` | 400 | Normal | Mixed | Sans |

---

### 3. Elevation & Radius

#### Elevation
- **Elevated Card**: `shadow-[0_8px_30px_rgba(0,0,0,0.04)]`
- **Deep Shadow (Hero/Dark)**: `shadow-2xl`
- **Glassmorphism**: `backdrop-blur-md` (Used in Header)

#### Radius
- **Base Radius**: `1rem` (16px)
- **Component Radius**: `0.375rem` (6px - `rounded-md`)
- **Strict Layout**: `0` (`rounded-none` used in premium form cards and specific buttons)

---

## 🧱 Components

### 1. Buttons

#### Default / Primary
- **Style**: Primary background, light text.
- **Hover**: Slight opacity change or secondary background swap.

#### Secondary (High Impact)
- **Style**: Gold background, primary text. Often includes a 4px bottom border (`#c2820a`) for tactile feel.
- **Case**: Always Uppercase.
- **States**: `hover:scale-[1.02]`, `hover:bg-secondary/90`.

#### Variants
- **Outline**: Thin border, transparent background, primary text.
- **Ghost**: No background/border until hover.

### 2. Cards

#### The "Nexcellence" Card
- **Pattern**: Pure white surface, `elevated-card` shadow.
- **Highlight**: 8px top border in `--color-secondary`.
- **Padding**: Generous (`p-10` to `p-16`).

### 3. Inputs & Forms

#### Input Fields
- **Standard**: Light gray background (`bg-slate-50`), subtle border (`slate-200`).
- **Focus**: Border color changes to Gold (`--color-secondary`).
- **Label**: Positioned above, small, bold, uppercase, tracking-widest.

---

## 📏 Design Rules & Patterns

### Spacing & Layout
- **Hero Height**: Typically `35vh`.
- **Section Padding**: `py-20` (80px) is the standard vertical breathing room.
- **Container**: Max width `7xl` (1280px) centered.

### Visual Hierarchy
- **Typography Hierarchy**: Uses a combination of "Gold Accent Label" (Top) → "Main Heading" (Middle) → "Body/Subtext" (Bottom).
- **Academic Contrast**: High contrast between light surfaces and deep navy/slate sections.

### Observed Inconsistencies
- **Border Radius**: Some components use `rounded-md` (buttons, inputs in `form-input.tsx`), while others use `rounded-none` (premium application form and "Apply Now" button). 
- **Typography Case**: Service category dropdowns use mixed case, while navigation and labels are strictly uppercase.
- **Shadows**: Footer and header use `shadow-sm` and `shadow-slate-200/50`, while main cards use a custom `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`.

---

## 🧭 Navigation Patterns

### Header
- **Top Bar**: Minimalist, dark background (`slate-900`), small uppercase text.
- **Main Nav**: Sticky, blurred white background, primary colored links that turn gold on hover.
- **Search**: Expandable dropdown or overlay.

### Footer
- **Structure**: Multi-column layout with a distinct copyright bar.
- **Style**: Follows the primary surface/border rules.
