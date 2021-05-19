var User = require("../models/userModel");
const fs = require("fs");

exports.list = function (req, res) {
  User.find(function (err, messages) {
    res.json(messages);
  });
};

exports.create = function (req, res) {
  var user = new User(req.body);
  /*if(!req.files){
		return res.json({
			status:500,
			mensaje: "La imagen no puede ir vacía"
			
		})
	}	*/

  if (!req.files) {
    user.avatar = "avatar.png";
    console.log("Antes de el salvar a a bd");

    user.save(function (err, newMessage) {
      if (err) {
        return;
        res.json(400, err.message);
      } else {
        res.json(newMessage);
      }
    });
  } 
 	
  //Por si envian una foto 
  else {
    /*user.save(function(err, newMessage) {
		if (err) { 
			res.json(400, err.message);
		}
		else {
			res.json(newMessage);
		}
	});*/

    // Capturamos el archivo

    let archivo = req.files.avatar;

    //Validamos la extensión del archivo

    if (archivo.mimetype != "image/jpeg" && archivo.mimetype != "image/png") {
      return res.json({
        status: 400,
        mensaje: "La imagen debe ser formato JPG o PNG",
      });
    }

    //Validamos el tamaño del archivo

    if (archivo.size > 2000000) {
      return res.json({
        status: 400,
        mensaje: "La imagen debe ser inferior a 2MB",
      });
    }

    //Cambiar nombre al archivo

    let nombre = Math.floor(Math.random() * 10000);

    //Capturar la extensión del archivo

    let extension = archivo.name.split(".").pop();

    //Movemos el archivo a la carpeta
    archivo.mv(`./public/img/${nombre}.${extension}`, (err) => {
      if (err) {
        return res.json({
          status: 500,
          mensaje: "Error al guardar la imagen",
          err,
        });
      }

      user.avatar = `${nombre}.${extension}`;

      user.save(function (err, newMessage) {
        if (err) {
          res.json(400, err.message);
        } else {
          res.json(newMessage);
        }
      });
    });
  }
};

exports.upload = function (req, res) {
  let body = req.body;

  if (!req.files) {
    return res.json({
      status: 500,
      mensaje: "La imagen no puede ir vacía",
    });
  } else {
    // Capturamos el archivo

    let archivo = req.files.imagen;

    //Validamos la extensión del archivo

    if (archivo.mimetype != "image/jpeg" && archivo.mimetype != "image/png") {
      return res.json({
        status: 400,
        mensaje: "La imagen debe ser formato JPG o PNG",
      });
    }

    //Validamos el tamaño del archivo

    if (archivo.size > 2000000) {
      return res.json({
        status: 400,
        mensaje: "La imagen debe ser inferior a 2MB",
      });
    }

    //Cambiar nombre al archivo

    let nombre = Math.floor(Math.random() * 10000);

    //Capturar la extensión del archivo

    let extension = archivo.name.split(".").pop();

    //Movemos el archivo a la carpeta

    archivo.mv(`./public/img/${nombre}.${extension}`, (err) => {
      if (err) {
        return res.json({
          status: 500,
          mensaje: "Error al guardar la imagen",
          err,
        });
      }

      res.json("Ya copio la img en el server");

      //Obtenemos los datos del formulario para pasarlos al modelo

      /*let slide = new Slide({
		
			imagen:`${nombre}.${extension}`,
			titulo:body.titulo,
			descripcion:body.descripcion

		})*/

      //Guardamos en MongoDB
      //https://mongoosejs.com/docs/api.html#model_Model-save

      /*slide.save((err, data)=>{

			if(err){

				return res.json({

					status:400,
					mensaje: "Error al almacenar el slide",
					err

				})

			}

			res.json({

				status:200,
				data,
				mensaje:"El slide ha sido creado con éxito"

			})

		})*/
    });
  }
};

exports.user = (req, res) => {
  User.findById(req.params.id, (err, item) => {
    if (err) {
      res.json(err);
    } else {
      res.json(item);
    }
  });
};

exports.edit = (req, res, next) => {
  User.findById(req.params.id, (err, item) => {
    if (err) {
      res.json(err);
    } else if (!item) {
      return next(new Error("No se pudo cargar el documento"));
    } else {
      item.name = req.body.name;
      item.lastName = req.body.lastName;
      item.username = req.body.username;
      item.email = req.body.email;
      item.phoneHome = req.body.phoneHome;
      item.phoneWork = req.body.phoneWork;
      item.movil = req.body.movil;
      item.ci = req.body.ci;
      item.department = req.body.department;
      item.cargo = req.body.cargo;
      item.numeroTecnico = req.body.numeroTecnico;
      item.fechaEntrada = req.body.fechaEntrada;

      if (req.files) {
        let archivo = req.files.avatar;

        //Validamos la extensión del archivo

        if (
          archivo.mimetype != "image/jpeg" &&
          archivo.mimetype != "image/png"
        ) {
          return res.json({
            status: 400,
            mensaje: "La imagen debe ser formato JPG o PNG",
          });
        }

        //Validamos el tamaño del archivo

        if (archivo.size > 2000000) {
          return res.json({
            status: 400,
            mensaje: "La imagen debe ser inferior a 2MB",
          });
        }

        //Cambiar nombre al archivo

        let nombre = Math.floor(Math.random() * 10000);

        //Capturar la extensión del archivo

        let extension = archivo.name.split(".").pop();

        archivo.mv(`./public/img/${nombre}.${extension}`, (err) => {
          if (err) {
            return res.json({
              status: 500,
              mensaje: "Error al guardar la imagen",
              err,
            });
          }

          item.avatar = `${nombre}.${extension}`;

          item
            .save()
            .then((item) => res.json("Seactualizo exitosamente"))
            .catch((err) => res.jso(err));
        });
      }

      item
        .save()
        .then((item) => res.json("Seactualizo exitosamente"))
        .catch((err) => res.jso(err));
    }
  });
};
