const sequelize = require('./db');
const {DataTypes} = require('sequelize')

const Job_name = sequelize.define('job_name',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
    },
    {
    timestamps: false,
    createdAt: false,
    tableName: 'job_name',
    })

const Instructions = sequelize.define('instructions',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        content: {type: DataTypes.STRING},
        id_job: {type: DataTypes.INTEGER, required: true, references: {model: 'Job_name', key: 'id'}}
    },
    {
    timestamps: false,
    createdAt: false,
    tableName: 'instructions',
    })

module.exports = {Job_name, Instructions};