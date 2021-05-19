var mongoose = require('mongoose');

exports.start = function() {
	// mongoose.connect('mongodb://localhost/ch1');	
	mongoose.connect('mongodb://localhost/contratos',{useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true  })
    .then(db => console.log('DB is Connected'))
    .catch(err => console.log(err)) ;
}
