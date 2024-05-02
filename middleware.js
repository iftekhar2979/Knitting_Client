import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import react from 'react';

const middleware = (req) => {
    const cookieStore = cookies();
    const verify = cookieStore.get('jwt');
    let url = req.url
    if (!verify && url.includes("/dashboard")) {
        return NextResponse.redirect(`https://knitting-client-8bq3.vercel.app/login`);
        // return NextResponse.redirect(`http://localhost:3000/login`);
    }

};
export default middleware;