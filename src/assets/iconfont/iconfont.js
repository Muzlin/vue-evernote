(function(window){var svgSprite='<svg><symbol id="icon-notebook" viewBox="0 0 1024 1024"><path d="M806.4 0 243.2 0C166.4 0 108.8 57.6 108.8 134.4l0 19.2C44.8 166.4 0 224 0 294.4c0 44.8 19.2 83.2 51.2 108.8C19.2 428.8 0 467.2 0 512c0 44.8 19.2 83.2 51.2 108.8-32 25.6-51.2 64-51.2 108.8 0 70.4 44.8 121.6 108.8 140.8l0 19.2c0 70.4 57.6 134.4 134.4 134.4l563.2 0c70.4 0 134.4-57.6 134.4-134.4L940.8 134.4C934.4 57.6 876.8 0 806.4 0zM108.8 582.4C83.2 569.6 64 544 64 512c0-32 19.2-57.6 44.8-70.4L108.8 582.4zM108.8 224l0 140.8C83.2 352 64 320 64 294.4S83.2 236.8 108.8 224zM64 729.6c0-32 19.2-57.6 44.8-70.4l0 140.8C83.2 787.2 64 761.6 64 729.6zM870.4 889.6c0 38.4-32 64-64 64L243.2 953.6c-38.4 0-64-32-64-64l0-19.2 0-217.6 0-64L179.2 435.2l0-64L179.2 147.2 179.2 134.4c0-38.4 32-64 64-64l563.2 0c38.4 0 64 32 64 64L870.4 889.6z"  ></path><path d="M307.2 230.4l460.8 0 0 64-460.8 0 0-64Z"  ></path><path d="M307.2 492.8l460.8 0 0 64-460.8 0 0-64Z"  ></path><path d="M307.2 729.6l460.8 0 0 64-460.8 0 0-64Z"  ></path></symbol><symbol id="icon-pen" viewBox="0 0 1879 1024"><path d="M553.877457 906.654335v-141.021965L1053.891329 254.520231l88.19422 90.117919s27.819653 26.339884 54.455491 0 0-55.639306 0-55.639306l-115.421965-117.937572s-28.707514-26.191908-54.455491 0-534.048555 545.886705-534.048555 545.886705-15.685549 13.465896-15.685549 40.397688v188.67052s1.183815 33.442775 34.478612 39.36185h196.217342s17.313295-1.479769 33.590751-18.05318l614.843931-630.085549s96.776879-108.910983 5.623121-229.364161c0 0-91.449711-123.116763-238.094798-31.815029 0 0-30.927168 21.604624-31.223121 45.428901-0.295954 23.824277 21.308671 42.913295 44.09711 38.917919 0 0 11.83815-2.36763 21.456647-11.098265 0 0 54.603468-58.154913 126.224278-9.322544 0 0 43.061272 31.223121 38.769942 83.606937 0 0 5.475145 38.473988-51.495954 90.561849L691.791908 906.654335h-137.914451z" fill="#212121" ></path></symbol><symbol id="icon-trash" viewBox="0 0 1024 1024"><path d="M896 256v576a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V256H64V192h192V128a64 64 0 0 1 64-64h384a64 64 0 0 1 64 64v64h192v64h-64z m-192-128H320v64h384V128z m128 128H192v576a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V256zM576 384h64v384H576V384zM384 384h64v384H384V384z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)