import { NextResponse } from 'next/server';
import react from 'react';

const middleware = (req) => {

    let verify = req.cookies.get("jwt")
    let url = req.url
    if (!verify && url.includes("/dashboard")) {
        return NextResponse.redirect(`${process.env.NEXT_FRONTEND_URL}/login`)
    }

};
export default middleware;