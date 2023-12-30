import { DataTypes } from "sequelize";
import sequelize from "./config.js";
import _user from "./user.js";
import _budget from "./budget.js";
import _budget_transactions from "./budget_transactions.js";
import _budget_subscribers from "./budget_subscribers.js";
import _transaction from "./transaction.js";

const initModels = () => {
  const budget = _budget(sequelize, DataTypes);
  const budget_subscribers = _budget_subscribers(sequelize, DataTypes);
  const budget_transactions = _budget_transactions(sequelize, DataTypes);
  const transaction = _transaction(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);

  budget_subscribers.belongsTo(budget, { as: "budget", foreignKey: "budget_id"});
  budget.hasMany(budget_subscribers, { as: "budget_subscribers", foreignKey: "budget_id"});
  budget_transactions.belongsTo(budget, { as: "budget", foreignKey: "budget_id"});
  budget.hasMany(budget_transactions, { as: "budget_transactions", foreignKey: "budget_id"});
  budget_transactions.belongsTo(transaction, { as: "transaction", foreignKey: "transaction_id"});
  transaction.hasMany(budget_transactions, { as: "budget_transactions", foreignKey: "transaction_id"});
  budget.belongsTo(user, { as: "created_by_user", foreignKey: "created_by"});
  user.hasMany(budget, { as: "budgets", foreignKey: "created_by"});
  budget_subscribers.belongsTo(user, { as: "uid_user", foreignKey: "uid"});
  user.hasMany(budget_subscribers, { as: "budget_subscribers", foreignKey: "uid"});
  transaction.belongsTo(user, { as: "uid_user", foreignKey: "uid"});
  user.hasMany(transaction, { as: "transactions", foreignKey: "uid"});

  return {
    budget,
    budget_subscribers,
    budget_transactions,
    transaction,
    user,
  };
}

export default initModels;
