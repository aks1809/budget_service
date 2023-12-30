import { addBudgetDao, addBudgetSubscribersDao, addTransactionDao, addUserDao, createBudgetTransactions, fetchBudget, fetchBudgetTransactionDao, fetchBudgetsDao, getBudgetsSubscribed, updateTransactionStats } from "../dao/dao.js"

export const addUserContoller = async (req, res) => {
    const createdUser = await addUserDao();
    res.json({
        success: true,
        uid: createdUser.id
    });
}

export const addBudgetController = async (req, res) => {
    const { uid, category, total, currency } = req.body;
    console.log({ uid, category, total, currency });
    const createdBudget = await addBudgetDao({ uid, category, total, currency });
    res.json({
        "success": true,
        "message": "Budget Created",
        "budget_id": createdBudget?.budget_id
    });
}

export const addBudgetSubscribersController = async (req, res) => {
    const { budget_id, uid } = req.body;
    await addBudgetSubscribersDao({ budget_id, uid });
    res.json({
        "success": true,
        "message": "User subscribed"
    });
}

export const addTransactionCOntroller = async (req, res) => {
    const createdTransaction = await addTransactionDao(req.body);
    res.json({
        "success": true,
        "message": "Transaction created",
        "transaction_id": createdTransaction?.transaction_id
    })
}

export const budgetService = async (req, res) => {
    const { uid, transaction_id, category } = req.body;
    // add all the transactions in budget transactions get budget_id from budget_subscribers
    const budgetsSubscribes = await getBudgetsSubscribed({ uid, category });
    const promises = budgetsSubscribes.map(async (element) => {
        await Promise.all([
            createBudgetTransactions({
                budget_id: element?.budget_id,
                transaction_id,
            }),
            updateTransactionStats({
                transaction_id
            })
        ]);
    });
    await Promise.all(promises);
    res.json({
        "success": true,
        "message": "Transaction imported"
    })
}

export const fetchBudgetsController = async (req, res) => {
    const { uid } = req.query;
    const fetchedBudgets = await fetchBudgetsDao({ uid });
    res.json({
        "success": true,
        "data": fetchedBudgets
    });
}

export const fetchBudgetTransactionController = async (req, res) => {
    const { budget_id } = req.query;
    const budgetInfo = await fetchBudget({ budget_id });
    const fetchedBudgetTransactions = await fetchBudgetTransactionDao({ budget_id });
    let total_spent = 0.0;
    fetchedBudgetTransactions.forEach(element => {
        total_spent += element?.transaction?.amount;
    });
    res.json({
        "success": true,
        "data": {
            ...budgetInfo?.dataValues,
            total_spent,
            remaining_amount: budgetInfo?.total_budget - total_spent
        }
    })
}