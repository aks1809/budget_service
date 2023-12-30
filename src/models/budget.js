const budget = (sequelize, DataTypes) => {
  return sequelize.define('budget', {
    budget_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'uid'
      }
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    total_budget: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: new Date().getTime(),
    }
  }, {
    sequelize,
    tableName: 'budget',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "budget_id" },
        ]
      },
      {
        name: "budget_FK",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
    ]
  });
};

export default budget;