import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import react from 'react';

const middleware = (req) => {
    console.log(req)
    const cookieStore = cookies();
    console.log(cookieStore)
    const verify = cookieStore.get('jwt');
    let url = req.url
    if (!verify && url.includes("/dashboard")) {
        return NextResponse.redirect(`https://knitting-client-8bq3.vercel.app/login`);
    }

};
export default middleware;