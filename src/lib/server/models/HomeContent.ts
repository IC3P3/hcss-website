import { Table, Column, Model, DataType, ForeignKey, PrimaryKey } from 'sequelize-typescript';

import Media from './Media';

@Table({
	timestamps: false,
	tableName: 'homeContent',
	modelName: 'HomeContent'
})
class HomeContent extends Model {
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

export default HomeContent;
