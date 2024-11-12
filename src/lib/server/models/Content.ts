import { Table, Column, Model, DataType, ForeignKey, PrimaryKey } from 'sequelize-typescript';

import Media from './Media';

@Table({
	timestamps: false,
	tableName: 'content',
	modelName: 'Content'
})
class Content extends Model {
	@PrimaryKey
	@Column({
		allowNull: false,
		type: DataType.STRING
	})
	declare id: string;

	@ForeignKey(() => Media)
	@Column({
		type: DataType.NUMBER
	})
	declare media_id: number;
}

export default Content;
