const AlertModel = require('../models/Alert');
const service = {};

//Verificacion
 service.verifyCreateFields = ({ latitud, longitud, type, user}) => {
    let serviceResponse = {
		success: true,
		content: {
			message: 'Alert created '
		}
	};

	if (!user) {
		serviceResponse = {
			success: false,
			content: {
				error: 'User is required'
			}
		};

		return serviceResponse;
	}

	if (!type) {
		serviceResponse = {
			success: false,
			content: {
				error: 'Type is required'
			}
		};

		return serviceResponse;
	}

	if (!latitud) {
		serviceResponse = {
			success: false,
			content: {
				error: 'latitud is required'
			}
		};

		return serviceResponse;
	}

	if (!longitud) {
		serviceResponse = {
			success: false,
			content: {
				error: 'longitud is required'
			}
		};

		return serviceResponse;
	}

    return serviceResponse;
 };
    
 /**Crear alerta */

 service.create = async ({ latitud, longitud, typeID}, userID) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Alert created succesfully'
		}
	};

	try {
		const alert = new AlertModel({
			latitud,
			longitud,
			type: typeID,
			user: userID,
		});

		const alertSaved = await alert.save();

		if (!alertSaved) {
			serviceResponse = {
				success: false,
				content: {
					error: 'Alert not created'
				}
			};
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};

//encontrar post por id 
service.findOneByID = async (_id) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Alert Found'
		}
	};

	try {
		const alert = await AlertModel.findById(_id).populate('user', 'username _id').exec();

		if (!alert) {
			serviceResponse = {
				success: false,
				content: {
					error: 'Alert not found'
				}
			};
		} else {
			serviceResponse.content = alert;
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};
/**Traer todas las alertas en funcion al idUSER */
service.findAllByUserID = async (userID) => {
	let serviceResponse = {
		success: true,
		content: {}
	};

	try {
		const alerts = await AlertModel.find({ user: userID }).populate('user', 'username _id').exec();

		serviceResponse.content = alerts;

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};

/**Encontrar todas las alertas */
service.findAll = async (page, limit) => {
	let serviceResponse = {
		success: true,
		content: {}
	};

	try {
		const alerts = await AlertModel.find({}, undefined, {
			skip: page * limit,
			limit: limit,
			sort: [
				{
					createdAt: -1
				}
			]
		})
			.populate('user', 'username _id')
			.exec();

		serviceResponse.content = {
			alerts,
			count: alerts.length,
			page,
			limit
		};

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};

/**Elimianr una alerta por su id */
service.deleteOneByID = async (_id) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Alert Deleted succesfully'
		}
	};

	try {
		const alertDeleted = await AlertModel.findByIdAndDelete(_id).exec();

		if (!alertDeleted) {
			serviceResponse = {
				success: false,
				content: {
					error: 'Alert not deleted'
				}
			};
		}

		return serviceResponse;
	} catch (error) {
		throw new Error('Internal Server Error');
	}
};
module.exports = service;
