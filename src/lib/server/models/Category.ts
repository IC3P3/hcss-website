import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

import Content from './Content';

@Table({ timestamps: false, tableName: 'category', modelName: 'Category' })
class Category extends Model {
	@PrimaryKey
	@Column({
		allowNull: false,
		type: DataType.NUMBER
	})
	declare id: number;

	@Column({
		type: DataType.STRING
	})
	declare displayName: string;

	@HasMany(() => Content)
	declare content: Content[];
}

export default Category;
