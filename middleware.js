import { NextResponse } from 'next/server';
import react from 'react';

const middleware = (req) => {
     
    // let verify = req.cookies.get('vercel')
    // console.log(req.cookies)
    // let cookie = req.cookies.get('nextjs')
    // console.log(cookie)
    // let url = req.url
    // if (!verify && url.includes("/dashboard")) {
    //     return NextResponse.redirect("http://localhost:3000/login")
    // }
    // if (verify && url.includes("/dashboard")) {
    //     return NextResponse.redirect("http://localhost:3000/dashboard")
    // }

};
export default middleware;