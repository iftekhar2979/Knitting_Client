import { NextResponse } from 'next/server';
import react from 'react';

const middleware = (req) => {

    let verify = req.cookies.get("jwt")
    let url = req.url
    if (!verify && url.includes("/dashboard")) {
        return NextResponse.redirect(`https://knitting-client-8bq3.vercel.app/login`);
    }

};
export default middleware;