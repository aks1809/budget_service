const budget_subscribers  =(sequelize, DataTypes)=> {
  return sequelize.define('budget_subscribers', {
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
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'uid'
      }
    }
  }, {
    sequelize,
    tableName: 'budget_subscribers',
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
        name: "budget_subscribers_FK",
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
      {
        name: "budget_subscribers_FK_1",
        using: "BTREE",
        fields: [
          { name: "budget_id" },
        ]
      },
    ]
  });
};

export default budget_subscribers;