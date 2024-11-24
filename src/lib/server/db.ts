import { Sequelize } from 'sequelize-typescript';

import { DATABASE_LOCATION } from '$env/static/private';

import Event from './models/Event';
import Media from './models/Media';
import Content from './models/Content';
import Category from './models/Category';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: DATABASE_LOCATION,
	logging: false
});

sequelize.addModels([Event, Media, Content, Category]);

sequelize.sync();

export { sequelize, Event, Media, Content, Category };
