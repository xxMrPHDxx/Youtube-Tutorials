class Stage {
	constructor(){
		this.images = new Map();
	}

	draw(ctx){}

	static async all(){
		const result = {};
		const stages = [{
			stage_name: 'stage_intro',
			Class: StageIntro
		}];
		stages.forEach(async ({stage_name, Class}) => {
			const sprite = await SpriteSheet.load(`spritesheets/${stage_name}.png`);
			loadJSON(`config/stages/${stage_name}.json`)
			.then(obj => {
				const stage = new Class();
				for(let {name, rect} of obj.images){
					stage.images.set(name, sprite.subImage(...rect));
				}
				result[stage_name] = stage;
			});
		});
		return Promise.resolve(result);
	}
}

class StageIntro extends Stage {
	// Override draw method
	draw(ctx){
		ctx.drawImage(this.images.get('background'), 0, 0);
	}
}