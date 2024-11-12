import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	HasMany,
	PrimaryKey,
	AutoIncrement
} from 'sequelize-typescript';

import Event from './Event';
import Content from './Content';

@Table({
	timestamps: false,
	tableName: 'media',
	modelName: 'Media'
})
class Media extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER
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

	@HasMany(() => Content)
	declare content: Content[];
}

export default Media;
