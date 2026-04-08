// ===== GTM DASHBOARD — APP LOGIC =====
var currentView = 'cm-tracker';
var currentBrand = 'All';
var sortCol = 'score';
var sortDir = 'desc';
var $ = function(s){return document.querySelector(s)};
var $$ = function(s){return document.querySelectorAll(s)};

document.addEventListener('DOMContentLoaded', function(){
  $('#date-badge').textContent = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  populateBrands();
  bindNav();
  bindModal();
  render();
});

function populateBrands(){
  var cont = $('#brand-filter');
  BRANDS.forEach(function(b){
    var s = document.createElement('span');
    s.className = 'pill';
    s.dataset.brand = b;
    s.textContent = b;
    cont.appendChild(s);
  });
  cont.addEventListener('click', function(e){
    if(!e.target.classList.contains('pill')) return;
    cont.querySelectorAll('.pill').forEach(function(p){p.classList.remove('active')});
    e.target.classList.add('active');
    currentBrand = e.target.dataset.brand;
    render();
  });
}

function bindNav(){
  $$('.tab').forEach(function(t){
    t.addEventListener('click', function(e){
      e.preventDefault();
      $$('.tab').forEach(function(x){x.classList.remove('active')});
      t.classList.add('active');
      currentView = t.dataset.view;
      sortCol = 'score'; sortDir = 'desc';
      render();
    });
  });
}

function bindModal(){
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-overlay').addEventListener('click', function(e){
    if(e.target === $('#modal-overlay')) closeModal();
  });
}
function closeModal(){ $('#modal-overlay').classList.add('hidden'); }
function openModal(h){ $('#modal-body').innerHTML = h; $('#modal-overlay').classList.remove('hidden'); }

// Helpers
function status(s){ return s >= 70 ? 'green' : s >= 40 ? 'yellow' : 'red'; }
function filterCMs(){
  var d = CM_DATA;
  if(currentBrand !== 'All') d = d.filter(function(c){return c.brand === currentBrand});
  return sortData(d);
}
function filterCMAs(){
  var d = CMA_DATA;
  if(currentBrand !== 'All') d = d.filter(function(c){return c.brand === currentBrand});
  return sortData(d);
}
function sortData(d){
  return d.slice().sort(function(a,b){
    var va=a[sortCol], vb=b[sortCol];
    if(typeof va === 'string'){va=va.toLowerCase();vb=vb.toLowerCase();}
    return sortDir === 'asc' ? (va>vb?1:va<vb?-1:0) : (va<vb?1:va>vb?-1:0);
  });
}
function thS(col,label){
  var cls = sortCol===col ? (sortDir==='asc'?' class="sorted-asc"':' class="sorted-desc"') : '';
  return '<th data-col="'+col+'"'+cls+'>'+label+'</th>';
}
function bindSort(){
  $$('thead th[data-col]').forEach(function(th){
    th.addEventListener('click', function(){
      var c=th.dataset.col;
      if(sortCol===c) sortDir = sortDir==='asc'?'desc':'asc';
      else { sortCol=c; sortDir='desc'; }
      render();
    });
  });
}
function trendSVG(dir){
  if(dir==='up') return '<span class="trend-arrow"><svg viewBox="0 0 50 20"><polyline points="0,18 15,12 30,6 50,2" fill="none" stroke="#22c55e" stroke-width="2.5"/></svg></span>';
  if(dir==='down') return '<span class="trend-arrow"><svg viewBox="0 0 50 20"><polyline points="0,2 15,8 30,14 50,18" fill="none" stroke="#ef4444" stroke-width="2.5"/></svg></span>';
  return '<span class="trend-arrow"><svg viewBox="0 0 50 20"><polyline points="0,10 15,11 30,10 50,10" fill="none" stroke="#eab308" stroke-width="2.5"/></svg></span>';
}
function pbar(val,max,color){
  var p = Math.min(100,Math.round((val/max)*100));
  var c = color || (p>=80?'#22c55e':p>=50?'#eab308':'#ef4444');
  return '<div class="inline-progress"><div class="bar-wrap"><div class="bar-fill" style="width:'+p+'%;background:'+c+'"></div></div><span class="bar-label" style="color:'+c+'">'+val+'%</span></div>';
}
function progressBar(val,target,inv){
  var p = inv ? Math.max(0,100-Math.round((val/(target*3))*100)) : Math.min(100,Math.round((val/target)*100));
  var c = p>=80?'#22c55e':p>=50?'#eab308':'#ef4444';
  return '<div class="progress-bar"><div class="progress-fill" style="width:'+p+'%;background:'+c+'"></div></div>';
}

// Render router
function render(){
  renderSummary();
  renderStatusIndicator();
  renderAlertMetrics();
  var views = {
    'cm-tracker': renderCMTracker,
    'cma-tracker': renderCMATracker,
    'conversion': renderConversion,
    'alerts': renderAlerts,
    'revenue': renderRevenue,
    'brands': renderBrands,
    'trends': renderTrends
  };
  (views[currentView] || renderCMTracker)();
}

function renderSummary(){
  var cms = filterCMs();
  var totalCalls = cms.reduce(function(s,c){return s+c.calls},0);
  var avgCalls = cms.length ? Math.round(totalCalls/cms.length) : 0;
  var avgTalk = cms.length ? (cms.reduce(function(s,c){return s+c.talkTime},0)/cms.length).toFixed(1) : '0';
  var totalGPVs = cms.reduce(function(s,c){return s+c.gpvs},0);
  var avgClose = cms.length ? Math.round(cms.reduce(function(s,c){return s+c.csaCloseRate},0)/cms.length) : 0;
  var totalUntouched = cms.reduce(function(s,c){return s+c.untouched},0);
  var g = cms.filter(function(c){return c.score>=70}).length;
  var y = cms.filter(function(c){return c.score>=40&&c.score<70}).length;
  var r = cms.filter(function(c){return c.score<40}).length;

  $('#summary-cards').innerHTML =
    '<div class="summary-card"><div class="card-label"><span class="card-icon">&#x1F465;</span> CMS</div><div class="card-value">'+cms.length+'</div><div class="card-sub">'+g+'G / '+y+'Y / '+r+'R</div></div>'+
    '<div class="summary-card"><div class="card-label"><span class="card-icon">&#x1F4DE;</span> AVG CALLS</div><div class="card-value">'+avgCalls+'</div><div class="card-sub">Target: 50+ | Total: '+totalCalls+'</div></div>'+
    '<div class="summary-card"><div class="card-label"><span class="card-icon">&#x23F1;</span> TALK TIME</div><div class="card-value">'+avgTalk+'h</div><div class="card-sub">Target: 3+</div></div>'+
    '<div class="summary-card"><div class="card-label"><span class="card-icon">&#x1F4C4;</span> GPVS</div><div class="card-value">'+totalGPVs+'</div><div class="card-sub">Target: 3+</div></div>'+
    '<div class="summary-card"><div class="card-label"><span class="card-icon">&#x2705;</span> CLOSE RATE</div><div class="card-value">'+avgClose+'%</div><div class="card-sub">Target: 80%+</div></div>'+
    '<div class="summary-card"><div class="card-label"><span class="card-icon">&#x1F6A8;</span> UNTOUCHED</div><div class="card-value'+(totalUntouched>100?' red':'')+'">' +totalUntouched+'</div><div class="card-sub">Immediate action</div></div>';
}

function renderStatusIndicator(){
  var cms = filterCMs();
  var g = cms.filter(function(c){return c.score>=70}).length;
  var y = cms.filter(function(c){return c.score>=40&&c.score<70}).length;
  var r = cms.filter(function(c){return c.score<40}).length;
  $('#status-indicator').innerHTML =
    '<span class="status-dot green" style="color:#22c55e">'+g+' Green</span>'+
    '<span class="status-dot yellow" style="color:#eab308">'+y+' Yellow</span>'+
    '<span class="status-dot red" style="color:#ef4444">'+r+' Red</span>';
}

function renderAlertMetrics(){
  var cms = filterCMs();
  var noContact48 = cms.reduce(function(s,c){return s+(c.untouched>0?Math.min(c.untouched,Math.round(c.untouched*0.35)):0)},0);
  var silent7 = AGING_BY_CM.reduce(function(s,a){return s+a.aging},0);
  var critical = cms.filter(function(c){return c.score<20}).length;
  var coaching = cms.filter(function(c){return c.score>=20&&c.score<70}).length;
  var cmaIssues = CMA_DATA.filter(function(c){return c.score<50}).length;
  var topPerf = cms.filter(function(c){return c.score>=70}).length;

  $('#alert-metrics').innerHTML =
    '<div class="alert-metric-card am-fire"><span class="am-icon">&#x1F525;</span><div><div class="am-value">'+noContact48+'</div><div class="am-label">48hr+ No Contact</div></div></div>'+
    '<div class="alert-metric-card am-skull"><span class="am-icon">&#x1F480;</span><div><div class="am-value">'+silent7+'</div><div class="am-label">7+ Days Silent</div></div></div>'+
    '<div class="alert-metric-card am-critical"><span class="am-icon">&#x1F4A5;</span><div><div class="am-value">'+critical+'</div><div class="am-label">Critical CMs</div></div></div>'+
    '<div class="alert-metric-card am-coaching"><span class="am-icon">&#x26A0;&#xFE0F;</span><div><div class="am-value">'+coaching+'</div><div class="am-label">Needs Coaching</div></div></div>'+
    '<div class="alert-metric-card am-cma"><span class="am-icon">&#x1F4CB;</span><div><div class="am-value">'+cmaIssues+'</div><div class="am-label">CMA Issues</div></div></div>'+
    '<div class="alert-metric-card am-star"><span class="am-icon">&#x1F31F;</span><div><div class="am-value">'+topPerf+'</div><div class="am-label">Top Performers</div></div></div>';
}

// ===== CM TRACKER VIEW =====
function renderCMTracker(){
  var cms = filterCMs();
  var h = '<div class="table-section-title">CM Daily Performance \u2014 '+(currentBrand==='All'?'All Brands':currentBrand)+' ('+cms.length+' CMs)</div>';
  h += '<div class="table-section-sub" style="text-align:right">Click a name for detail view</div>';
  h += '<div class="table-wrapper"><table><thead><tr>'+
    thS('name','CM NAME')+thS('brand','BRAND')+thS('calls','CALLS')+thS('talkTime','TALK')+
    thS('pipeline','PIPELINE')+thS('gpvs','GPVS')+thS('csaClose','CSA CLOSE')+
    thS('untouched','UNTOUCHED')+'<th>TREND</th>'+thS('score','SCORE')+
    '</tr></thead><tbody>';
  cms.forEach(function(c){
    var s = status(c.score);
    var callColor = c.calls>=50?'green':c.calls>=30?'yellow':'red';
    var untColor = c.untouched<=10?'green':c.untouched<=25?'yellow':'red';
    h += '<tr class="row-'+s+'">'+
      '<td><span class="name-link" data-cm="'+c.name+'">'+c.name+'</span></td>'+
      '<td>'+c.brand+'</td>'+
      '<td><span class="call-badge '+callColor+'">'+c.calls+'</span></td>'+
      '<td>'+c.talkTime.toFixed(1)+'h</td>'+
      '<td>'+pbar(c.pipeline,100)+'</td>'+
      '<td style="font-weight:800;font-size:15px">'+c.gpvs+'</td>'+
      '<td>'+c.csaClose+'</td>'+
      '<td><span class="untouched-badge '+untColor+'">'+c.untouched+'</span></td>'+
      '<td>'+trendSVG(c.trendDir)+'</td>'+
      '<td><span class="score-circle '+s+'">'+c.score+'</span></td>'+
      '</tr>';
  });
  h += '</tbody></table></div>';
  h += '<div class="footer-note">Target: 50+ calls/day | 4h+ talk time | 3+ GPVs | &lt;10 untouched leads \u2014 With RingCentral API + CRM integration, this auto-populates daily</div>';
  $('#view-container').innerHTML = h;
  bindSort();
  bindCMClicks();
}

function bindCMClicks(){
  $$('.name-link[data-cm]').forEach(function(el){
    el.addEventListener('click', function(){ openCMModal(el.dataset.cm); });
  });
}

function openCMModal(name){
  var c = CM_DATA.find(function(x){return x.name===name});
  if(!c) return;
  var s = status(c.score);
  var h = '<div class="modal-name">'+c.name+'</div>'+
    '<div class="modal-subtitle">'+c.brand+' \u00B7 Score: <strong style="color:'+(s==='green'?'#22c55e':s==='yellow'?'#eab308':'#ef4444')+'">'+c.score+'</strong></div>';
  h += '<div class="modal-kpi-grid">'+
    kpiCard('Calls',c.calls,CM_TARGETS.calls)+
    kpiCard('Talk Time',c.talkTime.toFixed(1)+'h',CM_TARGETS.talkTime,c.talkTime)+
    kpiCard('Pipeline',c.pipeline+'%',CM_TARGETS.pipeline,c.pipeline)+
    kpiCard('GPVs',c.gpvs,CM_TARGETS.gpvs)+
    kpiCard('CSA Close',c.csaClose,75,c.csaCloseRate)+
    kpiCard('Untouched',c.untouched,CM_TARGETS.untouched,null,true)+
    '</div>';
  h += '<div class="modal-section-title">5-Week Score Trend</div>';
  h += '<div style="display:flex;gap:4px;align-items:flex-end;height:40px;margin-bottom:16px">';
  var mx = Math.max.apply(null,c.trend);
  c.trend.forEach(function(v){
    h += '<div style="width:24px;height:'+Math.max(6,(v/mx)*40)+'px;background:#3b82f6;border-radius:3px 3px 0 0"></div>';
  });
  h += '</div>';
  openModal(h);
}

function kpiCard(label,display,target,numVal,inv){
  var val = numVal!=null ? numVal : (typeof display==='number'?display:parseFloat(display));
  return '<div class="modal-kpi">'+
    '<div class="kpi-value">'+display+'</div>'+
    '<div class="kpi-label">'+label+'</div>'+
    '<div class="kpi-target">Target: '+target+(inv?' max':'+')+'</div>'+
    progressBar(val,target,inv)+
    '</div>';
}

// ===== CMA TRACKER VIEW =====
function renderCMATracker(){
  var cmas = filterCMAs();
  var h = '<div class="table-section-title">CMA Daily Performance ('+cmas.length+' CMAs)</div>';
  h += '<div class="table-wrapper"><table><thead><tr>'+
    thS('name','NAME')+thS('cm','ASSIGNED CM')+thS('brand','BRAND')+
    thS('casesPrepped','CASES PREPPED')+thS('docFollowups','DOC FOLLOW-UPS')+
    thS('newLeads','NEW LEADS')+thS('preApptCalls','PRE-APPT')+
    thS('outboundCalls','OUTBOUND')+'<th>CRM</th><th>AM PREP</th>'+
    thS('score','SCORE')+'<th>STATUS</th>'+
    '</tr></thead><tbody>';
  cmas.forEach(function(c){
    var s = status(c.score);
    h += '<tr class="row-'+s+'">'+
      '<td><span class="name-link" data-cma="'+c.name+'">'+c.name+'</span></td>'+
      '<td>'+c.cm+'</td>'+
      '<td>'+c.brand+'</td>'+
      '<td style="color:'+(c.casesPrepped>=90?'#22c55e':c.casesPrepped>=70?'#eab308':'#ef4444')+'">'+c.casesPrepped+'%</td>'+
      '<td>'+c.docFollowups+'</td>'+
      '<td>'+c.newLeads+'</td>'+
      '<td>'+c.preApptCalls+'</td>'+
      '<td>'+c.outboundCalls+'</td>'+
      '<td>'+(c.crmCurrent?'<span class="status-check">\u2713</span>':'<span class="status-x">\u2717</span>')+'</td>'+
      '<td>'+(c.morningPrep?'<span class="status-check">\u2713</span>':'<span class="status-x">\u2717</span>')+'</td>'+
      '<td><span class="score-circle '+s+'">'+c.score+'</span></td>'+
      '<td><span class="badge badge-'+s+'" style="padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;background:'+(s==='green'?'#dcfce7':s==='yellow'?'#fef9c3':'#fee2e2')+';color:'+(s==='green'?'#16a34a':s==='yellow'?'#a16207':'#dc2626')+'">'+s.toUpperCase()+'</span></td>'+
      '</tr>';
  });
  h += '</tbody></table></div>';
  h += '<div class="footer-note">Green = CMA enabling CM success | Red = CMA contributing to CM underperformance</div>';
  $('#view-container').innerHTML = h;
  bindSort();
  bindCMAClicks();
}

function bindCMAClicks(){
  $$('.name-link[data-cma]').forEach(function(el){
    el.addEventListener('click', function(){ openCMAModal(el.dataset.cma); });
  });
}

function openCMAModal(name){
  var c = CMA_DATA.find(function(x){return x.name===name});
  if(!c) return;
  var s = status(c.score);
  var h = '<div class="modal-name">'+c.name+'</div>'+
    '<div class="modal-subtitle">CMA for '+c.cm+' \u00B7 '+c.brand+'</div>';
  h += '<div class="modal-kpi-grid">'+
    kpiCard('Cases Prepped',c.casesPrepped+'%',CMA_TARGETS.casesPrepped,c.casesPrepped)+
    kpiCard('Doc Follow-Ups',c.docFollowups,CMA_TARGETS.docFollowups)+
    kpiCard('New Leads',c.newLeads,CMA_TARGETS.newLeads)+
    kpiCard('Pre-Appt Calls',c.preApptCalls,CMA_TARGETS.preApptCalls)+
    kpiCard('Outbound',c.outboundCalls,CMA_TARGETS.outboundCalls)+
    '</div>';
  h += '<div style="display:flex;gap:16px;margin-bottom:16px">'+
    '<div style="flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center">'+
    '<div style="font-size:11px;color:#64748b">Morning Prep</div>'+
    '<div style="font-size:16px;font-weight:700;color:'+(c.morningPrep?'#22c55e':'#ef4444')+'">'+(c.morningPrep?'On Time':'Late / Missing')+'</div></div>'+
    '<div style="flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center">'+
    '<div style="font-size:11px;color:#64748b">CRM Currency</div>'+
    '<div style="font-size:16px;font-weight:700;color:'+(c.crmCurrent?'#22c55e':'#ef4444')+'">'+(c.crmCurrent?'Current':'Behind')+'</div></div></div>';
  var acts = CMA_ACTIVITIES[name] || defaultActs(c);
  h += '<div class="modal-section-title">Today\'s Activity Log</div>';
  acts.forEach(function(a){
    h += '<div class="activity-item"><span class="activity-time">'+a.time+'</span><span class="activity-task">'+a.task+'</span><span class="activity-status '+a.status+'">'+a.status.toUpperCase()+'</span></div>';
  });
  openModal(h);
}

function defaultActs(c){
  return [
    {time:c.morningPrep?'8:00 AM':'9:30 AM',task:'Morning case prep \u2014 '+c.casesPrepped+'% complete',status:c.casesPrepped>=80?'done':'late'},
    {time:'\u2014',task:'Pre-appointment calls ('+c.preApptCalls+')',status:c.preApptCalls>=10?'done':c.preApptCalls>=5?'late':'missing'},
    {time:'\u2014',task:'Doc follow-ups ('+c.docFollowups+' sent)',status:c.docFollowups>=12?'done':c.docFollowups>=6?'late':'missing'},
    {time:'\u2014',task:'CRM updates',status:c.crmCurrent?'done':'missing'}
  ];
}

// ===== ALERTS VIEW =====
function renderAlerts(){
  var cms = filterCMs();
  var totalUntouched = cms.reduce(function(s,c){return s+c.untouched},0);
  var revAtRisk = totalUntouched * REVENUE_ASSUMPTIONS.avgRevenuePerLead;
  var h = '';

  // Immediate action banner
  h += '<div class="alert-banner"><div><h2>\uD83D\uDD25 IMMEDIATE ACTION: Leads Not Contacted in 48+ Hours</h2><p>These veterans reached out for help and have been waiting. Every hour = lower conversion probability.</p></div><div class="banner-stat"><div class="banner-value">'+totalUntouched+' leads</div><div class="banner-sub">~$'+revAtRisk.toLocaleString()+' at risk</div></div></div>';

  // Critical - 7+ days
  h += '<div class="alert-section"><div class="alert-section-header"><div class="alert-section-title critical">\uD83D\uDC80 CRITICAL \u2014 7+ DAYS NO CONTACT ('+LEAD_AGING.critical.length+' LEADS)</div><div class="alert-section-hint">Redistribute or escalate NOW</div></div>';
  LEAD_AGING.critical.forEach(function(l){
    var bc = l.days>=20?'red':l.days>=10?'orange':'yellow';
    h += '<div class="lead-card critical"><div class="lead-day-badge '+bc+'">'+l.days+'d</div><div class="lead-info"><div class="lead-name">'+l.veteran+' \u2014 '+l.status+' \u2014 '+l.pipeline+'</div><div class="lead-detail">Assigned to: <strong>'+l.cm+'</strong> ('+l.cmBrand+') \u2014 CM Score: '+l.cmScore+'</div></div><div class="lead-actions"><button class="btn-action btn-redistribute">\uD83D\uDCDD REDISTRIBUTE</button><button class="btn-action btn-escalate">\uD83D\uDCC8 ESCALATE</button></div></div>';
  });
  h += '</div>';

  // Urgent - 48hrs to 7 days
  h += '<div class="alert-section"><div class="alert-section-header"><div class="alert-section-title urgent">\uD83D\uDD25 URGENT \u2014 48HRS TO 7 DAYS ('+LEAD_AGING.urgent.length+' LEADS)</div><div class="alert-section-hint">CM must contact today</div></div>';
  LEAD_AGING.urgent.forEach(function(l){
    h += '<div class="lead-card urgent"><div class="lead-day-badge yellow">'+l.days+'d</div><div class="lead-info"><div class="lead-name">'+l.veteran+' \u2014 '+l.status+' \u2014 '+l.pipeline+'</div><div class="lead-detail">Assigned to: <strong>'+l.cm+'</strong> ('+l.cmBrand+') \u2014 CM Score: '+l.cmScore+'</div></div><div class="lead-actions"><button class="btn-action btn-notify">\uD83D\uDCDE NOTIFY CM</button><button class="btn-action btn-flag">\uD83D\uDCC1 FLAG EXEC</button></div></div>';
  });
  h += '</div>';

  // Aging Leads by CM
  h += '<div class="alert-section"><div class="alert-section-title" style="color:#1e293b">Aging Leads by CM \u2014 Who\'s Letting Leads Die?</div><div class="aging-grid">';
  AGING_BY_CM.forEach(function(a){
    h += '<div class="aging-card"><div class="aging-name">'+a.name+'</div><div class="aging-detail">'+a.brand+' \u00B7 '+a.aging+' aging \u00B7 worst: '+a.worst+'</div></div>';
  });
  h += '</div></div>';

  // CM Performance Critical Issues
  var criticalCMs = cms.filter(function(c){return c.score<40});
  if(criticalCMs.length){
    h += '<div class="alert-section"><div class="alert-section-title critical">\uD83D\uDEA8 CM Performance \u2014 Critical Issues</div>';
    criticalCMs.forEach(function(c){
      var declining = c.trendDir === 'down';
      var isPip = c.score < 15;
      h += '<div class="cm-issue-card critical-bg"><div class="issue-text"><div class="issue-name">'+c.name+' ('+c.brand+') \u2014 '+c.untouched+' untouched leads'+(c.gpvs===0?' Activity but 0 GPVs':c.calls<20?' Only '+c.calls+' calls ('+c.talkTime+'h talk)':'')+'</div><div class="issue-detail">Score: '+c.score+' | Trend: '+c.trend[0]+' \u2192 '+c.score+(declining?' (\u2193 declining)':' (\u2191 improving)')+'</div></div><div class="issue-badges">'+(isPip?'<span class="issue-badge pip">PIP CANDIDATE</span>':'')+(declining?'<span class="issue-badge declining">DECLINING</span>':'')+'</div></div>';
    });
    h += '</div>';
  }

  // Top Performers
  var topPerf = cms.filter(function(c){return c.score>=70}).sort(function(a,b){return b.score-a.score});
  if(topPerf.length){
    h += '<div class="alert-section"><div class="alert-section-title good">\u2B50 Top Performers \u2014 Recognize & Reward</div><div class="performer-grid">';
    topPerf.forEach(function(c,i){
      h += '<div class="performer-card'+(i===0?' top-1':'')+'"><div class="perf-info"><div class="perf-name">'+(i===0?'\uD83C\uDFC6':'\u2B50')+' '+c.name+'</div><div class="perf-detail">'+c.brand+' \u00B7 '+c.calls+' calls \u00B7 '+c.talkTime+'h \u00B7 '+c.gpvs+' GPVs</div>'+(i===0?'<div class="perf-note">\uD83C\uDFC6 Top performer across all brands</div>':'')+'</div><div class="perf-score">'+c.score+'</div></div>';
    });
    h += '</div></div>';
  }

  // Tony's Daily Action Checklist
  var redCMs = cms.filter(function(c){return c.score<40}).length;
  var yellowCMs = cms.filter(function(c){return c.score>=40&&c.score<70}).length;
  var agingLeads = AGING_BY_CM.reduce(function(s,a){return s+a.aging},0);
  var topCM = topPerf.length ? topPerf[0] : null;
  var underCMAs = CMA_DATA.filter(function(c){return c.score<50}).length;

  h += '<div class="checklist-section"><div class="checklist-title">\uD83D\uDCCC Tony\'s Daily Action Checklist</div>';
  h += '<div class="checklist-item critical-item"><div class="check-box"></div><div class="check-text">Redistribute or escalate '+agingLeads+' leads with 7+ days no contact</div><span class="priority-badge critical">CRITICAL</span></div>';
  h += '<div class="checklist-item critical-item"><div class="check-box"></div><div class="check-text">Address '+redCMs+' CMs in critical status \u2014 verify RingCentral data</div><span class="priority-badge critical">CRITICAL</span></div>';
  h += '<div class="checklist-item high-item"><div class="check-box"></div><div class="check-text">Notify CMs with 48hr+ aging leads \u2014 '+totalUntouched+' leads need contact TODAY</div><span class="priority-badge high">HIGH</span></div>';
  h += '<div class="checklist-item high-item"><div class="check-box"></div><div class="check-text">Review '+underCMAs+' underperforming CMAs \u2014 their CMs are likely suffering</div><span class="priority-badge high">HIGH</span></div>';
  h += '<div class="checklist-item medium-item"><div class="check-box"></div><div class="check-text">Schedule 1-on-1 coaching with '+yellowCMs+' yellow-zone CMs</div><span class="priority-badge medium">MEDIUM</span></div>';
  h += '<div class="checklist-item medium-item"><div class="check-box"></div><div class="check-text">Verify CSA outcomes \u2014 check for unknown/unlogged results</div><span class="priority-badge medium">MEDIUM</span></div>';
  if(topCM) h += '<div class="checklist-item low-item"><div class="check-box"></div><div class="check-text">Recognize top performers \u2014 '+topCM.name+' leads with a score of '+topCM.score+'</div><span class="priority-badge low">LOW</span></div>';
  h += '<div class="checklist-item low-item"><div class="check-box"></div><div class="check-text">Submit weekly scorecard rollup to Mike & Javi</div><span class="priority-badge low">LOW</span></div>';
  h += '</div>';

  h += '<div class="footer-note">\uD83D\uDCA1 Sample Dashboard \u2014 GTM Veteran Consulting</div>';
  $('#view-container').innerHTML = h;
}

// ===== CONVERSION VIEW =====
function renderConversion(){
  var cms = filterCMs();
  var h = '<div class="table-section-title">Conversion Funnel \u2014 Calls to GPVs to CSA Close</div>';
  h += '<div class="table-wrapper"><table><thead><tr>'+
    thS('name','CM')+thS('brand','BRAND')+thS('calls','CALLS')+thS('gpvs','GPVS')+
    '<th>CALL-TO-GPV</th>'+thS('csaCloseRate','CSA CLOSE %')+'<th>FUNNEL</th>'+thS('score','SCORE')+
    '</tr></thead><tbody>';
  cms.forEach(function(c){
    var s = status(c.score);
    var callToGPV = c.calls>0 ? (c.gpvs/c.calls*100).toFixed(1)+'%' : '0%';
    var funnelWidth = Math.min(100, c.calls/94*100);
    h += '<tr class="row-'+s+'">'+
      '<td><span class="name-link" data-cm="'+c.name+'">'+c.name+'</span></td>'+
      '<td>'+c.brand+'</td>'+
      '<td><span class="call-badge '+(c.calls>=50?'green':c.calls>=30?'yellow':'red')+'">'+c.calls+'</span></td>'+
      '<td style="font-weight:800;font-size:15px">'+c.gpvs+'</td>'+
      '<td>'+callToGPV+'</td>'+
      '<td>'+c.csaCloseRate+'%</td>'+
      '<td><div style="background:#e2e8f0;border-radius:3px;height:8px;width:100px"><div style="height:8px;border-radius:3px;width:'+funnelWidth+'%;background:'+(s==='green'?'#22c55e':s==='yellow'?'#eab308':'#ef4444')+'"></div></div></td>'+
      '<td><span class="score-circle '+s+'">'+c.score+'</span></td>'+
      '</tr>';
  });
  h += '</tbody></table></div>';
  $('#view-container').innerHTML = h;
  bindSort();
  bindCMClicks();
}

// ===== REVENUE IMPACT =====
function renderRevenue(){
  var cms = filterCMs();
  var totalUntouched = cms.reduce(function(s,c){return s+c.untouched},0);
  var untouchedRev = totalUntouched * REVENUE_ASSUMPTIONS.avgRevenuePerLead;
  var callGap = cms.reduce(function(s,c){return s+Math.max(0,50-c.calls)},0);
  var callGapRev = Math.round(callGap * 85);
  var missedCSAs = cms.reduce(function(s,c){return s+Math.max(0,Math.round(c.gpvs*(1-c.csaCloseRate/100)))},0);
  var csaRev = missedCSAs * REVENUE_ASSUMPTIONS.avgCSAValue;
  var totalRev = untouchedRev + callGapRev + csaRev;

  var h = '<div class="revenue-hero"><div class="hero-amount">$'+totalRev.toLocaleString()+'</div><div class="hero-label">Estimated Monthly Revenue at Risk</div></div>';
  h += '<div class="revenue-breakdown">'+
    '<div class="revenue-source"><div class="source-amount">$'+untouchedRev.toLocaleString()+'</div><div class="source-label">From '+totalUntouched+' Untouched Leads<br>@ $'+REVENUE_ASSUMPTIONS.avgRevenuePerLead+' avg value</div></div>'+
    '<div class="revenue-source"><div class="source-amount">$'+callGapRev.toLocaleString()+'</div><div class="source-label">From '+callGap+' Missed Calls<br>(Below 50/day minimum)</div></div>'+
    '<div class="revenue-source"><div class="source-amount">$'+csaRev.toLocaleString()+'</div><div class="source-label">From '+missedCSAs+' Missed CSA Closes<br>@ $'+REVENUE_ASSUMPTIONS.avgCSAValue.toLocaleString()+' per CSA</div></div></div>';

  var cmRev = cms.map(function(c){
    var uR = c.untouched*REVENUE_ASSUMPTIONS.avgRevenuePerLead;
    var cR = Math.max(0,50-c.calls)*85;
    return {name:c.name,brand:c.brand,untouched:c.untouched,callGap:Math.max(0,50-c.calls),rev:uR+cR,score:c.score};
  }).filter(function(c){return c.rev>0}).sort(function(a,b){return b.rev-a.rev});

  if(cmRev.length){
    h += '<div class="table-wrapper"><table><thead><tr><th>CM</th><th>BRAND</th><th>UNTOUCHED</th><th>CALL GAP</th><th>REVENUE AT RISK</th><th>ACTION</th></tr></thead><tbody>';
    cmRev.forEach(function(c){
      var act = c.score<20?'Performance review':c.score<40?'Daily check-in + coaching':c.score<70?'Weekly coaching':'Monitor';
      h += '<tr><td><strong>'+c.name+'</strong></td><td>'+c.brand+'</td><td style="color:#ef4444">'+c.untouched+'</td><td>'+c.callGap+' calls/day</td><td style="color:#ef4444;font-weight:700">$'+c.rev.toLocaleString()+'</td><td>'+act+'</td></tr>';
    });
    h += '</tbody></table></div>';
  }
  h += '<div class="footer-note">With API integration, these numbers auto-calculate from real pipeline data</div>';
  $('#view-container').innerHTML = h;
}

// ===== BRAND COMPARISON =====
function renderBrands(){
  var stats = {};
  BRANDS.forEach(function(b){
    var cms = CM_DATA.filter(function(c){return c.brand===b});
    if(!cms.length) return;
    var avg = function(f){return Math.round(cms.reduce(function(s,c){return s+c[f]},0)/cms.length)};
    stats[b] = {
      cmCount:cms.length, avgCalls:avg('calls'),
      avgTalk:(cms.reduce(function(s,c){return s+c.talkTime},0)/cms.length).toFixed(1),
      totalGPVs:cms.reduce(function(s,c){return s+c.gpvs},0),
      totalUntouched:cms.reduce(function(s,c){return s+c.untouched},0),
      avgScore:avg('score'),
      greenPct:Math.round(cms.filter(function(c){return c.score>=70}).length/cms.length*100),
      redPct:Math.round(cms.filter(function(c){return c.score<40}).length/cms.length*100)
    };
    stats[b].revAtRisk = stats[b].totalUntouched * REVENUE_ASSUMPTIONS.avgRevenuePerLead;
  });
  var sorted = Object.keys(stats).sort(function(a,b){return stats[b].avgScore - stats[a].avgScore});
  var h = '<div class="brand-grid">';
  sorted.forEach(function(b){
    var st = stats[b]; var s = status(st.avgScore);
    h += '<div class="brand-card"><h3>'+b+' <span class="score-circle '+s+'" style="width:32px;height:32px;font-size:12px">'+st.avgScore+'</span></h3>'+
      '<div class="brand-stat"><span class="stat-label">CMs</span><span class="stat-value">'+st.cmCount+'</span></div>'+
      '<div class="brand-stat"><span class="stat-label">Avg Calls/Day</span><span class="stat-value">'+st.avgCalls+'</span></div>'+
      '<div class="brand-stat"><span class="stat-label">Avg Talk Time</span><span class="stat-value">'+st.avgTalk+'h</span></div>'+
      '<div class="brand-stat"><span class="stat-label">Total GPVs</span><span class="stat-value">'+st.totalGPVs+'</span></div>'+
      '<div class="brand-stat"><span class="stat-label">Untouched Leads</span><span class="stat-value" style="color:'+(st.totalUntouched<=15?'#22c55e':st.totalUntouched<=40?'#eab308':'#ef4444')+'">'+st.totalUntouched+'</span></div>'+
      '<div class="brand-stat"><span class="stat-label">Green / Red</span><span class="stat-value"><span style="color:#22c55e">'+st.greenPct+'%</span> / <span style="color:#ef4444">'+st.redPct+'%</span></span></div>'+
      '<div class="brand-stat"><span class="stat-label">Revenue at Risk</span><span class="stat-value" style="color:#ef4444">$'+st.revAtRisk.toLocaleString()+'</span></div></div>';
  });
  h += '</div>';
  $('#view-container').innerHTML = h;
}

// ===== TRENDS =====
function renderTrends(){
  var h = '<div class="charts-grid">';
  h += buildChart('Daily Call Volume',WEEKLY_TRENDS.callVolume,'#3b82f6');
  h += buildChart('Daily GPVs Submitted',WEEKLY_TRENDS.gpvs,'#22c55e');
  h += buildChart('Avg Talk Time (hours)',WEEKLY_TRENDS.avgTalkTime,'#f59e0b',true);
  h += '</div>';
  $('#view-container').innerHTML = h;
}

function buildChart(title,data,color,dec){
  var mx = Math.max.apply(null,data.map(function(d){return d.value}));
  var h = '<div class="chart-card"><h3>'+title+'</h3><div class="bar-chart">';
  data.forEach(function(d){
    var ht = Math.max(8,(d.value/mx)*160);
    var v = dec ? d.value.toFixed(1) : d.value;
    h += '<div class="bar-chart-col"><div class="bar-chart-bar" style="height:'+ht+'px;background:'+color+'"><span class="bar-value">'+v+'</span></div><div class="bar-chart-label">'+d.day+'</div></div>';
  });
  h += '</div></div>';
  return h;
}
