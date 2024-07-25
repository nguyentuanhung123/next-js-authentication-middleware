This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Trong Next.js, Authentication và middleware là hai khái niệm quan trọng thường được sử dụng để quản lý quyền truy cập và xử lý yêu cầu HTTP.

### Authentication trong Next.js

- Authentication (Xác thực) là quá trình xác minh danh tính của người dùng. Trong một ứng dụng Next.js, có nhiều cách để thực hiện xác thực, bao gồm sử dụng JWT (JSON Web Tokens), OAuth, session-based authentication, và các giải pháp như NextAuth.js.

- JWT (JSON Web Tokens): JWT là một tiêu chuẩn mở để truyền tải dữ liệu dưới dạng JSON giữa các bên một cách an toàn. Dữ liệu trong JWT được ký để đảm bảo rằng nó không bị thay đổi. Trong Next.js, bạn có thể sử dụng JWT để xác thực bằng cách tạo một token khi người dùng đăng nhập và lưu token này trong localStorage hoặc cookies của trình duyệt.
- Session-based Authentication: Đây là một phương pháp phổ biến, trong đó một session được tạo ra trên máy chủ khi người dùng đăng nhập và session ID được lưu trữ trong cookies của trình duyệt. Mỗi khi người dùng gửi yêu cầu tới máy chủ, session ID sẽ được kiểm tra để xác nhận người dùng đã đăng nhập hay chưa.
- NextAuth.js: Đây là một thư viện xác thực cho Next.js, hỗ trợ nhiều nhà cung cấp OAuth 2.0 (như Google, Facebook, GitHub) cũng như hỗ trợ xác thực dựa trên email và mật khẩu. NextAuth.js cung cấp một API dễ sử dụng để quản lý xác thực và phiên đăng nhập.

### Middleware trong Next.js

- Middleware là các hàm trung gian được sử dụng để xử lý yêu cầu HTTP trước khi chúng được chuyển đến route handler. Trong Next.js, middleware có thể được sử dụng để xác thực, kiểm tra quyền truy cập, xử lý lỗi, hoặc thực hiện bất kỳ logic nào trước khi một yêu cầu được xử lý bởi một route cụ thể.

- Middleware trong API Routes: Bạn có thể tạo các hàm middleware trong Next.js và sử dụng chúng trong các API route để xử lý các yêu cầu trước khi chúng được chuyển đến handler chính.

```jsx
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Kiểm tra nếu người dùng đã đăng nhập
  if (!request.cookies.has('token')) {
    return NextResponse.redirect('/login');
  }
  // Tiếp tục xử lý yêu cầu
  return NextResponse.next();
}
```

- Middleware cho toàn bộ ứng dụng: Next.js 12 trở lên hỗ trợ middleware cấp ứng dụng, cho phép bạn định nghĩa các middleware sẽ được áp dụng cho tất cả các yêu cầu.

```jsx
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Nếu yêu cầu là đến trang /protected
  if (pathname === '/protected') {
    // Kiểm tra nếu người dùng đã đăng nhập
    if (!request.cookies.has('token')) {
      return NextResponse.redirect('/login');
    }
  }
  
  return NextResponse.next();
}
```

- Middleware này sẽ được chạy trước khi bất kỳ yêu cầu nào được chuyển đến handler tương ứng của chúng, cho phép bạn thực hiện các kiểm tra và xử lý cần thiết.
