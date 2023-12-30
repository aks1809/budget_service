const transaction = (sequelize, DataTypes) => {
  return sequelize.define('transaction', {
    transaction_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uid: {
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
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    is_processed: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    amount: {
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
    tableName: 'transaction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "transaction_id" },
        ]
      },
      {
        name: "transaction_FK",
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
};

export default transaction;