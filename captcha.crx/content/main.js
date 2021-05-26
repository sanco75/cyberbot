let pageurl = window.location.href;
let messageNotReady_imgtyperz = "ERROR: NOT_DECODED";
let messageNotReady_2captcha = "CAPCHA_NOT_READY";
let id = "";
let message = document.createElement('span');
let testmessage = document.createElement('span');
let afterElement = null;
let TestafterElement= null;
var service_value=0;
String.prototype.isNumber = function(){return /^\d+$/.test(this);}
var recaptchaCallbackAlreadyFired=false;
var auto_submit=true;
var auto_click=true;
var seconds=0;
let timeleft=0;

var obj={
    "clientKey":"847303b07e43a42c94c9df3e967bd940",
    "task":
        {
            "type":"NoCaptchaTaskProxyless",
            "websiteURL":"https://www.google.com/webmasters/tools/submit-url?hl=en_us",
            "websiteKey":"6LfLgwgTAAAAAFgpAIOgNmfzKi5Ko2ZnNeIE2uLR"
        },
	"softId":883
}


var obj2={
    "clientKey": "847303b07e43a42c94c9df3e967bd940",
    "taskId": "76328090"
}

var obj_best={
    "page_url":"https://www.google.com/recaptcha/api2/demo",
    "site_key":"6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-",
    "access_token": "847303b07e43a42c94c9df3e967bd940",
	"affiliate_id": "5c2651aaa515591e92a8d87e"
}


function checkCompletion_imgtyperz(code, key, repeat) {
	setupTextarea();
	

	let url = `http://captchatypers.com/captchaapi/GetRecaptchaTextToken.ashx?action=GETTEXT&token=${key}&Captchaid=${code}`;
	
	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		if(responseText == messageNotReady_imgtyperz){
				setTimeout(function() {
					checkCompletion_imgtyperz(code, key, repeat);
				}, repeat)
			}else{
				setCaptchaCode(responseText);
			}
		
		
	});
}

function checkCompletion_2captcha(code, key, repeat) {
	setupTextarea();
	
	let url = `https://2captcha.com/res.php?key=${key}&action=get&id=${code}&json=0`;
	
	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		if(responseText.includes(messageNotReady_2captcha)){
				setTimeout(function() {
					checkCompletion_2captcha(code, key, repeat);
				}, repeat)
			}else{
				setCaptchaCode(responseText.substring(3));
			}
		
		
	});
	
	
	
}

function checkCompletion_rucaptcha(code, key, repeat) {
	setupTextarea();
	let http = new XMLHttpRequest();
	let url = `https://rucaptcha.com/res.php?key=${key}&action=get&id=${code}&json=0`;
	
	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		if(responseText.includes(messageNotReady_2captcha)){
				setTimeout(function() {
					checkCompletion_rucaptcha(code, key, repeat);
				}, repeat)
			}else{
				setCaptchaCode(responseText.substring(3));
			}
		
		
	});
	
	
}

function checkCompletion_anticaptcha(code, key, repeat, cid) {
	//setupTextarea();
	
	obj2.clientKey=key;
	obj2.taskId=code;
	
	let url = "https://api.anti-captcha.com/getTaskResult";
	
	
	chrome.runtime.sendMessage({
    method: 'POST',
    action: 'xhttp',
    url: url,
    data: JSON.stringify(obj2)
	}, function(responseText) {
		if(JSON.parse(responseText).status=='ready'){
				clearInterval(cid);
				setCaptchaCode(JSON.parse(responseText).solution.gRecaptchaResponse);
			}

	});
	
	
	
	
}

function checkCompletion_deathbycaptcha(code, key, repeat) {
	setupTextarea();
	
	let url = `http://api.deathbycaptcha.com/2captcha/res.php?key=${key}&action=get&id=${code}&json=0`;
	
	
	
	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		if(responseText.includes(messageNotReady_2captcha)){
				setTimeout(function() {
					checkCompletion_deathbycaptcha(code, key, repeat);
				}, repeat)
			}else{
				setCaptchaCode(responseText.substring(3));
			}
		
		
	});
	
}

function checkCompletion_bestcaptcha(code, key, repeat) {
	
	setupTextarea();
	let http = new XMLHttpRequest();
	let url = `https://bcsapi.xyz/api/captcha/${code}?access_token=${key}`;
	
	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		if(responseText.includes("pending")){
				setTimeout(function() {
					checkCompletion_bestcaptcha(code, key, repeat);
				}, repeat)
			}else{
				setCaptchaCode(JSON.parse(responseText).gresponse);
			}
		
		
	});

	
}

function checkCompletion_endcaptcha(code, key, repeat) {
	

	setupTextarea();
	
	let url = `http://api.endcaptcha.com/poll/${code}`;
	
	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		if(responseText.includes("UNSOLVED_YET")){
				setTimeout(function() {
					checkCompletion_endcaptcha(code, key, repeat);
				}, repeat)
			}else{
				setCaptchaCode(responseText);
			}
		
		
	});
	
	

	
}


function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}

function setChecked(interval){
	let check = document.createElement("img");
	check.src = chrome.extension.getURL("./icons/check.png");
	check.style.marginTop = "15px";
	check.style.marginLeft = "5px";
	check.style.position = "absolute";
	insertAfter(check, afterElement);
}

function setCaptchaCode(code) {
	let ele = document.getElementById("g-recaptcha-response");
	sendMessage("<b>SOLVED</b>");
	setChecked();
	if(ele != null){
		// uncomment this to show the textarea
		// ele.style.display = "block";
		ele.innerHTML = code;
		
		bitir(code);
		if(auto_submit==true)
		{
			afterElement.closest('form').submit();
		}
	}
}

function bitir(code)
{	
	var taskSolution=code;
	var injectedCode = "(" + function(taskSolution) {
                    var recaptchaCallbackAlreadyFired = false;
                    
                    var recursiveCallbackSearch = function(object, solution, currentDepth, maxDepth) {
                        if (recaptchaCallbackAlreadyFired) {
                            return
                        }
                        var passedProperties = 0;
                        for (var i in object) {
                            passedProperties++;
                            if (passedProperties > 15) {
                                break
                            }
                            try {
                                if (typeof object[i] == "object" && currentDepth <= maxDepth) {
                                    recursiveCallbackSearch(object[i], solution, currentDepth + 1, maxDepth)
                                } else if (i == "callback") {
                                    if (typeof object[i] == "function") {
                                        recaptchaCallbackAlreadyFired = true;
                                        object[i](solution)
                                    } else if (typeof object[i] == "string" && typeof window[object[i]] == "function") {
                                        recaptchaCallbackAlreadyFired = true;
                                        window[object[i]](solution)
                                    }
                                    return
                                }
                            } catch (e) {}
                        }
                    };
                    
                    if (!recaptchaCallbackAlreadyFired) {
                        if (typeof ___grecaptcha_cfg != "undefined" && typeof ___grecaptcha_cfg.clients != "undefined") {
                            var oneVisibleRecaptchaClientKey = null;
                            visible_recaptcha_element_search_loop: for (var i in ___grecaptcha_cfg.clients) {
                                for (var j in ___grecaptcha_cfg.clients[i]) {
                                    if (___grecaptcha_cfg.clients[i][j] && typeof ___grecaptcha_cfg.clients[i][j].nodeName == "string" && typeof ___grecaptcha_cfg.clients[i][j].innerHTML == "string" && typeof ___grecaptcha_cfg.clients[i][j].innerHTML.indexOf("iframe") != -1) {
                                        if (___grecaptcha_cfg.clients[i][j].offsetHeight != 0 || ___grecaptcha_cfg.clients[i][j].childNodes.length && ___grecaptcha_cfg.clients[i][j].childNodes[0].offsetHeight != 0 || ___grecaptcha_cfg.clients[i][j].dataset.size == "invisible") {
                                            if (oneVisibleRecaptchaClientKey === null) {
                                                oneVisibleRecaptchaClientKey = i;
                                                break
                                            } else {
                                                oneVisibleRecaptchaClientKey = null;
                                                break visible_recaptcha_element_search_loop
                                            }
                                        }
                                    }
                                }
                            }
                            if (oneVisibleRecaptchaClientKey !== null) {
                                recursiveCallbackSearch(___grecaptcha_cfg.clients[oneVisibleRecaptchaClientKey], taskSolution, 1, 2)
                            }
                        }
                    }
                } + ')("' + taskSolution + '");';
                var script = document.createElement("script");
                script.textContent = injectedCode;
                (document.head || document.documentElement).appendChild(script);
                script.remove();
}



function setupTextarea() {
	let ele = document.getElementById("g-recaptcha-response");
	if(ele != null){
		// ele.style.display = "inline-block";
		// ele.style.zIndex = "-1";
	}
}

function setupMessageBox() {
	let image = '<img src="' + chrome.extension.getURL('./icons/icon.png') + '" align="left" style="margin-right: 4px;" />';
	message.innerHTML = "<b>Solving captcha...</b>";
	let container = document.createElement('div');
	container.className = 'ReCaptcha_solver';
	container.innerHTML = image;
	container.appendChild(message);
	container.style.backgroundColor = "#F9F9F9";
	container.style.border = "1px solid #D3D3D3";
	container.style.borderTop = "none";
	container.style.borderRadius = "0 0 3px 3px";
	container.style.padding = "5px";
	container.style.boxSizing = "border-box"
	container.style.width = "302px";
	container.style.margin = "-4px 2px 0 0";

	insertAfter(container, afterElement);
	// afterElement.appendChild(message);
}

function sendMessage(str){
	message.innerHTML = str;
}

function testsendMessage(str){
	testmessage.innerHTML = str;
}

function startWatching_2captcha(code, key) {
	let initial = 15000, repeat = 5000;
	setTimeout(function() {
		checkCompletion_2captcha(code, key, repeat);
	}, initial);
}

function startWatching_rucaptcha(code, key) {
	let initial = 15000, repeat = 5000;
	setTimeout(function() {
		checkCompletion_2captcha(code, key, repeat);
	}, initial);
}

function startWatching_imgtyperz(code, key) {
	let initial = 15000, repeat = 5000;
	setTimeout(function() {
		checkCompletion_imgtyperz(code, key, repeat);
	}, initial);
}

function startWatching_anticaptcha(code, key) {
	let initial = 7500, repeat = 5000;
	var cid = setInterval(function() {
		checkCompletion_anticaptcha(code, key, repeat, cid);
	}, initial);
}

function startWatching_deathbycaptcha(code, key) {
	let initial = 15000, repeat = 5000;
	setTimeout(function() {
		checkCompletion_deathbycaptcha(code, key, repeat);
	}, initial);
}

function startWatching_bestcaptcha(code, key) {
	let initial = 7500, repeat = 5000;
	setTimeout(function() {
		checkCompletion_bestcaptcha(code, key, repeat);
	}, initial);
}

function startWatching_endcaptcha(code, key) {
	let initial = 7500, repeat = 5000;
	setTimeout(function() {
		checkCompletion_endcaptcha(code, key, repeat);
	}, initial);
}

function makeRequest_imgtyperz(result){
	setupTextarea();
	sendMessage("<b>Solving captcha via ImageTyperz...</b>");
	let key = result.apiKey;

	let url = `http://captchatypers.com/captchaapi/UploadRecaptchaToken.ashx?action=UPLOADCAPTCHA&token=${key}&googlekey=${id}&affiliateid=874429&pageurl=${pageurl}`;
	
	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		
		if(responseText.isNumber()==false){
				sendMessage("<b>"+responseText+"</b>")
			}else{
				startWatching_imgtyperz(responseText, key);
			}
		
		
	});
	
}

function makeRequest_2captcha(result){
	setupTextarea();
	sendMessage("<b>Solving captcha via 2Captcha...</b>");
	let key = result.apiKey;
	
	let url = `https://2captcha.com/in.php?key=${key}&googlekey=${id}&method=userrecaptcha&soft_id=2151&pageurl=${pageurl}`;


	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		
		if(responseText.includes('OK|')==false){
				sendMessage("<b>"+responseText+"</b>")
			}else{
				startWatching_2captcha(responseText.substring(3), key);
			}
		
		
	});
	
	
	
}

function makeRequest_rucaptcha(result){
	setupTextarea();
	sendMessage("<b>Solving captcha via ruCaptcha...</b>");
	let key = result.apiKey;
	let url = `https://rucaptcha.com/in.php?key=${key}&googlekey=${id}&method=userrecaptcha&soft_id=2163&pageurl=${pageurl}`;
	
	chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		
		if(responseText.includes('OK|')==false){
				sendMessage("<b>"+responseText+"</b>")
			}else{
				startWatching_rucaptcha(responseText.substring(3), key);
			}
		
		
	});
	
	
}

function makeRequest_anticaptcha(result){
	
	setupTextarea();
	sendMessage("<b>Solving captcha via Anti-Captcha...</b>");
	let key = result.apiKey;
	
	obj.clientKey=key;
	obj.task.websiteURL=pageurl;
	obj.task.websiteKey=id;

	
	let url = "https://api.anti-captcha.com/createTask";
	
	
	
	chrome.runtime.sendMessage({
    method: 'POST',
    action: 'xhttp',
    url: url,
    data: JSON.stringify(obj)
	
	}, function(responseText) {
		
		if(JSON.parse(responseText).taskId==undefined){
				sendMessage("<b>"+JSON.parse(responseText).errorCode+"</b>")
			}else{
				startWatching_anticaptcha(JSON.parse(responseText).taskId, key);
			}

	});
	
	
	
	
}

function makeRequest_deathbycaptcha(result){
	setupTextarea();
	sendMessage("<b>Solving captcha via DeathByCaptcha...</b>");
	let key = result.apiKey;
	let url = `http://api.deathbycaptcha.com/2captcha/in.php?key=${key}&googlekey=${id}&method=userrecaptcha&pageurl=${pageurl}&vendor_id=3`;
	
	
	
	chrome.runtime.sendMessage({
    method: 'POST',
    action: 'xhttp',
    url: url,
    data: null
	}, function(responseText) {
		
		if(responseText.includes('OK|')==false){
				sendMessage("<b>"+responseText+"</b>")
			}else{
				startWatching_deathbycaptcha(responseText.substring(3), key);
			}
		
		
	});
	
	
}

function makeRequest_bestcaptcha(result){
	
	setupTextarea();
	sendMessage("<b>Solving captcha via BestCaptchaSolver...</b>");
	let key = result.apiKey;
	
	obj_best.access_token=key;
	obj_best.page_url=pageurl;
	obj_best.site_key=id;

	
	
	
	let url = "https://bcsapi.xyz/api/captcha/recaptcha";
	
	
	chrome.runtime.sendMessage({
    method: 'POST',
    action: 'xhttp',
    url: url,
	headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(obj_best)
	
	}, function(responseText) {
		
		if(JSON.parse(responseText).id==undefined){
				sendMessage("<b>"+JSON.parse(responseText).error+"</b>")
			}else{
				startWatching_bestcaptcha(JSON.parse(responseText).id, key);
			}

	});
	
	
	
}


function makeRequest_endcaptcha(result){
	
	setupTextarea();
	sendMessage("<b>Solving captcha via EndCaptcha...</b>");
	let key = result.apiKey;
	
	let url = 'http://api.endcaptcha.com/upload';


 
var formData=`------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Content-Disposition: form-data; name="username"

${key.split(':')[0]}
------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Content-Disposition: form-data; name="password"

${key.split(':')[1]}
------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Content-Disposition: form-data; name="type"

4
------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Content-Disposition: form-data; name="token_params"

{"proxy": "","proxytype": "","googlekey": "${id}","pageurl": "${pageurl}"}
------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--`
 
	chrome.runtime.sendMessage({
    method: 'POST',
    action: 'xhttp',
    url: url,
	headers:{'Content-Type': 'multipart/form-data; boundary=----xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
    data: formData
	
	}, function(responseText) {
		
		if(responseText.includes('UNSOLVED_YET')==false){
				sendMessage("<b>"+responseText+"</b>")
			}else{
				startWatching_endcaptcha(responseText.split('/')[2], key);
			}
		
		
	});
	
	
	
	
	
}

function onGot(item) {

	service_value=item.service;
	if(service_value==0)
	{
		chrome.storage.sync.get("apiKey",makeRequest_2captcha);
	}
	else if(service_value==1)
	{
		chrome.storage.sync.get("apiKey",makeRequest_anticaptcha);
	}
	else if(service_value==2)
	{
		chrome.storage.sync.get("apiKey",makeRequest_deathbycaptcha);
	}
	else if(service_value==3)
	{	
		chrome.storage.sync.get("apiKey",makeRequest_imgtyperz);
	}
	else if(service_value==4)
	{
		chrome.storage.sync.get("apiKey",makeRequest_rucaptcha);
	}
	else if(service_value==5)
	{	
		chrome.storage.sync.get("apiKey",makeRequest_bestcaptcha);
	}
	else if(service_value==6)
	{	
		chrome.storage.sync.get("apiKey",makeRequest_endcaptcha);
	}
}

function onGotauto(item){
	auto_submit=item.Auto;
}

function onGotAutoClick(item){
	auto_click=item.AutoClick;
}

function onGotDelay(item){
	seconds=item.Delay;	
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function WaitBox()
{
let checkId = setInterval(function() {
			let frames = document.getElementsByTagName("iframe");
				for(let i = 0; i < frames.length; i++){
					if(frames[i].offsetParent!=null)
					{
						let src = frames[i].getAttribute('src');
						if(src != null && src.startsWith("https://www.google.com/recaptcha")){
							id = getParameterByName("k", src);
							if(id != "" && id != null){
								afterElement = frames[i];
								break;
							}
						}
					}
				}
			if(id != "" && id != null){
				clearInterval(checkId);	
				setupMessageBox();		
				
				
			
			}
			
		}, 1000);	
			
		var downloadTimer = setInterval(function(){
					sendMessage("<b>Waiting "+timeleft+" Seconds</b>");
					
					  timeleft -= 1;
					  if(timeleft <= 0){
						clearInterval(downloadTimer);
					  }
					}, 900);
}



function delete_div()
{
	var frames = document.getElementsByTagName("iframe");
					for(let i = 0; i < frames.length; i++){
						var src = frames[i].getAttribute('src');
						if(src != null && src.startsWith("https://www.google.com/recaptcha/api2/bframe")){
							frames[i].parentNode.remove();
							break;
						}
					}
}

function try_solve()
{
	var actualCode = '(' + function() {
    // All code is executed in a local scope.
    // For example, the following does NOT overwrite the global `alert` method
   let isRecaptchaFrame = () => {
		  return /https:\/\/www.google.com\/recaptcha\/api2\/anchor/.test(window.location.href);
		};

		let captchaInterval = setInterval(() => {
		  if (isRecaptchaFrame()) {
			clearInterval(captchaInterval);
			document.getElementsByClassName('recaptcha-checkbox-checkmark')[0].click();
		  }  
		}, 500);
		
} + ')();';
var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();
	
}

function insert_solved()
{
	var actualCode = `


		
	if(grecaptcha.getResponse()!=undefined && grecaptcha.getResponse().length!=0)
			{
				var a=document.createElement('div');
				a.id='solved';
				document.body.appendChild(a);
			}
		
		
		
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();
}



function start_solve()
{
	
	delete_div();
	
	let checkId = setInterval(function() {
			let frames = document.getElementsByTagName("iframe");
				for(let i = 0; i < frames.length; i++){
					if(frames[i].offsetParent!=null)
					{
						let src = frames[i].getAttribute('src');
						if(src != null && src.startsWith("https://www.google.com/recaptcha")){
							id = getParameterByName("k", src);
							if(id != "" && id != null){
								afterElement = frames[i];
								break;
							}
						}
					}
				}
			if(id != "" && id != null){
				clearInterval(checkId);	
					
				chrome.storage.sync.get("service",onGot);
				
			
			}
			
		}, 1000);	

}


async function delay(delayInms) {
      return new Promise(resolve  => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    }

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}	

chrome.storage.sync.get("Delay",onGotDelay);


chrome.storage.sync.get("isEnabled",function(result) {
	if(result.isEnabled){

	chrome.storage.sync.get("Auto",onGotauto);
	
	isNumber(seconds) ? seconds=seconds*1000 : seconds=100;
			timeleft = seconds/1000;
			
			WaitBox();
	
	async function wait(sx)
	{
		let delayres = await delay(sx);
		
				
		chrome.storage.sync.get("AutoClick",function(result) {
		if(result.AutoClick){
			
			try_solve();
			async function sample() {
					
				let delayres = await delay(5000);
				
				 
				
				insert_solved();
				
				
				
					if(document.getElementById('solved')==null)
					{
						setTimeout(start_solve, 4000);
					}
					else
					{
						if(auto_submit==true)
						{
							var afterElement;
							let frames = document.getElementsByTagName("iframe");
							for(let i = 0; i < frames.length; i++){
								if(frames[i].offsetParent!=null)
								{
									let src = frames[i].getAttribute('src');
									if(src != null && src.startsWith("https://www.google.com/recaptcha")){
										id = getParameterByName("k", src);
										if(id != "" && id != null){
											afterElement = frames[i];
											break;
										}
									}
								}
							}
							afterElement.closest('form').submit();
						}
					}	
				}
			sample();
		}
		
			else
			{
				setTimeout(start_solve, 4000);
			}
			
		});
	}
	wait(seconds);
	//chrome.storage.sync.get("AutoClick",onGotAutoClick);
	
	//console.log(auto_click);
	
	//try_solve();
	
	
	}
});