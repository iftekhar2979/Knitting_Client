import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import react from 'react';

const middleware = (req) => {
    const cookieStore = cookies();
    const verify = cookieStore.get('jwt');
    let url = req.url
    if (!verify && url.includes("/dashboard")) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_REDIRECT_URL}`);
    }

};
export default middleware;