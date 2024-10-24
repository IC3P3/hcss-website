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
import HomeContent from './HomeContent';

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

	@HasMany(() => HomeContent)
	declare homeContent: HomeContent[];
}

export default Media;
