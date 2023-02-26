import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(req:NextRequest,ev:NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if(pathname.startsWith('/checkout')){
    console.log(req.cookies.get('token'))
  }
  
}