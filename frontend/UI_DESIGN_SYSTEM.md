# Modern Interview AI Platform - UI/UX Documentation

## 🎨 Design System Overview

This document outlines the modern, industry-grade UI system designed for the Interview Preparation Platform. The design follows best practices from leading SaaS platforms like Stripe, Notion, Linear, and Vercel.

---

## 🎭 Color Palette

### Primary Colors
- **Background**: `#0f172a` (Deep Navy)
- **Background Secondary**: `#1e293b` (Slate-900)
- **Background Tertiary**: `#0f172a` (Slate-950)

### Accent Colors
- **Primary Accent**: `#22d3ee` (Cyan-400) - Main interactive elements
- **Secondary Accent**: `#06b6d4` (Cyan-500) - Hover states
- **Success**: `#10b981` (Emerald-500) - Positive feedback
- **Warning**: `#f59e0b` (Amber-500) - Caution states
- **Error**: `#ef4444` (Red-500) - Critical feedback

### Text Colors
- **Primary**: `#ffffff` (White) - Headings, main text
- **Secondary**: `#cbd5e1` (Slate-300) - Body text
- **Tertiary**: `#94a3b8` (Slate-400) - Muted text

---

## 🧩 Reusable Components

### 1. **LoadingSpinner**
Animated loading indicator with optional text.
```jsx
<LoadingSpinner size="md" text="Loading..." />
```
- Sizes: `sm`, `md`, `lg`
- Shows animated border with cyan accent

### 2. **FeatureCard**
Showcases service/feature with icon, title, and description.
```jsx
<FeatureCard
  icon={FileText}
  title="Resume Interview"
  description="Upload and practice..."
  onClick={() => navigate("/resume-upload")}
  badge="Popular"
/>
```
- Features gradient hover effects
- Badge for highlighting popular options
- Icon in rounded container with background

### 3. **QuestionCard**
Displays interview questions with numbering and status.
```jsx
<QuestionCard
  questionNumber={1}
  question="Tell me about yourself"
  isActive={true}
  hasAnswer={false}
  onReadAgain={() => console.log('Read')}
/>
```
- Glassmorphism design
- Status indicators
- Read again button

### 4. **ProgressBar**
Linear progress indicator with animated fill.
```jsx
<ProgressBar current={5} total={10} showText={true} />
```
- Smooth animations
- Optional text label
- Gradient fill color

### 5. **ScoreIndicator**
Circular or compact score display.
```jsx
<ScoreIndicator score={85} maxScore={100} label="Overall Score" size="lg" />
```
- Sizes: `sm`, `md`, `lg`
- Supports compact mode
- Color-coded by performance

### 6. **TranscriptBox**
Live transcript display with copy functionality.
```jsx
<TranscriptBox transcript={text} isLive={true} onCopy={() => {}} />
```
- Auto-scrolls to bottom when live
- Character count
- Copy button with feedback

### 7. **Badge**
Multi-variant status badges.
```jsx
<Badge text="Recommended" variant="primary" size="md" onRemove={() => {}} />
```
- Variants: `default`, `primary`, `success`, `warning`, `error`, `gradient`
- Sizes: `sm`, `md`, `lg`
- Optional close button

### 8. **Button**
Comprehensive button component.
```jsx
<Button
  variant="primary"
  size="lg"
  loading={false}
  disabled={false}
  onClick={() => {}}
  icon={Send}
  fullWidth={true}
>
  Click Me
</Button>
```
- Variants: `primary`, `secondary`, `success`, `danger`, `outline`
- Sizes: `sm`, `md`, `lg`
- Loading and disabled states

### 9. **Input**
Form input with validation and optional icon.
```jsx
<Input
  type="text"
  label="Email"
  placeholder="Enter email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error="Invalid email"
  icon={Mail}
/>
```
- Built-in validation error display
- Optional leading icon
- Responsive focus states

### 10. **Select**
Dropdown select component.
```jsx
<Select
  options={[{label: 'Option 1', value: 'opt1'}]}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  label="Choose"
  placeholder="Select..."
/>
```
- Custom options format
- Error state support
- Styled chevron icon

---

## 📄 Page Layouts

### **Dashboard** (`/dashboard`)
- Comprehensive overview with statistics
- Quick summary cards with KPIs
- Feature cards for main actions
- Recent interviews list
- Performance insights section

**Key Components**: StatCard, FeatureCard, Navbar, Sidebar

### **Resume Upload** (`/resume-upload`)
- Drag-and-drop file upload
- Resume analysis results
- Skills extraction with badges
- Question preview with navigation
- Progress indicator

**Key Components**: Input, Badge, Button, ProgressBar, LoadingSpinner

### **Interview Setup** (`/interview-setup`)
- Role selection dropdown
- Experience level selector
- Company type choice
- Configuration summary
- Info cards about the feature

**Key Components**: Select, Button, Input

### **AI Interview** (`/interview`)
- Progress bar and timer
- Current question display
- Voice recording controls
- Live transcript box
- Navigation controls

**Key Components**: ProgressBar, QuestionCard, TranscriptBox, Button

### **Report** (`/report`)
- Overall score display (circular)
- Recommendation badge
- Interview details
- Skill scores breakdown
- Question-wise analysis table
- Strengths and improvements sections

**Key Components**: ScoreIndicator, Badge, ProgressBar

### **Reports List** (`/reports`)
- Statistics overview (cards)
- Search and filter
- Reports table/list view
- Responsive mobile layout
- Pagination info

**Key Components**: Badge, Button, Input

### **Navigation**
- **Sidebar**: Fixed left navigation (250px width)
  - Brain icon logo
  - Main menu items
  - Settings section
  - Logout button

- **Navbar**: Fixed top bar (56px height)
  - Welcome message with date
  - Notification bell
  - Settings button
  - User profile dropdown

---

## 🎨 Design Tokens

### Spacing Scale
```
2px, 4px, 6px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px
```

### Font Sizes
```
12px (xs), 14px (sm), 16px (base), 18px (lg), 20px (xl), 24px (2xl), 32px (3xl), 40px (4xl)
```

### Font Weights
```
400 (normal), 500 (medium), 600 (semibold), 700 (bold), 900 (black)
```

### Border Radius
```
4px (sm), 6px, 8px, 12px, 16px (lg), 20px (xl), 24px (2xl)
```

### Shadows
```
sm: 0 1px 2px 0 rgba(0,0,0,0.05)
md: 0 4px 6px -1px rgba(0,0,0,0.1)
lg: 0 10px 15px -3px rgba(0,0,0,0.1)
xl: 0 20px 25px -5px rgba(0,0,0,0.1)
```

---

## ✨ Animations

### Transitions
- Default duration: 200ms
- Hover effects: 300ms
- Modal/Drawer: 150ms

### Common Animations
- **Fade In**: 0.5s ease-out
- **Slide In**: 0.3s ease-out
- **Pulse**: 2s infinite
- **Bounce**: 1s infinite

---

## 🚀 Best Practices

### 1. **Consistency**
- Use components consistently across all pages
- Maintain color scheme throughout
- Use same spacing scales

### 2. **Responsiveness**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Stack on mobile, grid on desktop

### 3. **Accessibility**
- Proper color contrast ratios
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support

### 4. **Performance**
- Lazy load components
- Optimize images
- Use CSS variables
- Minimize re-renders

### 5. **User Experience**
- Clear visual hierarchy
- Consistent spacing
- Smooth transitions
- Loading states
- Error handling
- Empty states

---

## 🔧 Tailwind Configuration

The project uses Tailwind CSS v4 with:
- Custom color palette
- Extended spacing
- Custom animations
- Dark mode support

All styling uses Tailwind utilities - no additional CSS needed for most components.

---

## 📚 Component Usage Examples

### Creating a New Page
```jsx
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

function NewPage() {
  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 lg:p-12">
            {/* Content here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPage;
```

### Gradient Text
```jsx
<h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
  Premium Heading
</h1>
```

### Glassmorphism Card
```jsx
<div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
  {/* Card content */}
</div>
```

---

## 🎯 Summary

This modern UI system provides:
- ✅ Production-ready components
- ✅ Consistent design language
- ✅ Professional appearance
- ✅ Excellent UX
- ✅ Easy to maintain and extend
- ✅ SaaS-grade quality
- ✅ Fully responsive
- ✅ Dark theme optimized

The platform is now ready to be showcased in internship interviews, hackathons, or final year project reviews!
