import { useState, useMemo } from "react";

const MOCK_CMS = [
  { id: 1, name: "Cesar Sanchez", brand: "VDC", calls: 94, talkTime: 4.8, pipeline: 48, contacted: 45, gpvs: 5, csaClosed: 4, csaSent: 1, untouched: 3, score: 96, weekHistory: [88,91,85,94,96], gpvHistory: [4,5,3,4,5], leads: [
    { name: "Robert M.", status: "GPV Submitted", daysInPipeline: 12, lastContact: 0 },
    { name: "James T.", status: "Docs Received", daysInPipeline: 5, lastContact: 1 },
    { name: "Patricia W.", status: "CSA Signed", daysInPipeline: 3, lastContact: 0 },
    { name: "Michael F.", status: "Contacted", daysInPipeline: 2, lastContact: 1 },
    { name: "Linda K.", status: "New Lead", daysInPipeline: 1, lastContact: 0 },
  ]},
  { id: 2, name: "Matthew Recce", brand: "VAC", calls: 88, talkTime: 4.3, pipeline: 42, contacted: 38, gpvs: 4, csaClosed: 3, csaSent: 1, untouched: 2, score: 91, weekHistory: [82,85,88,90,91], gpvHistory: [3,3,4,4,4], leads: [
    { name: "Steven R.", status: "GPV Submitted", daysInPipeline: 14, lastContact: 0 },
    { name: "Karen H.", status: "Docs Received", daysInPipeline: 6, lastContact: 1 },
    { name: "David L.", status: "CSA Signed", daysInPipeline: 4, lastContact: 0 },
    { name: "Nancy B.", status: "Contacted", daysInPipeline: 3, lastContact: 2 },
  ]},
  { id: 3, name: "Zain Rodriguez", brand: "VRG", calls: 76, talkTime: 3.9, pipeline: 38, contacted: 34, gpvs: 4, csaClosed: 3, csaSent: 2, untouched: 4, score: 85, weekHistory: [70,74,78,82,85], gpvHistory: [2,3,3,3,4], leads: [
    { name: "Charles G.", status: "Docs Requested", daysInPipeline: 8, lastContact: 2 },
    { name: "Betty A.", status: "Contacted", daysInPipeline: 5, lastContact: 1 },
  ]},
  { id: 4, name: "Christopher Mark", brand: "DVC", calls: 72, talkTime: 3.7, pipeline: 35, contacted: 30, gpvs: 3, csaClosed: 3, csaSent: 0, untouched: 3, score: 82, weekHistory: [75,78,80,81,82], gpvHistory: [2,3,2,3,3], leads: [] },
  { id: 5, name: "Kristen Wilkinson", brand: "VAC", calls: 68, talkTime: 3.5, pipeline: 40, contacted: 34, gpvs: 3, csaClosed: 2, csaSent: 2, untouched: 5, score: 78, weekHistory: [72,74,76,77,78], gpvHistory: [2,2,3,3,3], leads: [] },
  { id: 6, name: "Lauren Jennings", brand: "AVC", calls: 61, talkTime: 3.2, pipeline: 36, contacted: 28, gpvs: 3, csaClosed: 2, csaSent: 1, untouched: 6, score: 72, weekHistory: [65,68,70,71,72], gpvHistory: [2,2,2,3,3], leads: [] },
  { id: 7, name: "Abby Miller", brand: "VOR", calls: 55, talkTime: 3.0, pipeline: 44, contacted: 32, gpvs: 2, csaClosed: 2, csaSent: 1, untouched: 8, score: 67, weekHistory: [60,62,64,66,67], gpvHistory: [1,2,2,2,2], leads: [] },
  { id: 8, name: "Angelique Padilla", brand: "VDR", calls: 52, talkTime: 2.9, pipeline: 38, contacted: 26, gpvs: 2, csaClosed: 1, csaSent: 2, untouched: 10, score: 62, weekHistory: [58,59,60,61,62], gpvHistory: [1,2,1,2,2], leads: [] },
  { id: 9, name: "Skylar High", brand: "VAC", calls: 50, talkTime: 2.8, pipeline: 42, contacted: 28, gpvs: 2, csaClosed: 1, csaSent: 2, untouched: 9, score: 60, weekHistory: [55,56,58,59,60], gpvHistory: [1,1,2,2,2], leads: [] },
  { id: 10, name: "Vanessa Zapata", brand: "VDA", calls: 48, talkTime: 2.7, pipeline: 35, contacted: 24, gpvs: 2, csaClosed: 1, csaSent: 1, untouched: 11, score: 57, weekHistory: [52,54,55,56,57], gpvHistory: [1,1,2,1,2], leads: [] },
  { id: 11, name: "Natalie Orr", brand: "DVC", calls: 44, talkTime: 2.5, pipeline: 40, contacted: 22, gpvs: 2, csaClosed: 1, csaSent: 2, untouched: 14, score: 52, weekHistory: [48,50,51,51,52], gpvHistory: [1,1,1,2,2], leads: [
    { name: "Gary N.", status: "Contacted", daysInPipeline: 9, lastContact: 4 },
    { name: "Sandra J.", status: "Docs Requested", daysInPipeline: 11, lastContact: 5 },
    { name: "Paul E.", status: "New Lead", daysInPipeline: 6, lastContact: 6 },
    { name: "Ruth C.", status: "New Lead", daysInPipeline: 4, lastContact: 4 },
  ]},
  { id: 12, name: "Daniel Martinez", brand: "VRG", calls: 42, talkTime: 2.4, pipeline: 45, contacted: 24, gpvs: 1, csaClosed: 1, csaSent: 1, untouched: 16, score: 49, weekHistory: [45,46,47,48,49], gpvHistory: [1,1,0,1,1], leads: [] },
  { id: 13, name: "Andrea Ozuna", brand: "AVC", calls: 40, talkTime: 2.2, pipeline: 38, contacted: 20, gpvs: 1, csaClosed: 0, csaSent: 2, untouched: 15, score: 46, weekHistory: [42,43,44,45,46], gpvHistory: [0,1,1,0,1], leads: [] },
  { id: 14, name: "Jose Morales", brand: "VOR", calls: 38, talkTime: 2.1, pipeline: 42, contacted: 18, gpvs: 1, csaClosed: 1, csaSent: 1, untouched: 20, score: 43, weekHistory: [40,41,42,42,43], gpvHistory: [0,1,0,1,1], leads: [] },
  { id: 15, name: "Victoria Ramsey", brand: "VAC", calls: 36, talkTime: 2.0, pipeline: 50, contacted: 20, gpvs: 1, csaClosed: 0, csaSent: 2, untouched: 22, score: 40, weekHistory: [38,39,40,40,40], gpvHistory: [0,0,1,1,1], leads: [] },
  { id: 16, name: "Drakar Payne", brand: "VDR", calls: 30, talkTime: 1.7, pipeline: 48, contacted: 14, gpvs: 1, csaClosed: 0, csaSent: 1, untouched: 28, score: 32, weekHistory: [30,31,32,32,32], gpvHistory: [0,0,1,0,1], leads: [
    { name: "Frank O.", status: "Contacted", daysInPipeline: 18, lastContact: 8 },
    { name: "Helen V.", status: "New Lead", daysInPipeline: 14, lastContact: 14 },
    { name: "Arthur W.", status: "New Lead", daysInPipeline: 12, lastContact: 12 },
    { name: "Marie D.", status: "Docs Requested", daysInPipeline: 22, lastContact: 10 },
  ]},
  { id: 17, name: "Patricia Seary", brand: "DVC", calls: 28, talkTime: 1.5, pipeline: 55, contacted: 12, gpvs: 0, csaClosed: 0, csaSent: 1, untouched: 35, score: 25, weekHistory: [28,27,26,25,25], gpvHistory: [0,0,0,1,0], leads: [] },
  { id: 18, name: "Edward Sanchez", brand: "VDA", calls: 24, talkTime: 1.3, pipeline: 52, contacted: 10, gpvs: 0, csaClosed: 0, csaSent: 1, untouched: 38, score: 20, weekHistory: [25,24,22,21,20], gpvHistory: [0,1,0,0,0], leads: [] },
  { id: 19, name: "Erik Burgin", brand: "AVC", calls: 18, talkTime: 1.0, pipeline: 60, contacted: 8, gpvs: 0, csaClosed: 0, csaSent: 0, untouched: 48, score: 12, weekHistory: [18,16,14,13,12], gpvHistory: [0,0,0,0,0], leads: [
    { name: "Wayne Z.", status: "New Lead", daysInPipeline: 21, lastContact: 21 },
    { name: "Carol B.", status: "New Lead", daysInPipeline: 18, lastContact: 18 },
    { name: "Eugene T.", status: "New Lead", daysInPipeline: 15, lastContact: 15 },
    { name: "Jean M.", status: "Contacted", daysInPipeline: 25, lastContact: 14 },
    { name: "Ralph S.", status: "New Lead", daysInPipeline: 10, lastContact: 10 },
  ]},
  { id: 20, name: "Christian Meza", brand: "VOR", calls: 14, talkTime: 0.8, pipeline: 58, contacted: 5, gpvs: 0, csaClosed: 0, csaSent: 1, untouched: 52, score: 8, weekHistory: [15,13,11,9,8], gpvHistory: [0,0,0,0,0], leads: [] },
  { id: 21, name: "Meredith Gaxiola", brand: "VDR", calls: 8, talkTime: 0.9, pipeline: 62, contacted: 4, gpvs: 0, csaClosed: 0, csaSent: 0, untouched: 135, score: 3, weekHistory: [12,10,8,5,3], gpvHistory: [0,0,0,0,0], leads: [
    { name: "Veteran #1-135", status: "New Lead", daysInPipeline: 30, lastContact: 30 },
    { name: "Veteran #2", status: "New Lead", daysInPipeline: 28, lastContact: 28 },
    { name: "Veteran #3", status: "New Lead", daysInPipeline: 25, lastContact: 25 },
    { name: "Veteran #4", status: "Contacted", daysInPipeline: 22, lastContact: 20 },
    { name: "Veteran #5", status: "Docs Requested", daysInPipeline: 35, lastContact: 18 },
  ]},
];

const MOCK_CMAS = [
  { id: 101, name: "Samantha Hernandez", assignedCM: "Cesar Sanchez", brand: "VDC", casesPrepped: 100, docFollowups: 14, newLeads: 9, preApptCalls: 6, fqcMonitored: 4, invoicesFollowed: 8, outboundCalls: 16, crmCurrent: true, score: 97, weekHistory: [92,94,95,96,97], morningPrepOnTime: true, tasks: [
    { task: "Prepped 48 cases for Cesar", time: "8:22 AM", status: "Complete" },
    { task: "Doc follow-up: Robert M. — DD-214 received", time: "9:45 AM", status: "Complete" },
    { task: "Re-engagement call: 3 inactive leads reactivated", time: "10:30 AM", status: "Complete" },
    { task: "Pre-appt update: James T. C&P exam tomorrow", time: "11:15 AM", status: "Complete" },
    { task: "FQC check: Patricia W. package complete", time: "1:30 PM", status: "Complete" },
  ]},
  { id: 102, name: "Grace Hanners", assignedCM: "Matthew Recce", brand: "VAC", casesPrepped: 100, docFollowups: 11, newLeads: 7, preApptCalls: 5, fqcMonitored: 3, invoicesFollowed: 6, outboundCalls: 14, crmCurrent: true, score: 90, weekHistory: [84,86,88,89,90], morningPrepOnTime: true, tasks: [
    { task: "Prepped 42 cases for Brianna", time: "8:18 AM", status: "Complete" },
    { task: "Doc follow-up: 4 pending RDLs contacted", time: "9:30 AM", status: "Complete" },
    { task: "New lead outreach: 7 re-engagement calls", time: "10:45 AM", status: "Complete" },
  ]},
  { id: 103, name: "Jessica Espinoza", assignedCM: "Zain Rodriguez", brand: "VRG", casesPrepped: 95, docFollowups: 10, newLeads: 5, preApptCalls: 4, fqcMonitored: 3, invoicesFollowed: 5, outboundCalls: 12, crmCurrent: true, score: 84, weekHistory: [78,80,81,83,84], morningPrepOnTime: true, tasks: [] },
  { id: 104, name: "Norma Villalobos", assignedCM: "Christopher Mark", brand: "DVC", casesPrepped: 92, docFollowups: 8, newLeads: 4, preApptCalls: 3, fqcMonitored: 2, invoicesFollowed: 4, outboundCalls: 11, crmCurrent: true, score: 79, weekHistory: [72,74,76,78,79], morningPrepOnTime: true, tasks: [] },
  { id: 105, name: "Brendan Steiner", assignedCM: "Kristen Wilkinson", brand: "VAC", casesPrepped: 90, docFollowups: 8, newLeads: 4, preApptCalls: 3, fqcMonitored: 2, invoicesFollowed: 4, outboundCalls: 10, crmCurrent: true, score: 76, weekHistory: [70,72,74,75,76], morningPrepOnTime: true, tasks: [] },
  { id: 106, name: "Destinie Jones", assignedCM: "Lauren Jennings", brand: "AVC", casesPrepped: 88, docFollowups: 7, newLeads: 3, preApptCalls: 2, fqcMonitored: 2, invoicesFollowed: 3, outboundCalls: 10, crmCurrent: true, score: 72, weekHistory: [66,68,70,71,72], morningPrepOnTime: true, tasks: [] },
  { id: 107, name: "Jesse Segura", assignedCM: "Abby Miller", brand: "VOR", casesPrepped: 85, docFollowups: 6, newLeads: 2, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 3, outboundCalls: 9, crmCurrent: true, score: 68, weekHistory: [62,64,65,67,68], morningPrepOnTime: false, tasks: [] },
  { id: 108, name: "Josue Heredia", assignedCM: "Angelique Padilla", brand: "VDR", casesPrepped: 80, docFollowups: 5, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 8, crmCurrent: false, score: 58, weekHistory: [55,56,57,57,58], morningPrepOnTime: false, tasks: [
    { task: "Case prep started late — 9:10 AM", time: "9:10 AM", status: "Late" },
    { task: "Doc follow-up: 3 of 8 pending contacted", time: "11:00 AM", status: "Incomplete" },
    { task: "CRM notes not updated from yesterday", time: "—", status: "Missing" },
  ]},
  { id: 109, name: "Joshua Warren", assignedCM: "Skylar High", brand: "VAC", casesPrepped: 78, docFollowups: 5, newLeads: 1, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 8, crmCurrent: false, score: 55, weekHistory: [52,53,54,54,55], morningPrepOnTime: false, tasks: [] },
  { id: 110, name: "Ashlynne Shafer", assignedCM: "Natalie Orr", brand: "DVC", casesPrepped: 72, docFollowups: 4, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 7, crmCurrent: false, score: 48, weekHistory: [45,46,47,47,48], morningPrepOnTime: false, tasks: [] },
  { id: 111, name: "Shannon Florez", assignedCM: "Andrea Ozuna", brand: "AVC", casesPrepped: 65, docFollowups: 3, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 6, crmCurrent: false, score: 38, weekHistory: [40,39,38,38,38], morningPrepOnTime: false, tasks: [
    { task: "Case prep: only 65% of cases prepped", time: "9:30 AM", status: "Incomplete" },
    { task: "Doc follow-up: 3 of 10 pending contacted", time: "11:30 AM", status: "Incomplete" },
    { task: "Zero new business leads generated", time: "—", status: "Missing" },
    { task: "CRM notes outdated on 8 cases", time: "—", status: "Missing" },
  ]},
  { id: 112, name: "Daeja Perez", assignedCM: "Drakar Payne", brand: "VDR", casesPrepped: 55, docFollowups: 2, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 4, crmCurrent: false, score: 28, weekHistory: [32,30,29,28,28], morningPrepOnTime: false, tasks: [] },
  { id: 113, name: "Garrett Schavier", assignedCM: "Meredith Gaxiola", brand: "VDR", casesPrepped: 40, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 3, crmCurrent: false, score: 15, weekHistory: [20,18,17,16,15], morningPrepOnTime: false, tasks: [
    { task: "Case prep: only 40% of cases prepped", time: "10:00 AM", status: "Late" },
    { task: "Doc follow-up: 1 of 15+ pending contacted", time: "11:00 AM", status: "Incomplete" },
    { task: "Zero new business leads generated", time: "—", status: "Missing" },
    { task: "Zero pre-appointment calls made", time: "—", status: "Missing" },
    { task: "CRM notes outdated on majority of cases", time: "—", status: "Missing" },
  ]},
];

const WEEKLY = [
  { day: "Mon", totalCalls: 612, totalGPVs: 6, avgTalkTime: 2.6 },
  { day: "Tue", totalCalls: 745, totalGPVs: 8, avgTalkTime: 2.9 },
  { day: "Wed", totalCalls: 698, totalGPVs: 5, avgTalkTime: 2.7 },
  { day: "Thu", totalCalls: 781, totalGPVs: 9, avgTalkTime: 3.1 },
  { day: "Fri", totalCalls: 587, totalGPVs: 7, avgTalkTime: 2.5 },
];

const BRANDS = ["All","VAC","VDC","VRG","DVC","VOR","AVC","VDR","VDA"];
const AVG_CONTRACT = 3500;

// Real speed-to-contact data from Chris's system (Jan 1 - May 15, 2026)
const STC_SUMMARY = { total: 6353, valid: 6018, missed: 333, onTime: 3128, late: 792, sigLate: 1639, early: 459 };
const STC_REPS = [
  { name: "Matthew Recce", total: 450, valid: 437, missed: 13, onTime: 183, onTimePct: 41.9, late: 83, sigLate: 125, missPct: 2.9 },
  { name: "Zain Rodriguez", total: 332, valid: 317, missed: 15, onTime: 227, onTimePct: 71.6, late: 33, sigLate: 49, missPct: 4.5 },
  { name: "Lauren Jennings", total: 317, valid: 305, missed: 12, onTime: 165, onTimePct: 54.1, late: 38, sigLate: 49, missPct: 3.8 },
  { name: "Angelique Padilla", total: 278, valid: 273, missed: 5, onTime: 123, onTimePct: 45.1, late: 60, sigLate: 63, missPct: 1.8 },
  { name: "Vanessa Zapata", total: 245, valid: 233, missed: 12, onTime: 132, onTimePct: 56.7, late: 31, sigLate: 43, missPct: 4.9 },
  { name: "Erik Burgin", total: 240, valid: 230, missed: 10, onTime: 66, onTimePct: 28.7, late: 27, sigLate: 101, missPct: 4.2 },
  { name: "Patricia Seary", total: 212, valid: 198, missed: 14, onTime: 44, onTimePct: 22.2, late: 31, sigLate: 103, missPct: 6.6 },
  { name: "Matthew Colwell", total: 190, valid: 188, missed: 2, onTime: 132, onTimePct: 70.2, late: 13, sigLate: 29, missPct: 1.1 },
  { name: "Kristen Wilkinson", total: 188, valid: 182, missed: 6, onTime: 149, onTimePct: 81.9, late: 7, sigLate: 23, missPct: 3.2 },
  { name: "Skylar High", total: 185, valid: 178, missed: 7, onTime: 104, onTimePct: 58.4, late: 39, sigLate: 33, missPct: 3.8 },
  { name: "Katia V. Rodríguez", total: 159, valid: 153, missed: 6, onTime: 85, onTimePct: 55.6, late: 26, sigLate: 34, missPct: 3.8 },
  { name: "Sierra Gonzalez", total: 155, valid: 143, missed: 12, onTime: 65, onTimePct: 45.5, late: 33, sigLate: 33, missPct: 7.7 },
  { name: "Kellie Thalhamer", total: 146, valid: 133, missed: 13, onTime: 108, onTimePct: 81.2, late: 4, sigLate: 20, missPct: 8.9 },
  { name: "Christian Meza", total: 145, valid: 141, missed: 4, onTime: 18, onTimePct: 12.8, late: 22, sigLate: 99, missPct: 2.8 },
  { name: "Abby Miller", total: 145, valid: 142, missed: 3, onTime: 104, onTimePct: 73.2, late: 9, sigLate: 29, missPct: 2.1 },
  { name: "Christopher Mark", total: 136, valid: 132, missed: 4, onTime: 112, onTimePct: 84.8, late: 4, sigLate: 16, missPct: 2.9 },
  { name: "Meredith Gaxiola", total: 121, valid: 111, missed: 10, onTime: 82, onTimePct: 73.9, late: 10, sigLate: 15, missPct: 8.3 },
  { name: "Drakar Payne", total: 117, valid: 106, missed: 11, onTime: 67, onTimePct: 63.2, late: 6, sigLate: 23, missPct: 9.4 },
  { name: "Edward Sanchez", total: 110, valid: 106, missed: 4, onTime: 33, onTimePct: 31.1, late: 6, sigLate: 27, missPct: 3.6 },
  { name: "Natalie Orr", total: 106, valid: 100, missed: 6, onTime: 46, onTimePct: 46.0, late: 29, sigLate: 25, missPct: 5.7 },
];

// Conversion funnel data per CM — full pipeline attribution
const CM_FUNNEL = [
  { cmId:1, name:"Cesar Sanchez", brand:"VDC", leadsAssigned:52, contacted:48, apptSet:32, pitchDelivered:28, csaSent:22, csaSigned:18, csaDeclined:3, csaNoShow:1, csaUnknown:0, gpvSubmitted:15, pitchVerified:true, avgDaysToClose:8 },
  { cmId:2, name:"Matthew Recce", brand:"VAC", leadsAssigned:48, contacted:42, apptSet:28, pitchDelivered:24, csaSent:18, csaSigned:14, csaDeclined:2, csaNoShow:2, csaUnknown:0, gpvSubmitted:12, pitchVerified:true, avgDaysToClose:10 },
  { cmId:3, name:"Zain Rodriguez", brand:"VRG", leadsAssigned:44, contacted:38, apptSet:24, pitchDelivered:20, csaSent:16, csaSigned:12, csaDeclined:2, csaNoShow:1, csaUnknown:1, gpvSubmitted:10, pitchVerified:true, avgDaysToClose:11 },
  { cmId:4, name:"Christopher Mark", brand:"DVC", leadsAssigned:40, contacted:35, apptSet:22, pitchDelivered:18, csaSent:14, csaSigned:11, csaDeclined:2, csaNoShow:1, csaUnknown:0, gpvSubmitted:9, pitchVerified:true, avgDaysToClose:12 },
  { cmId:5, name:"Kristen Wilkinson", brand:"VAC", leadsAssigned:45, contacted:38, apptSet:20, pitchDelivered:16, csaSent:14, csaSigned:10, csaDeclined:2, csaNoShow:1, csaUnknown:1, gpvSubmitted:8, pitchVerified:true, avgDaysToClose:13 },
  { cmId:6, name:"Lauren Jennings", brand:"AVC", leadsAssigned:42, contacted:32, apptSet:18, pitchDelivered:14, csaSent:12, csaSigned:9, csaDeclined:1, csaNoShow:1, csaUnknown:1, gpvSubmitted:7, pitchVerified:true, avgDaysToClose:14 },
  { cmId:7, name:"Abby Miller", brand:"VOR", leadsAssigned:50, contacted:36, apptSet:16, pitchDelivered:12, csaSent:10, csaSigned:7, csaDeclined:1, csaNoShow:1, csaUnknown:1, gpvSubmitted:5, pitchVerified:false, avgDaysToClose:16 },
  { cmId:8, name:"Angelique Padilla", brand:"VDR", leadsAssigned:44, contacted:30, apptSet:14, pitchDelivered:10, csaSent:8, csaSigned:5, csaDeclined:1, csaNoShow:1, csaUnknown:1, gpvSubmitted:4, pitchVerified:false, avgDaysToClose:18 },
  { cmId:9, name:"Skylar High", brand:"VAC", leadsAssigned:48, contacted:32, apptSet:14, pitchDelivered:10, csaSent:8, csaSigned:5, csaDeclined:1, csaNoShow:0, csaUnknown:2, gpvSubmitted:4, pitchVerified:false, avgDaysToClose:17 },
  { cmId:10, name:"Vanessa Zapata", brand:"VDA", leadsAssigned:40, contacted:28, apptSet:12, pitchDelivered:8, csaSent:6, csaSigned:4, csaDeclined:1, csaNoShow:0, csaUnknown:1, gpvSubmitted:3, pitchVerified:false, avgDaysToClose:19 },
  { cmId:11, name:"Natalie Orr", brand:"DVC", leadsAssigned:46, contacted:26, apptSet:12, pitchDelivered:8, csaSent:8, csaSigned:4, csaDeclined:1, csaNoShow:1, csaUnknown:2, gpvSubmitted:3, pitchVerified:false, avgDaysToClose:20 },
  { cmId:12, name:"Daniel Martinez", brand:"VRG", leadsAssigned:50, contacted:28, apptSet:10, pitchDelivered:6, csaSent:5, csaSigned:3, csaDeclined:1, csaNoShow:0, csaUnknown:1, gpvSubmitted:2, pitchVerified:false, avgDaysToClose:22 },
  { cmId:13, name:"Andrea Ozuna", brand:"AVC", leadsAssigned:44, contacted:24, apptSet:10, pitchDelivered:6, csaSent:6, csaSigned:2, csaDeclined:1, csaNoShow:1, csaUnknown:2, gpvSubmitted:1, pitchVerified:false, avgDaysToClose:24 },
  { cmId:14, name:"Jose Morales", brand:"VOR", leadsAssigned:48, contacted:22, apptSet:8, pitchDelivered:5, csaSent:4, csaSigned:2, csaDeclined:1, csaNoShow:0, csaUnknown:1, gpvSubmitted:1, pitchVerified:false, avgDaysToClose:25 },
  { cmId:15, name:"Victoria Ramsey", brand:"VAC", leadsAssigned:55, contacted:24, apptSet:8, pitchDelivered:4, csaSent:4, csaSigned:2, csaDeclined:0, csaNoShow:0, csaUnknown:2, gpvSubmitted:1, pitchVerified:false, avgDaysToClose:26 },
  { cmId:16, name:"Drakar Payne", brand:"VDR", leadsAssigned:52, contacted:18, apptSet:6, pitchDelivered:3, csaSent:3, csaSigned:1, csaDeclined:0, csaNoShow:1, csaUnknown:1, gpvSubmitted:1, pitchVerified:false, avgDaysToClose:28 },
  { cmId:17, name:"Patricia Seary", brand:"DVC", leadsAssigned:60, contacted:16, apptSet:4, pitchDelivered:2, csaSent:2, csaSigned:0, csaDeclined:1, csaNoShow:0, csaUnknown:1, gpvSubmitted:0, pitchVerified:false, avgDaysToClose:0 },
  { cmId:18, name:"Edward Sanchez", brand:"VDA", leadsAssigned:56, contacted:14, apptSet:4, pitchDelivered:2, csaSent:2, csaSigned:0, csaDeclined:0, csaNoShow:1, csaUnknown:1, gpvSubmitted:0, pitchVerified:false, avgDaysToClose:0 },
  { cmId:19, name:"Erik Burgin", brand:"AVC", leadsAssigned:65, contacted:10, apptSet:2, pitchDelivered:1, csaSent:1, csaSigned:0, csaDeclined:0, csaNoShow:0, csaUnknown:1, gpvSubmitted:0, pitchVerified:false, avgDaysToClose:0 },
  { cmId:20, name:"Christian Meza", brand:"VOR", leadsAssigned:62, contacted:8, apptSet:2, pitchDelivered:1, csaSent:1, csaSigned:0, csaDeclined:0, csaNoShow:1, csaUnknown:0, gpvSubmitted:0, pitchVerified:false, avgDaysToClose:0 },
  { cmId:21, name:"Meredith Gaxiola", brand:"VDR", leadsAssigned:68, contacted:6, apptSet:1, pitchDelivered:0, csaSent:0, csaSigned:0, csaDeclined:0, csaNoShow:0, csaUnknown:0, gpvSubmitted:0, pitchVerified:false, avgDaysToClose:0 },
];

function getStatus(score) {
  if (score >= 70) return { label: "GREEN", bg: "#dcfce7", text: "#166534", dot: "#22c55e" };
  if (score >= 40) return { label: "YELLOW", bg: "#fef9c3", text: "#854d0e", dot: "#eab308" };
  return { label: "RED", bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" };
}

function MiniBar({ value, max, color }) {
  return (
    <div style={{ width: "100%", height: 5, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${Math.min((value/max)*100,100)}%`, height: "100%", background: color, borderRadius: 3 }} />
    </div>
  );
}

function SparkLine({ data, color = "#3B7DD8", height = 32, width = 80 }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  const trending = data[data.length - 1] > data[0];
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg width={width} height={height} style={{ display: "block" }}>
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((v - min) / range) * (height - 4) - 2;
          return i === data.length - 1 ? <circle key={i} cx={x} cy={y} r="3" fill={color} /> : null;
        })}
      </svg>
      <span style={{ fontSize: 9, color: trending ? "#166534" : "#991b1b", fontWeight: 600, position: "absolute", right: -4, top: -2 }}>
        {trending ? "↑" : "↓"}
      </span>
    </div>
  );
}

function StatCard({ label, value, sub, icon, accent = "#3B7DD8" }) {
  return (
    <div style={{ background: "white", borderRadius: 10, padding: "14px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", flex: 1, minWidth: 140 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#1B2A4A" }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const [view, setView] = useState("cm");
  const [brand, setBrand] = useState("All");
  const [sortBy, setSortBy] = useState("score");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedCM, setSelectedCM] = useState(null);
  const [selectedCMA, setSelectedCMA] = useState(null);
  const [logEntries, setLogEntries] = useState([
    { id: 1, date: "2026-04-14", manager: "Tony Gonzalez", employee: "Meredith Gaxiola", brand: "VDR", type: "Stage 1 Coaching", trigger: "135 untouched leads, 8 calls/day, score 3", action: "Met 1-on-1. Discussed call volume and pipeline neglect. Agreed to 30 calls/day minimum for next week. Tony to check daily.", outcome: "pending", followUpDate: "2026-04-21", resolved: false },
    { id: 2, date: "2026-04-14", manager: "Tony Gonzalez", employee: "Erik Burgin", brand: "AVC", type: "Stage 1 Coaching", trigger: "48 untouched leads, 18 calls/day, score 12, declining trend", action: "Met 1-on-1. Chris cited personal issues. Agreed to 35 calls/day for 1 week with daily check-in. If no improvement, moves to Stage 2.", outcome: "pending", followUpDate: "2026-04-21", resolved: false },
    { id: 3, date: "2026-04-12", manager: "Tony Gonzalez", employee: "Christian Meza", brand: "VOR", type: "Stage 2 Formal Warning", trigger: "2 consecutive weeks red scorecard. 14 calls/day. Declining trend 5 weeks.", action: "Formal documented warning issued. Written improvement plan: 40 calls/day, contact all untouched leads within 48hrs. Daily activity review for 2 weeks.", outcome: "in_progress", followUpDate: "2026-04-26", resolved: false },
    { id: 4, date: "2026-04-10", manager: "Tony Gonzalez", employee: "Drakar Payne", brand: "VDR", type: "Stage 1 Coaching", trigger: "28 untouched leads, 30 calls/day, 0 CSAs closed on-call", action: "Discussed close-on-the-call methodology. Roleplay session scheduled for Friday. Brandon to shadow Cesar for 2 calls.", outcome: "in_progress", followUpDate: "2026-04-17", resolved: false },
    { id: 5, date: "2026-04-08", manager: "Tony Gonzalez", employee: "Patricia Seary", brand: "DVC", type: "Stage 1 Coaching", trigger: "35 untouched leads, 0 GPVs, declining trend", action: "Met 1-on-1. Samantha acknowledged low effort. Agreed to 40 calls/day and working untouched leads first each morning.", outcome: "no_change", followUpDate: "2026-04-15", resolved: false },
    { id: 6, date: "2026-04-05", manager: "Tony Gonzalez", employee: "Jose Morales", brand: "VOR", type: "Stage 1 Coaching", trigger: "20 untouched leads, score 43", action: "Quick check-in. Tina was aware of the gap. Committed to clearing untouched leads by end of week.", outcome: "improved", followUpDate: "2026-04-12", resolved: true },
    { id: 7, date: "2026-04-03", manager: "Tony Gonzalez", employee: "Natalie Orr", brand: "DVC", type: "Stage 1 Coaching", trigger: "14 untouched leads, 44 calls/day (below minimum), leads aging 4-6 days", action: "Discussed pipeline management. Jordan to prioritize aging leads in morning power block.", outcome: "improved", followUpDate: "2026-04-10", resolved: true },
    { id: 8, date: "2026-04-01", manager: "Tony Gonzalez", employee: "Andrea Ozuna", brand: "AVC", type: "Stage 1 Coaching", trigger: "15 untouched leads, 0 CSAs closed on-call", action: "Close-on-call training session. Derek committed to attempting live close on every pitch.", outcome: "improved", followUpDate: "2026-04-08", resolved: true },
  ]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [newLog, setNewLog] = useState({ manager: "", employee: "", brand: "", type: "Stage 1 Coaching", trigger: "", action: "", followUpDate: "" });

  const filteredCMs = useMemo(() => {
    let data = [...MOCK_CMS];
    if (brand !== "All") data = data.filter(cm => cm.brand === brand);
    data.sort((a, b) => sortDir === "desc" ? (typeof a[sortBy] === "string" ? b[sortBy].localeCompare(a[sortBy]) : b[sortBy] - a[sortBy]) : (typeof a[sortBy] === "string" ? a[sortBy].localeCompare(b[sortBy]) : a[sortBy] - b[sortBy]));
    return data;
  }, [brand, sortBy, sortDir]);

  const totals = useMemo(() => {
    const cms = brand === "All" ? MOCK_CMS : MOCK_CMS.filter(c => c.brand === brand);
    const tCSA = cms.reduce((s, c) => s + c.csaClosed + c.csaSent, 0);
    return {
      totalCalls: cms.reduce((s, c) => s + c.calls, 0),
      avgCalls: cms.length ? Math.round(cms.reduce((s, c) => s + c.calls, 0) / cms.length) : 0,
      totalGPVs: cms.reduce((s, c) => s + c.gpvs, 0),
      avgTalkTime: cms.length ? (cms.reduce((s, c) => s + c.talkTime, 0) / cms.length).toFixed(1) : 0,
      totalUntouched: cms.reduce((s, c) => s + c.untouched, 0),
      redCount: cms.filter(c => c.score < 40).length,
      yellowCount: cms.filter(c => c.score >= 40 && c.score < 70).length,
      greenCount: cms.filter(c => c.score >= 70).length,
      cmCount: cms.length,
      closeRate: tCSA > 0 ? Math.round((cms.reduce((s, c) => s + c.csaClosed, 0) / tCSA) * 100) : 0,
    };
  }, [brand]);

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  const Arrow = ({ col }) => sortBy !== col ? <span style={{ opacity: 0.3, fontSize: 9 }}>↕</span> : <span style={{ fontSize: 9 }}>{sortDir === "desc" ? "↓" : "↑"}</span>;

  // Revenue impact
  const revenueImpact = useMemo(() => {
    const cms = brand === "All" ? MOCK_CMS : MOCK_CMS.filter(c => c.brand === brand);
    const untouched = cms.reduce((s, c) => s + c.untouched, 0);
    const belowMin = cms.filter(c => c.calls < 50);
    const missedCalls = belowMin.reduce((s, c) => s + (50 - c.calls), 0);
    const estConvRate = 0.08;
    const untouchedRev = Math.round(untouched * estConvRate * AVG_CONTRACT);
    const callGapRev = Math.round(missedCalls * 0.03 * AVG_CONTRACT);
    const noCloseOnCall = cms.filter(c => c.csaSent > c.csaClosed);
    const csaLeakRev = Math.round(noCloseOnCall.reduce((s,c) => s + c.csaSent, 0) * 0.4 * AVG_CONTRACT);
    return { untouched, untouchedRev, missedCalls, callGapRev, noCloseCount: noCloseOnCall.length, csaLeakRev, total: untouchedRev + callGapRev + csaLeakRev };
  }, [brand]);

  const filteredCMAs = useMemo(() => {
    let data = [...MOCK_CMAS];
    if (brand !== "All") data = data.filter(c => c.brand === brand);
    data.sort((a, b) => b.score - a.score);
    return data;
  }, [brand]);

  // CMA Detail modal
  const CMADetailCard = ({ cma, onClose }) => {
    const st = getStatus(cma.score);
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={onClose}>
        <div style={{ background: "white", borderRadius: 16, maxWidth: 640, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
          <div style={{ padding: "20px 24px", background: "linear-gradient(135deg, #2D8B4E, #1a6b35)", color: "white", borderRadius: "16px 16px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{cma.name}</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>CMA — Supports: {cma.assignedCM} | Brand: {cma.brand} | Score: {cma.score}</div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16, fontFamily: "inherit" }}>✕</button>
          </div>
          <div style={{ padding: "20px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Cases Prepped", value: `${cma.casesPrepped}%`, color: cma.casesPrepped >= 95 ? "#22c55e" : cma.casesPrepped >= 80 ? "#eab308" : "#ef4444" },
                { label: "Doc Follow-ups", value: cma.docFollowups, color: cma.docFollowups >= 8 ? "#22c55e" : cma.docFollowups >= 5 ? "#eab308" : "#ef4444" },
                { label: "New Leads Gen", value: cma.newLeads, color: cma.newLeads >= 5 ? "#22c55e" : cma.newLeads >= 2 ? "#eab308" : "#ef4444" },
                { label: "Pre-Appt Calls", value: cma.preApptCalls, color: cma.preApptCalls >= 3 ? "#22c55e" : cma.preApptCalls >= 1 ? "#eab308" : "#ef4444" },
                { label: "FQC Monitored", value: cma.fqcMonitored, color: cma.fqcMonitored >= 2 ? "#22c55e" : cma.fqcMonitored >= 1 ? "#eab308" : "#ef4444" },
                { label: "Outbound Calls", value: cma.outboundCalls, color: cma.outboundCalls >= 10 ? "#22c55e" : cma.outboundCalls >= 7 ? "#eab308" : "#ef4444" },
              ].map(kpi => (
                <div key={kpi.label} style={{ padding: 10, borderRadius: 8, border: `2px solid ${kpi.color}20`, background: `${kpi.color}08` }}>
                  <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>{kpi.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1B2A4A" }}>{kpi.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, padding: 10, borderRadius: 8, background: cma.morningPrepOnTime ? "#dcfce7" : "#fee2e2", border: `1px solid ${cma.morningPrepOnTime ? "#bbf7d0" : "#fca5a5"}` }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Morning Prep</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: cma.morningPrepOnTime ? "#166534" : "#991b1b" }}>{cma.morningPrepOnTime ? "✅ On Time" : "❌ Late"}</div>
              </div>
              <div style={{ flex: 1, padding: 10, borderRadius: 8, background: cma.crmCurrent ? "#dcfce7" : "#fee2e2", border: `1px solid ${cma.crmCurrent ? "#bbf7d0" : "#fca5a5"}` }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>CRM Current</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: cma.crmCurrent ? "#166534" : "#991b1b" }}>{cma.crmCurrent ? "✅ Yes" : "❌ No"}</div>
              </div>
              <div style={{ flex: 1, padding: 10, borderRadius: 8, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Invoices</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1B2A4A" }}>{cma.invoicesFollowed} followed</div>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Score Trend (5 weeks)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <SparkLine data={cma.weekHistory} color={st.dot} width={120} height={36} />
                <div style={{ fontSize: 11, color: "#6b7280" }}>
                  {cma.weekHistory.map((v,i) => <span key={i} style={{ marginRight: 6 }}>W{i+1}: {v}</span>)}
                </div>
              </div>
            </div>
            {cma.tasks && cma.tasks.length > 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A", marginBottom: 6 }}>Today's Activity Log</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Task", "Time", "Status"].map(h => (
                        <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#6b7280", borderBottom: "1px solid #e5e7eb", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cma.tasks.map((t, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "6px 8px", fontWeight: 500 }}>{t.task}</td>
                        <td style={{ padding: "6px 8px", color: "#6b7280" }}>{t.time}</td>
                        <td style={{ padding: "6px 8px" }}>
                          <span style={{
                            padding: "1px 6px", borderRadius: 8, fontSize: 9, fontWeight: 700,
                            background: t.status === "Complete" ? "#dcfce7" : t.status === "Late" ? "#fef9c3" : t.status === "Incomplete" ? "#fef9c3" : "#fee2e2",
                            color: t.status === "Complete" ? "#166534" : t.status === "Late" ? "#854d0e" : t.status === "Incomplete" ? "#854d0e" : "#991b1b",
                          }}>{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // CM Detail modal
  const DetailCard = ({ cm, onClose }) => {
    const st = getStatus(cm.score);
    const pipelinePct = Math.round((cm.contacted / cm.pipeline) * 100);
    const closeRate = (cm.csaClosed + cm.csaSent) > 0 ? Math.round((cm.csaClosed / (cm.csaClosed + cm.csaSent)) * 100) : 0;
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={onClose}>
        <div style={{ background: "white", borderRadius: 16, maxWidth: 700, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div style={{ padding: "20px 24px", background: "linear-gradient(135deg, #1B2A4A, #2C3E6B)", color: "white", borderRadius: "16px 16px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{cm.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>Brand: {cm.brand} | Score: {cm.score} | Status: {st.label}</div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16, fontFamily: "inherit" }}>✕</button>
          </div>

          <div style={{ padding: "20px 24px" }}>
            {/* KPI Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Calls Today", value: cm.calls, target: "50+", color: cm.calls >= 50 ? "#22c55e" : cm.calls >= 35 ? "#eab308" : "#ef4444" },
                { label: "Talk Time", value: `${cm.talkTime}h`, target: "3h+", color: cm.talkTime >= 3 ? "#22c55e" : cm.talkTime >= 2 ? "#eab308" : "#ef4444" },
                { label: "Pipeline %", value: `${pipelinePct}%`, target: "80%+", color: pipelinePct >= 80 ? "#22c55e" : pipelinePct >= 60 ? "#eab308" : "#ef4444" },
                { label: "Close Rate", value: `${closeRate}%`, target: "80%+", color: closeRate >= 80 ? "#22c55e" : closeRate >= 60 ? "#eab308" : "#ef4444" },
              ].map(kpi => (
                <div key={kpi.label} style={{ padding: 12, borderRadius: 10, border: `2px solid ${kpi.color}20`, background: `${kpi.color}08` }}>
                  <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{kpi.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#1B2A4A" }}>{kpi.value}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>Target: {kpi.target}</div>
                  <div style={{ width: "100%", height: 4, background: "#f3f4f6", borderRadius: 2, marginTop: 6 }}>
                    <div style={{ width: `${Math.min(100, parseInt(kpi.value) / parseInt(kpi.target) * 100)}%`, height: "100%", background: kpi.color, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
              <div style={{ padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>GPVs Today</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: cm.gpvs > 0 ? "#2D8B4E" : "#991b1b" }}>{cm.gpvs}</div>
              </div>
              <div style={{ padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>CSA On-Call</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#1B2A4A" }}>{cm.csaClosed}<span style={{ fontSize: 14, color: "#9ca3af" }}>/{cm.csaClosed + cm.csaSent}</span></div>
              </div>
              <div style={{ padding: 12, borderRadius: 10, background: cm.untouched > 20 ? "#fee2e2" : "#f8fafc", border: `1px solid ${cm.untouched > 20 ? "#fca5a5" : "#e5e7eb"}` }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Untouched</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: cm.untouched > 20 ? "#991b1b" : "#1B2A4A" }}>{cm.untouched}</div>
              </div>
            </div>

            {/* Trends */}
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1, padding: 14, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Score Trend (5 weeks)</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <SparkLine data={cm.weekHistory} color={st.dot} width={120} height={40} />
                  <div style={{ fontSize: 11, color: "#6b7280" }}>
                    {cm.weekHistory.map((v,i) => <span key={i} style={{ marginRight: 6 }}>W{i+1}: {v}</span>)}
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, padding: 14, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>GPV Trend (5 weeks)</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <SparkLine data={cm.gpvHistory} color="#2D8B4E" width={120} height={40} />
                  <div style={{ fontSize: 11, color: "#6b7280" }}>
                    {cm.gpvHistory.map((v,i) => <span key={i} style={{ marginRight: 6 }}>W{i+1}: {v}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Pipeline Leads */}
            {cm.leads && cm.leads.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>Pipeline Sample ({cm.leads.length} shown)</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Veteran", "Status", "Days in Pipeline", "Days Since Contact", "Risk"].map(h => (
                        <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#6b7280", borderBottom: "1px solid #e5e7eb", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cm.leads.map((lead, i) => {
                      const risk = lead.lastContact > 5 ? "HIGH" : lead.lastContact > 2 ? "MED" : "LOW";
                      const riskColor = risk === "HIGH" ? "#991b1b" : risk === "MED" ? "#854d0e" : "#166534";
                      const riskBg = risk === "HIGH" ? "#fee2e2" : risk === "MED" ? "#fef9c3" : "#dcfce7";
                      return (
                        <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                          <td style={{ padding: "8px 10px", fontWeight: 500 }}>{lead.name}</td>
                          <td style={{ padding: "8px 10px" }}>
                            <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 500, background: "#f3f4f6" }}>{lead.status}</span>
                          </td>
                          <td style={{ padding: "8px 10px" }}>{lead.daysInPipeline}d</td>
                          <td style={{ padding: "8px 10px", fontWeight: 600, color: lead.lastContact > 5 ? "#991b1b" : lead.lastContact > 2 ? "#854d0e" : "#166534" }}>
                            {lead.lastContact === 0 ? "Today" : `${lead.lastContact}d ago`}
                          </td>
                          <td style={{ padding: "8px 10px" }}>
                            <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: riskBg, color: riskColor }}>{risk}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {selectedCM && <DetailCard cm={selectedCM} onClose={() => setSelectedCM(null)} />}
      {selectedCMA && <CMADetailCard cma={selectedCMA} onClose={() => setSelectedCMA(null)} />}

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)", padding: "16px 24px", color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>GlobalTekMed Performance Dashboard</div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 1 }}>Real-Time CM &amp; CMA Accountability | Click any CM name for full detail</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ padding: "3px 8px", background: "rgba(239,68,68,0.25)", borderRadius: 4, fontSize: 10, fontWeight: 600, color: "#fca5a5" }}>SAMPLE</div>
            <div style={{ padding: "3px 10px", background: "rgba(255,255,255,0.12)", borderRadius: 4, fontSize: 11 }}>Apr 6, 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 12, alignItems: "center", flexWrap: "wrap" }}>
          {/* Primary tabs */}
          {[
            { key: "cm", label: "📞 CM Tracker" },
            { key: "cma", label: "📋 CMA Tracker" },
            { key: "alerts", label: "🚨 Alerts" },
            { key: "log", label: "📝 Accountability Log" },
          ].map(tab => (
            <button key={tab.key} onClick={() => setView(tab.key)} style={{
              padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 600, fontFamily: "inherit",
              background: view === tab.key ? "white" : "rgba(255,255,255,0.1)",
              color: view === tab.key ? "#1B2A4A" : "rgba(255,255,255,0.7)",
            }}>{tab.label}</button>
          ))}

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", margin: "0 2px" }} />

          {/* Secondary tabs */}
          {[
            { key: "funnel", label: "🔄 Conversion" },
            { key: "speed", label: "⏱ Speed" },
            { key: "revenue", label: "💰 Revenue" },
            { key: "brands", label: "🏢 Brands" },
            { key: "trends", label: "📊 Trends" },
          ].map(tab => (
            <button key={tab.key} onClick={() => setView(tab.key)} style={{
              padding: "6px 10px", borderRadius: 6, border: "none", cursor: "pointer",
              fontSize: 10, fontWeight: 500, fontFamily: "inherit",
              background: view === tab.key ? "white" : "rgba(255,255,255,0.06)",
              color: view === tab.key ? "#1B2A4A" : "rgba(255,255,255,0.5)",
            }}>{tab.label}</button>
          ))}

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", margin: "0 2px" }} />

          {/* Consultant Data - separated */}
          <button onClick={() => {
            if (view === "corp") { setView("cm"); return; }
            const pw = prompt("Enter consultant access code:");
            if (pw === "gtm2026") setView("corp");
            else if (pw !== null) alert("Incorrect code.");
          }} style={{
            padding: "6px 12px", borderRadius: 6, border: "1px solid",
            cursor: "pointer", fontSize: 10, fontWeight: 600, fontFamily: "inherit",
            background: view === "corp" ? "#ef4444" : "rgba(255,255,255,0.06)",
            borderColor: view === "corp" ? "#ef4444" : "rgba(255,255,255,0.2)",
            color: view === "corp" ? "white" : "rgba(255,255,255,0.5)",
          }}>🔒 Consultant</button>
        </div>
      </div>

      <div style={{ padding: "16px 24px", maxWidth: 1280 }}>
        {/* Brand filter */}
        <div style={{ display: "flex", gap: 3, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, marginRight: 4 }}>BRAND:</span>
          {BRANDS.map(b => (
            <button key={b} onClick={() => setBrand(b)} style={{
              padding: "3px 10px", borderRadius: 16, border: "1px solid", fontSize: 10, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              borderColor: brand === b ? "#3B7DD8" : "#e5e7eb",
              background: brand === b ? "#3B7DD8" : "white",
              color: brand === b ? "white" : "#6b7280",
            }}>{b}</button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <StatCard label="CMs" value={totals.cmCount} sub={`${totals.greenCount}G / ${totals.yellowCount}Y / ${totals.redCount}R`} icon="👥" />
          <StatCard label="Avg Calls" value={totals.avgCalls} sub={`Target: 50+ | Total: ${totals.totalCalls}`} icon="📞" accent="#3B7DD8" />
          <StatCard label="Talk Time" value={`${totals.avgTalkTime}h`} sub="Target: 3+" icon="⏱" accent="#6C3FA0" />
          <StatCard label="GPVs" value={totals.totalGPVs} icon="📦" accent="#2D8B4E" />
          <StatCard label="Close Rate" value={`${totals.closeRate}%`} sub="Target: 80%+" icon="✅" accent="#D4860B" />
          <StatCard label="Untouched" value={totals.totalUntouched} sub="⚠️ Immediate action" icon="🚨" accent="#C0392B" />
        </div>

        {/* Status pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {[
            { c: totals.greenCount, l: "Green", bg: "#dcfce7", tc: "#166534", d: "#22c55e" },
            { c: totals.yellowCount, l: "Yellow", bg: "#fef9c3", tc: "#854d0e", d: "#eab308" },
            { c: totals.redCount, l: "Red", bg: "#fee2e2", tc: "#991b1b", d: "#ef4444" },
          ].map(s => (
            <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: s.bg, borderRadius: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.d }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: s.tc }}>{s.c} {s.l}</span>
            </div>
          ))}
        </div>

        {/* ═══ CM TABLE ═══ */}
        {view === "cm" && (
          <div style={{ background: "white", borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>CM Daily Performance — {brand === "All" ? "All Brands" : brand} ({filteredCMs.length} CMs)</span>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>Click a name for detail view</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {[
                      { key: "name", l: "CM Name" },{ key: "brand", l: "Brand" },
                      { key: "calls", l: "Calls" },{ key: "talkTime", l: "Talk" },
                      { key: "contacted", l: "Pipeline" },{ key: "gpvs", l: "GPVs" },
                      { key: "csaClosed", l: "CSA Close" },{ key: "untouched", l: "Untouched" },
                      { key: "score", l: "Trend" },{ key: "score2", l: "Score" },
                    ].map(col => (
                      <th key={col.key} onClick={() => col.key !== "score" && col.key !== "score2" ? handleSort(col.key) : col.key === "score2" ? handleSort("score") : null} style={{
                        padding: "8px 8px", textAlign: "left", fontSize: 9, fontWeight: 600,
                        color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.4,
                        cursor: "pointer", borderBottom: "2px solid #e5e7eb", userSelect: "none", whiteSpace: "nowrap",
                      }}>
                        {col.l} {col.key !== "score" && <Arrow col={col.key === "score2" ? "score" : col.key} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCMs.map((cm, i) => {
                    const st = getStatus(cm.score);
                    const pp = Math.round((cm.contacted / cm.pipeline) * 100);
                    return (
                      <tr key={cm.id} style={{ borderBottom: "1px solid #f3f4f6", background: cm.score < 20 ? "#fff5f5" : i % 2 === 1 ? "#fafbfc" : "white", cursor: "pointer" }} onClick={() => setSelectedCM(cm)}>
                        <td style={{ padding: "8px 8px", fontWeight: 600, color: "#3B7DD8", whiteSpace: "nowrap", textDecoration: "underline", textDecorationColor: "#3B7DD830" }}>{cm.name}</td>
                        <td style={{ padding: "8px 8px" }}><span style={{ padding: "1px 6px", background: "#f3f4f6", borderRadius: 3, fontSize: 10 }}>{cm.brand}</span></td>
                        <td style={{ padding: "8px 8px" }}>
                          <div style={{ fontWeight: 600, color: cm.calls >= 50 ? "#166534" : cm.calls >= 35 ? "#854d0e" : "#991b1b", marginBottom: 2 }}>{cm.calls}</div>
                          <MiniBar value={cm.calls} max={100} color={cm.calls >= 50 ? "#22c55e" : cm.calls >= 35 ? "#eab308" : "#ef4444"} />
                        </td>
                        <td style={{ padding: "8px 8px", fontWeight: 500, color: cm.talkTime >= 3 ? "#166534" : cm.talkTime >= 2 ? "#854d0e" : "#991b1b" }}>{cm.talkTime}h</td>
                        <td style={{ padding: "8px 8px" }}>
                          <div style={{ fontWeight: 500, color: pp >= 80 ? "#166534" : pp >= 60 ? "#854d0e" : "#991b1b", marginBottom: 2 }}>{pp}%</div>
                          <MiniBar value={pp} max={100} color={pp >= 80 ? "#22c55e" : pp >= 60 ? "#eab308" : "#ef4444"} />
                        </td>
                        <td style={{ padding: "8px 8px", fontSize: 14, fontWeight: 700, color: cm.gpvs > 0 ? "#1B2A4A" : "#991b1b" }}>{cm.gpvs}</td>
                        <td style={{ padding: "8px 8px", fontWeight: 500, color: cm.csaClosed > 0 ? "#166534" : "#991b1b" }}>{cm.csaClosed}/{cm.csaClosed + cm.csaSent}</td>
                        <td style={{ padding: "8px 8px" }}>
                          <span style={{ padding: "1px 6px", borderRadius: 3, fontSize: 10, fontWeight: 600, background: cm.untouched > 30 ? "#fee2e2" : cm.untouched > 10 ? "#fef9c3" : "#dcfce7", color: cm.untouched > 30 ? "#991b1b" : cm.untouched > 10 ? "#854d0e" : "#166534" }}>{cm.untouched}</span>
                        </td>
                        <td style={{ padding: "8px 8px" }}><SparkLine data={cm.weekHistory} color={st.dot} width={60} height={24} /></td>
                        <td style={{ padding: "8px 8px" }}>
                          <span style={{ padding: "2px 8px", borderRadius: 16, fontSize: 10, fontWeight: 700, background: st.bg, color: st.text }}>{cm.score}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ ALERTS ═══ */}

        {/* ═══ CMA TABLE ═══ */}
        {view === "cma" && (
          <div style={{ background: "white", borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>📋 CMA Daily Performance — {brand === "All" ? "All Brands" : brand} ({filteredCMAs.length} CMAs)</span>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>Click a name for detail view</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["CMA Name", "Assigned CM", "Brand", "Cases Prepped", "Doc F/U", "New Leads", "Pre-Appt", "FQC", "Calls", "CRM ✓", "AM Prep", "Trend", "Score"].map(h => (
                      <th key={h} style={{
                        padding: "8px 7px", textAlign: "left", fontSize: 9, fontWeight: 600,
                        color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.3,
                        borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCMAs.map((cma, i) => {
                    const st = getStatus(cma.score);
                    return (
                      <tr key={cma.id} style={{ borderBottom: "1px solid #f3f4f6", background: cma.score < 30 ? "#fff5f5" : i % 2 === 1 ? "#fafbfc" : "white", cursor: "pointer" }} onClick={() => setSelectedCMA(cma)}>
                        <td style={{ padding: "8px 7px", fontWeight: 600, color: "#2D8B4E", whiteSpace: "nowrap", textDecoration: "underline", textDecorationColor: "#2D8B4E30" }}>{cma.name}</td>
                        <td style={{ padding: "8px 7px", fontSize: 10, color: "#6b7280" }}>{cma.assignedCM}</td>
                        <td style={{ padding: "8px 7px" }}><span style={{ padding: "1px 6px", background: "#f3f4f6", borderRadius: 3, fontSize: 10 }}>{cma.brand}</span></td>
                        <td style={{ padding: "8px 7px" }}>
                          <div style={{ fontWeight: 600, color: cma.casesPrepped >= 95 ? "#166534" : cma.casesPrepped >= 80 ? "#854d0e" : "#991b1b", marginBottom: 2 }}>{cma.casesPrepped}%</div>
                          <MiniBar value={cma.casesPrepped} max={100} color={cma.casesPrepped >= 95 ? "#22c55e" : cma.casesPrepped >= 80 ? "#eab308" : "#ef4444"} />
                        </td>
                        <td style={{ padding: "8px 7px", fontWeight: 500, color: cma.docFollowups >= 8 ? "#166534" : cma.docFollowups >= 5 ? "#854d0e" : "#991b1b" }}>{cma.docFollowups}</td>
                        <td style={{ padding: "8px 7px", fontWeight: 500, color: cma.newLeads >= 5 ? "#166534" : cma.newLeads >= 2 ? "#854d0e" : "#991b1b" }}>{cma.newLeads}</td>
                        <td style={{ padding: "8px 7px", fontWeight: 500 }}>{cma.preApptCalls}</td>
                        <td style={{ padding: "8px 7px", fontWeight: 500 }}>{cma.fqcMonitored}</td>
                        <td style={{ padding: "8px 7px" }}>
                          <span style={{ fontWeight: 600, color: cma.outboundCalls >= 10 ? "#166534" : cma.outboundCalls >= 7 ? "#854d0e" : "#991b1b" }}>{cma.outboundCalls}</span>
                        </td>
                        <td style={{ padding: "8px 7px", fontSize: 14 }}>{cma.crmCurrent ? "✅" : "❌"}</td>
                        <td style={{ padding: "8px 7px", fontSize: 14 }}>{cma.morningPrepOnTime ? "✅" : "❌"}</td>
                        <td style={{ padding: "8px 7px" }}><SparkLine data={cma.weekHistory} color={st.dot} width={50} height={20} /></td>
                        <td style={{ padding: "8px 7px" }}>
                          <span style={{ padding: "2px 8px", borderRadius: 16, fontSize: 10, fontWeight: 700, background: st.bg, color: st.text }}>{cma.score}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "10px 16px", background: "#f8fafc", borderTop: "1px solid #e5e7eb", fontSize: 10, color: "#6b7280" }}>
              Showing {filteredCMAs.length} CMAs | Green = CMA enabling CM success | Red = CMA contributing to CM underperformance
            </div>
          </div>
        )}

        {/* ═══ SPEED-TO-CONTACT ═══ */}
        {view === "speed" && (() => {
          const s = STC_SUMMARY;
          const onTimePct = Math.round(s.onTime / s.valid * 100);
          const latePct = Math.round(s.late / s.valid * 100);
          const sigLatePct = Math.round(s.sigLate / s.valid * 100);
          const earlyPct = Math.round(s.early / s.valid * 100);
          const missPct = Math.round(s.missed / s.total * 100);
          const notOnTimePct = 100 - onTimePct;

          const cats = [
            { label: "On Time (≤5 min)", count: s.onTime, pct: onTimePct, color: "#22c55e", bg: "#dcfce7" },
            { label: "Early (5+ min before)", count: s.early, pct: earlyPct, color: "#3B7DD8", bg: "#E8F0FE" },
            { label: "Late (1-15 min)", count: s.late, pct: latePct, color: "#eab308", bg: "#fef9c3" },
            { label: "Significantly Late (15+ min)", count: s.sigLate, pct: sigLatePct, color: "#ef4444", bg: "#fee2e2" },
            { label: "Missed Entirely", count: s.missed, pct: missPct, color: "#1B2A4A", bg: "#f3f4f6" },
          ];

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Header Stats */}
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, padding: 16, borderRadius: 10, background: "linear-gradient(135deg, #7f1d1d, #991b1b)", color: "white", textAlign: "center" }}>
                  <div style={{ fontSize: 9, opacity: 0.7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Calls NOT On Time</div>
                  <div style={{ fontSize: 36, fontWeight: 700, marginTop: 4 }}>{notOnTimePct}%</div>
                  <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{(s.valid - s.onTime).toLocaleString()} of {s.valid.toLocaleString()} calls</div>
                </div>
                <div style={{ flex: 1, padding: 16, borderRadius: 10, background: "#dcfce7", border: "1px solid #bbf7d0", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#166534", fontWeight: 600, textTransform: "uppercase" }}>On Time Rate</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: "#166534", marginTop: 4 }}>{onTimePct}%</div>
                  <div style={{ fontSize: 10, color: "#166534", marginTop: 2 }}>{s.onTime.toLocaleString()} calls within 5 min</div>
                </div>
                <div style={{ flex: 1, padding: 16, borderRadius: 10, background: "#fee2e2", border: "1px solid #fca5a5", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#991b1b", fontWeight: 600, textTransform: "uppercase" }}>15+ Min Late</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: "#991b1b", marginTop: 4 }}>{s.sigLate.toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>{sigLatePct}% of all calls</div>
                </div>
                <div style={{ flex: 1, padding: 16, borderRadius: 10, background: "#1B2A4A", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#fca5a5", fontWeight: 600, textTransform: "uppercase" }}>Missed Entirely</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: "white", marginTop: 4 }}>{s.missed}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{missPct}% — no call made</div>
                </div>
              </div>

              {/* Visual distribution bar */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>⏱ Call Timing Distribution — {s.total.toLocaleString()} Appointments (Jan 1 – May 15, 2026)</div>
                <div style={{ display: "flex", height: 40, borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
                  {cats.map(c => c.pct > 0 ? (
                    <div key={c.label} style={{ width: `${c.count/s.total*100}%`, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", minWidth: c.pct > 5 ? 0 : 30 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>{c.pct}%</span>
                    </div>
                  ) : null)}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {cats.map(c => (
                    <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color }} />
                      <span style={{ fontSize: 10, color: "#6b7280" }}>{c.label}: <b style={{ color: "#1B2A4A" }}>{c.count.toLocaleString()}</b> ({c.pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout */}
              <div style={{ padding: "12px 16px", background: "#fee2e2", borderRadius: 8, borderLeft: "4px solid #ef4444" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#991b1b" }}>The system is tracking. Nobody is acting.</div>
                <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>Chris's speed-to-contact system has been capturing this data since January. {notOnTimePct}% of calls are going out late or being missed entirely across {s.total.toLocaleString()} appointments. The tool works. The accountability around it doesn't.</div>
              </div>

              {/* Per-Rep Table */}
              <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>Per-Rep Speed-to-Contact Breakdown — Top 20 by Volume</span>
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>Real data from Chris's system</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["Rep Name", "Total Appts", "On Time", "On Time %", "Late (1-15m)", "Late (15m+)", "Missed", "Miss %", "Status"].map(h => (
                          <th key={h} style={{ padding: "8px 8px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {STC_REPS.map((r, i) => {
                        const st = r.onTimePct >= 70 ? { label: "GOOD", bg: "#dcfce7", tc: "#166534" } : r.onTimePct >= 50 ? { label: "NEEDS WORK", bg: "#fef9c3", tc: "#854d0e" } : { label: "CRITICAL", bg: "#fee2e2", tc: "#991b1b" };
                        return (
                          <tr key={r.name} style={{ borderBottom: "1px solid #f3f4f6", background: r.onTimePct < 30 ? "#fff5f5" : i % 2 === 1 ? "#fafbfc" : "white" }}>
                            <td style={{ padding: "8px 8px", fontWeight: 600, color: "#1B2A4A", whiteSpace: "nowrap" }}>{r.name}</td>
                            <td style={{ padding: "8px 8px", fontWeight: 500 }}>{r.total}</td>
                            <td style={{ padding: "8px 8px", fontWeight: 600, color: "#166534" }}>{r.onTime}</td>
                            <td style={{ padding: "8px 8px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 40, height: 5, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
                                  <div style={{ width: `${r.onTimePct}%`, height: "100%", background: r.onTimePct >= 70 ? "#22c55e" : r.onTimePct >= 50 ? "#eab308" : "#ef4444", borderRadius: 3 }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: r.onTimePct >= 70 ? "#166534" : r.onTimePct >= 50 ? "#854d0e" : "#991b1b" }}>{r.onTimePct}%</span>
                              </div>
                            </td>
                            <td style={{ padding: "8px 8px", color: "#854d0e" }}>{r.late}</td>
                            <td style={{ padding: "8px 8px", color: r.sigLate > 50 ? "#991b1b" : "#854d0e", fontWeight: r.sigLate > 50 ? 700 : 400 }}>{r.sigLate}</td>
                            <td style={{ padding: "8px 8px" }}>
                              <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 600, background: r.missed > 10 ? "#fee2e2" : r.missed > 5 ? "#fef9c3" : "#dcfce7", color: r.missed > 10 ? "#991b1b" : r.missed > 5 ? "#854d0e" : "#166534" }}>{r.missed}</span>
                            </td>
                            <td style={{ padding: "8px 8px", fontSize: 10, color: r.missPct > 7 ? "#991b1b" : "#6b7280" }}>{r.missPct}%</td>
                            <td style={{ padding: "8px 8px" }}>
                              <span style={{ padding: "2px 8px", borderRadius: 16, fontSize: 9, fontWeight: 700, background: st.bg, color: st.tc }}>{st.label}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "10px 16px", background: "#f8fafc", borderTop: "1px solid #e5e7eb", fontSize: 10, color: "#6b7280" }}>
                  GOOD = 70%+ on time | NEEDS WORK = 50-69% | CRITICAL = below 50% | Data: Jan 1 – May 15, 2026
                </div>
              </div>

              {/* Worst offenders */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 10 }}>🔴 Reps Below 30% On-Time — Requires Immediate Coaching</div>
                {STC_REPS.filter(r => r.onTimePct < 30).map(r => (
                  <div key={r.name} style={{ padding: "10px 12px", background: "#fee2e2", borderRadius: 6, borderLeft: "4px solid #ef4444", marginBottom: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 700, color: "#991b1b", fontSize: 12 }}>{r.name} — {r.onTimePct}% on-time rate</div>
                        <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>{r.total} appointments | {r.sigLate} calls 15+ min late | {r.missed} missed entirely</div>
                      </div>
                      <span style={{ padding: "4px 10px", borderRadius: 4, background: "#991b1b", color: "white", fontSize: 9, fontWeight: 700 }}>COACHING</span>
                    </div>
                  </div>
                ))}
                {STC_REPS.filter(r => r.onTimePct >= 30 && r.onTimePct < 50).length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#854d0e", marginBottom: 6 }}>⚠️ Reps 30-50% On-Time — Monitor Closely</div>
                    {STC_REPS.filter(r => r.onTimePct >= 30 && r.onTimePct < 50).map(r => (
                      <div key={r.name} style={{ padding: "8px 12px", background: "#fef9c3", borderRadius: 6, borderLeft: "3px solid #eab308", marginBottom: 4 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#854d0e" }}>{r.name} — {r.onTimePct}% on-time | {r.sigLate} calls 15+ min late</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top performers */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#166534", marginBottom: 10 }}>🌟 Reps 70%+ On-Time — Recognize These</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 6 }}>
                  {STC_REPS.filter(r => r.onTimePct >= 70).sort((a,b) => b.onTimePct - a.onTimePct).map((r, i) => (
                    <div key={r.name} style={{ padding: "10px 12px", background: i === 0 ? "linear-gradient(135deg, #166534, #15803d)" : "#dcfce7", borderRadius: 6, border: i === 0 ? "none" : "1px solid #bbf7d0" }}>
                      <div style={{ fontWeight: 700, color: i === 0 ? "white" : "#166534", fontSize: 12 }}>{i === 0 ? "👑 " : "✅ "}{r.name}</div>
                      <div style={{ fontSize: 10, color: i === 0 ? "rgba(255,255,255,0.8)" : "#166534", marginTop: 2 }}>{r.onTimePct}% on-time | {r.total} appts | {r.missed} missed</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══ ACCOUNTABILITY LOG ═══ */}
        {view === "log" && (() => {
          const open = logEntries.filter(e => !e.resolved);
          const overdue = open.filter(e => new Date(e.followUpDate) <= new Date("2026-04-15"));
          const resolved = logEntries.filter(e => e.resolved);
          const noChange = logEntries.filter(e => e.outcome === "no_change");

          const outcomeColor = (o) => {
            if (o === "improved") return { bg: "#dcfce7", tc: "#166534", label: "IMPROVED" };
            if (o === "no_change") return { bg: "#fee2e2", tc: "#991b1b", label: "NO CHANGE" };
            if (o === "in_progress") return { bg: "#E8F0FE", tc: "#3B7DD8", label: "IN PROGRESS" };
            return { bg: "#fef9c3", tc: "#854d0e", label: "PENDING" };
          };
          const typeColor = (t) => {
            if (t.includes("Stage 1")) return { bg: "#fef9c3", tc: "#854d0e" };
            if (t.includes("Stage 2")) return { bg: "#fee2e2", tc: "#991b1b" };
            if (t.includes("Stage 3") || t.includes("PIP")) return { bg: "#1B2A4A", tc: "white" };
            return { bg: "#f3f4f6", tc: "#6b7280" };
          };

          const handleAddLog = () => {
            if (!newLog.manager || !newLog.employee || !newLog.action) return;
            setLogEntries(prev => [{
              id: prev.length + 1, date: "2026-04-15", ...newLog,
              outcome: "pending", resolved: false
            }, ...prev]);
            setNewLog({ manager: "", employee: "", brand: "", type: "Stage 1 Coaching", trigger: "", action: "", followUpDate: "" });
            setShowLogForm(false);
          };

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Summary strip */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { icon: "📂", label: "Open Actions", count: open.length, bg: "#3B7DD8", tc: "white" },
                  { icon: "⏰", label: "Overdue Follow-Ups", count: overdue.length, bg: overdue.length > 0 ? "#991b1b" : "#166534", tc: "white" },
                  { icon: "🔴", label: "No Change After Coaching", count: noChange.length, bg: noChange.length > 0 ? "#7f1d1d" : "#166534", tc: "white" },
                  { icon: "✅", label: "Resolved", count: resolved.length, bg: "#166534", tc: "white" },
                  { icon: "📝", label: "Total Logged", count: logEntries.length, bg: "#1B2A4A", tc: "white" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: s.bg, borderRadius: 8, minWidth: 140 }}>
                    <span style={{ fontSize: 16 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: s.tc }}>{s.count}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overdue callout */}
              {overdue.length > 0 && (
                <div style={{ padding: "12px 16px", background: "#fee2e2", borderRadius: 8, borderLeft: "4px solid #ef4444" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#991b1b" }}>⏰ {overdue.length} Follow-Up{overdue.length > 1 ? "s" : ""} Overdue — Manager Has Not Confirmed Resolution</div>
                  <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>These coaching actions were flagged but follow-up dates have passed without a confirmed outcome. Mike/Javi: verify these were addressed.</div>
                </div>
              )}

              {/* Add new entry button */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>📝 Management Accountability Log</div>
                <button onClick={() => setShowLogForm(!showLogForm)} style={{
                  padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                  background: showLogForm ? "#ef4444" : "#3B7DD8", color: "white",
                  fontSize: 11, fontWeight: 600, fontFamily: "inherit",
                }}>{showLogForm ? "✕ Cancel" : "+ Log New Action"}</button>
              </div>

              {/* New entry form */}
              {showLogForm && (
                <div style={{ background: "white", borderRadius: 10, padding: 16, border: "2px solid #3B7DD8" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Log a Coaching / Accountability Action</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                    {[
                      { key: "manager", placeholder: "Manager Name", span: 1 },
                      { key: "employee", placeholder: "Employee Name", span: 1 },
                      { key: "brand", placeholder: "Brand", span: 1 },
                      { key: "followUpDate", placeholder: "Follow-Up Date (YYYY-MM-DD)", span: 1 },
                    ].map(f => (
                      <input key={f.key} value={newLog[f.key]} onChange={e => setNewLog(p => ({...p, [f.key]: e.target.value}))}
                        placeholder={f.placeholder} style={{
                          padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11,
                          fontFamily: "inherit", outline: "none",
                        }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <select value={newLog.type} onChange={e => setNewLog(p => ({...p, type: e.target.value}))} style={{
                      padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11, fontFamily: "inherit", flex: 1,
                    }}>
                      <option>Stage 1 Coaching</option>
                      <option>Stage 2 Formal Warning</option>
                      <option>Stage 3 PIP</option>
                      <option>Recognition</option>
                      <option>Lead Redistribution</option>
                      <option>Escalation to Leadership</option>
                    </select>
                    <input value={newLog.trigger} onChange={e => setNewLog(p => ({...p, trigger: e.target.value}))}
                      placeholder="What triggered this? (e.g., 135 untouched leads, score 3)"
                      style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11, fontFamily: "inherit", flex: 2 }} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={newLog.action} onChange={e => setNewLog(p => ({...p, action: e.target.value}))}
                      placeholder="What action was taken? (e.g., Met 1-on-1, discussed pipeline, agreed to 30 calls/day)"
                      style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11, fontFamily: "inherit", flex: 1 }} />
                    <button onClick={handleAddLog} style={{
                      padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer",
                      background: "#3B7DD8", color: "white", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
                    }}>Save Entry</button>
                  </div>
                </div>
              )}

              {/* Open actions table */}
              <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", background: "#f8fafc" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A" }}>Open Actions ({open.length})</span>
                  <span style={{ fontSize: 10, color: "#6b7280", marginLeft: 8 }}>— These need follow-through confirmation</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["Date", "Manager", "Employee", "Brand", "Type", "Trigger", "Action Taken", "Follow-Up", "Outcome", "Update"].map(h => (
                          <th key={h} style={{ padding: "7px 6px", textAlign: "left", fontSize: 8, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {open.sort((a,b) => new Date(a.followUpDate) - new Date(b.followUpDate)).map(entry => {
                        const oc = outcomeColor(entry.outcome);
                        const tc = typeColor(entry.type);
                        const isOverdue = new Date(entry.followUpDate) <= new Date("2026-04-15");
                        return (
                          <tr key={entry.id} style={{ borderBottom: "1px solid #f3f4f6", background: isOverdue ? "#fff5f5" : "white" }}>
                            <td style={{ padding: "7px 6px", whiteSpace: "nowrap", fontWeight: 500 }}>{entry.date}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: "#1B2A4A" }}>{entry.manager}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: "#3B7DD8" }}>{entry.employee}</td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "1px 5px", background: "#f3f4f6", borderRadius: 3, fontSize: 9 }}>{entry.brand}</span></td>
                            <td style={{ padding: "7px 6px" }}>
                              <span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 8, fontWeight: 700, background: tc.bg, color: tc.tc }}>{entry.type}</span>
                            </td>
                            <td style={{ padding: "7px 6px", maxWidth: 140, fontSize: 9, color: "#6b7280" }}>{entry.trigger}</td>
                            <td style={{ padding: "7px 6px", maxWidth: 180, fontSize: 9 }}>{entry.action}</td>
                            <td style={{ padding: "7px 6px", whiteSpace: "nowrap" }}>
                              <span style={{ fontWeight: 600, color: isOverdue ? "#991b1b" : "#6b7280" }}>
                                {isOverdue ? "⏰ " : ""}{entry.followUpDate}
                              </span>
                            </td>
                            <td style={{ padding: "7px 6px" }}>
                              <span style={{ padding: "2px 6px", borderRadius: 10, fontSize: 8, fontWeight: 700, background: oc.bg, color: oc.tc }}>{oc.label}</span>
                            </td>
                            <td style={{ padding: "7px 6px" }}>
                              <div style={{ display: "flex", gap: 3 }}>
                                <button onClick={() => setLogEntries(prev => prev.map(e => e.id === entry.id ? {...e, outcome: "improved", resolved: true} : e))} style={{
                                  padding: "3px 6px", borderRadius: 3, border: "none", cursor: "pointer", fontSize: 8, fontWeight: 700, background: "#dcfce7", color: "#166534", fontFamily: "inherit"
                                }}>✅ Improved</button>
                                <button onClick={() => setLogEntries(prev => prev.map(e => e.id === entry.id ? {...e, outcome: "no_change"} : e))} style={{
                                  padding: "3px 6px", borderRadius: 3, border: "none", cursor: "pointer", fontSize: 8, fontWeight: 700, background: "#fee2e2", color: "#991b1b", fontFamily: "inherit"
                                }}>🔴 No Change</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Resolved actions */}
              {resolved.length > 0 && (
                <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", background: "#dcfce7" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#166534" }}>✅ Resolved Actions ({resolved.length})</span>
                    <span style={{ fontSize: 10, color: "#166534", marginLeft: 8 }}>— Coaching that led to improvement</span>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                      <thead>
                        <tr style={{ background: "#f8fafc" }}>
                          {["Date", "Manager", "Employee", "Brand", "Type", "Action Taken", "Outcome"].map(h => (
                            <th key={h} style={{ padding: "7px 6px", textAlign: "left", fontSize: 8, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {resolved.map(entry => (
                          <tr key={entry.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "7px 6px", fontWeight: 500 }}>{entry.date}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600 }}>{entry.manager}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: "#166534" }}>{entry.employee}</td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "1px 5px", background: "#f3f4f6", borderRadius: 3, fontSize: 9 }}>{entry.brand}</span></td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 8, fontWeight: 700, background: "#fef9c3", color: "#854d0e" }}>{entry.type}</span></td>
                            <td style={{ padding: "7px 6px", fontSize: 9 }}>{entry.action}</td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "2px 6px", borderRadius: 10, fontSize: 8, fontWeight: 700, background: "#dcfce7", color: "#166534" }}>IMPROVED</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Manager accountability summary */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>👤 Manager Follow-Through Scorecard</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 10 }}>Are managers actually following up when alerts are raised?</div>
                {(() => {
                  const managers = {};
                  logEntries.forEach(e => {
                    if (!managers[e.manager]) managers[e.manager] = { total: 0, resolved: 0, noChange: 0, overdue: 0, open: 0 };
                    managers[e.manager].total++;
                    if (e.resolved) managers[e.manager].resolved++;
                    if (e.outcome === "no_change") managers[e.manager].noChange++;
                    if (!e.resolved && new Date(e.followUpDate) <= new Date("2026-04-15")) managers[e.manager].overdue++;
                    if (!e.resolved) managers[e.manager].open++;
                  });
                  return Object.entries(managers).map(([name, m]) => {
                    const resolvePct = m.total > 0 ? Math.round(m.resolved / m.total * 100) : 0;
                    const st = resolvePct >= 60 && m.overdue === 0 ? { label: "ON TRACK", bg: "#dcfce7", tc: "#166534" } : m.overdue > 0 ? { label: "OVERDUE ITEMS", bg: "#fee2e2", tc: "#991b1b" } : { label: "NEEDS ATTENTION", bg: "#fef9c3", tc: "#854d0e" };
                    return (
                      <div key={name} style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>{name}</div>
                          <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>
                            {m.total} total actions | {m.resolved} resolved ({resolvePct}%) | {m.open} open | {m.noChange > 0 ? <span style={{ color: "#991b1b", fontWeight: 600 }}>{m.noChange} no change</span> : "0 no change"} | {m.overdue > 0 ? <span style={{ color: "#991b1b", fontWeight: 600 }}>{m.overdue} overdue</span> : "0 overdue"}
                          </div>
                        </div>
                        <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: st.bg, color: st.tc }}>{st.label}</span>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Info box */}
              <div style={{ padding: "12px 16px", background: "#f0f9ff", borderRadius: 8, borderLeft: "3px solid #3B7DD8" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1B2A4A" }}>How This Works</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}>
                  Drew and David operate as the corporate oversight layer across every level of the organization. When the dashboard flags a problem — at the CM, CMA, executive, or affiliate level — you contact the person directly and log it in the Ping Log. If they respond and improve, it's resolved. If they don't respond or don't change, it escalates: first to their direct manager, then to a 1-on-1 with Mike and Javi. Tony is monitored through the Accountability Log — is he logging coaching conversations and following up? Affiliate owners are monitored through brand performance data. Nobody is exempt. The system creates visibility at every level so nothing falls through the cracks.
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══ CORPORATE OVERSIGHT ═══ */}
        {view === "corp" && (() => {
          // Manager accountability metrics
          const managers = {};
          logEntries.forEach(e => {
            if (!managers[e.manager]) managers[e.manager] = { name: e.manager, total: 0, resolved: 0, noChange: 0, overdue: 0, open: 0, pending: 0, avgResponseDays: [] };
            managers[e.manager].total++;
            if (e.resolved) managers[e.manager].resolved++;
            if (e.outcome === "no_change") managers[e.manager].noChange++;
            if (e.outcome === "pending") managers[e.manager].pending++;
            if (!e.resolved && new Date(e.followUpDate) <= new Date("2026-04-15")) managers[e.manager].overdue++;
            if (!e.resolved) managers[e.manager].open++;
          });

          // CM red alerts that have NO corresponding log entry (manager never acted)
          const redCMs = MOCK_CMS.filter(cm => cm.score < 40);
          const loggedEmployees = new Set(logEntries.map(e => e.employee));
          const unaddressedReds = redCMs.filter(cm => !loggedEmployees.has(cm.name));

          // Calculate days since last log entry per manager
          const mgrList = Object.values(managers);
          const totalAlerts = redCMs.length + MOCK_CMS.filter(cm => cm.untouched > 25).length;
          const totalLogged = logEntries.length;
          const responseRate = totalAlerts > 0 ? Math.round((totalLogged / totalAlerts) * 100) : 0;

          // Escalation candidates: employees with no_change outcome or repeat reds
          const escalationCandidates = logEntries.filter(e => e.outcome === "no_change" && !e.resolved);

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Header */}
              <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #1B2A4A, #0f1a2e)", borderRadius: 10, color: "white" }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>🔒 Consultant Data — Drew &amp; David</div>
                <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>Private view. Full organizational oversight: CMs, CMAs, executives, affiliate owners, national sales management. Tracking follow-through at every level.</div>
              </div>

              {/* Top-level stats */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { icon: "🚨", label: "CM/CMA Alerts Active", value: totalAlerts, bg: totalAlerts > 5 ? "#991b1b" : "#854d0e", tc: "white" },
                  { icon: "📝", label: "Actions Logged by Mgmt", value: totalLogged, bg: "#3B7DD8", tc: "white" },
                  { icon: "📊", label: "Response Rate", value: `${Math.min(responseRate, 100)}%`, bg: responseRate >= 80 ? "#166534" : responseRate >= 50 ? "#854d0e" : "#991b1b", tc: "white" },
                  { icon: "⏰", label: "Overdue Follow-Ups", value: mgrList.reduce((s,m) => s + m.overdue, 0), bg: mgrList.reduce((s,m) => s + m.overdue, 0) > 0 ? "#991b1b" : "#166534", tc: "white" },
                  { icon: "🔴", label: "No Change After Coaching", value: escalationCandidates.length, bg: escalationCandidates.length > 0 ? "#7f1d1d" : "#166534", tc: "white" },
                  { icon: "👻", label: "Red CMs Never Addressed", value: unaddressedReds.length, bg: unaddressedReds.length > 0 ? "#7f1d1d" : "#166534", tc: "white" },
                ].map(s => (
                  <div key={s.label} style={{ flex: 1, minWidth: 130, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: s.bg, borderRadius: 8 }}>
                    <span style={{ fontSize: 16 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: s.tc }}>{s.value}</div>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PERSONNEL OVERSIGHT — ALL LEVELS */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>👤 Personnel Oversight — All Levels</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 12 }}>Tracked by: Drew &amp; David | Reviewed by: Mike &amp; Javi | Covers: CMs, CMAs, Executives, Affiliate Owners, National Sales Mgmt</div>

                {/* Level breakdown */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
                  {[
                    { level: "CMs", icon: "📞", total: MOCK_CMS.length, red: MOCK_CMS.filter(c => c.score < 40).length, desc: "Tracked via dashboard scores, call volume, GPV output" },
                    { level: "CMAs", icon: "📋", total: MOCK_CMAS.length, red: MOCK_CMAS.filter(c => c.score < 40).length, desc: "Tracked via case prep, doc follow-up, CRM hygiene" },
                    { level: "Executives / Mgmt", icon: "👔", total: 1, red: mgrList.filter(m => m.overdue > 2 || m.noChange > 2).length, desc: "Tracked via accountability log follow-through" },
                    { level: "Affiliate Owners", icon: "🏢", total: 5, red: 2, desc: "Tracked via brand performance, AE output, response to campaigns" },
                  ].map(l => (
                    <div key={l.level} style={{ padding: 12, borderRadius: 8, background: l.red > 0 ? "#fff5f5" : "#f8fafc", border: `1px solid ${l.red > 0 ? "#fca5a5" : "#e5e7eb"}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <span style={{ fontSize: 16 }}>{l.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A" }}>{l.level}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 18, fontWeight: 700, color: "#1B2A4A" }}>{l.total}</span>
                        {l.red > 0 && <span style={{ fontSize: 18, fontWeight: 700, color: "#991b1b" }}>({l.red} 🔴)</span>}
                      </div>
                      <div style={{ fontSize: 8, color: "#6b7280" }}>{l.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Contact / Ping Log */}
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A", marginBottom: 8, marginTop: 4 }}>📨 Contact &amp; Ping Log — Who Have We Reached Out To?</div>
                <div style={{ fontSize: 9, color: "#6b7280", marginBottom: 8 }}>Log every time you or Drew contact someone about a performance issue. Creates a paper trail of your outreach.</div>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10, marginBottom: 10 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Date", "Contacted By", "Person Pinged", "Role / Level", "Brand", "Reason", "Method", "Response", "Next Step"].map(h => (
                        <th key={h} style={{ padding: "6px 5px", textAlign: "left", fontSize: 8, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "04/15", by: "David", person: "Patricia Seary", role: "CM", brand: "DVC", reason: "0 GPVs, 28 calls/day, declining 5 weeks", method: "Slack DM", response: "Read, no reply", next: "Follow up Friday — escalate if no response" },
                      { date: "04/15", by: "Drew", person: "Erik Burgin", role: "CM", brand: "AVC", reason: "18 calls/day, 48 untouched leads, score 12", method: "Slack DM", response: "Acknowledged, cited workload", next: "Verify with Tony — did he meet with Erik?" },
                      { date: "04/14", by: "David", person: "Tony Gonzalez", role: "Nat'l Sales Mgr", brand: "All", reason: "2 overdue follow-ups in accountability log", method: "Call", response: "Said he'd update today", next: "Check log tomorrow — did he actually update?" },
                      { date: "04/14", by: "Drew", person: "Christian Meza", role: "CM", brand: "VOR", reason: "14 calls in 8 hours, 52 untouched leads", method: "Slack DM", response: "No response", next: "Escalate to Tony + flag for Mike/Javi 1-on-1" },
                      { date: "04/12", by: "David", person: "JD Mullen", role: "Affiliate Owner", brand: "VBCG", reason: "AE production 20% of internal standard, 5 quarters decline", method: "Email", response: "Said team is committed", next: "Monitor Q2 campaigns — data will tell the truth" },
                      { date: "04/10", by: "David", person: "Meredith Gaxiola", role: "CM", brand: "VDR", reason: "8 calls/day, 135 untouched leads, score 3", method: "Slack DM + Call", response: "No answer, no reply", next: "Escalate — schedule 1-on-1 with Mike & Javi" },
                      { date: "04/08", by: "Drew", person: "Garrett Schavier", role: "CMA", brand: "VDR", reason: "40% case prep, CRM not current, supports lowest-scoring CM", method: "Slack DM", response: "Replied — blamed CRM issues", next: "Verify CRM claim with Chris" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: row.response.includes("No r") || row.response.includes("no reply") ? "#fff5f5" : i % 2 === 1 ? "#fafbfc" : "white" }}>
                        <td style={{ padding: "6px 5px", fontWeight: 500, whiteSpace: "nowrap" }}>{row.date}</td>
                        <td style={{ padding: "6px 5px", fontWeight: 600, color: "#3B7DD8" }}>{row.by}</td>
                        <td style={{ padding: "6px 5px", fontWeight: 600, color: "#1B2A4A" }}>{row.person}</td>
                        <td style={{ padding: "6px 5px" }}>
                          <span style={{ padding: "1px 5px", borderRadius: 3, fontSize: 8, fontWeight: 600,
                            background: row.role === "CM" ? "#E8F0FE" : row.role === "CMA" ? "#F3E8FF" : row.role.includes("Affiliate") ? "#FEF5E7" : "#fee2e2",
                            color: row.role === "CM" ? "#3B7DD8" : row.role === "CMA" ? "#6C3FA0" : row.role.includes("Affiliate") ? "#D4860B" : "#991b1b",
                          }}>{row.role}</span>
                        </td>
                        <td style={{ padding: "6px 5px", fontSize: 9 }}>{row.brand}</td>
                        <td style={{ padding: "6px 5px", fontSize: 9, maxWidth: 140, color: "#6b7280" }}>{row.reason}</td>
                        <td style={{ padding: "6px 5px", fontSize: 9 }}>{row.method}</td>
                        <td style={{ padding: "6px 5px", fontSize: 9, fontWeight: 500, color: row.response.includes("No") || row.response.includes("no") ? "#991b1b" : "#166534" }}>{row.response}</td>
                        <td style={{ padding: "6px 5px", fontSize: 9, color: "#854d0e" }}>{row.next}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Manager-specific scorecard (Tony + others) */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>📊 Management Follow-Through Scorecard</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 10 }}>Is management actually following up when the dashboard flags issues?</div>

                {mgrList.length > 0 ? mgrList.map(m => {
                  const resolvePct = m.total > 0 ? Math.round(m.resolved / m.total * 100) : 0;
                  const isGood = resolvePct >= 60 && m.overdue === 0 && m.noChange <= 1;
                  const isBad = m.overdue > 2 || m.noChange > 2 || resolvePct < 30;
                  const st = isGood ? { label: "ON TRACK", bg: "#dcfce7", tc: "#166534" } : isBad ? { label: "ESCALATE TO MIKE/JAVI", bg: "#fee2e2", tc: "#991b1b" } : { label: "MONITOR", bg: "#fef9c3", tc: "#854d0e" };

                  return (
                    <div key={m.name} style={{ padding: "14px 16px", borderRadius: 8, border: `2px solid ${isBad ? "#fca5a5" : isGood ? "#bbf7d0" : "#fde68a"}`, marginBottom: 10, background: isBad ? "#fff5f5" : "white" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>{m.name}</div>
                        <span style={{ padding: "4px 14px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: st.bg, color: st.tc }}>{st.label}</span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                        {[
                          { label: "Total Actions", value: m.total, color: "#1B2A4A" },
                          { label: "Resolved", value: `${m.resolved} (${resolvePct}%)`, color: "#166534" },
                          { label: "Open", value: m.open, color: "#3B7DD8" },
                          { label: "Overdue", value: m.overdue, color: m.overdue > 0 ? "#991b1b" : "#166534" },
                          { label: "No Change", value: m.noChange, color: m.noChange > 0 ? "#991b1b" : "#166534" },
                        ].map(kpi => (
                          <div key={kpi.label} style={{ padding: "8px 10px", borderRadius: 6, background: "#f8fafc", border: "1px solid #e5e7eb", textAlign: "center" }}>
                            <div style={{ fontSize: 8, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>{kpi.label}</div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: kpi.color, marginTop: 2 }}>{kpi.value}</div>
                          </div>
                        ))}
                      </div>

                      {isBad && (
                        <div style={{ marginTop: 10, padding: "8px 12px", background: "#fee2e2", borderRadius: 6, borderLeft: "3px solid #ef4444" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#991b1b" }}>⚠️ Recommended: Schedule 1-on-1 with {m.name}, Mike, Javi, Drew &amp; David</div>
                          <div style={{ fontSize: 9, color: "#991b1b", marginTop: 2 }}>
                            {m.overdue > 0 ? `${m.overdue} overdue follow-ups. ` : ""}
                            {m.noChange > 0 ? `${m.noChange} coaching sessions with no improvement. ` : ""}
                            {resolvePct < 30 ? `Only ${resolvePct}% resolution rate. ` : ""}
                            Management accountability is not meeting expectations.
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }) : (
                  <div style={{ padding: 20, textAlign: "center", color: "#6b7280", fontSize: 11 }}>No manager data yet. Actions will appear here once managers log coaching conversations in the Accountability Log tab.</div>
                )}
              </div>

              {/* UNADDRESSED RED CMS */}
              {unaddressedReds.length > 0 && (
                <div style={{ background: "white", borderRadius: 10, padding: 16, border: "2px solid #ef4444" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 4 }}>👻 Red-Zone CMs With ZERO Management Action</div>
                  <div style={{ fontSize: 10, color: "#991b1b", marginBottom: 10 }}>These employees are flagged as critical on the dashboard but no manager has logged a single coaching action. Either management isn't looking at the dashboard or they're choosing not to act.</div>

                  {unaddressedReds.map(cm => (
                    <div key={cm.name} style={{ padding: "10px 14px", background: "#fee2e2", borderRadius: 6, borderLeft: "4px solid #ef4444", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#991b1b" }}>{cm.name} ({cm.brand}) — Score: {cm.score}</div>
                        <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>
                          {cm.calls} calls/day | {cm.untouched} untouched leads | {cm.gpvs} GPVs | Trend: {cm.weekHistory[0]}→{cm.weekHistory[4]}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end" }}>
                        <span style={{ padding: "3px 8px", borderRadius: 4, background: "#7f1d1d", color: "white", fontSize: 8, fontWeight: 700 }}>NO ACTION LOGGED</span>
                        <span style={{ fontSize: 8, color: "#991b1b" }}>Escalate to Mike &amp; Javi</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ESCALATION CANDIDATES */}
              {escalationCandidates.length > 0 && (
                <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#854d0e", marginBottom: 4 }}>🔄 Coaching Failed — Escalation Candidates</div>
                  <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 10 }}>These employees received coaching but showed no improvement. Per the progressive framework: Stage 1 failed → move to Stage 2. Stage 2 failed → move to PIP. PIP failed → 1-on-1 with Mike, Javi, Drew &amp; David.</div>

                  {escalationCandidates.map(e => {
                    const nextStep = e.type.includes("Stage 1") ? "Stage 2 Formal Warning" : e.type.includes("Stage 2") ? "Stage 3 PIP" : "1-on-1 with Mike & Javi";
                    return (
                      <div key={e.id} style={{ padding: "10px 14px", background: "#fef9c3", borderRadius: 6, borderLeft: "4px solid #eab308", marginBottom: 6 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#854d0e" }}>{e.employee} ({e.brand}) — {e.type} produced NO CHANGE</div>
                            <div style={{ fontSize: 10, color: "#854d0e", marginTop: 2 }}>Coached on {e.date}: "{e.action}"</div>
                          </div>
                          <span style={{ padding: "4px 10px", borderRadius: 4, background: "#854d0e", color: "white", fontSize: 9, fontWeight: 700, whiteSpace: "nowrap" }}>→ {nextStep}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* THE PROCESS */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>📋 The Corporate Oversight Process</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { step: "1", title: "Dashboard Flags It", desc: "CM/CMA underperformance, missed appointments, pipeline stalls, or affiliate decline surfaces automatically.", color: "#3B7DD8", bg: "#E8F0FE" },
                    { step: "2", title: "Drew & David Ping", desc: "You contact the person directly — CM, CMA, exec, or affiliate owner. Log every outreach in the Ping Log with method, response, and next step.", color: "#6C3FA0", bg: "#F3E8FF" },
                    { step: "3", title: "Monitor Response", desc: "Did they respond? Did behavior change? Did management follow through? Check the log, check the data, track the outcome.", color: "#D4860B", bg: "#FEF5E7" },
                    { step: "4", title: "Escalate If Needed", desc: "No response or no improvement → 1-on-1 with the employee, Mike, Javi, Drew & David. Works at every level: CM, exec, or affiliate owner.", color: "#C0392B", bg: "#FDEDEC" },
                  ].map(s => (
                    <div key={s.step} style={{ flex: 1, padding: 12, borderRadius: 8, background: s.bg, border: `1px solid ${s.color}30` }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{s.step}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>{s.title}</div>
                      <div style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.4 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly checklist for Drew & David */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>📌 Drew &amp; David — Weekly Review Checklist</div>
                {[
                  { priority: "critical", text: "Check dashboard: Any red-zone CMs/CMAs with NO contact from us or management?" },
                  { priority: "critical", text: "Check Accountability Log: Are there overdue follow-ups from Tony or brand execs?" },
                  { priority: "critical", text: "Review Ping Log: Did anyone we contacted fail to respond? Escalate non-responders." },
                  { priority: "high", text: "Cross-reference: Are the worst performers being addressed at EVERY level (CM, CMA, exec)?" },
                  { priority: "high", text: "Review 'No Change' outcomes: Which employees need escalation to next stage?" },
                  { priority: "high", text: "Check Speed-to-Contact: Are missed appointment rates improving across brands?" },
                  { priority: "medium", text: "Review affiliate owner performance: Are external brands (VBCG, etc.) meeting targets?" },
                  { priority: "medium", text: "Check Tony's log activity: Is he logging coaching actions consistently?" },
                  { priority: "medium", text: "Flag systemic patterns to Mike & Javi: issues that span multiple brands or levels" },
                  { priority: "low", text: "Note top performers for recognition — send to Mike for acknowledgment" },
                  { priority: "low", text: "Update Ping Log with any new outreach this week" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: 6, marginBottom: 4,
                    background: item.priority === "critical" ? "#fef2f2" : item.priority === "high" ? "#fffbeb" : "#f8fafc",
                    border: `1px solid ${item.priority === "critical" ? "#fca5a5" : item.priority === "high" ? "#fde68a" : "#e5e7eb"}`,
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 3, border: "2px solid",
                      borderColor: item.priority === "critical" ? "#ef4444" : item.priority === "high" ? "#f59e0b" : "#d1d5db",
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, fontSize: 10, color: "#1B2A4A", fontWeight: item.priority === "critical" ? 600 : 400 }}>{item.text}</div>
                    <span style={{
                      padding: "2px 6px", borderRadius: 8, fontSize: 7, fontWeight: 700, textTransform: "uppercase",
                      background: item.priority === "critical" ? "#ef4444" : item.priority === "high" ? "#f59e0b" : item.priority === "medium" ? "#3B7DD8" : "#6b7280",
                      color: "white",
                    }}>{item.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ═══ CONVERSION & ATTRIBUTION ═══ */}
        {view === "funnel" && (() => {
          const funnelData = brand === "All" ? CM_FUNNEL : CM_FUNNEL.filter(f => f.brand === brand);
          const fTotals = {
            leads: funnelData.reduce((s,f) => s + f.leadsAssigned, 0),
            contacted: funnelData.reduce((s,f) => s + f.contacted, 0),
            appt: funnelData.reduce((s,f) => s + f.apptSet, 0),
            pitch: funnelData.reduce((s,f) => s + f.pitchDelivered, 0),
            csaSent: funnelData.reduce((s,f) => s + f.csaSent, 0),
            csaSigned: funnelData.reduce((s,f) => s + f.csaSigned, 0),
            csaDeclined: funnelData.reduce((s,f) => s + f.csaDeclined, 0),
            csaNoShow: funnelData.reduce((s,f) => s + f.csaNoShow, 0),
            csaUnknown: funnelData.reduce((s,f) => s + f.csaUnknown, 0),
            gpv: funnelData.reduce((s,f) => s + f.gpvSubmitted, 0),
            unverified: funnelData.filter(f => !f.pitchVerified).length,
          };
          const stages = [
            { label: "Leads Assigned", val: fTotals.leads, color: "#6b7280" },
            { label: "Contacted", val: fTotals.contacted, color: "#3B7DD8" },
            { label: "Appt Set", val: fTotals.appt, color: "#6C3FA0" },
            { label: "Pitch Delivered", val: fTotals.pitch, color: "#D4860B" },
            { label: "CSA Sent", val: fTotals.csaSent, color: "#2D8B4E" },
            { label: "CSA Signed", val: fTotals.csaSigned, color: "#166534" },
            { label: "GPV Submitted", val: fTotals.gpv, color: "#1B2A4A" },
          ];

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Visual Funnel */}
              <div style={{ background: "white", borderRadius: 10, padding: 20, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>🔄 Full Conversion Funnel — {brand === "All" ? "All Brands" : brand}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 16 }}>Stage-by-stage dropoff across {funnelData.length} CMs. Monthly totals.</div>

                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 180, marginBottom: 8 }}>
                  {stages.map((st, i) => {
                    const h = fTotals.leads > 0 ? (st.val / fTotals.leads) * 160 : 0;
                    const prevVal = i > 0 ? stages[i-1].val : st.val;
                    const dropoff = prevVal > 0 ? Math.round((1 - st.val / prevVal) * 100) : 0;
                    return (
                      <div key={st.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: st.color }}>{st.val}</span>
                        {i > 0 && <span style={{ fontSize: 8, color: "#ef4444", fontWeight: 600 }}>-{dropoff}%</span>}
                        <div style={{
                          width: "100%", maxWidth: 80, height: Math.max(h, 4), borderRadius: "6px 6px 0 0",
                          background: st.color, opacity: 0.85, transition: "height 0.5s ease",
                        }} />
                        <span style={{ fontSize: 9, color: "#6b7280", fontWeight: 500, textAlign: "center", lineHeight: "1.2" }}>{st.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Overall conversion rate */}
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <div style={{ flex: 1, padding: 12, borderRadius: 8, background: "#f8fafc", border: "1px solid #e5e7eb", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Lead → Contacted</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: fTotals.leads > 0 && (fTotals.contacted/fTotals.leads) >= 0.8 ? "#166534" : "#991b1b" }}>{fTotals.leads > 0 ? Math.round(fTotals.contacted/fTotals.leads*100) : 0}%</div>
                  </div>
                  <div style={{ flex: 1, padding: 12, borderRadius: 8, background: "#f8fafc", border: "1px solid #e5e7eb", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Contacted → Appt</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: fTotals.contacted > 0 && (fTotals.appt/fTotals.contacted) >= 0.5 ? "#166534" : "#854d0e" }}>{fTotals.contacted > 0 ? Math.round(fTotals.appt/fTotals.contacted*100) : 0}%</div>
                  </div>
                  <div style={{ flex: 1, padding: 12, borderRadius: 8, background: "#f8fafc", border: "1px solid #e5e7eb", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Pitch → CSA Signed</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: fTotals.pitch > 0 && (fTotals.csaSigned/fTotals.pitch) >= 0.6 ? "#166534" : "#854d0e" }}>{fTotals.pitch > 0 ? Math.round(fTotals.csaSigned/fTotals.pitch*100) : 0}%</div>
                  </div>
                  <div style={{ flex: 1, padding: 12, borderRadius: 8, background: "linear-gradient(135deg, #1B2A4A, #2C3E6B)", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 600, textTransform: "uppercase" }}>Lead → GPV</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "white" }}>{fTotals.leads > 0 ? Math.round(fTotals.gpv/fTotals.leads*100) : 0}%</div>
                  </div>
                </div>
              </div>

              {/* CSA Attribution Problem */}
              <div style={{ background: "white", borderRadius: 10, padding: 20, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#991b1b", marginBottom: 4 }}>⚠️ CSA Attribution &amp; Verification Issues</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 12 }}>Breakdown of CSA outcomes and pitch verification status across CMs.</div>

                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  <div style={{ flex: 1, padding: 14, borderRadius: 8, background: "#dcfce7", border: "1px solid #bbf7d0", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#166534", fontWeight: 600, textTransform: "uppercase" }}>CSA Signed</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#166534" }}>{fTotals.csaSigned}</div>
                    <div style={{ fontSize: 10, color: "#166534" }}>Verified closed</div>
                  </div>
                  <div style={{ flex: 1, padding: 14, borderRadius: 8, background: "#fef9c3", border: "1px solid #fde68a", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#854d0e", fontWeight: 600, textTransform: "uppercase" }}>CSA Declined</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#854d0e" }}>{fTotals.csaDeclined}</div>
                    <div style={{ fontSize: 10, color: "#854d0e" }}>Veteran said no</div>
                  </div>
                  <div style={{ flex: 1, padding: 14, borderRadius: 8, background: "#fee2e2", border: "1px solid #fca5a5", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#991b1b", fontWeight: 600, textTransform: "uppercase" }}>CSA No-Show</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#991b1b" }}>{fTotals.csaNoShow}</div>
                    <div style={{ fontSize: 10, color: "#991b1b" }}>Appt missed / no response</div>
                  </div>
                  <div style={{ flex: 1, padding: 14, borderRadius: 8, background: "#1B2A4A", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#fca5a5", fontWeight: 600, textTransform: "uppercase" }}>⚠️ Unknown Outcome</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#ef4444" }}>{fTotals.csaUnknown}</div>
                    <div style={{ fontSize: 10, color: "#fca5a5" }}>Not logged — verification gap</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1, padding: 12, borderRadius: 8, background: "#fee2e2", borderLeft: "4px solid #ef4444" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#991b1b" }}>🔴 {fTotals.unverified} of {funnelData.length} CMs have UNVERIFIED pitch attribution</div>
                    <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>CRM does not confirm who delivered the pitch vs. who just sent the CSA. Cannot verify if the CM claiming the pitch actually conducted the consultation.</div>
                  </div>
                  <div style={{ flex: 1, padding: 12, borderRadius: 8, background: "#fef9c3", borderLeft: "4px solid #eab308" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#854d0e" }}>⚠️ {fTotals.csaUnknown} CSAs with UNKNOWN outcomes</div>
                    <div style={{ fontSize: 10, color: "#854d0e", marginTop: 2 }}>CSA was sent but outcome was never logged. Could be signed, declined, or abandoned. Revenue may be leaking through this gap.</div>
                  </div>
                </div>
              </div>

              {/* Per-CM Funnel Table */}
              <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>Per-CM Conversion Funnel &amp; Attribution</span>
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>🔴 = pitch unverified | ⚠️ = unknown CSA outcomes</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["CM Name","Brand","Leads","Contact%","Appt%","Pitch%","CSA Sent","Signed","Declined","No-Show","Unknown","GPVs","Lead→GPV","Pitch ✓","Avg Days"].map(h => (
                          <th key={h} style={{ padding: "7px 6px", textAlign: "left", fontSize: 8, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {funnelData.sort((a,b) => {
                        const aRate = a.leadsAssigned > 0 ? a.gpvSubmitted / a.leadsAssigned : 0;
                        const bRate = b.leadsAssigned > 0 ? b.gpvSubmitted / b.leadsAssigned : 0;
                        return bRate - aRate;
                      }).map((f, i) => {
                        const contactPct = f.leadsAssigned > 0 ? Math.round(f.contacted / f.leadsAssigned * 100) : 0;
                        const apptPct = f.contacted > 0 ? Math.round(f.apptSet / f.contacted * 100) : 0;
                        const pitchPct = f.apptSet > 0 ? Math.round(f.pitchDelivered / f.apptSet * 100) : 0;
                        const leadToGpv = f.leadsAssigned > 0 ? Math.round(f.gpvSubmitted / f.leadsAssigned * 100) : 0;
                        return (
                          <tr key={f.cmId} style={{ borderBottom: "1px solid #f3f4f6", background: f.csaUnknown > 0 ? "#fffbeb" : i % 2 === 1 ? "#fafbfc" : "white" }}>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: "#1B2A4A", whiteSpace: "nowrap" }}>{f.name}</td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "1px 5px", background: "#f3f4f6", borderRadius: 3, fontSize: 9 }}>{f.brand}</span></td>
                            <td style={{ padding: "7px 6px", fontWeight: 500 }}>{f.leadsAssigned}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: contactPct >= 80 ? "#166534" : contactPct >= 60 ? "#854d0e" : "#991b1b" }}>{contactPct}%</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: apptPct >= 50 ? "#166534" : apptPct >= 30 ? "#854d0e" : "#991b1b" }}>{apptPct}%</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: pitchPct >= 75 ? "#166534" : pitchPct >= 50 ? "#854d0e" : "#991b1b" }}>{pitchPct}%</td>
                            <td style={{ padding: "7px 6px" }}>{f.csaSent}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 700, color: "#166534" }}>{f.csaSigned}</td>
                            <td style={{ padding: "7px 6px", color: "#854d0e" }}>{f.csaDeclined}</td>
                            <td style={{ padding: "7px 6px", color: "#991b1b" }}>{f.csaNoShow}</td>
                            <td style={{ padding: "7px 6px" }}>
                              {f.csaUnknown > 0 ? (
                                <span style={{ padding: "1px 6px", borderRadius: 8, fontSize: 9, fontWeight: 700, background: "#fee2e2", color: "#991b1b" }}>⚠️ {f.csaUnknown}</span>
                              ) : (
                                <span style={{ fontSize: 9, color: "#166534" }}>✓ 0</span>
                              )}
                            </td>
                            <td style={{ padding: "7px 6px", fontSize: 13, fontWeight: 700, color: f.gpvSubmitted > 0 ? "#1B2A4A" : "#991b1b" }}>{f.gpvSubmitted}</td>
                            <td style={{ padding: "7px 6px" }}>
                              <span style={{ padding: "2px 6px", borderRadius: 10, fontSize: 9, fontWeight: 700, background: leadToGpv >= 20 ? "#dcfce7" : leadToGpv >= 10 ? "#fef9c3" : "#fee2e2", color: leadToGpv >= 20 ? "#166534" : leadToGpv >= 10 ? "#854d0e" : "#991b1b" }}>{leadToGpv}%</span>
                            </td>
                            <td style={{ padding: "7px 6px", fontSize: 13 }}>{f.pitchVerified ? "✅" : "🔴"}</td>
                            <td style={{ padding: "7px 6px", color: f.avgDaysToClose > 0 ? (f.avgDaysToClose <= 14 ? "#166534" : f.avgDaysToClose <= 21 ? "#854d0e" : "#991b1b") : "#9ca3af" }}>
                              {f.avgDaysToClose > 0 ? `${f.avgDaysToClose}d` : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "10px 16px", background: "#f8fafc", borderTop: "1px solid #e5e7eb", fontSize: 10, color: "#6b7280" }}>
                  Sorted by Lead→GPV conversion rate (highest first) | 🔴 = CRM cannot verify pitch attribution | ⚠️ = CSA outcome not logged
                </div>
              </div>

              {/* Recommended Fix */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>💡 Recommended Fix: Pitch Attribution &amp; CSA Outcome Tracking</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ padding: "10px 12px", background: "#f0f9ff", borderRadius: 6, borderLeft: "3px solid #3B7DD8" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#1B2A4A" }}>1. Require "Pitch Delivered" status in CRM with CM name + timestamp</div>
                    <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>When a CM conducts a pitch/consultation, they must log it as a specific CRM action — not just "Contacted." This creates a verifiable record of who pitched and when. Cross-reference with RingCentral call logs (did a call actually happen at that time?).</div>
                  </div>
                  <div style={{ padding: "10px 12px", background: "#f0f9ff", borderRadius: 6, borderLeft: "3px solid #3B7DD8" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#1B2A4A" }}>2. Mandatory CSA outcome logging within 48 hours</div>
                    <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>Every CSA sent must have an outcome logged: Signed, Declined, No-Show, or Pending. CSAs with no outcome after 48 hours auto-flag to the brand executive. Zero tolerance for "Unknown" status — if it's unknown, someone isn't doing their job.</div>
                  </div>
                  <div style={{ padding: "10px 12px", background: "#f0f9ff", borderRadius: 6, borderLeft: "3px solid #3B7DD8" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#1B2A4A" }}>3. Separate "CSA Sent By" vs. "Pitch Delivered By" fields</div>
                    <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>The CRM should track two distinct fields: who delivered the pitch (the consultation) and who sent the CSA document. These may be different people. Credit for the close goes to whoever delivered the pitch, not whoever clicked "Send CSA."</div>
                  </div>
                  <div style={{ padding: "10px 12px", background: "#f0f9ff", borderRadius: 6, borderLeft: "3px solid #3B7DD8" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#1B2A4A" }}>4. Balto call recording cross-reference</div>
                    <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>For disputed pitch attribution, Balto recordings provide an independent record. If a CM claims they delivered a pitch, Balto should have the recording. No recording = no verified pitch.</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══ ALERTS (continued) ═══ */}
        {view === "alerts" && (() => {
          // Generate aging leads data per CM
          const agingLeads = [];
          MOCK_CMS.filter(cm => brand === "All" || cm.brand === brand).forEach(cm => {
            if (cm.leads && cm.leads.length > 0) {
              cm.leads.filter(l => l.lastContact >= 2).forEach(l => {
                agingLeads.push({ cmName: cm.name, cmBrand: cm.brand, cmScore: cm.score, lead: l, cm });
              });
            }
            // Add synthetic aging leads for CMs with high untouched counts
            if (cm.untouched > 15) {
              const synthCount = Math.min(5, Math.floor(cm.untouched / 10));
              for (let i = 0; i < synthCount; i++) {
                agingLeads.push({
                  cmName: cm.name, cmBrand: cm.brand, cmScore: cm.score, cm,
                  lead: { name: `Veteran (Lead #${i+1} of ${cm.untouched})`, status: "New Lead", daysInPipeline: 3 + i * 4, lastContact: 3 + i * 3 }
                });
              }
            }
          });
          const aging48 = agingLeads.filter(a => a.lead.lastContact >= 2).sort((a,b) => b.lead.lastContact - a.lead.lastContact);
          const aging7d = aging48.filter(a => a.lead.lastContact >= 7);
          const criticalCMs = MOCK_CMS.filter(cm => (cm.untouched > 25 || cm.calls < 20 || (cm.gpvs === 0 && cm.calls >= 20)) && (brand === "All" || cm.brand === brand));
          const warningCMs = MOCK_CMS.filter(cm => cm.score >= 40 && cm.score < 70 && (brand === "All" || cm.brand === brand));
          const topCMs = MOCK_CMS.filter(cm => cm.score >= 70 && (brand === "All" || cm.brand === brand));
          const cmaCritical = MOCK_CMAS.filter(cma => cma.score < 40 && (brand === "All" || cma.brand === brand));

          const totalAgingRev = Math.round(aging48.length * 0.08 * AVG_CONTRACT);

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Alert Summary Strip */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { icon: "🔥", label: "48hr+ No Contact", count: aging48.length, bg: "#1B2A4A", tc: "white" },
                  { icon: "💀", label: "7+ Days Silent", count: aging7d.length, bg: "#7f1d1d", tc: "white" },
                  { icon: "🚨", label: "Critical CMs", count: criticalCMs.length, bg: "#991b1b", tc: "white" },
                  { icon: "⚠️", label: "Needs Coaching", count: warningCMs.length, bg: "#854d0e", tc: "white" },
                  { icon: "📋", label: "CMA Issues", count: cmaCritical.length, bg: "#6C3FA0", tc: "white" },
                  { icon: "🌟", label: "Top Performers", count: topCMs.length, bg: "#166534", tc: "white" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: s.bg, borderRadius: 8, minWidth: 140 }}>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: s.tc }}>{s.count}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ═══ 48-HOUR LEAD AGING — THE BIG ONE ═══ */}
              <div style={{ background: "white", borderRadius: 10, border: "2px solid #ef4444", overflow: "hidden" }}>
                <div style={{ padding: "14px 16px", background: "linear-gradient(135deg, #7f1d1d, #991b1b)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>🔥 IMMEDIATE ACTION: Leads Not Contacted in 48+ Hours</div>
                    <div style={{ fontSize: 10, color: "#fca5a5", marginTop: 2 }}>These veterans reached out for help and have been waiting. Every hour = lower conversion probability.</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#fca5a5" }}>{aging48.length} leads</div>
                    <div style={{ fontSize: 10, color: "#fca5a5" }}>~${totalAgingRev.toLocaleString()} at risk</div>
                  </div>
                </div>

                {/* Urgency tiers */}
                <div style={{ padding: "12px 16px" }}>
                  {/* TIER 1: 7+ days */}
                  {aging7d.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", animation: "pulse 1.5s infinite" }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#991b1b", textTransform: "uppercase", letterSpacing: 0.5 }}>💀 Critical — 7+ Days No Contact ({aging7d.length} leads)</span>
                        <span style={{ fontSize: 9, color: "#991b1b", marginLeft: "auto", fontWeight: 500 }}>Redistribute or escalate NOW</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {aging7d.slice(0, 10).map((a, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fef2f2", borderRadius: 6, borderLeft: "4px solid #ef4444", cursor: "pointer" }} onClick={() => setSelectedCM(a.cm)}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                              {a.lead.lastContact}d
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 11, fontWeight: 600, color: "#1B2A4A" }}>{a.lead.name} <span style={{ color: "#6b7280", fontWeight: 400 }}>— {a.lead.status} — {a.lead.daysInPipeline} days in pipeline</span></div>
                              <div style={{ fontSize: 10, color: "#991b1b", marginTop: 1 }}>Assigned to: <b>{a.cmName}</b> ({a.cmBrand}) — CM Score: {a.cmScore}</div>
                            </div>
                            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                              <div style={{ padding: "4px 10px", borderRadius: 4, background: "#ef4444", color: "white", fontSize: 9, fontWeight: 700, cursor: "pointer" }}>
                                ↗️ REDISTRIBUTE
                              </div>
                              <div style={{ padding: "4px 10px", borderRadius: 4, background: "#1B2A4A", color: "white", fontSize: 9, fontWeight: 700, cursor: "pointer" }}>
                                👤 ESCALATE
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TIER 2: 48hr - 7 days */}
                  {aging48.filter(a => a.lead.lastContact >= 2 && a.lead.lastContact < 7).length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#854d0e", textTransform: "uppercase", letterSpacing: 0.5 }}>🔥 Urgent — 48hrs to 7 Days ({aging48.filter(a => a.lead.lastContact >= 2 && a.lead.lastContact < 7).length} leads)</span>
                        <span style={{ fontSize: 9, color: "#854d0e", marginLeft: "auto", fontWeight: 500 }}>CM must contact today</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {aging48.filter(a => a.lead.lastContact >= 2 && a.lead.lastContact < 7).slice(0, 8).map((a, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fffbeb", borderRadius: 6, borderLeft: "4px solid #f59e0b", cursor: "pointer" }} onClick={() => setSelectedCM(a.cm)}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                              {a.lead.lastContact}d
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 11, fontWeight: 600, color: "#1B2A4A" }}>{a.lead.name} <span style={{ color: "#6b7280", fontWeight: 400 }}>— {a.lead.status} — {a.lead.daysInPipeline} days in pipeline</span></div>
                              <div style={{ fontSize: 10, color: "#854d0e", marginTop: 1 }}>Assigned to: <b>{a.cmName}</b> ({a.cmBrand}) — CM Score: {a.cmScore}</div>
                            </div>
                            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                              <div style={{ padding: "4px 10px", borderRadius: 4, background: "#f59e0b", color: "white", fontSize: 9, fontWeight: 700, cursor: "pointer" }}>
                                📞 NOTIFY CM
                              </div>
                              <div style={{ padding: "4px 10px", borderRadius: 4, background: "#1B2A4A", color: "white", fontSize: 9, fontWeight: 700, cursor: "pointer" }}>
                                📋 FLAG EXEC
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Aging summary by CM */}
                  <div style={{ padding: 12, background: "#f8fafc", borderRadius: 8, border: "1px solid #e5e7eb" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>Aging Leads by CM — Who's Letting Leads Die?</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {(() => {
                        const cmAging = {};
                        aging48.forEach(a => {
                          if (!cmAging[a.cmName]) cmAging[a.cmName] = { name: a.cmName, brand: a.cmBrand, count: 0, worst: 0, cm: a.cm };
                          cmAging[a.cmName].count++;
                          cmAging[a.cmName].worst = Math.max(cmAging[a.cmName].worst, a.lead.lastContact);
                        });
                        return Object.values(cmAging).sort((a,b) => b.count - a.count).map(c => (
                          <div key={c.name} onClick={() => setSelectedCM(c.cm)} style={{
                            padding: "6px 10px", borderRadius: 6, cursor: "pointer",
                            background: c.count >= 5 ? "#fee2e2" : c.count >= 3 ? "#fef9c3" : "#f3f4f6",
                            border: `1px solid ${c.count >= 5 ? "#fca5a5" : c.count >= 3 ? "#fde68a" : "#e5e7eb"}`,
                          }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#1B2A4A" }}>{c.name}</div>
                            <div style={{ fontSize: 9, color: "#6b7280" }}>{c.brand} · {c.count} aging · worst: {c.worst}d</div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══ CM PERFORMANCE ALERTS ═══ */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 10 }}>🚨 CM Performance — Critical Issues</div>
                {criticalCMs.map(cm => (
                  <div key={cm.name} style={{ padding: "10px 12px", background: "#fee2e2", borderRadius: 6, borderLeft: "3px solid #ef4444", marginBottom: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => setSelectedCM(cm)}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#991b1b", fontSize: 12 }}>
                        {cm.name} ({cm.brand}) —
                        {cm.untouched > 25 ? ` ${cm.untouched} untouched leads` : ""}
                        {cm.calls < 20 ? ` Only ${cm.calls} calls (${cm.talkTime}h talk)` : ""}
                        {cm.gpvs === 0 && cm.calls >= 20 ? " Activity but 0 GPVs" : ""}
                      </div>
                      <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>
                        Score: {cm.score} | Trend: {cm.weekHistory[0]} → {cm.weekHistory[4]} ({cm.weekHistory[4] > cm.weekHistory[0] ? "↑ improving" : "↓ declining"})
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {cm.score < 20 && <span style={{ padding: "3px 8px", borderRadius: 4, background: "#991b1b", color: "white", fontSize: 9, fontWeight: 700 }}>PIP CANDIDATE</span>}
                      {cm.weekHistory[4] < cm.weekHistory[0] && <span style={{ padding: "3px 8px", borderRadius: 4, background: "#7f1d1d", color: "white", fontSize: 9, fontWeight: 700 }}>DECLINING</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* ═══ CMA ALERTS ═══ */}
              {cmaCritical.length > 0 && (
                <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#6C3FA0", marginBottom: 10 }}>📋 CMA Performance — Impacting CM Output</div>
                  {cmaCritical.map(cma => (
                    <div key={cma.name} style={{ padding: "10px 12px", background: "#F3E8FF", borderRadius: 6, borderLeft: "3px solid #6C3FA0", marginBottom: 6, cursor: "pointer" }} onClick={() => setSelectedCMA(cma)}>
                      <div style={{ fontWeight: 700, color: "#6C3FA0", fontSize: 12 }}>
                        {cma.name} ({cma.brand}) — Score: {cma.score} — Supports: {cma.assignedCM}
                      </div>
                      <div style={{ fontSize: 10, color: "#6C3FA0", marginTop: 2 }}>
                        {cma.casesPrepped < 80 ? `Cases prepped: ${cma.casesPrepped}%. ` : ""}
                        {!cma.crmCurrent ? "CRM not current. " : ""}
                        {!cma.morningPrepOnTime ? "Morning prep late. " : ""}
                        {cma.outboundCalls < 7 ? `Only ${cma.outboundCalls} outbound calls. ` : ""}
                        This CMA's underperformance is likely dragging down {cma.assignedCM}'s numbers.
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ═══ COACHING NEEDED ═══ */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#854d0e", marginBottom: 10 }}>⚠️ Needs Coaching — Yellow Zone CMs</div>
                {warningCMs.map(cm => (
                  <div key={cm.name} style={{ padding: "10px 12px", background: "#fef9c3", borderRadius: 6, borderLeft: "3px solid #eab308", marginBottom: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => setSelectedCM(cm)}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#854d0e", fontSize: 12 }}>{cm.name} ({cm.brand}) — Score: {cm.score}</div>
                      <div style={{ fontSize: 10, color: "#854d0e", marginTop: 2 }}>
                        {cm.calls < 50 ? `Calls: ${cm.calls}. ` : ""}{cm.talkTime < 3 ? `Talk: ${cm.talkTime}h. ` : ""}{cm.untouched > 10 ? `${cm.untouched} untouched. ` : ""}{cm.csaClosed === 0 ? "No CSAs closed on-call. " : ""}
                      </div>
                    </div>
                    <span style={{ padding: "3px 8px", borderRadius: 4, background: "#854d0e", color: "white", fontSize: 9, fontWeight: 700 }}>STAGE 1 COACHING</span>
                  </div>
                ))}
              </div>

              {/* ═══ TOP PERFORMERS ═══ */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#166534", marginBottom: 10 }}>🌟 Top Performers — Recognize &amp; Reward</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
                  {topCMs.sort((a,b) => b.score - a.score).map((cm, i) => (
                    <div key={cm.name} style={{ padding: "12px 14px", background: i === 0 ? "linear-gradient(135deg, #166534, #15803d)" : "#dcfce7", borderRadius: 8, cursor: "pointer", border: i === 0 ? "none" : "1px solid #bbf7d0" }} onClick={() => setSelectedCM(cm)}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 700, color: i === 0 ? "white" : "#166534", fontSize: 13 }}>
                            {i === 0 ? "👑 " : "🌟 "}{cm.name}
                          </div>
                          <div style={{ fontSize: 10, color: i === 0 ? "rgba(255,255,255,0.8)" : "#166534", marginTop: 2 }}>{cm.brand} · {cm.calls} calls · {cm.talkTime}h · {cm.gpvs} GPVs</div>
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: i === 0 ? "rgba(255,255,255,0.9)" : "#166534" }}>{cm.score}</div>
                      </div>
                      {i === 0 && <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>🏆 Top performer across {brand === "All" ? "all brands" : cm.brand}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* ═══ DAILY ACTION CHECKLIST ═══ */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>📌 Tony's Daily Action Checklist</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { done: false, priority: "critical", text: `Redistribute or escalate ${aging7d.length} leads with 7+ days no contact`, show: aging7d.length > 0 },
                    { done: false, priority: "critical", text: `Address ${criticalCMs.length} CMs in critical status — verify RingCentral data`, show: criticalCMs.length > 0 },
                    { done: false, priority: "high", text: `Notify CMs with 48hr+ aging leads — ${aging48.filter(a => a.lead.lastContact < 7).length} leads need contact TODAY`, show: aging48.filter(a => a.lead.lastContact < 7).length > 0 },
                    { done: false, priority: "high", text: `Review ${cmaCritical.length} underperforming CMAs — their CMs are likely suffering`, show: cmaCritical.length > 0 },
                    { done: false, priority: "medium", text: `Schedule 1-on-1 coaching with ${warningCMs.length} yellow-zone CMs`, show: warningCMs.length > 0 },
                    { done: false, priority: "medium", text: `Verify CSA outcomes — check for unknown/unlogged results` },
                    { done: false, priority: "low", text: `Recognize top performers — ${topCMs.length > 0 ? topCMs[0].name : "N/A"} leads with a score of ${topCMs.length > 0 ? topCMs[0].score : "N/A"}`, show: topCMs.length > 0 },
                    { done: false, priority: "low", text: `Submit weekly scorecard rollup to Mike & Javi` },
                  ].filter(item => item.show !== false).map((item, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 6,
                      background: item.priority === "critical" ? "#fef2f2" : item.priority === "high" ? "#fffbeb" : "#f8fafc",
                      border: `1px solid ${item.priority === "critical" ? "#fca5a5" : item.priority === "high" ? "#fde68a" : "#e5e7eb"}`,
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 4, border: "2px solid",
                        borderColor: item.priority === "critical" ? "#ef4444" : item.priority === "high" ? "#f59e0b" : "#d1d5db",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0,
                      }}>
                      </div>
                      <div style={{ flex: 1, fontSize: 11, color: "#1B2A4A", fontWeight: item.priority === "critical" ? 600 : 400 }}>{item.text}</div>
                      <span style={{
                        padding: "2px 6px", borderRadius: 8, fontSize: 8, fontWeight: 700, textTransform: "uppercase",
                        background: item.priority === "critical" ? "#ef4444" : item.priority === "high" ? "#f59e0b" : item.priority === "medium" ? "#3B7DD8" : "#6b7280",
                        color: "white",
                      }}>{item.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══ REVENUE IMPACT ═══ */}
        {view === "revenue" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "white", borderRadius: 10, padding: 20, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>💰 Revenue Impact Calculator</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 16 }}>Estimated revenue at risk based on current CM performance gaps. Assumes ${AVG_CONTRACT.toLocaleString()} average contract value.</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
                <div style={{ padding: 16, borderRadius: 10, background: "#fee2e2", border: "1px solid #fca5a5" }}>
                  <div style={{ fontSize: 10, color: "#991b1b", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Untouched Lead Revenue at Risk</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#991b1b" }}>${revenueImpact.untouchedRev.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#991b1b", marginTop: 4 }}>{revenueImpact.untouched} leads × 8% est. conversion × ${AVG_CONTRACT.toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: "#b91c1c", marginTop: 6, fontStyle: "italic" }}>These are veterans who reached out and got nothing.</div>
                </div>
                <div style={{ padding: 16, borderRadius: 10, background: "#fef9c3", border: "1px solid #fde68a" }}>
                  <div style={{ fontSize: 10, color: "#854d0e", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Missed Call Gap Revenue</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#854d0e" }}>${revenueImpact.callGapRev.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#854d0e", marginTop: 4 }}>{revenueImpact.missedCalls} calls below 50/day minimum × 3% conversion</div>
                  <div style={{ fontSize: 10, color: "#92400e", marginTop: 6, fontStyle: "italic" }}>Every missed call is a missed conversation that could convert.</div>
                </div>
                <div style={{ padding: 16, borderRadius: 10, background: "#fef3c7", border: "1px solid #fde68a" }}>
                  <div style={{ fontSize: 10, color: "#854d0e", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>CSA Not-Closed-on-Call Leakage</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#854d0e" }}>${revenueImpact.csaLeakRev.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#854d0e", marginTop: 4 }}>{revenueImpact.noCloseCount} CMs sending CSAs instead of closing live × 40% drop-off</div>
                  <div style={{ fontSize: 10, color: "#92400e", marginTop: 6, fontStyle: "italic" }}>CSAs sent but not signed on-call have ~40% lower completion rate.</div>
                </div>
              </div>

              <div style={{ padding: 20, borderRadius: 10, background: "linear-gradient(135deg, #1B2A4A, #2C3E6B)", color: "white", textAlign: "center" }}>
                <div style={{ fontSize: 11, opacity: 0.7, textTransform: "uppercase", fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>Total Estimated Monthly Revenue at Risk</div>
                <div style={{ fontSize: 42, fontWeight: 700 }}>${revenueImpact.total.toLocaleString()}</div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Based on current performance gaps across {brand === "All" ? "all brands" : brand}</div>
                <div style={{ fontSize: 11, opacity: 0.5, marginTop: 8 }}>* Conservative estimates. Actual impact may be higher when accounting for referral loss and brand reputation.</div>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>CMs Contributing Most to Revenue Leakage</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["CM", "Brand", "Untouched", "Est. Lost Rev", "Calls Gap", "Score", "Action Needed"].map(h => (
                      <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CMS.filter(cm => cm.score < 40 && (brand === "All" || cm.brand === brand)).sort((a,b) => b.untouched - a.untouched).map((cm, i) => {
                    const lostRev = Math.round(cm.untouched * 0.08 * AVG_CONTRACT);
                    const callGap = Math.max(0, 50 - cm.calls);
                    return (
                      <tr key={cm.name} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 1 ? "#fafbfc" : "white", cursor: "pointer" }} onClick={() => setSelectedCM(cm)}>
                        <td style={{ padding: "8px 10px", fontWeight: 600, color: "#991b1b" }}>{cm.name}</td>
                        <td style={{ padding: "8px 10px" }}>{cm.brand}</td>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: "#991b1b" }}>{cm.untouched}</td>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: "#991b1b" }}>${lostRev.toLocaleString()}</td>
                        <td style={{ padding: "8px 10px", color: "#991b1b" }}>-{callGap} calls/day</td>
                        <td style={{ padding: "8px 10px" }}><span style={{ padding: "2px 6px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: "#fee2e2", color: "#991b1b" }}>{cm.score}</span></td>
                        <td style={{ padding: "8px 10px", fontSize: 10, color: "#991b1b" }}>
                          {cm.untouched > 50 ? "Redistribute leads immediately" : cm.calls < 20 ? "Verify with RingCentral — potential sandbagging" : "Stage 1 coaching"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ BRAND COMPARISON ═══ */}
        {view === "brands" && (() => {
          const bs = BRANDS.filter(b => b !== "All").map(b => {
            const cms = MOCK_CMS.filter(c => c.brand === b);
            if (!cms.length) return null;
            return {
              brand: b, n: cms.length,
              ac: Math.round(cms.reduce((s,c) => s+c.calls,0)/cms.length),
              at: (cms.reduce((s,c) => s+c.talkTime,0)/cms.length).toFixed(1),
              gp: cms.reduce((s,c) => s+c.gpvs,0),
              ut: cms.reduce((s,c) => s+c.untouched,0),
              as: Math.round(cms.reduce((s,c) => s+c.score,0)/cms.length),
              gPct: Math.round(cms.filter(c => c.score >= 70).length/cms.length*100),
              rPct: Math.round(cms.filter(c => c.score < 40).length/cms.length*100),
              rev: Math.round(cms.reduce((s,c) => s+c.untouched,0) * 0.08 * AVG_CONTRACT),
            };
          }).filter(Boolean).sort((a,b) => b.as - a.as);

          return (
            <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>🏢 Brand Comparison — Ranked by Avg Score</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["#","Brand","CMs","Avg Calls","Avg Talk","GPVs","Untouched","Rev at Risk","Avg Score","% Green","% Red"].map(h => (
                        <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bs.map((b, i) => {
                      const st = getStatus(b.as);
                      return (
                        <tr key={b.brand} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 1 ? "#fafbfc" : "white" }}>
                          <td style={{ padding: "8px 10px", fontWeight: 700, fontSize: 13 }}>#{i+1}</td>
                          <td style={{ padding: "8px 10px", fontWeight: 700 }}>{b.brand}</td>
                          <td style={{ padding: "8px 10px" }}>{b.n}</td>
                          <td style={{ padding: "8px 10px", fontWeight: 600, color: b.ac >= 50 ? "#166534" : b.ac >= 35 ? "#854d0e" : "#991b1b" }}>{b.ac}</td>
                          <td style={{ padding: "8px 10px" }}>{b.at}h</td>
                          <td style={{ padding: "8px 10px", fontWeight: 700 }}>{b.gp}</td>
                          <td style={{ padding: "8px 10px" }}>
                            <span style={{ padding: "1px 6px", borderRadius: 3, fontSize: 10, fontWeight: 600, background: b.ut > 40 ? "#fee2e2" : b.ut > 15 ? "#fef9c3" : "#dcfce7", color: b.ut > 40 ? "#991b1b" : b.ut > 15 ? "#854d0e" : "#166534" }}>{b.ut}</span>
                          </td>
                          <td style={{ padding: "8px 10px", fontWeight: 600, color: "#991b1b" }}>${b.rev.toLocaleString()}</td>
                          <td style={{ padding: "8px 10px" }}><span style={{ padding: "2px 8px", borderRadius: 16, fontSize: 10, fontWeight: 700, background: st.bg, color: st.text }}>{b.as}</span></td>
                          <td style={{ padding: "8px 10px", fontWeight: 600, color: "#166534" }}>{b.gPct}%</td>
                          <td style={{ padding: "8px 10px", fontWeight: 600, color: b.rPct > 0 ? "#991b1b" : "#166534" }}>{b.rPct}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* ═══ TRENDS ═══ */}
        {view === "trends" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "white", borderRadius: 10, padding: 20, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 14 }}>Weekly Call Volume</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 160 }}>
                {WEEKLY.map(d => (
                  <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A" }}>{d.totalCalls}</span>
                    <div style={{ width: "100%", maxWidth: 60, height: (d.totalCalls/900)*140, borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg, #3B7DD8, #2C3E6B)" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280" }}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ flex: 1, background: "white", borderRadius: 10, padding: 20, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 14 }}>Daily GPVs</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 120 }}>
                  {WEEKLY.map(d => (
                    <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#2D8B4E" }}>{d.totalGPVs}</span>
                      <div style={{ width: "100%", maxWidth: 50, height: (d.totalGPVs/10)*100, borderRadius: "6px 6px 0 0", background: "#2D8B4E" }} />
                      <span style={{ fontSize: 11, color: "#6b7280" }}>{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, background: "white", borderRadius: 10, padding: 20, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 14 }}>Avg Talk Time</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 120 }}>
                  {WEEKLY.map(d => (
                    <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: d.avgTalkTime >= 3 ? "#6C3FA0" : "#D4860B" }}>{d.avgTalkTime}h</span>
                      <div style={{ width: "100%", maxWidth: 50, height: (d.avgTalkTime/4)*100, borderRadius: "6px 6px 0 0", background: d.avgTalkTime >= 3 ? "#6C3FA0" : "#D4860B" }} />
                      <span style={{ fontSize: 11, color: "#6b7280" }}>{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 16, padding: 12, background: "#f0f9ff", borderRadius: 8, borderLeft: "3px solid #3B7DD8" }}>
          <div style={{ fontSize: 11, color: "#1B2A4A", fontWeight: 600 }}>💡 Sample Dashboard — GTM Veteran Consulting</div>
          <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>
            With RingCentral API + ZEP CRM integration, this auto-populates daily. Zero manual entry. Tony opens it every morning and sees everything.
          </div>
        </div>
      </div>
    </div>
  );
}