let WIDTH = innerWidth;
let HEIGHT = innerHeight;

const canvas = document.querySelector('canvas#Screen');
canvas.setAttribute('width', WIDTH);
canvas.setAttribute('height', HEIGHT);
const ctx = canvas.getContext('2d');
ctx.scale(4, 4);
ctx.imageSmoothingEnabled = false;

let stage, player; // sprite, 

async function setup(){
	// I guess that's all for this part! Bye ^_^
	stage = await Stage.all();
	player = await Player.load();
	console.log(player, stage);
}

function update(dt){
	if(keys[65] || keys[68]){
		const dir = (keys[65]&&keys[68])?0:(keys[65]?-1:(keys[68]?1:0));
		player.setVelocity(-dir*60, 0);
	}

	player.update(dt);
}

function draw(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	stage.stage_intro.draw(ctx);
	player.draw(ctx);
}

let lastTime = Date.now(), unprocessedTime = 0;
function animate(time){
	const now = Date.now();
	unprocessedTime += (now - lastTime) / 1000 * 60;
	lastTime = now;
	while(unprocessedTime >= 1){
		update(1/60.0);unprocessedTime--;
	}
	draw();
	requestAnimationFrame(animate);
}

window.onresize = (e) => {
	WIDTH = innerWidth;
	HEIGHT = innerHeight;
	canvas.setAttribute('width', WIDTH);
	canvas.setAttribute('height', HEIGHT);
	ctx.scale(4, 4);
	ctx.imageSmoothingEnabled = false;
}

const keys = Array(256).fill(false);
function OnKeyUp(e){
	const key = e.keyCode;
	if(key < 256) keys[key] = true;
}

function OnKeyDown(e){
	const key = e.keyCode;
	console.log("Key:", e.code, ", Code:", key);
	if(key < 256) keys[key] = false;
}

addEventListener('keyup', OnKeyUp);
addEventListener('keydown', OnKeyDown);

Promise.resolve(setup()).then(animate);