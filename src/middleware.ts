import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export default authMiddleware({
    publicRoutes:["/site", "/api/uploadthing"],
    // ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)","/"],
   async beforeAuth(auth,req){

    },

    async afterAuth(auth,req){
      const url = req.nextUrl
      const searchParams = url.searchParams.toString()
      let hostname = req.headers

      const pathWithSearchParams = `${url.pathname}${searchParams.length>0 ? `?${searchParams}` : ""}`

      //if subdomain exists
      const customSubDoamin = hostname.get('host')?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0];

      if(customSubDoamin){
        return NextResponse.rewrite(new URL(`/${customSubDoamin}${pathWithSearchParams}`,req.url))
      }

      if(url.pathname === "/sign-in" || url.pathname === "/sign-up"){
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
      }

      if((url.pathname === "/" || url.pathname === "/site") && url.host === process.env.NEXT_PUBLIC_DOMAIN){
        return NextResponse.rewrite(new URL("/site", req.url))
      }
      if(url.pathname.startsWith('/agency') || url.pathname.startsWith("/subaccount")){
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
      }
    }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};