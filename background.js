"use strict";

/*
This is the page for which we want to rewrite the User-Agent header.
*/


/*
Initialize the UA;
*/
var ua = "Mozilla/5.0 (X11; Linux x86_64; rv:62.0) Gecko/20100101 Firefox/62.0";
/*
Rewrite the User-Agent header to "ua".
*/
function rewriteUserAgentHeaderBlocking(e) {
    for (let header of e.requestHeaders) {
        if (header.name.toLowerCase() === "user-agent") {
            header.value = ua;
        }
    }
    return { requestHeaders: e.requestHeaders };
}

// function rewriteUserAgentHeaderAsync(e) {
//     var asyncRewrite = new Promise((resolve, reject) => {
//         window.setTimeout(() => {
//             for (var header of e.requestHeaders) {
//                 if (header.name.toLowerCase() === "user-agent") {
//                     header.value = ua;
//                 }
//             }
//             resolve({ requestHeaders: e.requestHeaders });
//         }, 2000);
//     });

//     return asyncRewrite;
// }

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeaderBlocking, { urls: targetPage }, ["blocking", "requestHeaders"]);