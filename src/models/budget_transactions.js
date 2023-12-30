const budget_transactions = (sequelize, DataTypes)=> {
    return sequelize.define('budget_transactions', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      budget_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'budget',
          key: 'budget_id'
        }
      },
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transaction',
          key: 'transaction_id'
        }
      }
    }, {
      sequelize,
      tableName: 'budget_transactions',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
        {
          name: "budget_transactions_FK",
          using: "BTREE",
          fields: [
            { name: "budget_id" },
          ]
        },
        {
          name: "budget_transactions_FK_1",
          using: "BTREE",
          fields: [
            { name: "transaction_id" },
          ]
        },
      ]
    });
  };

export default budget_transactions;