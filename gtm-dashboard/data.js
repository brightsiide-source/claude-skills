// ===== GTM PERFORMANCE DASHBOARD — MOCK DATA =====

const BRANDS = ['VAC', 'VDC', 'VRG', 'DVC', 'VOR', 'AVC', 'VDR', 'VDA'];

const CM_DATA = [
  { name: 'Cesar Sanchez', brand: 'VDC', calls: 94, talkTime: 4.8, pipeline: 94, gpvs: 5, csaClose: '4/5', csaCloseRate: 80, untouched: 3, score: 96, trend: [88, 90, 92, 94, 96], trendDir: 'up' },
  { name: 'Brianna Wolfe', brand: 'VAC', calls: 88, talkTime: 4.3, pipeline: 90, gpvs: 4, csaClose: '3/4', csaCloseRate: 75, untouched: 2, score: 91, trend: [84, 86, 88, 90, 91], trendDir: 'up' },
  { name: 'Marcus Thompson', brand: 'VRG', calls: 76, talkTime: 3.9, pipeline: 89, gpvs: 4, csaClose: '3/5', csaCloseRate: 60, untouched: 4, score: 85, trend: [78, 80, 82, 84, 85], trendDir: 'up' },
  { name: 'Diana Reyes', brand: 'DVC', calls: 72, talkTime: 3.7, pipeline: 86, gpvs: 3, csaClose: '3/3', csaCloseRate: 100, untouched: 3, score: 82, trend: [76, 78, 80, 81, 82], trendDir: 'up' },
  { name: 'Trevor Marsh', brand: 'VAC', calls: 68, talkTime: 3.5, pipeline: 85, gpvs: 3, csaClose: '2/4', csaCloseRate: 50, untouched: 5, score: 78, trend: [72, 74, 76, 77, 78], trendDir: 'up' },
  { name: 'Angela Cruz', brand: 'AVC', calls: 61, talkTime: 3.2, pipeline: 78, gpvs: 3, csaClose: '2/3', csaCloseRate: 67, untouched: 6, score: 72, trend: [66, 68, 70, 71, 72], trendDir: 'up' },
  { name: 'Ryan O\'Brien', brand: 'VOR', calls: 55, talkTime: 3.0, pipeline: 73, gpvs: 2, csaClose: '2/3', csaCloseRate: 67, untouched: 8, score: 67, trend: [62, 64, 65, 66, 67], trendDir: 'up' },
  { name: 'Jasmine Patel', brand: 'VDR', calls: 52, talkTime: 2.9, pipeline: 68, gpvs: 2, csaClose: '1/3', csaCloseRate: 33, untouched: 10, score: 62, trend: [58, 59, 60, 61, 62], trendDir: 'up' },
  { name: 'Keith Nakamura', brand: 'VAC', calls: 50, talkTime: 2.8, pipeline: 67, gpvs: 2, csaClose: '1/3', csaCloseRate: 33, untouched: 9, score: 60, trend: [56, 57, 58, 59, 60], trendDir: 'up' },
  { name: 'Monica Estrada', brand: 'VDA', calls: 48, talkTime: 2.7, pipeline: 69, gpvs: 2, csaClose: '1/2', csaCloseRate: 50, untouched: 11, score: 57, trend: [54, 55, 56, 56, 57], trendDir: 'flat' },
  { name: 'Jordan Williams', brand: 'DVC', calls: 44, talkTime: 2.5, pipeline: 55, gpvs: 2, csaClose: '1/3', csaCloseRate: 33, untouched: 14, score: 52, trend: [50, 51, 51, 52, 52], trendDir: 'flat' },
  { name: 'Alicia Fernandez', brand: 'VRG', calls: 42, talkTime: 2.4, pipeline: 53, gpvs: 1, csaClose: '1/2', csaCloseRate: 50, untouched: 16, score: 49, trend: [52, 51, 50, 49, 49], trendDir: 'down' },
  { name: 'Derek Sullivan', brand: 'AVC', calls: 40, talkTime: 2.2, pipeline: 53, gpvs: 1, csaClose: '0/2', csaCloseRate: 0, untouched: 15, score: 46, trend: [50, 49, 48, 47, 46], trendDir: 'down' },
  { name: 'Nathan Brooks', brand: 'VAC', calls: 38, talkTime: 2.1, pipeline: 48, gpvs: 1, csaClose: '0/2', csaCloseRate: 0, untouched: 22, score: 40, trend: [46, 44, 42, 41, 40], trendDir: 'down' },
  { name: 'Tina Morales', brand: 'VOR', calls: 35, talkTime: 1.9, pipeline: 45, gpvs: 1, csaClose: '0/1', csaCloseRate: 0, untouched: 20, score: 43, trend: [48, 46, 45, 44, 43], trendDir: 'down' },
  { name: 'Brandon Price', brand: 'VDR', calls: 30, talkTime: 1.7, pipeline: 40, gpvs: 1, csaClose: '0/2', csaCloseRate: 0, untouched: 28, score: 32, trend: [30, 30, 31, 31, 32], trendDir: 'flat' },
  { name: 'Samantha Nguyen', brand: 'DVC', calls: 28, talkTime: 1.5, pipeline: 35, gpvs: 0, csaClose: '0/2', csaCloseRate: 0, untouched: 35, score: 25, trend: [28, 27, 26, 25, 25], trendDir: 'down' },
  { name: 'Luis Ramirez', brand: 'VDA', calls: 25, talkTime: 1.3, pipeline: 30, gpvs: 0, csaClose: '0/1', csaCloseRate: 0, untouched: 38, score: 20, trend: [25, 23, 22, 21, 20], trendDir: 'down' },
  { name: 'Chris Whitfield', brand: 'AVC', calls: 18, talkTime: 1.0, pipeline: 22, gpvs: 0, csaClose: '0/2', csaCloseRate: 0, untouched: 48, score: 12, trend: [20, 18, 16, 14, 12], trendDir: 'down' },
  { name: 'Tyler Dunn', brand: 'VOR', calls: 15, talkTime: 0.9, pipeline: 18, gpvs: 0, csaClose: '0/1', csaCloseRate: 0, untouched: 52, score: 8, trend: [16, 14, 12, 10, 8], trendDir: 'down' },
  { name: 'Kyle Henderson', brand: 'VDR', calls: 8, talkTime: 0.5, pipeline: 10, gpvs: 0, csaClose: '0/0', csaCloseRate: 0, untouched: 135, score: 3, trend: [12, 10, 8, 5, 3], trendDir: 'down' }
];

// Lead aging data for alerts view
const LEAD_AGING = {
  critical: [ // 7+ days no contact
    { veteran: 'Veteran #1-135', days: 30, status: 'New Lead', pipeline: '30 days in pipeline', cm: 'Kyle Henderson', cmBrand: 'VDR', cmScore: 3 },
    { veteran: 'Veteran #2', days: 28, status: 'New Lead', pipeline: '28 days in pipeline', cm: 'Kyle Henderson', cmBrand: 'VDR', cmScore: 3 },
    { veteran: 'Veteran #3', days: 25, status: 'New Lead', pipeline: '25 days in pipeline', cm: 'Kyle Henderson', cmBrand: 'VDR', cmScore: 3 },
    { veteran: 'Wayne Z.', days: 21, status: 'New Lead', pipeline: '21 days in pipeline', cm: 'Chris Whitfield', cmBrand: 'AVC', cmScore: 12 },
    { veteran: 'Veteran #4', days: 22, status: 'Contacted', pipeline: '22 days in pipeline', cm: 'Kyle Henderson', cmBrand: 'VDR', cmScore: 3 },
    { veteran: 'Carol B.', days: 18, status: 'New Lead', pipeline: '18 days in pipeline', cm: 'Chris Whitfield', cmBrand: 'AVC', cmScore: 12 },
    { veteran: 'Veteran #5', days: 18, status: 'Docs Requested', pipeline: '35 days in pipeline', cm: 'Kyle Henderson', cmBrand: 'VDR', cmScore: 3 },
    { veteran: 'Eugene T.', days: 15, status: 'New Lead', pipeline: '15 days in pipeline', cm: 'Chris Whitfield', cmBrand: 'AVC', cmScore: 12 }
  ],
  urgent: [ // 48hrs to 7 days
    { veteran: 'Paul E.', days: 6, status: 'New Lead', pipeline: '6 days in pipeline', cm: 'Jordan Williams', cmBrand: 'DVC', cmScore: 52 },
    { veteran: 'Veteran (Lead #2 of 20)', days: 7, status: 'New Lead', pipeline: '7 days in pipeline', cm: 'Tina Morales', cmBrand: 'VOR', cmScore: 43 },
    { veteran: 'Veteran (Lead #2 of 22)', days: 7, status: 'New Lead', pipeline: '7 days in pipeline', cm: 'Nathan Brooks', cmBrand: 'VAC', cmScore: 40 },
    { veteran: 'Veteran (Lead #2 of 28)', days: 7, status: 'New Lead', pipeline: '7 days in pipeline', cm: 'Brandon Price', cmBrand: 'VDR', cmScore: 32 },
    { veteran: 'Veteran (Lead #2 of 35)', days: 7, status: 'New Lead', pipeline: '7 days in pipeline', cm: 'Samantha Nguyen', cmBrand: 'DVC', cmScore: 25 },
    { veteran: 'Veteran (Lead #2 of 38)', days: 7, status: 'New Lead', pipeline: '7 days in pipeline', cm: 'Luis Ramirez', cmBrand: 'VDA', cmScore: 20 },
    { veteran: 'Veteran (Lead #2 of 48)', days: 7, status: 'New Lead', pipeline: '7 days in pipeline', cm: 'Chris Whitfield', cmBrand: 'AVC', cmScore: 12 },
    { veteran: 'Veteran (Lead #2 of 52)', days: 7, status: 'New Lead', pipeline: '7 days in pipeline', cm: 'Tyler Dunn', cmBrand: 'VOR', cmScore: 8 }
  ]
};

// Aging leads by CM for the "Who's Letting Leads Die?" section
const AGING_BY_CM = [
  { name: 'Kyle Henderson', brand: 'VDR', aging: 10, worst: '30d' },
  { name: 'Chris Whitfield', brand: 'AVC', aging: 9, worst: '21d' },
  { name: 'Brandon Price', brand: 'VDR', aging: 6, worst: '14d' },
  { name: 'Tyler Dunn', brand: 'VOR', aging: 5, worst: '15d' },
  { name: 'Jordan Williams', brand: 'DVC', aging: 4, worst: '6d' },
  { name: 'Samantha Nguyen', brand: 'DVC', aging: 4, worst: '9d' },
  { name: 'Luis Ramirez', brand: 'VDA', aging: 3, worst: '9d' },
  { name: 'Tina Morales', brand: 'VOR', aging: 2, worst: '6d' },
  { name: 'Nathan Brooks', brand: 'VAC', aging: 2, worst: '6d' },
  { name: 'Alicia Fernandez', brand: 'VRG', aging: 1, worst: '3d' },
  { name: 'Brianna Wolfe', brand: 'VAC', aging: 1, worst: '2d' },
  { name: 'Marcus Thompson', brand: 'VRG', aging: 1, worst: '2d' }
];

const CMA_DATA = [
  { name: 'Rosa Torres', cm: 'Cesar Sanchez', brand: 'VDC', casesPrepped: 95, docFollowups: 22, newLeads: 8, preApptCalls: 18, fqcMonitored: 12, outboundCalls: 35, crmCurrent: true, morningPrep: true, score: 97, trend: [92, 94, 95, 96, 97] },
  { name: 'Ana Gutierrez', cm: 'Brianna Wolfe', brand: 'VAC', casesPrepped: 92, docFollowups: 20, newLeads: 7, preApptCalls: 16, fqcMonitored: 11, outboundCalls: 32, crmCurrent: true, morningPrep: true, score: 94, trend: [88, 90, 92, 93, 94] },
  { name: 'Kevin Tran', cm: 'Marcus Thompson', brand: 'VRG', casesPrepped: 88, docFollowups: 18, newLeads: 6, preApptCalls: 15, fqcMonitored: 10, outboundCalls: 30, crmCurrent: true, morningPrep: true, score: 90, trend: [84, 86, 88, 89, 90] },
  { name: 'Linda Park', cm: 'Diana Reyes', brand: 'DVC', casesPrepped: 85, docFollowups: 16, newLeads: 5, preApptCalls: 14, fqcMonitored: 9, outboundCalls: 28, crmCurrent: true, morningPrep: true, score: 85, trend: [80, 82, 83, 84, 85] },
  { name: 'Jason Rivera', cm: 'Trevor Marsh', brand: 'VAC', casesPrepped: 82, docFollowups: 14, newLeads: 5, preApptCalls: 12, fqcMonitored: 8, outboundCalls: 25, crmCurrent: true, morningPrep: true, score: 82, trend: [76, 78, 80, 81, 82] },
  { name: 'Michelle Lee', cm: 'Angela Cruz', brand: 'AVC', casesPrepped: 78, docFollowups: 12, newLeads: 4, preApptCalls: 11, fqcMonitored: 7, outboundCalls: 22, crmCurrent: true, morningPrep: false, score: 76, trend: [72, 73, 74, 75, 76] },
  { name: 'Carlos Mendez', cm: 'Ryan O\'Brien', brand: 'VOR', casesPrepped: 74, docFollowups: 10, newLeads: 4, preApptCalls: 10, fqcMonitored: 6, outboundCalls: 20, crmCurrent: false, morningPrep: true, score: 70, trend: [68, 69, 70, 70, 70] },
  { name: 'Brittany Adams', cm: 'Jasmine Patel', brand: 'VDR', casesPrepped: 68, docFollowups: 8, newLeads: 3, preApptCalls: 8, fqcMonitored: 5, outboundCalls: 18, crmCurrent: false, morningPrep: false, score: 60, trend: [64, 62, 61, 60, 60] },
  { name: 'Daniel Ortiz', cm: 'Keith Nakamura', brand: 'VAC', casesPrepped: 62, docFollowups: 6, newLeads: 2, preApptCalls: 6, fqcMonitored: 4, outboundCalls: 15, crmCurrent: false, morningPrep: false, score: 52, trend: [58, 56, 54, 53, 52] },
  { name: 'Amber Hayes', cm: 'Derek Sullivan', brand: 'AVC', casesPrepped: 55, docFollowups: 5, newLeads: 2, preApptCalls: 5, fqcMonitored: 3, outboundCalls: 12, crmCurrent: false, morningPrep: false, score: 40, trend: [50, 48, 44, 42, 40] },
  { name: 'Victor Reyes', cm: 'Tyler Dunn', brand: 'VOR', casesPrepped: 48, docFollowups: 4, newLeads: 1, preApptCalls: 4, fqcMonitored: 2, outboundCalls: 10, crmCurrent: false, morningPrep: false, score: 30, trend: [42, 38, 35, 32, 30] },
  { name: 'Jasmine White', cm: 'Chris Whitfield', brand: 'AVC', casesPrepped: 42, docFollowups: 3, newLeads: 1, preApptCalls: 3, fqcMonitored: 2, outboundCalls: 8, crmCurrent: false, morningPrep: false, score: 22, trend: [35, 30, 26, 24, 22] },
  { name: 'Tony Medina', cm: 'Kyle Henderson', brand: 'VDR', casesPrepped: 40, docFollowups: 2, newLeads: 0, preApptCalls: 2, fqcMonitored: 1, outboundCalls: 6, crmCurrent: false, morningPrep: false, score: 15, trend: [28, 24, 20, 18, 15] }
];

// Activity logs for CMA detail cards
const CMA_ACTIVITIES = {
  'Rosa Torres': [
    { time: '7:45 AM', task: 'Morning case prep - 48 cases reviewed', status: 'done' },
    { time: '8:22 AM', task: 'Pre-appointment calls completed (18)', status: 'done' },
    { time: '9:15 AM', task: 'Doc follow-ups sent (22 packages)', status: 'done' },
    { time: '10:30 AM', task: 'New leads researched and assigned (8)', status: 'done' },
    { time: '11:45 AM', task: 'FQC monitoring - 12 cases reviewed', status: 'done' },
    { time: '1:00 PM', task: 'CRM entries updated and current', status: 'done' }
  ],
  'Tony Medina': [
    { time: '10:00 AM', task: 'Morning case prep - started late', status: 'late' },
    { time: '10:45 AM', task: 'Pre-appointment calls (2 of 12 target)', status: 'missing' },
    { time: '11:30 AM', task: 'Doc follow-ups (2 of 15 target)', status: 'missing' },
    { time: '12:00 PM', task: 'New lead research', status: 'missing' },
    { time: '---', task: 'FQC monitoring', status: 'missing' },
    { time: '---', task: 'CRM updates', status: 'missing' }
  ]
};

// Weekly trend data
const WEEKLY_TRENDS = {
  callVolume: [
    { day: 'Mon', value: 892 }, { day: 'Tue', value: 1024 },
    { day: 'Wed', value: 965 }, { day: 'Thu', value: 1102 }, { day: 'Fri', value: 788 }
  ],
  gpvs: [
    { day: 'Mon', value: 28 }, { day: 'Tue', value: 35 },
    { day: 'Wed', value: 31 }, { day: 'Thu', value: 42 }, { day: 'Fri', value: 24 }
  ],
  avgTalkTime: [
    { day: 'Mon', value: 2.8 }, { day: 'Tue', value: 3.2 },
    { day: 'Wed', value: 3.0 }, { day: 'Thu', value: 3.5 }, { day: 'Fri', value: 2.6 }
  ]
};

// KPI targets
const CM_TARGETS = { calls: 50, talkTime: 4.0, pipeline: 80, gpvs: 3, csaCloseRate: 75, untouched: 10 };
const CMA_TARGETS = { casesPrepped: 90, docFollowups: 15, newLeads: 5, preApptCalls: 12, fqcMonitored: 8, outboundCalls: 25 };

// Revenue assumptions
const REVENUE_ASSUMPTIONS = { avgRevenuePerLead: 280, avgRevenuePerGPV: 8500, avgCSAValue: 6000 };
