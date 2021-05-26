function saveSettings(e) {
	chrome.storage.sync.set({
		//"apiKey": apiKey.value,
		"apiKey": "847303b07e43a42c94c9df3e967bd940",
		"isEnabled": isEnabled.checked,
		"Auto": Auto.checked,
		"AutoClick": AutoClick.checked,
		"service": service.selectedIndex,
		"Delay": Delay.value
	});
}

function restoreSettings(e) {
	chrome.storage.sync.get('apiKey',function(res){
		
		apiKey.value = res.apiKey || "847303b07e43a42c94c9df3e967bd940";
		
})

	chrome.storage.sync.get('isEnabled',function(res){
		
		isEnabled.checked = res.isEnabled.checked
		
})
	chrome.storage.sync.get('Auto',function(res){
		
		Auto.checked = res.Auto.checked
		
})

	chrome.storage.sync.get('AutoClick',function(res){
		
		AutoClick.checked = res.AutoClick.checked
		
})


	chrome.storage.sync.get('service',function(res){
		
		service.selectedIndex= res.service.selectedIndex
		
})

	chrome.storage.sync.get('Delay',function(res){
		
		Delay.value = res.Delay || "";
		
})

	apiKey.addEventListener('change',saveSettings);
	isEnabled.addEventListener('change',saveSettings);
	service.addEventListener('change',saveSettings);
	Auto.addEventListener('change',saveSettings);
	AutoClick.addEventListener('change',saveSettings);
	Delay.addEventListener('change',saveSettings);
}

document.addEventListener('DOMContentLoaded', restoreSettings);




window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
	  document.getElementById("visit").href = document.getElementById('service').selectedOptions[0].id;
    chrome.tabs.create({url:e.target.href})
	window.close();
  }
})
