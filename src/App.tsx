import React, { useState } from 'react'
import {
  DollarSign, TrendingUp, TrendingDown, Plus, ShoppingBag, Coffee, Home, Car, Heart,
  Smartphone, MoreHorizontal, Calendar, PieChart, X, Filter, Download, Target,
  Edit, Trash2, Eye, CreditCard, Bell, Settings, BarChart3, FileText,
  User, Moon, Sun, Upload, AlertCircle, CheckCircle, Clock, TrendingDownIcon,
  Camera, Calculator, Wallet, PiggyBank, Briefcase, Globe, Gift, Zap, Shield, Palette
} from 'lucide-react'
import './App.css'

// Enhanced Category System
const CATEGORIES = [
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: '#FF6B6B', budget: 500, type: 'expense' },
  { id: 'food', name: 'Food & Dining', icon: Coffee, color: '#4ECDC4', budget: 400, type: 'expense' },
  { id: 'home', name: 'Home & Rent', icon: Home, color: '#95E1D3', budget: 800, type: 'expense' },
  { id: 'transport', name: 'Transportation', icon: Car, color: '#F38181', budget: 300, type: 'expense' },
  { id: 'health', name: 'Health & Fitness', icon: Heart, color: '#AA96DA', budget: 200, type: 'expense' },
  { id: 'tech', name: 'Technology', icon: Smartphone, color: '#FCBAD3', budget: 250, type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', icon: Camera, color: '#FFD93D', budget: 150, type: 'expense' },
  { id: 'utilities', name: 'Utilities', icon: Zap, color: '#6BCF7F', budget: 200, type: 'expense' },
  { id: 'insurance', name: 'Insurance', icon: Shield, color: '#4D96FF', budget: 300, type: 'expense' },
  { id: 'investments', name: 'Investments', icon: TrendingUp, color: '#9B59B6', budget: 500, type: 'investment' },
  { id: 'income', name: 'Salary/Income', icon: Wallet, color: '#2ECC71', budget: 0, type: 'income' },
  { id: 'other', name: 'Other', icon: MoreHorizontal, color: '#A8D8EA', budget: 150, type: 'expense' }
]

const navItems = [
  { label: 'Dashboard', icon: BarChart3, id: 'dashboard' },
  { label: 'Transactions', icon: CreditCard, id: 'transactions' },
  { label: 'Categories', icon: PieChart, id: 'categories' },
  { label: 'Analytics', icon: TrendingUp, id: 'analytics' },
  { label: 'Reports', icon: FileText, id: 'reports' },
  { label: 'Savings', icon: PiggyBank, id: 'savings' },
  { label: 'Bills', icon: Calendar, id: 'bills' },
  { label: 'Investments', icon: Briefcase, id: 'investments' },
  { label: 'Settings', icon: Settings, id: 'settings' },
]

const metrics = [
  { title: 'Total Balance', value: '$12,450', delta: '+8.2%', direction: 'up' },
  { title: 'Monthly Income', value: '$4,200', delta: '+12.5%', direction: 'up' },
  { title: 'Total Expenses', value: '$2,680', delta: '-5.3%', direction: 'down' },
  { title: 'Savings Rate', value: '36%', delta: '+4%', direction: 'up' },
]

const schedule = [
  { time: '09:30', title: 'Grocery Shopping', location: 'SuperMart', tone: 'default' },
  { time: '11:00', title: 'Coffee & Breakfast', location: 'Local Cafe', tone: 'accent' },
  { time: '15:00', title: 'Uber to Office', location: 'Downtown', tone: 'alert' },
]

const insights = [
  { title: 'Food expenses down 15%', detail: 'You spent $320 less on dining this month' },
  { title: 'Shopping spike', detail: 'Increased by 45% due to seasonal purchases' },
  { title: 'Transport savings', detail: 'Walking more saved $85 in uber costs' },
]

const transactions = [
  { id: 'TX-1042', description: 'Grocery Shopping', amount: 127.50, category: 'Shopping', status: 'Completed', updated: '2h ago', date: '2024-01-15', type: 'expense', recurring: false },
  { id: 'TX-1038', description: 'Coffee & Breakfast', amount: 15.80, category: 'Food', status: 'Completed', updated: '4h ago', date: '2024-01-15', type: 'expense', recurring: false },
  { id: 'TX-1031', description: 'Salary Deposit', amount: 4200, category: 'Income', status: 'Completed', updated: '1d ago', date: '2024-01-14', type: 'income', recurring: true },
  { id: 'TX-1024', description: 'Netflix Subscription', amount: 15.99, category: 'Tech', status: 'Completed', updated: '2d ago', date: '2024-01-13', type: 'expense', recurring: true },
  { id: 'TX-1020', description: 'Gas Station', amount: 45.60, category: 'Transport', status: 'Completed', updated: '3d ago', date: '2024-01-12', type: 'expense', recurring: false },
  { id: 'TX-1018', description: 'Pharmacy', amount: 23.40, category: 'Health', status: 'Completed', updated: '4d ago', date: '2024-01-11', type: 'expense', recurring: false },
  { id: 'TX-1016', description: 'Rent Payment', amount: 1200, category: 'Home', status: 'Completed', updated: '5d ago', date: '2024-01-10', type: 'expense', recurring: true },
  { id: 'TX-1014', description: 'Investment Dividend', amount: 250, category: 'Investments', status: 'Completed', updated: '1w ago', date: '2024-01-08', type: 'income', recurring: true },
]

const savingsGoals = [
  { name: 'Emergency Fund', target: 5000, current: 3200, deadline: '2024-06-15', priority: 'high', category: 'emergency' },
  { name: 'Vacation to Europe', target: 3000, current: 1800, deadline: '2024-08-01', priority: 'medium', category: 'travel' },
  { name: 'New Car Down Payment', target: 15000, current: 8500, deadline: '2024-12-31', priority: 'medium', category: 'transport' },
  { name: 'House Down Payment', target: 50000, current: 12500, deadline: '2025-12-31', priority: 'high', category: 'housing' },
  { name: 'Retirement Fund', target: 100000, current: 35000, deadline: '2035-01-01', priority: 'low', category: 'retirement' }
]

const bills = [
  { id: 'BILL-001', name: 'Electricity Bill', amount: 89.50, dueDate: '2024-01-25', status: 'pending', category: 'utilities' },
  { id: 'BILL-002', name: 'Internet Service', amount: 59.99, dueDate: '2024-01-28', status: 'upcoming', category: 'utilities' },
  { id: 'BILL-003', name: 'Car Insurance', amount: 125.00, dueDate: '2024-02-01', status: 'upcoming', category: 'insurance' },
  { id: 'BILL-004', name: 'Phone Bill', amount: 75.00, dueDate: '2024-01-30', status: 'overdue', category: 'utilities' }
]

const investments = [
  { id: 'INV-001', name: 'S&P 500 ETF', symbol: 'SPY', amount: 5000, type: 'stock', return: 12.5, value: 5625 },
  { id: 'INV-002', name: 'Bitcoin', symbol: 'BTC', amount: 2000, type: 'crypto', return: 25.3, value: 2506 },
  { id: 'INV-003', name: 'Apple Stock', symbol: 'AAPL', amount: 3000, type: 'stock', return: 8.7, value: 3261 },
  { id: 'INV-004', name: 'Bond Fund', symbol: 'BND', amount: 4000, type: 'bond', return: 4.2, value: 4168 }
]

const performanceData = [68, 74, 63, 82, 77, 88, 92]

// Mock Chart Data
const chartData = {
  monthlyExpenses: [2100, 2300, 1800, 2600, 2400, 2100, 2500, 2300, 2700, 2400, 2200, 2800],
  categoryBreakdown: [
    { category: 'Food', amount: 450, percentage: 20 },
    { category: 'Transport', amount: 380, percentage: 17 },
    { category: 'Shopping', amount: 520, percentage: 23 },
    { category: 'Home', amount: 650, percentage: 29 },
    { category: 'Other', amount: 230, percentage: 11 }
  ]
}

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dateRange, setDateRange] = useState('30')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  // Calculate category spending
  const categorySpending = CATEGORIES.map(category => {
    const spending = transactions
      .filter(t => t.category === category.name && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)
    return {
      ...category,
      spent: spending,
      remaining: category.budget - spending,
      percentage: category.budget > 0 ? (spending / category.budget) * 100 : 0
    }
  })

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedCategory !== 'all' && transaction.category !== selectedCategory) return false
    return true
  })

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard()
      case 'transactions':
        return renderTransactions()
      case 'categories':
        return renderCategories()
      case 'analytics':
        return renderAnalytics()
      case 'reports':
        return renderReports()
      case 'savings':
        return renderSavings()
      case 'bills':
        return renderBills()
      case 'investments':
        return renderInvestments()
      case 'settings':
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <>
      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.title} className="metric-card">
            <div className="metric-card__label">{metric.title}</div>
            <div className="metric-card__value">{metric.value}</div>
            <div
              className={`metric-card__delta${metric.direction === 'up' ? ' is-positive' : ' is-negative'}`}
            >
              {metric.direction === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {metric.delta}
            </div>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Budget Overview</h2>
          <button className="ghost-btn">
            <Edit className="w-4 h-4 mr-2" />
            Manage Budgets
          </button>
        </div>
        <div className="budget-grid">
          {categorySpending.filter(cat => cat.type === 'expense').map((category) => {
            const IconComponent = category.icon
            return (
              <div key={category.id} className="budget-item">
                <div className="budget-header">
                  <div className="budget-category">
                    <IconComponent className="w-5 h-5" style={{ color: category.color }} />
                    <span>{category.name}</span>
                  </div>
                  <span className="budget-amount">${category.spent.toFixed(0)} / ${category.budget}</span>
                </div>
                <div className="budget-bar">
                  <div
                    className="budget-progress"
                    style={{
                      width: `${Math.min(category.percentage, 100)}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
                <div className="budget-footer">
                  <span className="budget-percentage">{category.percentage.toFixed(1)}% used</span>
                  <span className={`budget-remaining ${category.percentage > 90 ? 'over-budget' : ''}`}>
                    ${category.remaining > 0 ? category.remaining.toFixed(0) : Math.abs(category.remaining).toFixed(0)} {category.remaining > 0 ? 'remaining' : 'over'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="panels-grid">
        <article className="panel panel--highlight">
          <div className="panel__header">
            <div>
              <h2>Expense Trend</h2>
              <p>Last 7 days</p>
            </div>
            <button className="ghost-btn">
              <PieChart className="w-4 h-4 mr-2" />
              Analytics
            </button>
          </div>
          <div className="sparkline">
            {performanceData.map((value: number, index: number) => (
              <span key={value + index} style={{ height: `${value}%` }} className="sparkline__bar" />
            ))}
          </div>
          <div className="panel__footer">
            <div>
              <p className="panel__figure">$2,680</p>
              <span className="panel__caption">This month</span>
            </div>
            <div>
              <p className="panel__figure">-5.3%</p>
              <span className="panel__caption">vs last month</span>
            </div>
            <div>
              <p className="panel__figure">Top category</p>
              <span className="panel__caption">Shopping</span>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <h2>Upcoming Bills</h2>
            <button className="ghost-btn">
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </button>
          </div>
          <div className="bills-list">
            {bills.slice(0, 4).map((bill) => (
              <div key={bill.id} className={`bill-item bill-${bill.status}`}>
                <div className="bill-info">
                  <h4>{bill.name}</h4>
                  <p className="bill-amount">${bill.amount}</p>
                </div>
                <div className="bill-due">
                  <span className={`bill-status bill-status-${bill.status}`}>
                    {bill.status === 'overdue' && <AlertCircle className="w-4 h-4" />}
                    {bill.status === 'pending' && <Clock className="w-4 h-4" />}
                    {bill.status === 'upcoming' && <CheckCircle className="w-4 h-4" />}
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                  <p className="bill-date">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <h2>Smart Insights</h2>
            <button className="ghost-btn">
              <Filter className="w-4 h-4 mr-2" />
              Insights
            </button>
          </div>
          <ul className="insights">
            {insights.map((item, index) => (
              <li key={index} className="insights__item">
                <div className="insights__spark" />
                <div>
                  <p className="insights__title">{item.title}</p>
                  <span className="insights__detail">{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  )

  const renderTransactions = () => (
    <section className="panel table-panel full-width">
      <div className="panel__header">
        <h2>All Transactions</h2>
        <div className="table-actions">
          <button className="ghost-btn" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </button>
          <button className="ghost-btn">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="ghost-btn">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Recurring</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.description}</td>
                <td className={transaction.amount > 0 ? 'text-red-600' : 'text-green-600'}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td>
                  <span className={`badge badge--${transaction.category.toLowerCase().replace(/[^a-z]/g, '')}`}>
                    {transaction.category}
                  </span>
                </td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>
                  <span className={`transaction-type ${transaction.type}`}>
                    {transaction.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {transaction.type}
                  </span>
                </td>
                <td>
                  <span className={`status status--${transaction.status.toLowerCase().replace(' ', '-')}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>
                  {transaction.recurring ? (
                    <span className="recurring-badge">Yes</span>
                  ) : (
                    <span className="one-time-badge">No</span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="action-btn" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="action-btn delete" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )

  const renderCategories = () => (
    <section className="panel">
      <div className="panel__header">
        <h2>Expense Categories</h2>
        <button className="primary-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>
      <div className="categories-grid">
        {CATEGORIES.filter(cat => cat.type !== 'investment').map((category) => {
          const IconComponent = category.icon
          const spending = categorySpending.find(c => c.id === category.id)
          return (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <div className="category-icon" style={{ backgroundColor: `${category.color}20` }}>
                  <IconComponent className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p className="category-budget">Budget: ${category.budget}</p>
                </div>
                <div className="category-actions">
                  <button className="action-btn">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="action-btn delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="category-spending">
                <div className="spending-info">
                  <span>Spent: ${spending?.spent.toFixed(0) || 0}</span>
                  <span className={spending && spending.percentage > 90 ? 'over-budget' : 'under-budget'}>
                    {spending?.percentage.toFixed(0)}% used
                  </span>
                </div>
                <div className="budget-bar">
                  <div
                    className="budget-progress"
                    style={{
                      width: `${Math.min(spending?.percentage || 0, 100)}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )

  const renderAnalytics = () => (
    <section className="panel">
      <div className="panel__header">
        <h2>Financial Analytics</h2>
        <button className="ghost-btn">
          <BarChart3 className="w-4 h-4 mr-2" />
          Advanced Charts
        </button>
      </div>
      <div className="analytics-grid">
        <div className="chart-container">
          <h3>Monthly Expenses</h3>
          <div className="bar-chart">
            {chartData.monthlyExpenses.map((value, index) => (
              <div key={index} className="chart-bar" style={{ height: `${(value / 3000) * 100}%` }}>
                <span className="chart-value">${value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-container">
          <h3>Category Breakdown</h3>
          <div className="pie-chart-container">
            {chartData.categoryBreakdown.map((item, index) => (
              <div key={index} className="pie-item">
                <div className="pie-color" style={{ backgroundColor: CATEGORIES.find(c => c.name === item.category)?.color || '#888' }} />
                <div className="pie-info">
                  <span className="pie-category">{item.category}</span>
                  <span className="pie-amount">${item.amount} ({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  const renderReports = () => (
    <section className="panel">
      <div className="panel__header">
        <h2>Financial Reports</h2>
        <button className="primary-btn">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>
      <div className="reports-grid">
        <div className="report-card">
          <div className="report-icon">
            <Calendar className="w-8 h-8" />
          </div>
          <h3>Monthly Report</h3>
          <p>Detailed breakdown of this month's expenses and income</p>
          <button className="ghost-btn">Generate</button>
        </div>
        <div className="report-card">
          <div className="report-icon">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h3>Yearly Summary</h3>
          <p>Annual financial overview and year-over-year comparison</p>
          <button className="ghost-btn">Generate</button>
        </div>
        <div className="report-card">
          <div className="report-icon">
            <Target className="w-8 h-8" />
          </div>
          <h3>Budget Analysis</h3>
          <p>Budget vs actual spending analysis with recommendations</p>
          <button className="ghost-btn">Generate</button>
        </div>
      </div>
    </section>
  )

  const renderSavings = () => (
    <section className="panel">
      <div className="panel__header">
        <div>
          <h2>Savings Goals</h2>
          <p>Track your financial objectives</p>
        </div>
        <button className="primary-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </button>
      </div>
      <div className="savings-list">
        {savingsGoals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          return (
            <div key={index} className="savings-item">
              <div className="savings-header">
                <div>
                  <h4>{goal.name}</h4>
                  <span className="savings-amount">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                </div>
                <div className="goal-priority">
                  <span className={`priority-badge priority-${goal.priority}`}>{goal.priority}</span>
                </div>
              </div>
              <div className="savings-bar">
                <div className="savings-progress" style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              <div className="savings-footer">
                <span>{progress.toFixed(1)}% complete</span>
                <span className="savings-deadline">{daysLeft} days left</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )

  const renderBills = () => (
    <section className="panel table-panel">
      <div className="panel__header">
        <h2>Bill Management</h2>
        <button className="primary-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Bill
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Bill Name</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.name}</td>
                <td>${bill.amount}</td>
                <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status status--${bill.status}`}>
                    {bill.status === 'overdue' && <AlertCircle className="w-4 h-4 mr-1" />}
                    {bill.status === 'pending' && <Clock className="w-4 h-4 mr-1" />}
                    {bill.status === 'upcoming' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </td>
                <td>
                  <span className="badge">{bill.category}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="action-btn">
                      <Bell className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )

  const renderInvestments = () => (
    <section className="panel">
      <div className="panel__header">
        <div>
          <h2>Investment Portfolio</h2>
          <p>Monitor your investment performance</p>
        </div>
        <button className="primary-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Investment
        </button>
      </div>
      <div className="investments-grid">
        {investments.map((investment) => (
          <div key={investment.id} className="investment-card">
            <div className="investment-header">
              <div className="investment-info">
                <h4>{investment.name}</h4>
                <span className="investment-symbol">{investment.symbol}</span>
              </div>
              <div className={`investment-return ${investment.return < 0 ? 'negative' : ''}`}>
                <span className={`return-value ${investment.return > 0 ? 'positive' : 'negative'}`}>
                  {investment.return > 0 ? '+' : ''}{investment.return}%
                </span>
              </div>
            </div>
            <div className="investment-amounts">
              <div className="investment-amount">
                <span className="amount-label">Invested Amount</span>
                <span className="amount-value">${investment.amount.toLocaleString()}</span>
              </div>
              <div className="investment-amount">
                <span className="amount-label">Current Value</span>
                <span className="amount-value">${investment.value.toLocaleString()}</span>
              </div>
              <div className="investment-amount">
                <span className="amount-label">Total Gain/Loss</span>
                <span className={`amount-value ${investment.value > investment.amount ? 'positive' : 'negative'}`}>
                  ${(investment.value - investment.amount).toLocaleString()}
                </span>
              </div>
            </div>
            <div className={`investment-performance ${investment.value < investment.amount ? 'negative' : ''}`}>
              <TrendingUp className="w-4 h-4" />
              <span>Performance: {investment.return > 0 ? 'Positive' : 'Negative'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )

  const renderSettings = () => (
    <section className="panel">
      <div className="panel__header">
        <div>
          <h2>Application Settings</h2>
          <p>Customize your experience</p>
        </div>
        <button className="primary-btn">
          <CheckCircle className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
      <div className="settings-grid">
        <div className="setting-section">
          <h3>
            <User className="w-5 h-5" />
            Profile Settings
          </h3>
          <div className="account-info">
            <div className="account-avatar">
              <User className="w-6 h-6" />
            </div>
            <div className="account-details">
              <h4>John Doe</h4>
              <p>john.doe@email.com</p>
            </div>
          </div>
          <div className="setting-item">
            <label>Display Name</label>
            <input type="text" defaultValue="John Doe" />
          </div>
          <div className="setting-item">
            <label>Email Address</label>
            <input type="email" defaultValue="john.doe@email.com" />
          </div>
        </div>
        
        <div className="setting-section">
          <h3>
            <Palette className="w-5 h-5" />
            Appearance
          </h3>
          <div className="setting-item">
            <label>Theme</label>
            <div className="theme-toggle">
              <button
                className={`theme-btn ${!isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(false)}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                className={`theme-btn ${isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(true)}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>
          <div className="setting-item">
            <label>Currency</label>
            <select defaultValue="usd">
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="jpy">JPY (¥)</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Date Format</label>
            <select defaultValue="mm/dd/yyyy">
              <option value="mm/dd/yyyy">MM/DD/YYYY</option>
              <option value="dd/mm/yyyy">DD/MM/YYYY</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
        
        <div className="setting-section">
          <h3>
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          <div className="setting-item">
            <label>Budget Alerts</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Bill Reminders</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Goal Updates</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Weekly Reports</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Investment Alerts</label>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
        
        <div className="setting-section">
          <h3>
            <Shield className="w-5 h-5" />
            Security
          </h3>
          <div className="setting-item">
            <label>Two-Factor Authentication</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Login Notifications</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Auto-lock Screen</label>
            <select defaultValue="5">
              <option value="1">1 minute</option>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="settings-actions">
        <button className="ghost-btn">
          Reset to Defaults
        </button>
        <button className="primary-btn">
          <CheckCircle className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </section>
  )

  return (
    <div className={`app-shell ${!isDarkMode ? 'light-theme' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="sidebar__icon">
            <DollarSign className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="sidebar__title">Luxe Expense</p>
            <p className="sidebar__subtitle">Tracker Pro</p>
          </div>
        </div>
        <nav className="sidebar__nav">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                className={`nav-button${activeView === item.id ? ' is-active' : ''}`}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                <div className="nav-button-content">
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {activeView === item.id && <span className="nav-button__pulse" />}
              </button>
            )
          })}
        </nav>
        <div className="sidebar__footer">
          <div className="sidebar__footer-badge">Premium Plan</div>
          <p className="sidebar__footer-title">Expense Pro</p>
          <p className="sidebar__footer-text">Unlimited features & support</p>
          <button className="ghost-btn" type="button">
            Manage Subscription
          </button>
        </div>
      </aside>
      <main className="main-area">
        <header className="main-header">
          <div className="main-header__titles">
            <span className="main-header__kicker">
              {navItems.find(item => item.id === activeView)?.label || 'Dashboard'}
            </span>
            <h1>{navItems.find(item => item.id === activeView)?.label || 'Dashboard'}</h1>
            <span className="main-header__date">{todayLabel}</span>
          </div>
          <div className="main-header__actions">
            <div className="search-field">
              <input type="search" placeholder={`Search ${activeView}...`} />
            </div>
            {activeView === 'transactions' && (
              <select
                className="ghost-btn"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            )}
            <button
              className="ghost-btn"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </button>
            <button className="primary-btn">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <div className="avatar" aria-label="Account">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {renderView()}
      </main>

      {/* Enhanced Add Transaction Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Transaction</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="modal-form">
              <div className="form-group">
                <label>Description</label>
                <input type="text" placeholder="Enter description" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount</label>
                  <input type="number" placeholder="0.00" step="0.01" required />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select>
                  {CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label>Recurring</label>
                  <select>
                    <option value="no">One-time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="ghost-btn">
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
