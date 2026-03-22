# Hướng dẫn Deploy lên Cloudflare Pages

## Cách 1: Deploy qua Cloudflare Dashboard (Khuyến nghị)

### Bước 1: Push code lên GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Bước 2: Kết nối với Cloudflare Pages
1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vào **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Chọn repository GitHub của bạn
4. Cấu hình build:
   - **Framework preset**: None (hoặc React)
   - **Build command**: `npm run build`
   - **Build output directory**: `build/client`
   - **Root directory**: `/` (để trống)
   - **Node version**: `20`

### Bước 3: Deploy
- Click **Save and Deploy**
- Cloudflare sẽ tự động build và deploy
- Mỗi lần push code mới, Cloudflare sẽ tự động rebuild

---

## Cách 2: Deploy qua Wrangler CLI

### Bước 1: Cài đặt Wrangler
```bash
npm install -g wrangler
```

### Bước 2: Đăng nhập Cloudflare
```bash
wrangler login
```

### Bước 3: Build project
```bash
npm run build
```

### Bước 4: Deploy
```bash
wrangler pages deploy build/client --project-name=driving-test
```

---

## Cấu hình đã setup

✅ **react-router.config.ts**: Đã tắt SSR (`ssr: false`) để build static
✅ **wrangler.toml**: Cấu hình Cloudflare Pages
✅ **.node-version**: Chỉ định Node.js version 20

---

## Lưu ý

- Project này build ra **static files** (SPA mode)
- Không cần server-side rendering
- Hoàn toàn miễn phí trên Cloudflare Pages
- Tự động HTTPS và CDN global
- Unlimited bandwidth

---

## Custom Domain (Tùy chọn)

Sau khi deploy, bạn có thể thêm custom domain:
1. Vào project trên Cloudflare Pages
2. **Custom domains** → **Set up a custom domain**
3. Thêm domain của bạn và cấu hình DNS

---

## Troubleshooting

### Lỗi build
- Kiểm tra Node version (phải >= 18)
- Chạy `npm install` trước khi build
- Xóa `node_modules` và `package-lock.json`, cài lại

### Lỗi routing (404)
- Cloudflare Pages tự động handle SPA routing
- Nếu vẫn lỗi, thêm file `_redirects` trong `public/`:
  ```
  /*    /index.html   200
  ```
