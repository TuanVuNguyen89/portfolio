# Open Graph Image Setup

Để hiển thị preview ảnh khi chia sẻ link trên mạng xã hội, bạn cần tạo một ảnh preview.

## Cách tạo ảnh OG Image

### Option 1: Sử dụng template HTML (Đơn giản nhất)

1. Mở file `og-image-template.html` trong browser
2. Sử dụng browser extension để chụp screenshot (ví dụ: "Full Page Screen Capture")
3. Hoặc sử dụng DevTools:
   - Right-click vào preview → Inspect
   - Chọn element `.og-image`
   - Right-click → Capture node screenshot
4. Lưu ảnh với tên `og-image.png` vào thư mục `public/`
5. Đảm bảo kích thước là 1200x630px (Open Graph standard)

### Option 2: Sử dụng công cụ online

- [OG Image Generator](https://www.opengraph.xyz/)
- [Canva](https://www.canva.com/) - Tạo design với kích thước 1200x630px
- [Figma](https://www.figma.com/) - Design custom

### Option 3: Tạo bằng code (Dynamic)

Nếu muốn tạo ảnh động dựa trên profile data, có thể sử dụng:
- [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
- [html-to-image](https://github.com/bubkoo/html-to-image)
- [puppeteer](https://pptr.dev/) để screenshot

### Yêu cầu kỹ thuật

- **Kích thước**: 1200x630px (tỷ lệ 1.91:1)
- **Format**: PNG hoặc JPG
- **File size**: < 1MB (khuyến nghị)
- **Tên file**: `og-image.png` (đặt trong `public/`)
- **URL**: Phải accessible công khai (sau khi deploy)

### Kiểm tra

Sau khi deploy, kiểm tra bằng:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Lưu ý

- Ảnh phải được host công khai (không thể localhost)
- Sau khi thay đổi ảnh, có thể cần clear cache của các platform
- Meta tags đã được cấu hình trong `index.html`
