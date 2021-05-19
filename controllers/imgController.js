const fs = require('fs');
const path = require('path')



exports.mostrarImg = function(req, res) {
	let img = req.params.imagen
	let rutaImg = `./public/img/${img}`

	
	fs.exists(rutaImg, exists=>{

		if(!exists){
			return	res.json({
				status: 400,
				mensaje : 'La imagen no existe'
			})
		}

		res.sendFile(path.resolve(rutaImg))
	})
};


