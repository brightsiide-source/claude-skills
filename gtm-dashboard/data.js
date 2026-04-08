// ===== GTM PERFORMANCE DASHBOARD — MOCK DATA =====

const BRANDS = [
  'Veterans Legal Group', 'Vet Defender', 'VA Claims Pro',
  'Patriot Benefits', 'Veterans First', 'Liberty Claims',
  'Eagle Benefits', 'Freedom VA Services'
];

const CM_DATA = [
  { name: 'Cesar Sanchez', brand: 'Veterans Legal Group', calls: 94, talkTime: 4.8, contactRate: 92, gpvs: 5, csaCloseRate: 88, untouched: 2, score: 96, trend: [88, 90, 92, 94, 96] },
  { name: 'Maria Rodriguez', brand: 'Vet Defender', calls: 87, talkTime: 4.5, contactRate: 89, gpvs: 4, csaCloseRate: 85, untouched: 4, score: 92, trend: [85, 87, 90, 91, 92] },
  { name: 'James Patterson', brand: 'VA Claims Pro', calls: 82, talkTime: 4.2, contactRate: 86, gpvs: 4, csaCloseRate: 82, untouched: 6, score: 89, trend: [82, 84, 86, 88, 89] },
  { name: 'Angela Washington', brand: 'Veterans Legal Group', calls: 78, talkTime: 4.0, contactRate: 84, gpvs: 3, csaCloseRate: 80, untouched: 8, score: 86, trend: [80, 82, 84, 85, 86] },
  { name: 'David Kim', brand: 'Patriot Benefits', calls: 76, talkTime: 3.9, contactRate: 82, gpvs: 3, csaCloseRate: 78, untouched: 7, score: 84, trend: [78, 80, 82, 83, 84] },
  { name: 'Rachel Foster', brand: 'Veterans First', calls: 72, talkTime: 3.7, contactRate: 80, gpvs: 3, csaCloseRate: 76, untouched: 9, score: 81, trend: [75, 77, 79, 80, 81] },
  { name: 'Marcus Thompson', brand: 'Liberty Claims', calls: 68, talkTime: 3.5, contactRate: 78, gpvs: 3, csaCloseRate: 74, untouched: 10, score: 78, trend: [72, 74, 76, 77, 78] },
  { name: 'Sarah Mitchell', brand: 'Eagle Benefits', calls: 65, talkTime: 3.3, contactRate: 76, gpvs: 2, csaCloseRate: 72, untouched: 11, score: 75, trend: [70, 72, 74, 74, 75] },
  { name: 'Chris Nguyen', brand: 'Freedom VA Services', calls: 62, talkTime: 3.2, contactRate: 74, gpvs: 2, csaCloseRate: 70, untouched: 12, score: 72, trend: [68, 70, 71, 72, 72] },
  { name: 'Jennifer Blake', brand: 'Veterans Legal Group', calls: 58, talkTime: 3.0, contactRate: 72, gpvs: 2, csaCloseRate: 68, untouched: 14, score: 68, trend: [65, 66, 67, 68, 68] },
  { name: 'Robert Chen', brand: 'Vet Defender', calls: 55, talkTime: 2.8, contactRate: 70, gpvs: 2, csaCloseRate: 65, untouched: 15, score: 64, trend: [60, 62, 63, 64, 64] },
  { name: 'Tiffany Morales', brand: 'VA Claims Pro', calls: 50, talkTime: 2.6, contactRate: 68, gpvs: 2, csaCloseRate: 62, untouched: 18, score: 60, trend: [58, 59, 60, 60, 60] },
  { name: 'Brandon Williams', brand: 'Patriot Benefits', calls: 45, talkTime: 2.4, contactRate: 64, gpvs: 1, csaCloseRate: 58, untouched: 20, score: 52, trend: [55, 54, 53, 52, 52] },
  { name: 'Nicole Harper', brand: 'Veterans First', calls: 42, talkTime: 2.2, contactRate: 60, gpvs: 1, csaCloseRate: 55, untouched: 22, score: 48, trend: [52, 50, 49, 48, 48] },
  { name: 'Derek Jackson', brand: 'Liberty Claims', calls: 38, talkTime: 2.0, contactRate: 56, gpvs: 1, csaCloseRate: 50, untouched: 25, score: 42, trend: [48, 46, 44, 43, 42] },
  { name: 'Amanda Price', brand: 'Eagle Benefits', calls: 32, talkTime: 1.8, contactRate: 52, gpvs: 1, csaCloseRate: 45, untouched: 28, score: 35, trend: [42, 40, 38, 36, 35] },
  { name: 'Tyler Brooks', brand: 'Freedom VA Services', calls: 28, talkTime: 1.5, contactRate: 48, gpvs: 0, csaCloseRate: 40, untouched: 35, score: 28, trend: [35, 33, 31, 29, 28] },
  { name: 'Stephanie Cruz', brand: 'Vet Defender', calls: 22, talkTime: 1.3, contactRate: 42, gpvs: 0, csaCloseRate: 35, untouched: 45, score: 18, trend: [28, 25, 22, 20, 18] },
  { name: 'Mike Dawson', brand: 'VA Claims Pro', calls: 18, talkTime: 1.1, contactRate: 38, gpvs: 0, csaCloseRate: 30, untouched: 68, score: 12, trend: [22, 18, 15, 13, 12] },
  { name: 'Lisa Patel', brand: 'Patriot Benefits', calls: 14, talkTime: 1.0, contactRate: 34, gpvs: 0, csaCloseRate: 25, untouched: 92, score: 8, trend: [18, 15, 12, 10, 8] },
  { name: 'Kyle Henderson', brand: 'Veterans First', calls: 8, talkTime: 0.9, contactRate: 28, gpvs: 0, csaCloseRate: 20, untouched: 135, score: 3, trend: [12, 10, 8, 5, 3] }
];

// Pipeline data for CM detail cards
const PIPELINE_DATA = {
  'Cesar Sanchez': [
    { veteran: 'John M.', daysInPipeline: 3, daysSinceContact: 1, risk: 'LOW' },
    { veteran: 'Robert T.', daysInPipeline: 5, daysSinceContact: 2, risk: 'LOW' },
    { veteran: 'William K.', daysInPipeline: 7, daysSinceContact: 1, risk: 'LOW' }
  ],
  'Kyle Henderson': [
    { veteran: 'James R.', daysInPipeline: 42, daysSinceContact: 30, risk: 'HIGH' },
    { veteran: 'Michael S.', daysInPipeline: 38, daysSinceContact: 25, risk: 'HIGH' },
    { veteran: 'David L.', daysInPipeline: 35, daysSinceContact: 22, risk: 'HIGH' },
    { veteran: 'Anthony P.', daysInPipeline: 28, daysSinceContact: 18, risk: 'HIGH' },
    { veteran: 'Steven W.', daysInPipeline: 15, daysSinceContact: 10, risk: 'MED' }
  ],
  'Mike Dawson': [
    { veteran: 'Daniel H.', daysInPipeline: 30, daysSinceContact: 20, risk: 'HIGH' },
    { veteran: 'Kevin B.', daysInPipeline: 25, daysSinceContact: 15, risk: 'HIGH' },
    { veteran: 'Brian G.', daysInPipeline: 18, daysSinceContact: 12, risk: 'MED' }
  ],
  'Lisa Patel': [
    { veteran: 'Chris F.', daysInPipeline: 35, daysSinceContact: 28, risk: 'HIGH' },
    { veteran: 'Eric N.', daysInPipeline: 32, daysSinceContact: 22, risk: 'HIGH' },
    { veteran: 'Mark J.', daysInPipeline: 20, daysSinceContact: 14, risk: 'MED' },
    { veteran: 'Paul D.', daysInPipeline: 12, daysSinceContact: 8, risk: 'MED' }
  ]
};

const CMA_DATA = [
  { name: 'Rosa Torres', cm: 'Cesar Sanchez', brand: 'Veterans Legal Group', casesPrepped: 95, docFollowups: 22, newLeads: 8, preApptCalls: 18, fqcMonitored: 12, outboundCalls: 35, crmCurrent: true, morningPrep: true, score: 97, trend: [92, 94, 95, 96, 97] },
  { name: 'Ana Gutierrez', cm: 'Maria Rodriguez', brand: 'Vet Defender', casesPrepped: 92, docFollowups: 20, newLeads: 7, preApptCalls: 16, fqcMonitored: 11, outboundCalls: 32, crmCurrent: true, morningPrep: true, score: 94, trend: [88, 90, 92, 93, 94] },
  { name: 'Kevin Tran', cm: 'James Patterson', brand: 'VA Claims Pro', casesPrepped: 88, docFollowups: 18, newLeads: 6, preApptCalls: 15, fqcMonitored: 10, outboundCalls: 30, crmCurrent: true, morningPrep: true, score: 90, trend: [84, 86, 88, 89, 90] },
  { name: 'Linda Park', cm: 'Angela Washington', brand: 'Veterans Legal Group', casesPrepped: 85, docFollowups: 16, newLeads: 5, preApptCalls: 14, fqcMonitored: 9, outboundCalls: 28, crmCurrent: true, morningPrep: true, score: 85, trend: [80, 82, 83, 84, 85] },
  { name: 'Jason Rivera', cm: 'David Kim', brand: 'Patriot Benefits', casesPrepped: 82, docFollowups: 14, newLeads: 5, preApptCalls: 12, fqcMonitored: 8, outboundCalls: 25, crmCurrent: true, morningPrep: true, score: 82, trend: [76, 78, 80, 81, 82] },
  { name: 'Michelle Lee', cm: 'Rachel Foster', brand: 'Veterans First', casesPrepped: 78, docFollowups: 12, newLeads: 4, preApptCalls: 11, fqcMonitored: 7, outboundCalls: 22, crmCurrent: true, morningPrep: false, score: 76, trend: [72, 73, 74, 75, 76] },
  { name: 'Carlos Mendez', cm: 'Marcus Thompson', brand: 'Liberty Claims', casesPrepped: 74, docFollowups: 10, newLeads: 4, preApptCalls: 10, fqcMonitored: 6, outboundCalls: 20, crmCurrent: false, morningPrep: true, score: 70, trend: [68, 69, 70, 70, 70] },
  { name: 'Brittany Adams', cm: 'Sarah Mitchell', brand: 'Eagle Benefits', casesPrepped: 68, docFollowups: 8, newLeads: 3, preApptCalls: 8, fqcMonitored: 5, outboundCalls: 18, crmCurrent: false, morningPrep: false, score: 60, trend: [64, 62, 61, 60, 60] },
  { name: 'Daniel Ortiz', cm: 'Chris Nguyen', brand: 'Freedom VA Services', casesPrepped: 62, docFollowups: 6, newLeads: 2, preApptCalls: 6, fqcMonitored: 4, outboundCalls: 15, crmCurrent: false, morningPrep: false, score: 52, trend: [58, 56, 54, 53, 52] },
  { name: 'Amber Hayes', cm: 'Derek Jackson', brand: 'Liberty Claims', casesPrepped: 55, docFollowups: 5, newLeads: 2, preApptCalls: 5, fqcMonitored: 3, outboundCalls: 12, crmCurrent: false, morningPrep: false, score: 40, trend: [50, 48, 44, 42, 40] },
  { name: 'Victor Reyes', cm: 'Tyler Brooks', brand: 'Freedom VA Services', casesPrepped: 48, docFollowups: 4, newLeads: 1, preApptCalls: 4, fqcMonitored: 2, outboundCalls: 10, crmCurrent: false, morningPrep: false, score: 30, trend: [42, 38, 35, 32, 30] },
  { name: 'Jasmine White', cm: 'Stephanie Cruz', brand: 'Vet Defender', casesPrepped: 42, docFollowups: 3, newLeads: 1, preApptCalls: 3, fqcMonitored: 2, outboundCalls: 8, crmCurrent: false, morningPrep: false, score: 22, trend: [35, 30, 26, 24, 22] },
  { name: 'Tony Medina', cm: 'Kyle Henderson', brand: 'Veterans First', casesPrepped: 40, docFollowups: 2, newLeads: 0, preApptCalls: 2, fqcMonitored: 1, outboundCalls: 6, crmCurrent: false, morningPrep: false, score: 15, trend: [28, 24, 20, 18, 15] }
];

// Activity logs for CMA detail cards
const CMA_ACTIVITIES = {
  'Rosa Torres': [
    { time: '7:45 AM', task: 'Morning case prep — 48 cases reviewed', status: 'done' },
    { time: '8:22 AM', task: 'Pre-appointment calls completed (18)', status: 'done' },
    { time: '9:15 AM', task: 'Doc follow-ups sent (22 packages)', status: 'done' },
    { time: '10:30 AM', task: 'New leads researched and assigned (8)', status: 'done' },
    { time: '11:45 AM', task: 'FQC monitoring — 12 cases reviewed', status: 'done' },
    { time: '1:00 PM', task: 'CRM entries updated and current', status: 'done' }
  ],
  'Tony Medina': [
    { time: '10:00 AM', task: 'Morning case prep — started late', status: 'late' },
    { time: '10:45 AM', task: 'Pre-appointment calls (2 of 12 target)', status: 'missing' },
    { time: '11:30 AM', task: 'Doc follow-ups (2 of 15 target)', status: 'missing' },
    { time: '12:00 PM', task: 'New lead research', status: 'missing' },
    { time: '—', task: 'FQC monitoring', status: 'missing' },
    { time: '—', task: 'CRM updates', status: 'missing' }
  ],
  'Jasmine White': [
    { time: '9:30 AM', task: 'Morning case prep — 42% complete', status: 'late' },
    { time: '10:15 AM', task: 'Pre-appointment calls (3 of 10 target)', status: 'missing' },
    { time: '11:00 AM', task: 'Doc follow-ups (3 sent)', status: 'late' },
    { time: '—', task: 'New lead research (1 lead)', status: 'missing' },
    { time: '—', task: 'FQC monitoring', status: 'missing' },
    { time: '—', task: 'CRM updates', status: 'missing' }
  ]
};

// Weekly trend data for charts
const WEEKLY_TRENDS = {
  callVolume: [
    { day: 'Mon', value: 892 },
    { day: 'Tue', value: 1024 },
    { day: 'Wed', value: 965 },
    { day: 'Thu', value: 1102 },
    { day: 'Fri', value: 788 }
  ],
  gpvs: [
    { day: 'Mon', value: 28 },
    { day: 'Tue', value: 35 },
    { day: 'Wed', value: 31 },
    { day: 'Thu', value: 42 },
    { day: 'Fri', value: 24 }
  ],
  avgTalkTime: [
    { day: 'Mon', value: 2.8 },
    { day: 'Tue', value: 3.2 },
    { day: 'Wed', value: 3.0 },
    { day: 'Thu', value: 3.5 },
    { day: 'Fri', value: 2.6 }
  ]
};

// KPI targets for progress bars
const CM_TARGETS = {
  calls: 50,
  talkTime: 4.0,
  contactRate: 80,
  gpvs: 3,
  csaCloseRate: 75,
  untouched: 10 // lower is better
};

const CMA_TARGETS = {
  casesPrepped: 90,
  docFollowups: 15,
  newLeads: 5,
  preApptCalls: 12,
  fqcMonitored: 8,
  outboundCalls: 25
};

// Revenue assumptions for calculator
const REVENUE_ASSUMPTIONS = {
  avgRevenuePerLead: 4200,
  avgRevenuePerGPV: 8500,
  avgCSAValue: 6000
};
