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

### Setup project
- npx shadcn-ui@latest init
- npm i bcryptjs jsonwebtoken mongoose

### Setup database
- B1: Tạo folder database và models (trong thư mục src)

### Setup form
- B1: Tạo folder utils (trong thư mục app)
- B2: Tạo folder form-element (trong thư mục components)

```jsx
const CommonFormElement = ({ currentItem, value, onChange }) => {
    let content = null;

    switch (currentItem.componentType) {
        case 'input':
            content = (
                <Input 
                    name={currentItem.name} 
                    id={currentItem.name} 
                    placeholder={currentItem.placeholder} 
                    value={value} 
                    onChange={onChange}
                />
            );
            break;

        default:
            content = (
                <Input 
                    name={currentItem.name} 
                    id={currentItem.name} 
                    placeholder={currentItem.placeholder} 
                    value={value} 
                    onChange={onChange}
                />
            );
            break;
    }

    return content;
}

export default CommonFormElement;
```

### Thêm địa chỉ IP ở mongodb

- B1: Ở Sidebar, chọn Network Access
- B2: Bổ sung: 0.0.0.0/0

### Token
- Khi một token hết hạn, nó không còn hợp lệ và các yêu cầu sử dụng token này sẽ bị từ chối. Điều này đảm bảo rằng các token chỉ có hiệu lực trong một khoảng thời gian nhất định, giúp tăng cường bảo mật.

## Xử lý khi token hết hạn
- Dưới đây là một ví dụ về cách xử lý token hết hạn:

# Xác thực token:
- Khi token hết hạn, jwt.verify sẽ trả về một lỗi. Bạn có thể kiểm tra lỗi này và thực hiện các biện pháp cần thiết, chẳng hạn như yêu cầu người dùng đăng nhập lại hoặc làm mới token.

# Làm mới token (Token Refresh):
- Một cách phổ biến để xử lý token hết hạn là sử dụng cơ chế làm mới token. Bạn có thể tạo một token làm mới (refresh token) có thời gian hết hạn dài hơn và sử dụng nó để cấp lại token truy cập (access token) mới.

# Ví dụ mã nguồn
- Dưới đây là một ví dụ về cách xử lý token hết hạn và làm mới token:

# Tạo token truy cập và token làm mới

```jsx
const jwt = require('jsonwebtoken');

// Dữ liệu người dùng
const userData = {
  userId: 123,
  username: 'john_doe'
};

// Tạo token truy cập với thời gian hết hạn là 15 phút
const accessToken = jwt.sign(userData, "ACCESS_TOKEN_SECRET", { expiresIn: '15m' });

// Tạo token làm mới với thời gian hết hạn là 7 ngày
const refreshToken = jwt.sign(userData, "REFRESH_TOKEN_SECRET", { expiresIn: '7d' });

console.log('Access Token:', accessToken);
console.log('Refresh Token:', refreshToken);
```

# Xác thực token và làm mới token

```jsx
const express = require('express');
const app = express();

app.use(express.json());

// Giả sử bạn lưu trữ refresh token trong cơ sở dữ liệu
let refreshTokens = [];

app.post('/token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "REFRESH_TOKEN_SECRET", (err, user) => {
    if (err) return res.sendStatus(403);

    // Tạo token truy cập mới
    const newAccessToken = jwt.sign({ userId: user.userId, username: user.username }, "ACCESS_TOKEN_SECRET", { expiresIn: '15m' });

    res.json({
      accessToken: newAccessToken
    });
  });
});

app.post('/login', (req, res) => {
  // Giả sử bạn xác thực người dùng ở đây
  const user = { userId: 123, username: 'john_doe' };

  // Tạo token truy cập và token làm mới
  const accessToken = jwt.sign(user, "ACCESS_TOKEN_SECRET", { expiresIn: '15m' });
  const refreshToken = jwt.sign(user, "REFRESH_TOKEN_SECRET", { expiresIn: '7d' });

  // Lưu refresh token
  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

# Sử dụng middleware để bảo vệ các route

```jsx
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "ACCESS_TOKEN_SECRET", (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

// Sử dụng middleware này cho các route cần bảo vệ
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});
```

### Tóm tắt
- Token hết hạn: Khi token hết hạn, các yêu cầu sử dụng token này sẽ bị từ chối.
- Làm mới token: Sử dụng token làm mới để cấp lại token truy cập mới mà không yêu cầu người dùng phải đăng nhập lại.
- Middleware: Sử dụng middleware để bảo vệ các route và kiểm tra tính hợp lệ của token truy cập.

### Lưu giữ token ở Cookie

```jsx
import { cookies } from "next/headers";

// create token
const createdTokenData = {
    id: checkUser._id,
    userName: checkUser.userName,
    email: checkUser.email
}

const token = jwt.sign(createdTokenData, "DEFAULT_KEY", { expiresIn: '1d' })

// store token using next/headers
const getCookies = cookies();
getCookies.set('token', token)
```

```jsx
// get token on cookies
const getCookies = cookies();
const token = getCookies.get("token")?.value || ""
if(token === "") {
    return {
        success: false,
        message: 'Token is invalid.'
    };
}
```

### Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Middleware cho phép bạn chạy mã trước khi yêu cầu hoàn tất. Sau đó, dựa trên yêu cầu đến, bạn có thể sửa đổi phản hồi bằng cách viết lại, chuyển hướng, sửa đổi tiêu đề yêu cầu hoặc phản hồi hoặc phản hồi trực tiếp.

- Middleware chạy trước khi nội dung được lưu trong bộ nhớ đệm và các route được khớp.

### Fix bug: Sau khi người dùng đã đăng nhập thành công và tự động chuyển sang Homepage thì khi vào trang sign-in sẽ lại vào trang Homepage
- B1: Tạo 1 file là middleware.js (bên trong folder src)

```jsx
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
    // get path request
    const path = request.nextUrl.pathname;
    // Giả sử bạn có một path công khai
    const checkPublicPath = path === '/sign-in' || path === '/sign-up';
    // Lấy token từ cookies
    const getCookies = cookies()
    const token = getCookies.get("token")?.value || ""

    // Kiểm tra nếu đường dẫn là public và token tồn tại
    if(checkPublicPath && token !== "") {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!checkPublicPath && token === "") {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
    }
}
```

- B2: Matcher
- matcher cho phép bạn lọc Middleware để chạy trên các đường dẫn cụ thể.

```jsx
export const config = {
  matcher: ['/sign-in', '/sign-up']
}
```

### Đăng xuất
- B1: Tạo 1 folder log-out bên trong components
- B2: Xóa giá trị token trong cookies (trong thư mục actions)

```jsx
export async function logoutAction() {
    const getCookies = cookies();
    getCookies.set("token", "")
}
```

- B3: Thêm logic ở Home.js

```jsx
if(!currentUser?.success) {
  redirect('/sign-in')
}
```

- B4: Tạo 1 file logout.js (bên trong folder components)

```jsx
const Logout = () => {

    const router = useRouter();

    const handleLogout = async() => {
        await logoutAction();
    }

    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}

export default Logout
```

### Tính Năng Của Next.js
- Next.js có thể có cơ chế server-side rendering (SSR) hoặc static site generation (SSG) mà bạn không nhận ra. Nếu trang Home được render lại trên server, khi bạn xóa cookie, server sẽ nhận thấy rằng không còn token hợp lệ và chuyển hướng người dùng đến trang đăng nhập trước khi trang được render trên client.
- Server-Side Rendering (SSR): Nếu bạn đang sử dụng Next.js với Server-Side Rendering (SSR), việc xóa token có thể dẫn đến việc trang được tải lại từ server. Điều này có thể xảy ra nếu trang sử dụng token để tải dữ liệu từ server và việc mất token yêu cầu phải tải lại dữ liệu.
- Do trang Home là server component đang lấy dữ liệu user từ giá trị token được lưu trong cookies nên khi ta xóa giá trị token thì màn hình sẽ được refresh




