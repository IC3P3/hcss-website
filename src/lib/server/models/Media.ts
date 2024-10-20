import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';

import Event from './Event';

@Table({
	timestamps: false,
	tableName: 'media',
	modelName: 'Media'
})
class Media extends Model {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataType.NUMBER
	})
	declare id: number;

	@Column({
		type: DataType.STRING
	})
	declare subtitle: string;

	@Column({
		allowNull: true,
		type: DataType.BLOB
	})
	declare image: Blob;

	@ForeignKey(() => Event)
	@Column({
		type: DataType.NUMBER
	})
	declare event_id: string;
}

export default Media;
