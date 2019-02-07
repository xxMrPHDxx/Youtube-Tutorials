class Player {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.frames = new Map();

		this.vel = { x: 0, y: 0 };
		this.acc = { x: 0, y: 0 };
	}

	update(dt){
		this.x += this.vel.x * dt;
		this.y += this.vel.y * dt;
		this.vel.x *= 0;
		this.vel.y *= 0;
		this.vel.x += this.acc.x * dt;
		this.vel.y += this.acc.y * dt;
	}

	draw(ctx){
		ctx.drawImage(this.frames.get('stand'), this.x, this.y);
	}

	setVelocity(velx, vely){
		this.vel.x = velx;
		this.vel.y = vely;
	}

	static async load(){
		const sprite = await SpriteSheet.load('spritesheets/player.png');
		return loadJSON('config/x.json')
		.then(obj=>{
			const player = new Player(obj.x, obj.y);
			for(let {name, rect} of obj.frames){
				player.frames.set(name, sprite.subImage(...rect));
			}
			return player;
		})
	}
}