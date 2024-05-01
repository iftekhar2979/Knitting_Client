import { NextResponse } from 'next/server';
import react from 'react';

const middleware = (req) => {

    let verify = req.cookies.get("jwt")
    console.log(verify)
    let url = req.url
    if (!verify && url.includes("/dashboard")) {
        let protocol = 'http';
        if (req.headers['x-forwarded-proto']) {
            protocol = req.headers['x-forwarded-proto'];
        }
        
        let host = 'localhost:3000'; // Default host for local development
        if (req.headers['host']) {
            host = req.headers['host'];
        }
        
        const loginUrl = `${protocol}://${host}/login`; // Construct the full login URL
        return NextResponse.redirect(loginUrl);
    }

};
export default middleware;