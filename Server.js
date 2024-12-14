const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
		port: process.env.DB_PORT,
	}
);

sequelize.authenticate().then(console.log("autenticado"));

const Project = sequelize.define("projects", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},

	name: {
		type: DataTypes.STRING,
		allowNull: false,
		onUpdate: true,
	},

	buy: {
		type: DataTypes.INTEGER,
		allowNull: false,
		onUpdate: true,
	},

	categoria_id: {
		type: DataTypes.STRING,
		allowNull: false,
		onUpdate: true,
	},
});

Project.sync({ force: true });

export default Project;
