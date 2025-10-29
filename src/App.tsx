import './App.css'

const metrics = [
  { title: 'Revenue', value: '$84.3K', delta: '+8.2%', direction: 'up' },
  { title: 'Active Users', value: '1,248', delta: '+12.5%', direction: 'up' },
  { title: 'Churn Rate', value: '2.6%', delta: '-0.8%', direction: 'down' },
  { title: 'Customer NPS', value: '67', delta: '+4', direction: 'up' },
]

const navItems = [
  { label: 'Overview', active: true },
  { label: 'Analytics', active: false },
  { label: 'Sales', active: false },
  { label: 'Customers', active: false },
  { label: 'Reports', active: false },
  { label: 'Automations', active: false },
]

const schedule = [
  { time: '09:30', title: 'Product Sync', location: 'Quartz Room', tone: 'default' },
  { time: '11:00', title: 'Design Review', location: 'Handoff Board', tone: 'accent' },
  { time: '15:00', title: 'Launch Prep', location: 'Slack Call', tone: 'alert' },
]

const insights = [
  { title: 'Retention up 9%', detail: 'Cohort 24Q2 is outperforming baseline' },
  { title: 'Pipeline velocity', detail: 'Average lead close time dropped to 4.8 days' },
  { title: 'Support satisfaction', detail: 'CSAT improved to 92% after concierge rollout' },
]

const tickets = [
  { id: 'RT-1042', customer: 'Lia James', priority: 'High', status: 'Open', updated: '2m ago' },
  { id: 'RT-1038', customer: 'Henry Kim', priority: 'Medium', status: 'In Progress', updated: '14m ago' },
  { id: 'RT-1031', customer: 'Guild Labs', priority: 'Low', status: 'Resolved', updated: '27m ago' },
  { id: 'RT-1024', customer: 'Aurora Apps', priority: 'High', status: 'Escalated', updated: '1h ago' },
]

const performance = [68, 74, 63, 82, 77, 88, 92]

function App() {
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__icon">⌘</span>
          <div>
            <p className="sidebar__title">Aurora</p>
            <p className="sidebar__subtitle">Admin</p>
          </div>
        </div>
        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-button${item.active ? ' is-active' : ''}`}
              type="button"
            >
              <span>{item.label}</span>
              {item.active && <span className="nav-button__pulse" />}
            </button>
          ))}
        </nav>
        <div className="sidebar__footer">
          <div className="sidebar__footer-badge">Pro Workspace</div>
          <p className="sidebar__footer-title">Pink Nebula</p>
          <p className="sidebar__footer-text">Usage 68% of plan</p>
          <button className="ghost-btn" type="button">
            Manage subscription
          </button>
        </div>
      </aside>
      <main className="main-area">
        <header className="main-header">
          <div className="main-header__titles">
            <span className="main-header__kicker">Dashboard</span>
            <h1>Overview</h1>
            <span className="main-header__date">{todayLabel}</span>
          </div>
          <div className="main-header__actions">
            <div className="search-field">
              <input type="search" placeholder="Search" />
            </div>
            <button className="ghost-btn" type="button">
              Invite
            </button>
            <button className="primary-btn" type="button">
              New report
            </button>
            <div className="avatar" aria-label="Account">
              SJ
            </div>
          </div>
        </header>
        <section className="metrics-grid">
          {metrics.map((metric) => (
            <article key={metric.title} className="metric-card">
              <div className="metric-card__label">{metric.title}</div>
              <div className="metric-card__value">{metric.value}</div>
              <div
                className={`metric-card__delta${metric.direction === 'up' ? ' is-positive' : ' is-negative'}`}
              >
                {metric.delta}
              </div>
            </article>
          ))}
        </section>
        <section className="panels-grid">
          <article className="panel panel--highlight">
            <div className="panel__header">
              <div>
                <h2>Revenue pulse</h2>
                <p>Trailing 7 days</p>
              </div>
              <button className="ghost-btn" type="button">
                Details
              </button>
            </div>
            <div className="sparkline">
              {performance.map((value, index) => (
                <span key={value + index} style={{ height: `${value}%` }} className="sparkline__bar" />
              ))}
            </div>
            <div className="panel__footer">
              <div>
                <p className="panel__figure">$12.4K</p>
                <span className="panel__caption">Weekly average</span>
              </div>
              <div>
                <p className="panel__figure">+18.3%</p>
                <span className="panel__caption">vs last period</span>
              </div>
              <div>
                <p className="panel__figure">Top segment</p>
                <span className="panel__caption">Enterprise North</span>
              </div>
            </div>
          </article>
          <article className="panel">
            <div className="panel__header">
              <h2>Today</h2>
              <button className="ghost-btn" type="button">
                View all
              </button>
            </div>
            <ul className="schedule">
              {schedule.map((slot) => (
                <li key={slot.title} className={`schedule__item schedule__item--${slot.tone}`}>
                  <div className="schedule__time">{slot.time}</div>
                  <div>
                    <p className="schedule__title">{slot.title}</p>
                    <span className="schedule__location">{slot.location}</span>
                  </div>
                  <button className="chip" type="button">
                    Join
                  </button>
                </li>
              ))}
            </ul>
          </article>
          <article className="panel">
            <div className="panel__header">
              <h2>Insights</h2>
              <button className="ghost-btn" type="button">
                Export
              </button>
            </div>
            <ul className="insights">
              {insights.map((item) => (
                <li key={item.title} className="insights__item">
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
        <section className="panel table-panel">
          <div className="panel__header">
            <h2>Support tickets</h2>
            <button className="ghost-btn" type="button">
              Export CSV
            </button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.customer}</td>
                    <td>
                      <span className={`badge badge--${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`status status--${ticket.status.toLowerCase().replace(' ', '-')}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
