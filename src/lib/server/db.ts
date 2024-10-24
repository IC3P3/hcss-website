import { Sequelize } from 'sequelize-typescript';

import { DATABASE_LOCATION } from '$env/static/private';

import Event from './models/Event';
import Media from './models/Media';
import HomeContent from './models/HomeContent';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: DATABASE_LOCATION,
	logging: false
});

sequelize.addModels([Event, Media, HomeContent]);

sequelize.sync();

export { sequelize, Event, Media, HomeContent };
