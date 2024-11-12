import { Sequelize } from 'sequelize-typescript';

import { DATABASE_LOCATION } from '$env/static/private';

import Event from './models/Event';
import Media from './models/Media';
import Content from './models/Content';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: DATABASE_LOCATION,
	logging: false
});

sequelize.addModels([Event, Media, Content]);

sequelize.sync();

export { sequelize, Event, Media, Content };
