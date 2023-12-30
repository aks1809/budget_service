import initModels from "../models/init-models.js";

const models = initModels();

export const addUserDao = async () =>
    models.user.create();

export const addBudgetDao = async ({ uid, category, total, currency }) => {
    const createdBudget = await models.budget.create({ created_by: uid, category, total_budget: total, currency });
    models.budget_subscribers.create({
        budget_id: createdBudget?.budget_id,
        uid
    });
    return createdBudget;
}

export const addBudgetSubscribersDao = async ({ budget_id, uid }) =>
    models.budget_subscribers.create({ budget_id, uid });

export const addTransactionDao = async (data) =>
    models.transaction.create(data);

export const getBudgetsSubscribed = async ({ uid, category }) =>
    models.budget_subscribers.findAll({
        where: {
            uid
        },
        include: {
            model: models.budget,
            as: 'budget',
            where: {
                category
            }
        }
    })

export const createBudgetTransactions = async (data) =>
    models.budget_transactions.create(data);

export const fetchBudgetsDao = async ({ uid }) =>
    models.budget_subscribers.findAll({
        where: {
            uid
        },
        include: {
            model: models.budget,
            as: 'budget'
        }
    });

export const fetchBudgetTransactionDao = async ({ budget_id }) =>
    models.budget_transactions.findAll({
        where: {
            budget_id
        },
        include: {
            model: models.transaction,
            as: "transaction"
        }
    });

export const fetchBudget = async ({ budget_id }) => models.budget.findByPk(budget_id);

export const updateTransactionStats = async ({ transaction_id }) => models.transaction.update({ is_processed: 1 }, {
    where: {
        transaction_id
    }
});