# 📦 Component Documentation

## UI Components

### Button

A versatile button component with multiple variants and states.

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { Button } from '../components/ui/Button';

<Button variant="primary" size="lg">
  Click me
</Button>

<Button variant="danger" isLoading>
  Deleting...
</Button>
```

**Features:**
- Gradient backgrounds for primary actions
- Loading spinner state
- Smooth hover/active animations
- Focus ring for accessibility
- Disabled state handling

---

### Card

A container component with elevation and padding options.

**Props:**
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { Card } from '../components/ui/Card';

<Card variant="elevated" padding="lg" hover>
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>
```

**Features:**
- Multiple elevation levels
- Flexible padding options
- Optional hover effect
- Rounded corners (20px)

---

### Badge

Small status indicators and labels.

**Props:**
```typescript
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { Badge } from '../components/ui/Badge';

<Badge variant="danger" size="sm">
  ⚠️ Câu điểm liệt
</Badge>
```

**Features:**
- Semantic color variants
- Multiple sizes
- Rounded pill shape
- Consistent typography

---

### Progress

Progress bar for tracking completion.

**Props:**
```typescript
interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}
```

**Usage:**
```tsx
import { Progress } from '../components/ui/Progress';

<Progress 
  value={15} 
  max={25} 
  variant="success"
  showLabel 
/>
```

**Features:**
- Smooth transitions
- Color variants
- Optional percentage label
- Responsive sizing

---

### Skeleton

Loading placeholder with shimmer effect.

**Props:**
```typescript
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}
```

**Usage:**
```tsx
import { Skeleton } from '../components/ui/Skeleton';

<Skeleton width={200} height={32} />
<Skeleton variant="circular" width={48} height={48} />
```

**Features:**
- Shimmer animation
- Multiple shapes
- Flexible sizing
- Gradient effect

---

## Exam Components

### ExamHeader

Displays exam information and timer.

**Props:**
```typescript
interface ExamHeaderProps {
  licenseType: string;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  timeLeft: number;
}
```

**Features:**
- Real-time countdown timer
- Progress tracking
- Warning states for low time
- Responsive layout

---

### QuestionCard

Displays a single question with answer options.

**Props:**
```typescript
interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  showResult?: boolean;
  userAnswer?: number | null;
}
```

**Features:**
- Interactive answer selection
- Result display mode
- Critical question indicator
- Explanation section
- Smooth animations

---

### QuestionNavigator

Sidebar navigation for all questions.

**Props:**
```typescript
interface QuestionNavigatorProps {
  questions: Question[];
  currentQuestion: number;
  answers: (number | null)[];
  onQuestionSelect: (index: number) => void;
  onFinish: () => void;
}
```

**Features:**
- Grid layout of question numbers
- Visual progress indicator
- Answer status indicators
- Critical question markers
- Submit button

---

## Home Components

### LicenseCard

Interactive card for selecting license type.

**Props:**
```typescript
interface LicenseCardProps {
  type: string;
  name: string;
  description: string;
  icon: string;
  totalQuestions: number;
  timeLimit: number;
  passingScore: number;
  gradient: string;
}
```

**Features:**
- Gradient header
- Exam statistics
- Hover animations
- Decorative elements
- Call-to-action

---

### FeatureCard

Displays a feature with icon and description.

**Props:**
```typescript
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}
```

**Features:**
- Icon with gradient background
- Hover effects
- Clean typography
- Consistent spacing

---

## Result Components

### ResultHeader

Displays exam results with statistics.

**Props:**
```typescript
interface ResultHeaderProps {
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
  criticalErrors: number;
  passingScore: number;
  licenseType: string;
}
```

**Features:**
- Pass/fail indication
- Statistics grid
- Gradient background
- Decorative elements
- Failure reason display

---

### ResultActions

Action buttons for result page.

**Props:**
```typescript
interface ResultActionsProps {
  licenseType: string;
}
```

**Features:**
- Retry button
- Home button
- Responsive layout
- Consistent styling

---

## Best Practices

### Component Composition
```tsx
// Good: Compose small, focused components
<Card variant="elevated" padding="lg">
  <Badge variant="danger">Important</Badge>
  <h2>Title</h2>
  <Button variant="primary">Action</Button>
</Card>

// Avoid: Large, monolithic components
```

### Props Spreading
```tsx
// Good: Spread remaining props
<button {...props} className={styles}>
  {children}
</button>

// Good: Explicit props
<Button variant="primary" size="lg" disabled={isDisabled}>
```

### Ref Forwarding
```tsx
// All UI components support ref forwarding
const buttonRef = useRef<HTMLButtonElement>(null);
<Button ref={buttonRef}>Click</Button>
```

### TypeScript
```tsx
// Always type your props
interface MyComponentProps {
  title: string;
  count: number;
  onAction: () => void;
}

// Use proper React types
const MyComponent: React.FC<MyComponentProps> = ({ title, count, onAction }) => {
  // ...
};
```

### Accessibility
```tsx
// Include ARIA labels
<button aria-label="Close dialog">×</button>

// Use semantic HTML
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Keyboard navigation
<div role="button" tabIndex={0} onKeyPress={handleKeyPress}>
```

---

## Testing Components

### Manual Testing Checklist
- [ ] Visual appearance matches design
- [ ] Hover states work correctly
- [ ] Focus states are visible
- [ ] Disabled states prevent interaction
- [ ] Loading states display properly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Performance Tips

1. **Avoid inline functions in render**
   ```tsx
   // Bad
   <Button onClick={() => handleClick(id)}>

   // Good
   const handleButtonClick = useCallback(() => handleClick(id), [id]);
   <Button onClick={handleButtonClick}>
   ```

2. **Memoize expensive computations**
   ```tsx
   const sortedItems = useMemo(() => 
     items.sort((a, b) => a.value - b.value),
     [items]
   );
   ```

3. **Use proper keys in lists**
   ```tsx
   {items.map(item => (
     <Card key={item.id}>{item.name}</Card>
   ))}
   ```

---

**Version:** 1.0.0  
**Last Updated:** 2024
