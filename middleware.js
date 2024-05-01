import { NextResponse } from 'next/server';
import react from 'react';

const middleware = (req) => {

    let verify = req.cookies.get("jwt")
    let url = req.url
    if (!verify && url.includes("/dashboard")) {
        const protocol = req.headers['x-forwarded-proto'] || 'http'; // Get the protocol (HTTP or HTTPS)
        const host = req.headers['host']; // Get the hostname
        const loginUrl = `${protocol}://${host}/login`; // Construct the full login URL
        return NextResponse.redirect(loginUrl);
    }

};
export default middleware;