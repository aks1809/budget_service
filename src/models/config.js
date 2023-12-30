import Sequelize from "sequelize";

const sequelize = new Sequelize(
    'mysql://root:password@localhost:3306/budget',
    {
        dialect: 'mysql',
        dialectOptions: {}
    }
);

export default sequelize;