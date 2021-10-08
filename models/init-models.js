var DataTypes = require("sequelize").DataTypes;
var _accounts = require("./accounts");
var _agreements = require("./agreements");
var _banks = require("./banks");
var _clients = require("./clients");
var _contacts = require("./contacts");
var _employees = require("./employees");
var _employees_projects = require("./employees_projects");
var _games = require("./games");
var _intermediary_accounts = require("./intermediary_accounts");
var _invoices = require("./invoices");
var _projects = require("./projects");
var _transactions_expense = require("./transactions_expense");
var _transactions_revenue = require("./transactions_revenue");

function initModels(sequelize) {
  var accounts = _accounts(sequelize, DataTypes);
  var agreements = _agreements(sequelize, DataTypes);
  var banks = _banks(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var contacts = _contacts(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var employees_projects = _employees_projects(sequelize, DataTypes);
  var games = _games(sequelize, DataTypes);
  var intermediary_accounts = _intermediary_accounts(sequelize, DataTypes);
  var invoices = _invoices(sequelize, DataTypes);
  var projects = _projects(sequelize, DataTypes);
  var transactions_expense = _transactions_expense(sequelize, DataTypes);
  var transactions_revenue = _transactions_revenue(sequelize, DataTypes);

  invoices.belongsTo(accounts, { as: "account", foreignKey: "account_id"});
  accounts.hasMany(invoices, { as: "invoices", foreignKey: "account_id"});
  invoices.belongsTo(agreements, { as: "agreement", foreignKey: "agreement_id"});
  agreements.hasMany(invoices, { as: "invoices", foreignKey: "agreement_id"});
  projects.belongsTo(agreements, { as: "agreement", foreignKey: "agreement_id"});
  agreements.hasMany(projects, { as: "projects", foreignKey: "agreement_id"});
  accounts.belongsTo(banks, { as: "bank", foreignKey: "bank_id"});
  banks.hasMany(accounts, { as: "accounts", foreignKey: "bank_id"});
  intermediary_accounts.belongsTo(banks, { as: "bank", foreignKey: "bank_id"});
  banks.hasMany(intermediary_accounts, { as: "intermediary_accounts", foreignKey: "bank_id"});
  agreements.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(agreements, { as: "agreements", foreignKey: "client_id"});
  contacts.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(contacts, { as: "contacts", foreignKey: "client_id"});
  employees_projects.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(employees_projects, { as: "employees_projects", foreignKey: "employee_id"});
  projects.belongsTo(games, { as: "game", foreignKey: "game_id"});
  games.hasMany(projects, { as: "projects", foreignKey: "game_id"});
  transactions_revenue.belongsTo(invoices, { as: "invoice", foreignKey: "invoice_id"});
  invoices.hasOne(transactions_revenue, { as: "transactions_revenue", foreignKey: "invoice_id"});
  employees_projects.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(employees_projects, { as: "employees_projects", foreignKey: "project_id"});
  transactions_expense.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(transactions_expense, { as: "transactions_expenses", foreignKey: "project_id"});

  return {
    accounts,
    agreements,
    banks,
    clients,
    contacts,
    employees,
    employees_projects,
    games,
    intermediary_accounts,
    invoices,
    projects,
    transactions_expense,
    transactions_revenue,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
