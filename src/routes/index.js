import { Router } from "express";
import { addBudgetController, addBudgetSubscribersController, addTransactionCOntroller, addUserContoller, budgetService, fetchBudgetTransactionController, fetchBudgetsController } from "../controller/controller.js";

const routes = new Router();

routes.post("/user", addUserContoller);

routes.post("/budget", addBudgetController);

routes.put("/subscribe", addBudgetSubscribersController);

routes.post("/transaction", addTransactionCOntroller);

routes.post("/budget-cron", budgetService);

routes.get("/budgets", fetchBudgetsController);

routes.get("/budget-transactions", fetchBudgetTransactionController);

export default routes;