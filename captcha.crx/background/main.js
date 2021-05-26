function openPage() {
	browser.runtime.openOptionsPage();
}


// browser.browserAction.onClicked.addListener(openPage);
/* 


chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});
 */
 
 
 
chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.action == "xhttp") {
              
				fetch(request.url,
				{
					"method": request.method,
					"body": request.data||null,
					"headers": request.headers
				})
				.then(response => response.text())
				.then((response) => {
					 sendResponse(response);
				})
			  
              
                
				 
						  
				return true;  // Will respond asynchronously.
            }
			
          });
		  
		  
		  
		  