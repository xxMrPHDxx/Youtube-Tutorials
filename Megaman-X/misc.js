function delay(ms, value){
	return new Promise(resolve => setTimeout(()=>resolve(value), ms));
}

function loadJSON(path){
	return fetch(path).then(res=>res.json());
}