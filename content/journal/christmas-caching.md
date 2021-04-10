+++
date = "2014-05-31T15:02:16-04:00"
title = "Christmas Caching"
summary = "An explanation of a caching optimization for my personal site."
+++

When I redesigned my site this past summer, I cut some corners. I think I ended up running out of time, and I really pushed to get the site up before I went back to school. With that said, I had ignored some implementation considerations when the site was first launched. Most notable, I neglected to cache data from third party services such as Twitter, Last.fm, Foodspotting, YouTube and Vimeo.

This data, integrated on the homepage of my site, was being pulled from their external servers before every page load. Although this provided extremely updated information, it drastically affected the load time of the site. More importantly, this implementation neglected to deal with times in which the external servers would be down.

Well, last night I finally got around to implementing the "lazier" solution I had envisioned from the beginning. The general idea involves loading cached data immediately and _then_ updating this data accordingly (essentially, the complete opposite of what was happening before). While dramatically increasing load time and taking care of external server downtime, this implementation is not as eager as the initial solution because the updating occurs in the background after the page has loaded. However, I was willing to sacrifice this minor inconvenience and am really pleased with the final result.

The solution is nothing more than a simple AJAX script run after the page has loaded.

```js
function cache(url) {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("POST", url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            xmlhttp.close;
        }
    };

    // Send the proper header information along with the request
    xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send();
}
```
