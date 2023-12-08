import React from "react";
import '../app/globals.css'
import { Layout } from "@/components";
import { StateContext } from "@/context/StateContext";


function myApp({Component,pageProps}) {
    return (
        <StateContext>
            <Layout>
            <Component {...pageProps} />
            </Layout>
        </StateContext>
       
    )
}

export default myApp