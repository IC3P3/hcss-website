import {
	Table,
	Column,
	Model,
	DataType,
	HasMany,
	PrimaryKey,
	AutoIncrement
} from 'sequelize-typescript';

import Media from './Media';

@Table({
	timestamps: false,
	tableName: 'events',
	modelName: 'Event'
})
class Event extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER
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
