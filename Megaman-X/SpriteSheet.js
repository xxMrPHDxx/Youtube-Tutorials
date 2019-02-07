class SpriteSheet {
	constructor(image){
		this.image = image;
	}

	subImage(x, y, w, h){
		const buffer = document.createElement('canvas');
		buffer.setAttribute("width", w);
		buffer.setAttribute("height", h);
		buffer.getContext('2d').imageSmoothingEnabled = false;
		buffer.getContext('2d').drawImage(this.image, x, y, w, h, 0, 0, w, h);
		return buffer;
	}

	static load(path){
		const image = new Image();
		image.src = path;
		return delay(1000, new SpriteSheet(image)); // Delay for 1 second until image loads
	}
}