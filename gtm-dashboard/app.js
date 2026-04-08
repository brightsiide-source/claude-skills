// ===== GTM PERFORMANCE DASHBOARD — APP LOGIC =====

// ----- State -----
let currentView = 'cm-tracker';
let currentBrand = 'All';
let searchQuery = '';
let sortCol = 'score';
let sortDir = 'desc';

// ----- DOM refs -----
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ----- Init -----
document.addEventListener('DOMContentLoaded', () => {
  populateBrandFilter();
  bindNav();
  bindFilters();
  bindModal();
  render();
});

function populateBrandFilter() {
  const sel = $('#brand-filter');
  BRANDS.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b;
    opt.textContent = b;
    sel.appendChild(opt);
  });
}

function bindNav() {
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      $$('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      currentView = link.dataset.view;
      sortCol = 'score';
      sortDir = 'desc';
      render();
    });
  });
}

function bindFilters() {
  $('#brand-filter').addEventListener('change', e => {
    currentBrand = e.target.value;
    render();
  });
  $('#search-input').addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    render();
  });
}

function bindModal() {
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-overlay').addEventListener('click', e => {
    if (e.target === $('#modal-overlay')) closeModal();
  });
}

function closeModal() { $('#modal-overlay').classList.add('hidden'); }

function openModal(html) {
  $('#modal-body').innerHTML = html;
  $('#modal-overlay').classList.remove('hidden');
}

// ----- Helpers -----
function getStatus(score) {
  if (score >= 70) return 'green';
  if (score >= 40) return 'yellow';
  return 'red';
}

function badge(score) {
  const s = getStatus(score);
  const label = s === 'green' ? 'Green' : s === 'yellow' ? 'Yellow' : 'Red';
  return '<span class="badge badge-' + s + '">' + label + '</span>';
}

function sparkline(data) {
  const max = Math.max(...data);
  return '<span class="sparkline">' +
    data.map(v => '<span class="bar" style="height:' + Math.max(4, (v / max) * 24) + 'px"></span>').join('') +
    '</span>';
}

function pct(val, target) {
  return Math.min(100, Math.round((val / target) * 100));
}

function progressBar(val, target, invert) {
  let p = invert ? Math.max(0, 100 - Math.round((val / (target * 3)) * 100)) : pct(val, target);
  const color = p >= 80 ? '#3fb950' : p >= 50 ? '#d29922' : '#f85149';
  return '<div class="progress-bar"><div class="progress-fill" style="width:' + p + '%;background:' + color + '"></div></div>';
}

function filterCMs() {
  let data = CM_DATA;
  if (currentBrand !== 'All') data = data.filter(c => c.brand === currentBrand);
  if (searchQuery) data = data.filter(c => c.name.toLowerCase().includes(searchQuery));
  return sortData(data);
}

function filterCMAs() {
  let data = CMA_DATA;
  if (currentBrand !== 'All') data = data.filter(c => c.brand === currentBrand);
  if (searchQuery) data = data.filter(c => c.name.toLowerCase().includes(searchQuery) || c.cm.toLowerCase().includes(searchQuery));
  return sortData(data);
}

function sortData(data) {
  return [...data].sort((a, b) => {
    let va = a[sortCol], vb = b[sortCol];
    if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
    if (sortDir === 'asc') return va > vb ? 1 : va < vb ? -1 : 0;
    return va < vb ? 1 : va > vb ? -1 : 0;
  });
}

function thSorted(col, label) {
  let cls = '';
  if (sortCol === col) cls = sortDir === 'asc' ? ' class="sorted-asc"' : ' class="sorted-desc"';
  return '<th data-col="' + col + '"' + cls + '>' + label + '</th>';
}

function bindTableSort() {
  $$('thead th[data-col]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      else { sortCol = col; sortDir = 'desc'; }
      render();
    });
  });
}

// ----- Render Router -----
function render() {
  const titles = {
    'cm-tracker': 'CM Tracker',
    'cma-tracker': 'CMA Tracker',
    'alerts': 'Alerts',
    'trends': 'Weekly Trends',
    'brands': 'Brand Comparison',
    'revenue': 'Revenue Impact'
  };
  $('#page-title').textContent = titles[currentView] || '';
  renderSummary();
  const views = {
    'cm-tracker': renderCMTracker,
    'cma-tracker': renderCMATracker,
    'alerts': renderAlerts,
    'trends': renderTrends,
    'brands': renderBrands,
    'revenue': renderRevenue
  };
  views[currentView]();
}

// ----- Summary Cards -----
function renderSummary() {
  const cms = filterCMs();
  const totalCalls = cms.reduce((s, c) => s + c.calls, 0);
  const totalGPVs = cms.reduce((s, c) => s + c.gpvs, 0);
  const avgScore = cms.length ? Math.round(cms.reduce((s, c) => s + c.score, 0) / cms.length) : 0;
  const totalUntouched = cms.reduce((s, c) => s + c.untouched, 0);
  const greenCount = cms.filter(c => c.score >= 70).length;
  const redCount = cms.filter(c => c.score < 40).length;

  $('#summary-cards').innerHTML =
    '<div class="summary-card"><div class="card-value">' + totalCalls + '</div><div class="card-label">Total Calls Today</div></div>' +
    '<div class="summary-card"><div class="card-value">' + totalGPVs + '</div><div class="card-label">GPVs Submitted</div></div>' +
    '<div class="summary-card"><div class="card-value ' + getStatus(avgScore) + '">' + avgScore + '</div><div class="card-label">Avg CM Score</div></div>' +
    '<div class="summary-card"><div class="card-value red">' + totalUntouched + '</div><div class="card-label">Untouched Leads</div></div>' +
    '<div class="summary-card"><div class="card-value green">' + greenCount + '</div><div class="card-label">Green CMs</div></div>' +
    '<div class="summary-card"><div class="card-value red">' + redCount + '</div><div class="card-label">Red CMs</div></div>';
}

// ----- CM Tracker View -----
function renderCMTracker() {
  const cms = filterCMs();
  let html = '<div class="table-wrapper"><table><thead><tr>' +
    thSorted('name', 'Name') +
    thSorted('brand', 'Brand') +
    thSorted('calls', 'Calls') +
    thSorted('talkTime', 'Talk Time (h)') +
    thSorted('contactRate', 'Contact %') +
    thSorted('gpvs', 'GPVs') +
    thSorted('csaCloseRate', 'CSA Close %') +
    thSorted('untouched', 'Untouched') +
    '<th>Trend</th>' +
    thSorted('score', 'Score') +
    '<th>Status</th>' +
    '</tr></thead><tbody>';

  cms.forEach(c => {
    const s = getStatus(c.score);
    html += '<tr>' +
      '<td><span class="name-link" data-cm="' + c.name + '">' + c.name + '</span></td>' +
      '<td>' + c.brand + '</td>' +
      '<td style="color:' + (c.calls >= 50 ? '#3fb950' : c.calls >= 30 ? '#d29922' : '#f85149') + '">' + c.calls + '</td>' +
      '<td>' + c.talkTime.toFixed(1) + '</td>' +
      '<td>' + c.contactRate + '%</td>' +
      '<td style="font-weight:700;color:' + (c.gpvs >= 3 ? '#3fb950' : c.gpvs >= 1 ? '#d29922' : '#f85149') + '">' + c.gpvs + '</td>' +
      '<td>' + c.csaCloseRate + '%</td>' +
      '<td style="color:' + (c.untouched <= 10 ? '#3fb950' : c.untouched <= 25 ? '#d29922' : '#f85149') + '">' + c.untouched + '</td>' +
      '<td>' + sparkline(c.trend) + '</td>' +
      '<td style="font-weight:700;font-size:15px;color:' + (s === 'green' ? '#3fb950' : s === 'yellow' ? '#d29922' : '#f85149') + '">' + c.score + '</td>' +
      '<td>' + badge(c.score) + '</td>' +
      '</tr>';
  });

  html += '</tbody></table></div>';
  html += '<div class="footer-note">Target: 50+ calls/day | 4h+ talk time | 3+ GPVs | &lt;10 untouched leads | Green = on target, Yellow = coaching needed, Red = immediate action</div>';

  $('#view-container').innerHTML = html;
  bindTableSort();
  bindCMClicks();
}

function bindCMClicks() {
  $$('.name-link[data-cm]').forEach(el => {
    el.addEventListener('click', () => openCMModal(el.dataset.cm));
  });
}

function openCMModal(name) {
  const c = CM_DATA.find(cm => cm.name === name);
  if (!c) return;
  const s = getStatus(c.score);
  const pipeline = PIPELINE_DATA[name] || [
    { veteran: 'Vet A.', daysInPipeline: Math.round(Math.random() * 20) + 3, daysSinceContact: Math.round(Math.random() * 10) + 1, risk: 'LOW' },
    { veteran: 'Vet B.', daysInPipeline: Math.round(Math.random() * 15) + 5, daysSinceContact: Math.round(Math.random() * 8) + 2, risk: 'MED' }
  ];

  let html = '<div class="modal-name">' + c.name + '</div>' +
    '<div class="modal-subtitle">' + c.brand + ' &middot; Score: <strong style="color:' + (s === 'green' ? '#3fb950' : s === 'yellow' ? '#d29922' : '#f85149') + '">' + c.score + '</strong> ' + badge(c.score) + '</div>';

  html += '<div class="modal-kpi-grid">' +
    kpiCard('Calls', c.calls, CM_TARGETS.calls) +
    kpiCard('Talk Time', c.talkTime.toFixed(1) + 'h', CM_TARGETS.talkTime, c.talkTime) +
    kpiCard('Contact %', c.contactRate + '%', CM_TARGETS.contactRate, c.contactRate) +
    kpiCard('GPVs', c.gpvs, CM_TARGETS.gpvs) +
    kpiCard('CSA Close %', c.csaCloseRate + '%', CM_TARGETS.csaCloseRate, c.csaCloseRate) +
    kpiCard('Untouched', c.untouched, CM_TARGETS.untouched, null, true) +
    '</div>';

  // Trend sparklines
  html += '<div class="modal-section-title">5-Week Score Trend</div>';
  html += '<div style="display:flex;gap:4px;align-items:flex-end;height:40px;margin-bottom:16px">';
  const maxT = Math.max(...c.trend);
  c.trend.forEach(v => {
    html += '<div style="width:24px;height:' + Math.max(6, (v / maxT) * 40) + 'px;background:#58a6ff;border-radius:3px 3px 0 0"></div>';
  });
  html += '</div>';

  // Pipeline
  html += '<div class="modal-section-title">Pipeline — Active Veterans</div>';
  html += '<table class="pipeline-table"><thead><tr><th>Veteran</th><th>Days in Pipeline</th><th>Last Contact</th><th>Risk</th></tr></thead><tbody>';
  pipeline.forEach(p => {
    const rc = p.risk === 'HIGH' ? '#f85149' : p.risk === 'MED' ? '#d29922' : '#3fb950';
    html += '<tr><td>' + p.veteran + '</td><td>' + p.daysInPipeline + '</td><td>' + p.daysSinceContact + ' days ago</td><td style="color:' + rc + ';font-weight:700">' + p.risk + '</td></tr>';
  });
  html += '</tbody></table>';

  openModal(html);
}

function kpiCard(label, display, target, numericVal, invert) {
  const val = numericVal !== undefined && numericVal !== null ? numericVal : (typeof display === 'number' ? display : parseFloat(display));
  return '<div class="modal-kpi">' +
    '<div class="kpi-value">' + display + '</div>' +
    '<div class="kpi-label">' + label + '</div>' +
    '<div class="kpi-target">Target: ' + target + (invert ? ' max' : '+') + '</div>' +
    progressBar(val, target, invert) +
    '</div>';
}

// ----- CMA Tracker View -----
function renderCMATracker() {
  const cmas = filterCMAs();
  let html = '<div class="table-wrapper"><table><thead><tr>' +
    thSorted('name', 'Name') +
    thSorted('cm', 'Assigned CM') +
    thSorted('brand', 'Brand') +
    thSorted('casesPrepped', 'Cases Prepped %') +
    thSorted('docFollowups', 'Doc Follow-Ups') +
    thSorted('newLeads', 'New Leads') +
    thSorted('preApptCalls', 'Pre-Appt Calls') +
    thSorted('fqcMonitored', 'FQC Monitored') +
    thSorted('outboundCalls', 'Outbound Calls') +
    '<th>CRM</th><th>AM Prep</th><th>Trend</th>' +
    thSorted('score', 'Score') +
    '<th>Status</th>' +
    '</tr></thead><tbody>';

  cmas.forEach(c => {
    const s = getStatus(c.score);
    html += '<tr>' +
      '<td><span class="name-link" data-cma="' + c.name + '">' + c.name + '</span></td>' +
      '<td>' + c.cm + '</td>' +
      '<td>' + c.brand + '</td>' +
      '<td style="color:' + (c.casesPrepped >= 90 ? '#3fb950' : c.casesPrepped >= 70 ? '#d29922' : '#f85149') + '">' + c.casesPrepped + '%</td>' +
      '<td>' + c.docFollowups + '</td>' +
      '<td>' + c.newLeads + '</td>' +
      '<td>' + c.preApptCalls + '</td>' +
      '<td>' + c.fqcMonitored + '</td>' +
      '<td>' + c.outboundCalls + '</td>' +
      '<td>' + (c.crmCurrent ? '<span style="color:#3fb950">&#10003;</span>' : '<span style="color:#f85149">&#10007;</span>') + '</td>' +
      '<td>' + (c.morningPrep ? '<span style="color:#3fb950">&#10003;</span>' : '<span style="color:#f85149">&#10007;</span>') + '</td>' +
      '<td>' + sparkline(c.trend) + '</td>' +
      '<td style="font-weight:700;font-size:15px;color:' + (s === 'green' ? '#3fb950' : s === 'yellow' ? '#d29922' : '#f85149') + '">' + c.score + '</td>' +
      '<td>' + badge(c.score) + '</td>' +
      '</tr>';
  });

  html += '</tbody></table></div>';
  html += '<div class="footer-note">Green = CMA enabling CM success | Red = CMA contributing to CM underperformance</div>';

  $('#view-container').innerHTML = html;
  bindTableSort();
  bindCMAClicks();
}

function bindCMAClicks() {
  $$('.name-link[data-cma]').forEach(el => {
    el.addEventListener('click', () => openCMAModal(el.dataset.cma));
  });
}

function openCMAModal(name) {
  const c = CMA_DATA.find(cm => cm.name === name);
  if (!c) return;
  const s = getStatus(c.score);

  let html = '<div class="modal-name">' + c.name + '</div>' +
    '<div class="modal-subtitle">CMA for ' + c.cm + ' &middot; ' + c.brand + ' &middot; Score: <strong style="color:' + (s === 'green' ? '#3fb950' : s === 'yellow' ? '#d29922' : '#f85149') + '">' + c.score + '</strong> ' + badge(c.score) + '</div>';

  html += '<div class="modal-kpi-grid">' +
    kpiCard('Cases Prepped', c.casesPrepped + '%', CMA_TARGETS.casesPrepped, c.casesPrepped) +
    kpiCard('Doc Follow-Ups', c.docFollowups, CMA_TARGETS.docFollowups) +
    kpiCard('New Leads', c.newLeads, CMA_TARGETS.newLeads) +
    kpiCard('Pre-Appt Calls', c.preApptCalls, CMA_TARGETS.preApptCalls) +
    kpiCard('FQC Monitored', c.fqcMonitored, CMA_TARGETS.fqcMonitored) +
    kpiCard('Outbound Calls', c.outboundCalls, CMA_TARGETS.outboundCalls) +
    '</div>';

  html += '<div style="display:flex;gap:20px;margin-bottom:16px">' +
    '<div style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;padding:12px;text-align:center">' +
    '<div style="font-size:11px;color:#8b949e;text-transform:uppercase">Morning Prep</div>' +
    '<div style="font-size:18px;font-weight:700;color:' + (c.morningPrep ? '#3fb950' : '#f85149') + '">' + (c.morningPrep ? 'On Time' : 'Late / Missing') + '</div></div>' +
    '<div style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;padding:12px;text-align:center">' +
    '<div style="font-size:11px;color:#8b949e;text-transform:uppercase">CRM Currency</div>' +
    '<div style="font-size:18px;font-weight:700;color:' + (c.crmCurrent ? '#3fb950' : '#f85149') + '">' + (c.crmCurrent ? 'Current' : 'Behind') + '</div></div>' +
    '</div>';

  // Activity log
  const activities = CMA_ACTIVITIES[name] || generateDefaultActivities(c);
  html += '<div class="modal-section-title">Today\'s Activity Log</div>';
  html += '<div class="activity-log">';
  activities.forEach(a => {
    html += '<div class="activity-item">' +
      '<span class="activity-time">' + a.time + '</span>' +
      '<span class="activity-task">' + a.task + '</span>' +
      '<span class="activity-status ' + a.status + '">' + a.status.toUpperCase() + '</span>' +
      '</div>';
  });
  html += '</div>';

  openModal(html);
}

function generateDefaultActivities(c) {
  const startTime = c.morningPrep ? '8:00 AM' : '9:30 AM';
  return [
    { time: startTime, task: 'Morning case prep — ' + c.casesPrepped + '% complete', status: c.casesPrepped >= 80 ? 'done' : 'late' },
    { time: '—', task: 'Pre-appointment calls (' + c.preApptCalls + ' completed)', status: c.preApptCalls >= 10 ? 'done' : c.preApptCalls >= 5 ? 'late' : 'missing' },
    { time: '—', task: 'Doc follow-ups (' + c.docFollowups + ' sent)', status: c.docFollowups >= 12 ? 'done' : c.docFollowups >= 6 ? 'late' : 'missing' },
    { time: '—', task: 'CRM updates', status: c.crmCurrent ? 'done' : 'missing' }
  ];
}

// ----- Alerts View -----
function renderAlerts() {
  const cms = filterCMs();
  const cmas = filterCMAs();

  // Critical
  const untouchedAlerts = cms.filter(c => c.untouched >= 25);
  const lowCallAlerts = cms.filter(c => c.calls < 20);
  const zeroGPVwithCalls = cms.filter(c => c.gpvs === 0 && c.calls >= 20);

  // Warnings
  const coachingNeeded = cms.filter(c => c.score >= 30 && c.score < 70);

  // Top performers
  const topPerformers = cms.filter(c => c.score >= 85);

  let html = '';

  // Critical section
  html += '<div class="alert-section"><div class="alert-section-title critical">&#x1F534; Critical — Immediate Action Required</div>';
  if (untouchedAlerts.length === 0 && lowCallAlerts.length === 0 && zeroGPVwithCalls.length === 0) {
    html += '<div class="alert-card" style="color:#8b949e">No critical alerts</div>';
  }
  untouchedAlerts.forEach(c => {
    html += '<div class="alert-card critical">' +
      '<span class="alert-icon">&#x26A0;&#xFE0F;</span>' +
      '<div class="alert-detail"><strong>' + c.name + '</strong> <span>(' + c.brand + ') — Untouched leads critical</span></div>' +
      '<span class="alert-metric red">' + c.untouched + ' leads</span></div>';
  });
  lowCallAlerts.forEach(c => {
    html += '<div class="alert-card critical">' +
      '<span class="alert-icon">&#x1F4DE;</span>' +
      '<div class="alert-detail"><strong>' + c.name + '</strong> <span>(' + c.brand + ') — Sandbagging-level call count</span></div>' +
      '<span class="alert-metric red">' + c.calls + ' calls</span></div>';
  });
  zeroGPVwithCalls.forEach(c => {
    html += '<div class="alert-card critical">' +
      '<span class="alert-icon">&#x1F4C9;</span>' +
      '<div class="alert-detail"><strong>' + c.name + '</strong> <span>(' + c.brand + ') — Activity without output (calls but 0 GPVs)</span></div>' +
      '<span class="alert-metric red">0 GPVs</span></div>';
  });
  html += '</div>';

  // Warnings
  html += '<div class="alert-section"><div class="alert-section-title warning">&#x1F7E1; Warnings — Coaching Needed</div>';
  if (coachingNeeded.length === 0) {
    html += '<div class="alert-card" style="color:#8b949e">No warnings</div>';
  }
  coachingNeeded.forEach(c => {
    html += '<div class="alert-card warning">' +
      '<span class="alert-icon">&#x1F4CB;</span>' +
      '<div class="alert-detail"><strong>' + c.name + '</strong> <span>(' + c.brand + ') — Score trending below target</span></div>' +
      '<span class="alert-metric yellow">' + c.score + '</span></div>';
  });
  html += '</div>';

  // Top Performers
  html += '<div class="alert-section"><div class="alert-section-title good">&#x1F7E2; Top Performers — Recognize</div>';
  if (topPerformers.length === 0) {
    html += '<div class="alert-card" style="color:#8b949e">No top performers in current filter</div>';
  }
  topPerformers.forEach(c => {
    html += '<div class="alert-card good">' +
      '<span class="alert-icon">&#x2B50;</span>' +
      '<div class="alert-detail"><strong>' + c.name + '</strong> <span>(' + c.brand + ') — Exceeding targets across the board</span></div>' +
      '<span class="alert-metric green">' + c.score + '</span></div>';
  });
  html += '</div>';

  // CMA Alerts
  const redCMAs = cmas.filter(c => c.score < 40);
  if (redCMAs.length > 0) {
    html += '<div class="alert-section"><div class="alert-section-title critical">&#x1F534; CMA Alerts — Underperforming Support</div>';
    redCMAs.forEach(c => {
      html += '<div class="alert-card critical">' +
        '<span class="alert-icon">&#x1F4CB;</span>' +
        '<div class="alert-detail"><strong>' + c.name + '</strong> <span>(CMA for ' + c.cm + ', ' + c.brand + ') — CMA score critical</span></div>' +
        '<span class="alert-metric red">' + c.score + '</span></div>';
    });
    html += '</div>';
  }

  $('#view-container').innerHTML = html;
}

// ----- Weekly Trends -----
function renderTrends() {
  let html = '<div class="charts-grid">';

  html += buildBarChart('Daily Call Volume', WEEKLY_TRENDS.callVolume, '#58a6ff');
  html += buildBarChart('Daily GPVs Submitted', WEEKLY_TRENDS.gpvs, '#3fb950');
  html += buildBarChart('Avg Talk Time (hours)', WEEKLY_TRENDS.avgTalkTime, '#d29922', true);

  html += '</div>';
  $('#view-container').innerHTML = html;
}

function buildBarChart(title, data, color, isDecimal) {
  const max = Math.max(...data.map(d => d.value));
  let html = '<div class="chart-card"><h3>' + title + '</h3><div class="bar-chart">';
  data.forEach(d => {
    const h = Math.max(8, (d.value / max) * 160);
    const display = isDecimal ? d.value.toFixed(1) : d.value;
    html += '<div class="bar-chart-col">' +
      '<div class="bar-chart-bar" style="height:' + h + 'px;background:' + color + '">' +
      '<span class="bar-value">' + display + '</span></div>' +
      '<div class="bar-chart-label">' + d.day + '</div></div>';
  });
  html += '</div></div>';
  return html;
}

// ----- Brand Comparison -----
function renderBrands() {
  const brandStats = {};
  BRANDS.forEach(b => {
    const cms = CM_DATA.filter(c => c.brand === b);
    if (cms.length === 0) return;
    const avgCalls = Math.round(cms.reduce((s, c) => s + c.calls, 0) / cms.length);
    const avgTalk = (cms.reduce((s, c) => s + c.talkTime, 0) / cms.length).toFixed(1);
    const totalGPVs = cms.reduce((s, c) => s + c.gpvs, 0);
    const totalUntouched = cms.reduce((s, c) => s + c.untouched, 0);
    const avgScore = Math.round(cms.reduce((s, c) => s + c.score, 0) / cms.length);
    const greenPct = Math.round((cms.filter(c => c.score >= 70).length / cms.length) * 100);
    const redPct = Math.round((cms.filter(c => c.score < 40).length / cms.length) * 100);
    const revAtRisk = totalUntouched * REVENUE_ASSUMPTIONS.avgRevenuePerLead;
    brandStats[b] = { avgCalls, avgTalk, totalGPVs, totalUntouched, avgScore, greenPct, redPct, cmCount: cms.length, revAtRisk };
  });

  const sorted = Object.entries(brandStats).sort((a, b) => b[1].avgScore - a[1].avgScore);

  let html = '<div class="brand-grid">';
  sorted.forEach(([brand, st]) => {
    const s = getStatus(st.avgScore);
    html += '<div class="brand-card">' +
      '<h3>' + brand + ' ' + badge(st.avgScore) + '</h3>' +
      '<div class="brand-stat"><span class="stat-label">CMs</span><span class="stat-value">' + st.cmCount + '</span></div>' +
      '<div class="brand-stat"><span class="stat-label">Avg Calls/Day</span><span class="stat-value">' + st.avgCalls + '</span></div>' +
      '<div class="brand-stat"><span class="stat-label">Avg Talk Time</span><span class="stat-value">' + st.avgTalk + 'h</span></div>' +
      '<div class="brand-stat"><span class="stat-label">Total GPVs</span><span class="stat-value">' + st.totalGPVs + '</span></div>' +
      '<div class="brand-stat"><span class="stat-label">Untouched Leads</span><span class="stat-value" style="color:' + (st.totalUntouched <= 15 ? '#3fb950' : st.totalUntouched <= 40 ? '#d29922' : '#f85149') + '">' + st.totalUntouched + '</span></div>' +
      '<div class="brand-stat"><span class="stat-label">Avg Score</span><span class="stat-value" style="color:' + (s === 'green' ? '#3fb950' : s === 'yellow' ? '#d29922' : '#f85149') + '">' + st.avgScore + '</span></div>' +
      '<div class="brand-stat"><span class="stat-label">Green / Red CMs</span><span class="stat-value"><span style="color:#3fb950">' + st.greenPct + '%</span> / <span style="color:#f85149">' + st.redPct + '%</span></span></div>' +
      '<div class="brand-stat"><span class="stat-label">Revenue at Risk</span><span class="stat-value" style="color:#f85149">$' + st.revAtRisk.toLocaleString() + '</span></div>' +
      '</div>';
  });
  html += '</div>';

  $('#view-container').innerHTML = html;
}

// ----- Revenue Impact -----
function renderRevenue() {
  const cms = filterCMs();

  // Untouched lead revenue
  const totalUntouched = cms.reduce((s, c) => s + c.untouched, 0);
  const untouchedRev = totalUntouched * REVENUE_ASSUMPTIONS.avgRevenuePerLead;

  // Call gap (below 50/day)
  const callGap = cms.reduce((s, c) => s + Math.max(0, 50 - c.calls), 0);
  const callGapRev = Math.round(callGap * 85); // estimated rev per missed call

  // CSA not closed on call
  const missedCSAs = cms.reduce((s, c) => s + Math.max(0, Math.round(c.gpvs * (1 - c.csaCloseRate / 100))), 0);
  const csaRev = missedCSAs * REVENUE_ASSUMPTIONS.avgCSAValue;

  const totalRev = untouchedRev + callGapRev + csaRev;

  let html = '<div class="revenue-hero">' +
    '<div class="hero-amount">$' + totalRev.toLocaleString() + '</div>' +
    '<div class="hero-label">Estimated Monthly Revenue at Risk</div></div>';

  html += '<div class="revenue-breakdown">' +
    '<div class="revenue-source"><div class="source-amount">$' + untouchedRev.toLocaleString() + '</div><div class="source-label">From ' + totalUntouched + ' Untouched Leads<br>@ $' + REVENUE_ASSUMPTIONS.avgRevenuePerLead.toLocaleString() + ' avg value</div></div>' +
    '<div class="revenue-source"><div class="source-amount">$' + callGapRev.toLocaleString() + '</div><div class="source-label">From ' + callGap + ' Missed Calls<br>(Below 50/day minimum)</div></div>' +
    '<div class="revenue-source"><div class="source-amount">$' + csaRev.toLocaleString() + '</div><div class="source-label">From ' + missedCSAs + ' Missed CSA Closes<br>@ $' + REVENUE_ASSUMPTIONS.avgCSAValue.toLocaleString() + ' per CSA</div></div>' +
    '</div>';

  // Per-CM revenue leakage table
  const cmRevData = cms.map(c => {
    const uRev = c.untouched * REVENUE_ASSUMPTIONS.avgRevenuePerLead;
    const cRev = Math.max(0, 50 - c.calls) * 85;
    const total = uRev + cRev;
    return { ...c, revAtRisk: total };
  }).filter(c => c.revAtRisk > 0).sort((a, b) => b.revAtRisk - a.revAtRisk);

  if (cmRevData.length > 0) {
    html += '<div class="table-wrapper"><table><thead><tr>' +
      '<th>CM</th><th>Brand</th><th>Untouched Leads</th><th>Call Gap</th><th>Revenue at Risk</th><th>Recommended Action</th>' +
      '</tr></thead><tbody>';
    cmRevData.forEach(c => {
      let action = 'Monitor';
      if (c.score < 20) action = 'Performance review';
      else if (c.score < 40) action = 'Daily check-in + coaching';
      else if (c.score < 70) action = 'Weekly coaching';
      html += '<tr>' +
        '<td><strong>' + c.name + '</strong></td>' +
        '<td>' + c.brand + '</td>' +
        '<td style="color:#f85149">' + c.untouched + '</td>' +
        '<td>' + Math.max(0, 50 - c.calls) + ' calls/day</td>' +
        '<td style="color:#f85149;font-weight:700">$' + c.revAtRisk.toLocaleString() + '</td>' +
        '<td>' + action + '</td></tr>';
    });
    html += '</tbody></table></div>';
  }

  html += '<div class="footer-note">Revenue estimates based on: $' + REVENUE_ASSUMPTIONS.avgRevenuePerLead.toLocaleString() + ' avg lead value | $' + REVENUE_ASSUMPTIONS.avgCSAValue.toLocaleString() + ' avg CSA value | With API integration, these numbers auto-calculate from real pipeline data</div>';

  $('#view-container').innerHTML = html;
}
