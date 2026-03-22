# ⚡ Quick Start Guide

## 🚀 Get Running in 60 Seconds

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: **http://localhost:5173**

That's it! 🎉

---

## 📖 What You'll See

### Home Page
- Hero section with call-to-action
- Two license type cards (A1 and B2)
- Feature highlights
- Instructions section

### Exam Page
- Timer countdown (top right)
- Current question display
- Answer options (A, B, C, D)
- Question navigator (sidebar)
- Progress tracking

### Result Page
- Pass/fail status
- Score breakdown
- Detailed answer review
- Retry and home buttons

---

## 🎮 How to Use

### Taking an Exam

1. **Choose License Type**
   - Click on A1 (Motorcycle) or B2 (Car) card

2. **Answer Questions**
   - Click on answer options (A, B, C, D)
   - Use "Câu sau" button to move forward
   - Use "Câu trước" button to go back
   - Click question numbers in sidebar to jump

3. **Monitor Time**
   - Watch the countdown timer
   - Green = plenty of time
   - Amber = less than 1 minute
   - Red = less than 30 seconds

4. **Submit Exam**
   - Click "Nộp bài" when ready
   - Or wait for timer to expire

5. **View Results**
   - See your score
   - Review correct/incorrect answers
   - Read explanations
   - Retry or go home

---

## 🎯 Exam Rules

### Bằng A1 (Motorcycle)
- **Questions:** 25
- **Time:** 19 minutes
- **Pass Score:** 21/25 (84%)
- **Critical Errors:** Max 1

### Bằng B2 (Car)
- **Questions:** 35
- **Time:** 22 minutes
- **Pass Score:** 32/35 (91%)
- **Critical Errors:** Max 1

### Critical Questions (Điểm Liệt)
- Marked with ⚠️ badge
- Red dot on question number
- Failing more than 1 = automatic fail
- Even if total score is high enough

---

## 🎨 UI Components Overview

### Buttons
```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="success">Success Action</Button>
<Button variant="danger">Danger Action</Button>
<Button variant="ghost">Ghost Action</Button>
```

### Cards
```tsx
<Card variant="elevated" padding="lg">
  Content here
</Card>
```

### Badges
```tsx
<Badge variant="danger">⚠️ Critical</Badge>
<Badge variant="success">✓ Correct</Badge>
```

### Progress
```tsx
<Progress value={15} max={25} variant="success" />
```

---

## 🛠️ Development Tips

### File Structure
```
app/
├── components/     # Reusable components
├── data/          # Question bank
├── routes/        # Page components
└── app.css        # Global styles
```

### Adding Questions
Edit `app/data/questions.ts`:
```typescript
{
  id: 26,
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C'],
  correctAnswer: 0, // Index of correct option
  isCritical: true, // Mark as critical question
  explanation: 'Optional explanation'
}
```

### Modifying Styles
- Use Tailwind utility classes
- Custom animations in `app.css`
- Component-specific styles in component files

### Creating New Components
```tsx
// app/components/ui/MyComponent.tsx
import { forwardRef } from 'react';

interface MyComponentProps {
  // props here
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props}>Content</div>;
  }
);

MyComponent.displayName = 'MyComponent';
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Type check
npm run typecheck

# Clean build
rm -rf build
npm run build
```

---

## 📱 Testing on Mobile

### Local Network Access
1. Find your local IP:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Access from mobile:
   ```
   http://YOUR_IP:5173
   ```

### Responsive Testing
- Chrome DevTools (F12)
- Toggle device toolbar (Cmd+Shift+M)
- Test different screen sizes

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm start
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### Docker
```bash
docker build -t driving-test .
docker run -p 3000:3000 driving-test
```

---

## 📚 Learn More

- **React Router:** https://reactrouter.com/
- **TypeScript:** https://www.typescriptlang.org/
- **TailwindCSS:** https://tailwindcss.com/
- **Vite:** https://vitejs.dev/

---

## 💡 Pro Tips

1. **Use Keyboard Shortcuts** (coming soon)
   - Arrow keys to navigate
   - Number keys to select answers

2. **Bookmark Difficult Questions** (coming soon)
   - Star icon to mark for review

3. **Practice Mode** (coming soon)
   - No timer, instant feedback

4. **Dark Mode** (coming soon)
   - Toggle in settings

---

## 🎯 Next Steps

1. ✅ Run the app
2. ✅ Take a practice exam
3. ✅ Review the code
4. ✅ Read documentation
5. ✅ Customize for your needs
6. ✅ Deploy to production

---

## 🤝 Need Help?

- Check `README.md` for detailed setup
- Read `COMPONENTS.md` for component docs
- See `DESIGN_SYSTEM.md` for design guidelines
- Review `UX_IMPROVEMENTS.md` for enhancement ideas

---

**Happy Coding! 🚀**
