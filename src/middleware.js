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

export const config = {
    matcher: ['/sign-in', '/sign-up']
}