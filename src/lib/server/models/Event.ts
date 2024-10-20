import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import Media from './Media';

@Table({
	timestamps: false,
	tableName: 'events',
	modelName: 'Event'
})
class Event extends Model {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataType.NUMBER
	})
	declare id: number;

	@Column({
		allowNull: false,
		type: DataType.STRING
	})
	declare title: string;

	@Column({
		type: DataType.STRING
	})
	declare subtitle: string;

	@Column({
		allowNull: false,
		type: DataType.STRING
	})
	declare address: string;

	@Column({
		allowNull: false,
		type: DataType.NUMBER
	})
	declare time: number;

	@HasMany(() => Media)
	declare media: Media[];
}

export default Event;
