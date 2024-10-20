import { Sequelize } from 'sequelize-typescript';

import { DATABASE_LOCATION } from '$env/static/private';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: DATABASE_LOCATION,
	models: [__dirname + '/models'],
	logging: false
});

export default sequelize;
