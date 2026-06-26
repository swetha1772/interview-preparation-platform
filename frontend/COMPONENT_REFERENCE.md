# 🎨 Visual Component Reference

## Component Gallery & Usage

### 1. LoadingSpinner
```
┌─────────────────────────────┐
│   ⟳ Loading...              │
│                             │
│ [Spinner animation]         │
└─────────────────────────────┘

Props: size, text
Variants: sm, md, lg
```

### 2. FeatureCard
```
┌───────────────────────────────────────┐
│ ✨ Popular                            │
│                                       │
│ [📄] Resume Interview                │
│ Upload and practice with AI feedback │
│                                       │
│ ➜                                    │
└───────────────────────────────────────┘

Props: icon, title, description, badge
Color: Cyan accent on hover
Effect: Scale 1.02 on hover
```

### 3. QuestionCard
```
┌─────────────────────────────────────┐
│ ① Tell me about yourself            │
│                                     │
│ Large readable question text...     │
│                                     │
│ [🔊 Read Again]                     │
└─────────────────────────────────────┘

Props: questionNumber, question, hasAnswer
Effect: Glassmorphism (backdrop blur)
```

### 4. ProgressBar
```
┌──────────────────────────────┐
│ ░░░░░░██████████░░░░░░░░░░░ │
│ Progress    5 / 10           │
└──────────────────────────────┘

Props: current, total, showText
Color: Cyan gradient fill
```

### 5. ScoreIndicator
```
┌─────────────────────┐
│        82           │
│       (Circle)      │
│      82%            │
│                     │
│   Overall Score     │
└─────────────────────┘

Props: score, label, size
Sizes: sm, md, lg
Color-coded: Green (80+), Cyan (60+), Yellow (40+)
```

### 6. TranscriptBox
```
┌─────────────────────────────────┐
│ ⚫ Live Transcript [Copy]       │
│                                 │
│ Your spoken words appear here... │
│ The text scrolls down as you    │
│ continue speaking.              │
│                                 │
│ 237 characters                  │
└─────────────────────────────────┘

Props: transcript, isLive, onCopy
Feature: Auto-scroll, copy button, char count
```

### 7. Badge
```
┌──────────────────────┐
│ ✓ Recommended        │
└──────────────────────┘

Props: text, variant, size
Variants: default, primary, success, warning, error, gradient
Sizes: sm, md, lg
```

### 8. Button
```
┌──────────────────────────────────────┐
│ [➜ Next Question] [Submit] [Cancel] │
└──────────────────────────────────────┘

Props: variant, size, loading, disabled, icon
Variants: primary, secondary, success, danger, outline
Sizes: sm, md, lg
States: normal, hover, active, loading, disabled
```

### 9. Input
```
┌──────────────────────────────┐
│ Email                        │
│ [📧 example@email.com      ] │
│ Invalid email format         │
└──────────────────────────────┘

Props: type, label, placeholder, error, icon
Feature: Validation messages, icons, focus states
```

### 10. Select
```
┌──────────────────────────────┐
│ Experience Level             │
│ [Senior Level (5+ years)  ▼] │
└──────────────────────────────┘

Props: options, value, label, placeholder
Feature: Custom styling, chevron icon, error states
```

---

## Page Layout Patterns

### Dashboard Layout
```
┌────────────────────────────────────────┐
│ Sidebar    │  Navbar                   │
│            │  Welcome, John            │
├────────────┼────────────────────────────┤
│            │  [Stat] [Stat] [Stat]    │
│ Menu Items │  [Stat]                  │
│            │                          │
│            │  Start Interview         │
│            │  [Card] [Card] [Card]   │
│            │                          │
│ Settings   │  Recent | Performance    │
│ Logout     │                          │
└────────────┴────────────────────────────┘
```

### Interview Layout
```
┌────────────────────────────────────────┐
│ Sidebar    │  Navbar                   │
├────────────┼────────────────────────────┤
│            │  Q1/8  [Timer: 9:45]     │
│            │  [Progress Bar]          │
│ Menu Items │                          │
│            │  [Question Card]         │
│            │                          │
│            │  [Mic Controls]          │
│            │                          │
│            │  [Prev] [Next] [Submit] │
│            │                          │
│            │         [Transcript Box] │
└────────────┴────────────────────────────┘
```

### Report Layout
```
┌────────────────────────────────────────┐
│ Sidebar    │  Navbar                   │
├────────────┼────────────────────────────┤
│            │  Interview Report        │
│ Menu Items │  [Export] [Share]       │
│            │                          │
│            │  [Score] [Rec] [Details]│
│            │                          │
│            │  Skills (4 cards)        │
│            │                          │
│            │  Q-wise Analysis         │
│            │                          │
│            │  Strengths | Improve    │
└────────────┴────────────────────────────┘
```

---

## Color Usage Examples

### Background Layers
```
Primary BG:     #0f172a (Deep Navy)
Secondary BG:   #1e293b (Slate-900) 
Tertiary BG:    #0f172a (Slate-950)
Card:           rgba(15,23,42,0.6) with backdrop blur
Hover:          rgba(15,23,42,0.8)
```

### Text Hierarchy
```
Heading 1:      text-4xl bold (#ffffff)
Heading 2:      text-2xl bold (#ffffff)
Heading 3:      text-xl semibold (#ffffff)
Body Text:      text-base (#cbd5e1)
Muted Text:     text-sm (#94a3b8)
```

### Interactive States
```
Normal:         #22d3ee (Cyan-400)
Hover:          #06b6d4 (Cyan-500)
Focus:          ring-1 ring-cyan-400/50
Active:         scale-95
Disabled:       opacity-50
```

### Status Colors
```
Success:        #10b981 (Emerald-500)
Warning:        #f59e0b (Amber-500)
Error:          #ef4444 (Red-500)
Info:           #06b6d4 (Cyan-600)
```

---

## Typography System

### Font Stack
```
Primary Font: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif
Mono Font:    ui-monospace, Consolas, monospace
Size Scale:   12px, 14px, 16px, 18px, 20px, 24px, 32px, 40px
Weight:       400, 500, 600, 700, 900
Line Height:  1.5 (default)
```

### Heading Styles
```
H1: 32px, 700 weight, color #fff
H2: 24px, 700 weight, color #fff
H3: 20px, 600 weight, color #fff
H4: 18px, 600 weight, color #e2e8f0
```

---

## Spacing Scale

```
2px   = 0.125rem
4px   = 0.25rem
6px   = 0.375rem
8px   = 0.5rem   ← Base unit
12px  = 0.75rem
16px  = 1rem
20px  = 1.25rem
24px  = 1.5rem
32px  = 2rem
40px  = 2.5rem
48px  = 3rem
56px  = 3.5rem
64px  = 4rem
```

### Common Patterns
```
Card Padding:           p-6 to p-8
Section Margin:         mb-12 to mb-16
Gap Between Items:      gap-3 to gap-6
Button Padding:         px-4 py-3 to px-6 py-3
Input Padding:          px-4 py-3
Heading Bottom Space:   mb-2 to mb-4
```

---

## Animation Timing

```
Quick Hover:        200ms ease-out
Smooth Transition:  300ms ease-out
Page Load:          500ms ease-out
Loading Spin:       1s linear infinite
Pulse:              2s ease-in-out infinite
Stagger Delay:      100ms between items
```

### Common Animations
```
Fade In:            opacity 0→1, 500ms
Slide In:           transform Y -10px→0, 300ms
Scale:              transform scale 1→1.05, 300ms
Shadow Grow:        shadow sm→lg, 300ms
Border Color:       border-color transition, 200ms
```

---

## Responsive Breakpoints

```
Mobile:   < 640px   (full width, single column)
Tablet:   640-1024px (md prefix, 2-3 columns)
Desktop:  > 1024px  (lg prefix, 3-4 columns)

Common Grid:
- Mobile:  1 column
- Tablet:  2 columns (md:grid-cols-2)
- Desktop: 3 columns (lg:grid-cols-3)
```

---

## Shadow Depth Levels

```
None:       no shadow
Subtle:     shadow-sm (for borders)
Medium:     shadow (for cards)
Large:      shadow-lg (for dropdowns)
X-Large:    shadow-xl (for modals)
2X-Large:   shadow-2xl (for focus states)
```

---

## Border Radius Scale

```
None:    0
Extra Small: rounded-sm (4px)
Small:       rounded (6px)
Medium:      rounded-lg (8px)
Large:       rounded-xl (12px)
2X-Large:   rounded-2xl (16px)
Full:       rounded-full (9999px)
```

---

## Z-Index Hierarchy

```
Background:     z-0
Content:        z-10
Sidebar:        z-20 (fixed)
Navbar:         z-20 (fixed)
Dropdown:       z-30
Modal:          z-40
Toast:          z-50
```

---

## Key Tailwind Utilities

### Layout
```
display:     flex, grid, block, inline
direction:   flex-row, flex-col
alignment:   items-center, justify-between
spacing:     gap-4, p-6, mb-8
sizing:      w-full, h-screen, min-h-screen
overflow:    overflow-auto, overflow-hidden
```

### Colors
```
background:  bg-slate-950, bg-cyan-400/20
text:        text-white, text-cyan-400
border:      border-slate-700, border-cyan-400/30
```

### Effects
```
shadow:      shadow-lg, shadow-cyan-500/10
blur:        backdrop-blur-xl, blur-sm
opacity:     opacity-50, opacity-0
```

### Transforms
```
translate:   translate-y-1, -translate-y-1
scale:       scale-105, scale-95
rotate:      rotate-90
```

### Transitions
```
default:     transition-all duration-300
specific:    transition-colors duration-200
hover:       hover:border-cyan-400, hover:scale-105
active:      active:scale-95
```

---

## Quick Copy Patterns

### Card Base
```jsx
className="bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300"
```

### Button Base
```jsx
className="px-4 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50"
```

### Input Base
```jsx
className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none"
```

### Glass Effect
```jsx
className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl"
```

### Heading Base
```jsx
className="text-4xl font-bold text-white mb-2"
```

---

## Testing the UI

### Manual Testing Checklist
- [ ] All components render without errors
- [ ] Hover states work on cards and buttons
- [ ] Buttons respond to clicks
- [ ] Inputs accept text and show validation
- [ ] Dropdowns expand and select options
- [ ] Animations are smooth (60fps)
- [ ] Responsive layout works on mobile
- [ ] Colors match the design system
- [ ] Text is readable with good contrast
- [ ] Forms are usable with keyboard

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

---

This is your complete reference guide for the modern UI system!
All components are production-ready and fully documented.
