# 🚦 Website Thi Thử Bằng Lái Xe Việt Nam

Website thi thử bằng lái xe trực tuyến cho tất cả loại xe tại Việt Nam. Được xây dựng với React Router v7 và TailwindCSS.

## ✨ Tính năng

- 🏍️ Thi thử bằng A1 (xe mô tô)
- 🚗 Thi thử bằng B2 (xe ô tô)
- ⏱️ Đếm ngược thời gian làm bài
- ⚠️ Đánh dấu câu hỏi điểm liệt
- 📊 Chấm điểm tự động và hiển thị kết quả chi tiết
- 🎯 Xem lại đáp án đúng/sai sau khi thi
- 📱 Giao diện responsive, thân thiện trên mọi thiết bị
- 🎨 UI/UX hiện đại, clean với animations mượt mà
- ♿ Accessibility compliant (WCAG guidelines)
- 🔄 Loading states, empty states, error handling
- 🎭 Component-based architecture với TypeScript

## 🎓 Quy định thi

### Bằng A1
- Số câu hỏi: 25 câu
- Thời gian: 19 phút
- Điểm đạt: 21/25 câu
- Sai tối đa 1 câu điểm liệt

### Bằng B2
- Số câu hỏi: 35 câu
- Thời gian: 22 phút
- Điểm đạt: 32/35 câu
- Sai tối đa 1 câu điểm liệt

## 🚀 Cài đặt và Chạy

### Cài đặt dependencies

```bash
npm install
```

### Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

## 📦 Build Production

```bash
npm run build
```

## 🐳 Docker Deployment

```bash
docker build -t driving-test-app .
docker run -p 3000:3000 driving-test-app
```

## 🛠️ Công nghệ sử dụng

- React Router v7 - Framework
- TypeScript - Type safety
- TailwindCSS - Styling
- Vite - Build tool

## 📁 Cấu trúc dự án

```
app/
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Progress.tsx
│   │   └── Skeleton.tsx
│   ├── home/            # Home page components
│   │   ├── LicenseCard.tsx
│   │   └── FeatureCard.tsx
│   ├── exam/            # Exam page components
│   │   ├── ExamHeader.tsx
│   │   ├── QuestionCard.tsx
│   │   └── QuestionNavigator.tsx
│   └── result/          # Result page components
│       ├── ResultHeader.tsx
│       └── ResultActions.tsx
├── data/
│   └── questions.ts     # Question bank
├── routes/
│   ├── home.tsx         # Home page
│   ├── exam.tsx         # Exam page
│   └── result.tsx       # Result page
├── routes.ts            # Route configuration
├── root.tsx             # Root layout
└── app.css              # Global styles & animations
```

## 🎯 Hướng dẫn sử dụng

1. Chọn loại bằng lái muốn thi (A1 hoặc B2)
2. Làm bài trong thời gian quy định
3. Chú ý câu hỏi điểm liệt (đánh dấu ⚠️)
4. Nộp bài và xem kết quả chi tiết

## 📝 Mở rộng

Để thêm câu hỏi mới, chỉnh sửa file `app/data/questions.ts`:

```typescript
{
  id: 1,
  question: 'Câu hỏi của bạn?',
  options: ['Đáp án A', 'Đáp án B', 'Đáp án C'],
  correctAnswer: 0, // Index của đáp án đúng
  isCritical: true, // Đánh dấu câu điểm liệt
  explanation: 'Giải thích (tùy chọn)'
}
```

---

Được xây dựng với ❤️ bằng React Router
