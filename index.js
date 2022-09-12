class Draw {
	constructor (canvas) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.isDrawing = false
		this.isPanning = false
		this.scale = 1
		this.options = {
			width: null,
			height: null,
			color: '#000000',
			backgroundColor: '#ffffff',
			strokethickness: 10,
			pan: {
				x: 0,
				y: 0
			}
		}
		this.mouse = {
			x: 0,
			y: 0
		}
	}

	/**
	 * Setup
	 * A function to setup the canvas
	 */
	Setup () {
		this.canvas.width = this.options.width != null ? this.options.width : window.innerWidth
		this.canvas.height = this.options.height != null ? this.options.height : window.innerHeight

		document.addEventListener('mousemove', this._Move.bind(this))
		this.canvas.addEventListener('mouseenter', () => this.ctx.beginPath())

		document.addEventListener('mousemove', (evt) => {
			if (this.isPanning) {
				this.options.pan.x += evt.movementX
				this.options.pan.y += evt.movementY
			}
		})

		this.canvas.addEventListener('mousedown', (evt) => {
			if (evt.button === 0) {
				this.isDrawing = true
				this.ctx.beginPath()
			}
		})

		document.addEventListener('mousedown', (evt) => {
			if (evt.button === 1) {
				this.isPanning = true
			}
		})

		document.addEventListener('mouseup', (evt) => {
			if (evt.button === 0) {
				this.isDrawing = false
			}

			if (evt.button === 1) {
				this.isPanning = false
			}
		})
		
		this._Draw()
	}
	
	/**
	 * SetWidth
	 * A function to set the width of the canvas
	 * @param {Number} width a number representing the width of the canvas
	 * @returns {void}
	 */
	SetWidth (width) {
		this.options.width = width
		this._resize(width, this.canvas.height)
	}
	
	/**
	 * SetHeight
	 * A function to set the height of the canvas
	 * @param {Number} height a number representing the height of the canvas
	 * @returns {void}
	 */
	SetHeight (height) {
		this.options.height = height
		this._resize(this.canvas.width, height)
	}

	/**
	 * SetColor
	 * A function to set the color of the line
	 * @param {*} color any valid color format (Hex, rgb, rgba, hsl, hsla)
	 * @returns {void}
	 */
	SetColor (color) {
		this.options.color = color
	}

	SetBackgroundColor (color) {
		this.options.backgroundColor = color
		this.canvas.style.backgroundColor = color;
	}

	/**
	 * SetThickness
	 * A function to set the thickness of the line
	 * @param {Number} thickness
	 * @returns {void} 
	 */
	SetThickness (thickness) {
		this.options.strokethickness = thickness
	}

	/**
	 * SetZoom
	 * A function to set the zoom of the canvas
	 * @param {Number} zoom a number representing the zoom of the canvas
	 * @returns {void}
	 */
	SetZoom (zoom) {
		this.scale += zoom * -0.0005
		this.scale = Math.min(Math.max(.125, this.scale), 4)

		
	}

	/**
	 * ResetZoom
	 * A function to reset the zoom of the canvas
	 * @returns {void}
	 */
	ResetZoom () {
		this.scale = 1
	}

	ResetPan () {
		this.options.pan.x = 0
		this.options.pan.y = 0
	}

	Clear () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	/**
	 * GetIsDrawing
	 * A function to get the isDrawing property
	 * @returns {Boolean} true if the canvas is drawing, false otherwise
	 */
	GetIsDrawing () {
		return this.isDrawing
	}

	DownloadCanvas () {
		const link = document.createElement('a')
		link.download = 'draw.png'
		link.href = this.canvas.toDataURL()
		link.click()
	}

	_resize (width, height) {
		let temp = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)
		this.canvas.width = width
		this.canvas.height = height
		this.ctx.putImageData(temp,0,0)
	}

	/**
	 * @private
	 * _move
	 * @param {Event} evt
	 * @returns {void}
	 */
	_Move (evt) {
		const rect = this.canvas.getBoundingClientRect()
		this.mouse = {
			x: (evt.clientX - rect.left) / this.scale,
			y: (evt.clientY - rect.top) / this.scale
		}
	}

	_Draw () {
		if (this.isDrawing) {
			this.ctx.strokeStyle = this.options.color
			this.ctx.lineWidth = this.options.strokethickness
			this.ctx.lineCap = "round"
			this.ctx.lineTo(this.mouse.x, this.mouse.y)
			this.ctx.moveTo(this.mouse.x, this.mouse.y)
			this.ctx.stroke()
		}
		
		this.canvas.style.transform = `scale(${this.scale}) translate(${this.options.pan.x}px, ${this.options.pan.y}px)`

		requestAnimationFrame(this._Draw.bind(this))
	}

}