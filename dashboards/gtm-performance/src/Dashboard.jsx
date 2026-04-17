import { useState, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// REAL DATA FROM GLOBALTEKMED — Week of 2026-04-04 to 2026-04-10
// CM Rankings pulled 4/13/2026 from Chris (IT)
// 33 CMs (19 INC + 14 FTF) + 85 CMAs
// PassGP, Actions, Calls = REAL | Talk time, untouched, CSA details = synthesized pending full CRM feed
// ═══════════════════════════════════════════════════════════════

const MOCK_CMS = [
  // ═══ INC CMs ═══
  { id: 1, name: "Cesar Sanchez", brand: "VDC", type: "INC", rank: 1, calls: 65, talkTime: 4.2, pipeline: 48, contacted: 45, gpvs: 16, csaClosed: 12, csaSent: 4, untouched: 3, score: 96, weekHistory: [88,91,85,94,96], gpvHistory: [12,14,11,15,16], passGP: 16, fileToVa: 9, tPsych: 9, actions: 335, realCalls: 323, leads: [
    { name: "Lead #4821", status: "GPV Submitted", daysInPipeline: 12, lastContact: 0 },
    { name: "Lead #4837", status: "Docs Received", daysInPipeline: 5, lastContact: 1 },
    { name: "Lead #4842", status: "CSA Signed", daysInPipeline: 3, lastContact: 0 },
  ]},
  { id: 2, name: "Patricia Seary", brand: "VO", type: "INC", rank: 2, calls: 53, talkTime: 3.1, pipeline: 42, contacted: 36, gpvs: 12, csaClosed: 8, csaSent: 4, untouched: 8, score: 78, weekHistory: [72,74,76,77,78], gpvHistory: [9,10,11,11,12], passGP: 12, fileToVa: 5, tPsych: 7, actions: 190, realCalls: 267, leads: []},
  { id: 3, name: "Eric Torres", brand: "VAC", type: "INC", rank: 3, calls: 51, talkTime: 3.0, pipeline: 44, contacted: 38, gpvs: 11, csaClosed: 8, csaSent: 3, untouched: 5, score: 82, weekHistory: [76,78,79,81,82], gpvHistory: [8,9,10,11,11], passGP: 11, fileToVa: 15, tPsych: 15, actions: 161, realCalls: 254, leads: []},
  { id: 4, name: "Victoria Wood", brand: "VAC", type: "INC", rank: 4, calls: 80, talkTime: 4.0, pipeline: 52, contacted: 46, gpvs: 11, csaClosed: 9, csaSent: 2, untouched: 4, score: 88, weekHistory: [82,84,85,87,88], gpvHistory: [8,9,10,11,11], passGP: 11, fileToVa: 4, tPsych: 6, actions: 412, realCalls: 399, leads: []},
  { id: 5, name: "Jonathan Rivera", brand: "VAC", type: "INC", rank: 5, calls: 25, talkTime: 1.8, pipeline: 38, contacted: 30, gpvs: 10, csaClosed: 7, csaSent: 3, untouched: 10, score: 68, weekHistory: [62,64,66,67,68], gpvHistory: [7,8,9,9,10], passGP: 10, fileToVa: 14, tPsych: 7, actions: 137, realCalls: 126, leads: []},
  { id: 6, name: "Vanessa James", brand: "VAC", type: "INC", rank: 6, calls: 33, talkTime: 2.4, pipeline: 40, contacted: 32, gpvs: 10, csaClosed: 7, csaSent: 3, untouched: 9, score: 72, weekHistory: [66,68,70,71,72], gpvHistory: [8,8,9,10,10], passGP: 10, fileToVa: 11, tPsych: 12, actions: 138, realCalls: 164, leads: []},
  { id: 7, name: "Paulina Guido", brand: "VRG", type: "INC", rank: 7, calls: 26, talkTime: 1.9, pipeline: 35, contacted: 28, gpvs: 10, csaClosed: 6, csaSent: 4, untouched: 7, score: 65, weekHistory: [60,62,63,64,65], gpvHistory: [7,8,9,9,10], passGP: 10, fileToVa: 8, tPsych: 2, actions: 182, realCalls: 130, leads: []},
  { id: 8, name: "Christian Meza", brand: "VAC", type: "INC", rank: 8, calls: 58, talkTime: 3.3, pipeline: 44, contacted: 36, gpvs: 10, csaClosed: 7, csaSent: 3, untouched: 6, score: 74, weekHistory: [68,70,71,73,74], gpvHistory: [7,8,9,9,10], passGP: 10, fileToVa: 5, tPsych: 9, actions: 284, realCalls: 291, leads: []},
  { id: 9, name: "Antonio Rodas", brand: "VAC", type: "INC", rank: 9, calls: 86, talkTime: 4.3, pipeline: 50, contacted: 42, gpvs: 9, csaClosed: 6, csaSent: 3, untouched: 5, score: 80, weekHistory: [74,76,77,79,80], gpvHistory: [7,8,8,9,9], passGP: 9, fileToVa: 5, tPsych: 7, actions: 535, realCalls: 429, leads: []},
  { id: 10, name: "Millie Murillo", brand: "VAC", type: "INC", rank: 10, calls: 65, talkTime: 3.5, pipeline: 42, contacted: 34, gpvs: 8, csaClosed: 5, csaSent: 3, untouched: 7, score: 70, weekHistory: [64,66,68,69,70], gpvHistory: [6,7,7,8,8], passGP: 8, fileToVa: 7, tPsych: 5, actions: 200, realCalls: 326, leads: []},
  { id: 11, name: "Shannon Florez", brand: "DVC", type: "INC", rank: 11, calls: 34, talkTime: 2.3, pipeline: 36, contacted: 28, gpvs: 7, csaClosed: 5, csaSent: 2, untouched: 9, score: 62, weekHistory: [56,58,59,61,62], gpvHistory: [5,6,6,7,7], passGP: 7, fileToVa: 5, tPsych: 8, actions: 145, realCalls: 169, leads: []},
  { id: 12, name: "Christopher Mark", brand: "VO", type: "INC", rank: 12, calls: 132, talkTime: 5.2, pipeline: 58, contacted: 52, gpvs: 6, csaClosed: 4, csaSent: 2, untouched: 4, score: 75, weekHistory: [70,72,73,74,75], gpvHistory: [5,5,6,6,6], passGP: 6, fileToVa: 6, tPsych: 4, actions: 663, realCalls: 661, leads: []},
  { id: 13, name: "Eddy Torres", brand: "VAC", type: "INC", rank: 13, calls: 27, talkTime: 1.9, pipeline: 34, contacted: 26, gpvs: 5, csaClosed: 3, csaSent: 2, untouched: 10, score: 55, weekHistory: [50,52,53,54,55], gpvHistory: [4,4,5,5,5], passGP: 5, fileToVa: 14, tPsych: 6, actions: 102, realCalls: 134, leads: []},
  { id: 14, name: "Enrique Diaz", brand: "DVC", type: "INC", rank: 14, calls: 53, talkTime: 3.0, pipeline: 38, contacted: 30, gpvs: 4, csaClosed: 3, csaSent: 1, untouched: 12, score: 52, weekHistory: [46,48,49,51,52], gpvHistory: [3,3,4,4,4], passGP: 4, fileToVa: 15, tPsych: 7, actions: 227, realCalls: 263, leads: []},
  { id: 15, name: "Stephanie Tebbetts", brand: "VAC", type: "INC", rank: 15, calls: 39, talkTime: 2.5, pipeline: 36, contacted: 26, gpvs: 4, csaClosed: 2, csaSent: 2, untouched: 14, score: 48, weekHistory: [44,45,46,47,48], gpvHistory: [3,3,4,4,4], passGP: 4, fileToVa: 9, tPsych: 8, actions: 107, realCalls: 193, leads: []},
  { id: 16, name: "Kellie Thalhamer", brand: "VO", type: "INC", rank: 16, calls: 138, talkTime: 5.5, pipeline: 60, contacted: 50, gpvs: 4, csaClosed: 3, csaSent: 1, untouched: 6, score: 68, weekHistory: [62,64,65,66,68], gpvHistory: [3,3,4,4,4], passGP: 4, fileToVa: 3, tPsych: 1, actions: 644, realCalls: 691, leads: []},
  { id: 17, name: "Michael Trout", brand: "DVC", type: "INC", rank: 17, calls: 81, talkTime: 4.0, pipeline: 44, contacted: 34, gpvs: 4, csaClosed: 2, csaSent: 2, untouched: 11, score: 58, weekHistory: [54,55,56,57,58], gpvHistory: [3,3,3,4,4], passGP: 4, fileToVa: 2, tPsych: 2, actions: 355, realCalls: 407, leads: []},
  { id: 18, name: "Alexis Lopez Apodaca", brand: "VRG", type: "INC", rank: 18, calls: 48, talkTime: 2.8, pipeline: 38, contacted: 24, gpvs: 2, csaClosed: 1, csaSent: 1, untouched: 18, score: 38, weekHistory: [42,40,39,38,38], gpvHistory: [1,1,2,2,2], passGP: 2, fileToVa: 3, tPsych: 2, actions: 324, realCalls: 242, leads: []},
  { id: 19, name: "Ashlynne Shafer", brand: "VRG", type: "INC", rank: 19, calls: 67, talkTime: 3.6, pipeline: 42, contacted: 26, gpvs: 2, csaClosed: 1, csaSent: 1, untouched: 20, score: 35, weekHistory: [40,38,37,36,35], gpvHistory: [1,1,2,2,2], passGP: 2, fileToVa: 0, tPsych: 2, actions: 300, realCalls: 337, leads: []},

  // ═══ FTF CMs ═══
  { id: 20, name: "Abby Miller", brand: "MULTI", type: "FTF", rank: 1, calls: 48, talkTime: 2.8, pipeline: 40, contacted: 34, gpvs: 12, csaClosed: 9, csaSent: 3, untouched: 4, score: 90, weekHistory: [82,84,86,88,90], gpvHistory: [9,10,11,11,12], passGP: 12, fileToVa: 15, tPsych: 0, actions: 275, realCalls: 240, leads: []},
  { id: 21, name: "Carlos Jaimes", brand: "VDA", type: "FTF", rank: 2, calls: 23, talkTime: 1.6, pipeline: 32, contacted: 26, gpvs: 12, csaClosed: 9, csaSent: 3, untouched: 5, score: 76, weekHistory: [70,72,74,75,76], gpvHistory: [9,10,11,11,12], passGP: 12, fileToVa: 9, tPsych: 0, actions: 112, realCalls: 113, leads: []},
  { id: 22, name: "Sabrina Lopez", brand: "MULTI", type: "FTF", rank: 3, calls: 40, talkTime: 2.4, pipeline: 36, contacted: 30, gpvs: 12, csaClosed: 8, csaSent: 4, untouched: 6, score: 84, weekHistory: [78,80,81,83,84], gpvHistory: [9,10,10,11,12], passGP: 12, fileToVa: 3, tPsych: 0, actions: 215, realCalls: 200, leads: []},
  { id: 23, name: "Naely Serrano", brand: "AVC", type: "FTF", rank: 4, calls: 79, talkTime: 3.9, pipeline: 48, contacted: 40, gpvs: 11, csaClosed: 8, csaSent: 3, untouched: 5, score: 85, weekHistory: [79,81,82,84,85], gpvHistory: [8,9,10,10,11], passGP: 11, fileToVa: 11, tPsych: 0, actions: 317, realCalls: 396, leads: []},
  { id: 24, name: "Cecilia Beltran", brand: "VDA", type: "FTF", rank: 5, calls: 15, talkTime: 1.2, pipeline: 28, contacted: 22, gpvs: 10, csaClosed: 7, csaSent: 3, untouched: 7, score: 64, weekHistory: [58,60,61,63,64], gpvHistory: [7,8,9,9,10], passGP: 10, fileToVa: 6, tPsych: 0, actions: 71, realCalls: 74, leads: []},
  { id: 25, name: "Kristen Wilkinson", brand: "VDR", type: "FTF", rank: 6, calls: 62, talkTime: 3.5, pipeline: 42, contacted: 34, gpvs: 9, csaClosed: 7, csaSent: 2, untouched: 6, score: 78, weekHistory: [72,74,76,77,78], gpvHistory: [6,7,8,8,9], passGP: 9, fileToVa: 11, tPsych: 4, actions: 295, realCalls: 308, leads: []},
  { id: 26, name: "Omar Alami", brand: "VDA", type: "FTF", rank: 7, calls: 17, talkTime: 1.3, pipeline: 28, contacted: 22, gpvs: 9, csaClosed: 6, csaSent: 3, untouched: 7, score: 60, weekHistory: [54,56,57,59,60], gpvHistory: [7,8,8,9,9], passGP: 9, fileToVa: 8, tPsych: 0, actions: 98, realCalls: 86, leads: []},
  { id: 27, name: "Erik Burgin", brand: "AVC", type: "FTF", rank: 8, calls: 63, talkTime: 3.4, pipeline: 40, contacted: 30, gpvs: 9, csaClosed: 5, csaSent: 4, untouched: 10, score: 66, weekHistory: [60,62,63,65,66], gpvHistory: [6,7,8,8,9], passGP: 9, fileToVa: 5, tPsych: 0, actions: 233, realCalls: 313, leads: []},
  { id: 28, name: "Kahari Reese", brand: "MULTI", type: "FTF", rank: 9, calls: 59, talkTime: 3.2, pipeline: 38, contacted: 30, gpvs: 7, csaClosed: 5, csaSent: 2, untouched: 9, score: 68, weekHistory: [62,64,65,67,68], gpvHistory: [5,6,6,7,7], passGP: 7, fileToVa: 11, tPsych: 0, actions: 250, realCalls: 297, leads: []},
  { id: 29, name: "Eric Oconnor", brand: "MULTI", type: "FTF", rank: 10, calls: 21, talkTime: 1.5, pipeline: 30, contacted: 22, gpvs: 7, csaClosed: 4, csaSent: 3, untouched: 10, score: 55, weekHistory: [50,51,52,54,55], gpvHistory: [5,5,6,6,7], passGP: 7, fileToVa: 2, tPsych: 0, actions: 177, realCalls: 104, leads: []},
  { id: 30, name: "Vanessa Zapata", brand: "VDR", type: "FTF", rank: 11, calls: 65, talkTime: 3.4, pipeline: 42, contacted: 32, gpvs: 6, csaClosed: 4, csaSent: 2, untouched: 10, score: 62, weekHistory: [56,58,59,61,62], gpvHistory: [4,5,5,6,6], passGP: 6, fileToVa: 14, tPsych: 1, actions: 232, realCalls: 323, leads: []},
  { id: 31, name: "Edward De Los Reyes", brand: "MULTI", type: "FTF", rank: 12, calls: 30, talkTime: 2.0, pipeline: 32, contacted: 22, gpvs: 6, csaClosed: 4, csaSent: 2, untouched: 12, score: 50, weekHistory: [45,46,47,49,50], gpvHistory: [4,5,5,6,6], passGP: 6, fileToVa: 5, tPsych: 0, actions: 41, realCalls: 151, leads: []},
  { id: 32, name: "Matthew Recce", brand: "VDR", type: "FTF", rank: 13, calls: 53, talkTime: 3.0, pipeline: 42, contacted: 30, gpvs: 3, csaClosed: 2, csaSent: 1, untouched: 14, score: 42, weekHistory: [38,40,41,41,42], gpvHistory: [2,2,3,3,3], passGP: 3, fileToVa: 4, tPsych: 1, actions: 99, realCalls: 265, leads: []},
  { id: 33, name: "Kimberly Montoya", brand: "AVC", type: "FTF", rank: 14, calls: 26, talkTime: 1.8, pipeline: 36, contacted: 18, gpvs: 1, csaClosed: 0, csaSent: 1, untouched: 28, score: 22, weekHistory: [28,26,24,23,22], gpvHistory: [0,1,0,1,1], passGP: 1, fileToVa: 1, tPsych: 0, actions: 87, realCalls: 129, leads: [
    { name: "Lead #8129", status: "New Lead", daysInPipeline: 8, lastContact: 8 },
    { name: "Lead #8143", status: "New Lead", daysInPipeline: 6, lastContact: 6 },
    { name: "Lead #8156", status: "Contacted", daysInPipeline: 12, lastContact: 5 },
  ]},
];

// ═══════════════════════════════════════════════════════════════
// 85 REAL CMAS from Chris's data — ranked by composite performance
// Balto score, total calls, talk time, and total actions are REAL
// ═══════════════════════════════════════════════════════════════

const MOCK_CMAS = [
  // Top performers (Rank 1-20)
  { id: 101, rank: 1, name: "Paulina Cano", brand: "VDC", assignedCM: "Cesar Sanchez", baltoScore: null, inbound: 20, outbound: 230, totalCalls: 260, talkTime: 82, totalActions: 3, uniqueLeads: 269, clockedHrs: 226, casesPrepped: 100, docFollowups: 14, newLeads: 9, preApptCalls: 6, fqcMonitored: 4, invoicesFollowed: 8, outboundCalls: 230, crmCurrent: true, score: 97, weekHistory: [92,94,95,96,97], morningPrepOnTime: true, tasks: [
    { task: "Prepped 48 cases for Cesar Sanchez", time: "8:22 AM", status: "Complete" },
    { task: "Doc follow-up: 14 cases contacted", time: "9:45 AM", status: "Complete" },
    { task: "New lead outreach: 9 calls completed", time: "10:30 AM", status: "Complete" },
  ]},
  { id: 102, rank: 2, name: "Jacquelyn Cabral", brand: "VRG", assignedCM: "Paulina Guido", baltoScore: 75.0, totalCalls: 108, talkTime: 152, totalActions: 1, uniqueLeads: 129, clockedHrs: 126, casesPrepped: 98, docFollowups: 12, newLeads: 7, preApptCalls: 5, fqcMonitored: 3, invoicesFollowed: 6, outboundCalls: 100, crmCurrent: true, score: 95, weekHistory: [90,92,93,94,95], morningPrepOnTime: true, tasks: []},
  { id: 103, rank: 3, name: "Shevon George", brand: "VAC", assignedCM: "Eric Torres", baltoScore: 78.6, totalCalls: 42, talkTime: 72, totalActions: 1, uniqueLeads: 96, clockedHrs: 58, casesPrepped: 96, docFollowups: 11, newLeads: 6, preApptCalls: 4, fqcMonitored: 3, invoicesFollowed: 5, outboundCalls: 40, crmCurrent: true, score: 93, weekHistory: [87,89,90,92,93], morningPrepOnTime: true, tasks: []},
  { id: 104, rank: 4, name: "Andrea Phillips", brand: "AVC", assignedCM: "Naely Serrano", baltoScore: 86.0, totalCalls: 71, talkTime: 93, totalActions: 1, uniqueLeads: 116, clockedHrs: 78, casesPrepped: 96, docFollowups: 11, newLeads: 5, preApptCalls: 4, fqcMonitored: 2, invoicesFollowed: 5, outboundCalls: 68, crmCurrent: true, score: 92, weekHistory: [86,88,89,91,92], morningPrepOnTime: true, tasks: []},
  { id: 105, rank: 5, name: "Devin Session", brand: "VAC", assignedCM: "Victoria Wood", baltoScore: null, totalCalls: 132, talkTime: 154, totalActions: 2, uniqueLeads: 71, clockedHrs: 77, casesPrepped: 95, docFollowups: 10, newLeads: 6, preApptCalls: 4, fqcMonitored: 3, invoicesFollowed: 4, outboundCalls: 130, crmCurrent: true, score: 91, weekHistory: [85,87,88,90,91], morningPrepOnTime: true, tasks: []},
  { id: 106, rank: 6, name: "Alexis Morales", brand: "VDC", assignedCM: "Cesar Sanchez", baltoScore: null, totalCalls: 79, talkTime: 222, totalActions: 1, uniqueLeads: 106, clockedHrs: 82, casesPrepped: 94, docFollowups: 10, newLeads: 5, preApptCalls: 4, fqcMonitored: 2, invoicesFollowed: 4, outboundCalls: 79, crmCurrent: true, score: 90, weekHistory: [84,86,87,89,90], morningPrepOnTime: true, tasks: []},
  { id: 107, rank: 7, name: "Alyssa Castillo", brand: "VAC", assignedCM: "Jonathan Rivera", baltoScore: 80.0, totalCalls: 96, talkTime: 126, totalActions: 4, uniqueLeads: 75, clockedHrs: 80, casesPrepped: 94, docFollowups: 10, newLeads: 5, preApptCalls: 3, fqcMonitored: 2, invoicesFollowed: 4, outboundCalls: 90, crmCurrent: true, score: 90, weekHistory: [84,86,87,89,90], morningPrepOnTime: true, tasks: []},
  { id: 108, rank: 8, name: "Gabby Serecrez", brand: "AVC", assignedCM: "Erik Burgin", baltoScore: null, totalCalls: 76, talkTime: 242, totalActions: 4, uniqueLeads: 95, clockedHrs: 96, casesPrepped: 93, docFollowups: 9, newLeads: 5, preApptCalls: 3, fqcMonitored: 2, invoicesFollowed: 4, outboundCalls: 73, crmCurrent: true, score: 89, weekHistory: [83,85,86,88,89], morningPrepOnTime: true, tasks: []},
  { id: 109, rank: 9, name: "Natalee Orr", brand: "VDR", assignedCM: "Kristen Wilkinson", baltoScore: null, totalCalls: 102, talkTime: 202, totalActions: 2, uniqueLeads: 49, clockedHrs: 100, casesPrepped: 92, docFollowups: 9, newLeads: 4, preApptCalls: 3, fqcMonitored: 2, invoicesFollowed: 3, outboundCalls: 100, crmCurrent: true, score: 88, weekHistory: [82,84,85,87,88], morningPrepOnTime: true, tasks: []},
  { id: 110, rank: 10, name: "Cassandra Acero", brand: "AVC", assignedCM: "Naely Serrano", baltoScore: 72.3, totalCalls: 51, talkTime: 254, totalActions: 2, uniqueLeads: 62, clockedHrs: 80, casesPrepped: 91, docFollowups: 8, newLeads: 4, preApptCalls: 3, fqcMonitored: 2, invoicesFollowed: 3, outboundCalls: 48, crmCurrent: true, score: 87, weekHistory: [81,83,84,86,87], morningPrepOnTime: true, tasks: []},
  { id: 111, rank: 11, name: "Jesus Armendariz", brand: "DVC", assignedCM: "Shannon Florez", baltoScore: 100.0, totalCalls: 49, talkTime: 53, totalActions: 2, uniqueLeads: 93, clockedHrs: 74, casesPrepped: 90, docFollowups: 8, newLeads: 4, preApptCalls: 3, fqcMonitored: 2, invoicesFollowed: 3, outboundCalls: 45, crmCurrent: true, score: 86, weekHistory: [80,82,83,85,86], morningPrepOnTime: true, tasks: []},
  { id: 112, rank: 12, name: "Tricia Rodriguez", brand: "VAC", assignedCM: "Christian Meza", baltoScore: null, totalCalls: 55, talkTime: 134, totalActions: 1, uniqueLeads: 83, clockedHrs: 66, casesPrepped: 90, docFollowups: 8, newLeads: 4, preApptCalls: 2, fqcMonitored: 2, invoicesFollowed: 3, outboundCalls: 52, crmCurrent: true, score: 85, weekHistory: [79,81,82,84,85], morningPrepOnTime: true, tasks: []},
  { id: 113, rank: 13, name: "Jose Morales", brand: "VOR", assignedCM: "Christopher Mark", baltoScore: null, totalCalls: 68, talkTime: 79, totalActions: 1, uniqueLeads: 61, clockedHrs: 85, casesPrepped: 88, docFollowups: 7, newLeads: 4, preApptCalls: 2, fqcMonitored: 2, invoicesFollowed: 3, outboundCalls: 66, crmCurrent: true, score: 84, weekHistory: [78,80,81,83,84], morningPrepOnTime: true, tasks: []},
  { id: 114, rank: 14, name: "Lauren Jennings", brand: "VDR", assignedCM: "Matthew Recce", baltoScore: 82.9, totalCalls: 45, talkTime: 43, totalActions: 2, uniqueLeads: 78, clockedHrs: 62, casesPrepped: 87, docFollowups: 7, newLeads: 3, preApptCalls: 2, fqcMonitored: 2, invoicesFollowed: 3, outboundCalls: 42, crmCurrent: true, score: 83, weekHistory: [77,79,80,82,83], morningPrepOnTime: true, tasks: []},
  { id: 115, rank: 15, name: "Meredith Gaxiola", brand: "AVC", assignedCM: "Erik Burgin", baltoScore: 70.3, totalCalls: 52, talkTime: 249, totalActions: 22, uniqueLeads: 80, clockedHrs: 81, casesPrepped: 86, docFollowups: 7, newLeads: 3, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 3, outboundCalls: 50, crmCurrent: true, score: 82, weekHistory: [76,78,79,81,82], morningPrepOnTime: true, tasks: []},
  { id: 116, rank: 16, name: "Vicky Smith", brand: "VDR", assignedCM: "Kristen Wilkinson", baltoScore: null, totalCalls: 80, talkTime: 95, totalActions: 4, uniqueLeads: 74, clockedHrs: 81, casesPrepped: 85, docFollowups: 7, newLeads: 3, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 78, crmCurrent: true, score: 81, weekHistory: [75,77,78,80,81], morningPrepOnTime: true, tasks: []},
  { id: 117, rank: 17, name: "Haevyn Council", brand: "AVC", assignedCM: "Kimberly Montoya", baltoScore: 55.7, totalCalls: 49, talkTime: 92, totalActions: 10, uniqueLeads: 77, clockedHrs: 79, casesPrepped: 84, docFollowups: 6, newLeads: 3, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 46, crmCurrent: true, score: 80, weekHistory: [74,76,77,79,80], morningPrepOnTime: true, tasks: []},
  { id: 118, rank: 18, name: "Navonce Taylor", brand: "AVC", assignedCM: "Naely Serrano", baltoScore: null, totalCalls: 139, talkTime: 141, totalActions: 5, uniqueLeads: 74, clockedHrs: 82, casesPrepped: 84, docFollowups: 6, newLeads: 3, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 136, crmCurrent: true, score: 79, weekHistory: [73,75,76,78,79], morningPrepOnTime: true, tasks: []},
  { id: 119, rank: 19, name: "Alexis Delgado", brand: "VAC", assignedCM: "Eric Torres", baltoScore: 62.5, totalCalls: 94, talkTime: 98, totalActions: 1, uniqueLeads: 62, clockedHrs: 80, casesPrepped: 83, docFollowups: 6, newLeads: 3, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 92, crmCurrent: true, score: 78, weekHistory: [72,74,75,77,78], morningPrepOnTime: true, tasks: []},
  { id: 120, rank: 20, name: "Jasmin Fuentes", brand: "VBCG", assignedCM: "Abby Miller", baltoScore: null, totalCalls: 33, talkTime: 45, totalActions: 1, uniqueLeads: 68, clockedHrs: 52, casesPrepped: 82, docFollowups: 6, newLeads: 3, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 30, crmCurrent: true, score: 77, weekHistory: [71,73,74,76,77], morningPrepOnTime: true, tasks: []},

  // Rank 21-40
  { id: 121, rank: 21, name: "Alissa Kokin", brand: "VDA", assignedCM: "Carlos Jaimes", baltoScore: 43.3, totalCalls: 22, talkTime: 74, totalActions: 3, uniqueLeads: 56, clockedHrs: 44, casesPrepped: 82, docFollowups: 6, newLeads: 3, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 20, crmCurrent: true, score: 76, weekHistory: [70,72,73,75,76], morningPrepOnTime: true, tasks: []},
  { id: 122, rank: 22, name: "Kelly Spencer", brand: "AVC", assignedCM: "Kimberly Montoya", baltoScore: 75.0, totalCalls: 107, talkTime: 109, totalActions: 2, uniqueLeads: 74, clockedHrs: 79, casesPrepped: 81, docFollowups: 5, newLeads: 2, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 105, crmCurrent: true, score: 75, weekHistory: [69,71,72,74,75], morningPrepOnTime: true, tasks: []},
  { id: 123, rank: 23, name: "Anna Vega", brand: "VAC", assignedCM: "Vanessa James", baltoScore: 84.3, totalCalls: 35, talkTime: 159, totalActions: 3, uniqueLeads: 67, clockedHrs: 58, casesPrepped: 80, docFollowups: 5, newLeads: 2, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 32, crmCurrent: true, score: 74, weekHistory: [68,70,71,73,74], morningPrepOnTime: true, tasks: []},
  { id: 124, rank: 24, name: "Claire Mejia", brand: "DVC", assignedCM: "Enrique Diaz", baltoScore: 79.2, totalCalls: 67, talkTime: 204, totalActions: 13, uniqueLeads: 56, clockedHrs: 78, casesPrepped: 80, docFollowups: 5, newLeads: 2, preApptCalls: 2, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 65, crmCurrent: true, score: 73, weekHistory: [67,69,70,72,73], morningPrepOnTime: true, tasks: []},
  { id: 125, rank: 25, name: "Kimberli Acevedo", brand: "VRG", assignedCM: "Ashlynne Shafer", baltoScore: 62.2, totalCalls: 47, talkTime: 63, totalActions: 8, uniqueLeads: 55, clockedHrs: 77, casesPrepped: 79, docFollowups: 5, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 45, crmCurrent: true, score: 72, weekHistory: [66,68,69,71,72], morningPrepOnTime: true, tasks: []},
  { id: 126, rank: 26, name: "Edward Sanchez", brand: "VDR", assignedCM: "Vanessa Zapata", baltoScore: null, totalCalls: 92, talkTime: 108, totalActions: 2, uniqueLeads: 56, clockedHrs: 79, casesPrepped: 78, docFollowups: 5, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 90, crmCurrent: true, score: 71, weekHistory: [65,67,68,70,71], morningPrepOnTime: true, tasks: []},
  { id: 127, rank: 27, name: "Victor Torres", brand: "AVC", assignedCM: "Erik Burgin", baltoScore: null, totalCalls: 71, talkTime: 75, totalActions: 9, uniqueLeads: 54, clockedHrs: 67, casesPrepped: 77, docFollowups: 5, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 2, outboundCalls: 70, crmCurrent: true, score: 70, weekHistory: [64,66,67,69,70], morningPrepOnTime: true, tasks: []},
  { id: 128, rank: 28, name: "Nayeli Carrabajal", brand: "VC", assignedCM: "Eric Torres", baltoScore: null, totalCalls: 23, talkTime: 40, totalActions: 3, uniqueLeads: 54, clockedHrs: 81, casesPrepped: 76, docFollowups: 4, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 22, crmCurrent: true, score: 69, weekHistory: [63,65,66,68,69], morningPrepOnTime: true, tasks: []},
  { id: 129, rank: 29, name: "Joseph Hopper", brand: "VAC", assignedCM: "Jonathan Rivera", baltoScore: 100.0, totalCalls: 56, talkTime: 68, totalActions: 4, uniqueLeads: 52, clockedHrs: 80, casesPrepped: 76, docFollowups: 4, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 54, crmCurrent: true, score: 68, weekHistory: [62,64,65,67,68], morningPrepOnTime: true, tasks: []},
  { id: 130, rank: 30, name: "Samantha Hernandez", brand: "VDR", assignedCM: "Vanessa Zapata", baltoScore: 80.3, totalCalls: 56, talkTime: 237, totalActions: 5, uniqueLeads: 50, clockedHrs: 80, casesPrepped: 75, docFollowups: 4, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 54, crmCurrent: true, score: 67, weekHistory: [61,63,64,66,67], morningPrepOnTime: true, tasks: []},
  { id: 131, rank: 31, name: "Katia Rodriguez", brand: "AVC", assignedCM: "Kimberly Montoya", baltoScore: null, totalCalls: 42, talkTime: 123, totalActions: 2, uniqueLeads: 48, clockedHrs: 59, casesPrepped: 75, docFollowups: 4, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 40, crmCurrent: true, score: 66, weekHistory: [60,62,63,65,66], morningPrepOnTime: true, tasks: []},
  { id: 132, rank: 32, name: "Jennifer Sisk", brand: "VAC", assignedCM: "Antonio Rodas", baltoScore: 76.7, totalCalls: 17, talkTime: 19, totalActions: 2, uniqueLeads: 48, clockedHrs: 84, casesPrepped: 74, docFollowups: 4, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 15, crmCurrent: true, score: 65, weekHistory: [59,61,62,64,65], morningPrepOnTime: true, tasks: []},
  { id: 133, rank: 33, name: "Destinie Jones", brand: "VDR", assignedCM: "Matthew Recce", baltoScore: 83.1, totalCalls: 73, talkTime: 102, totalActions: 6, uniqueLeads: 46, clockedHrs: 83, casesPrepped: 74, docFollowups: 4, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 70, crmCurrent: true, score: 64, weekHistory: [58,60,61,63,64], morningPrepOnTime: true, tasks: []},
  { id: 134, rank: 34, name: "Kaliyah Strickland", brand: "AVC", assignedCM: "Naely Serrano", baltoScore: 70.9, totalCalls: 51, talkTime: 69, totalActions: 53, uniqueLeads: 92, clockedHrs: 80, casesPrepped: 73, docFollowups: 4, newLeads: 2, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 48, crmCurrent: true, score: 63, weekHistory: [57,59,60,62,63], morningPrepOnTime: false, tasks: []},
  { id: 135, rank: 35, name: "Sergio Alegria", brand: "VAC", assignedCM: "Millie Murillo", baltoScore: null, totalCalls: 52, talkTime: 56, totalActions: 7, uniqueLeads: 44, clockedHrs: 80, casesPrepped: 72, docFollowups: 3, newLeads: 1, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 50, crmCurrent: true, score: 62, weekHistory: [56,58,59,61,62], morningPrepOnTime: false, tasks: []},
  { id: 136, rank: 36, name: "Jason Poteet", brand: "AVC", assignedCM: "Erik Burgin", baltoScore: 100.0, totalCalls: 43, talkTime: 48, totalActions: 3, uniqueLeads: 38, clockedHrs: 84, casesPrepped: 72, docFollowups: 3, newLeads: 1, preApptCalls: 1, fqcMonitored: 1, invoicesFollowed: 1, outboundCalls: 41, crmCurrent: true, score: 61, weekHistory: [55,57,58,60,61], morningPrepOnTime: false, tasks: []},
  { id: 137, rank: 37, name: "Alex Munoz", brand: "VAC", assignedCM: "Eric Torres", baltoScore: null, totalCalls: 13, talkTime: 23, totalActions: 1, uniqueLeads: 73, clockedHrs: 86, casesPrepped: 71, docFollowups: 3, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 12, crmCurrent: false, score: 60, weekHistory: [54,56,57,59,60], morningPrepOnTime: false, tasks: []},
  { id: 138, rank: 38, name: "Andrea Ozuna", brand: "AVC", assignedCM: "Naely Serrano", baltoScore: 70.7, totalCalls: 26, talkTime: 47, totalActions: 2, uniqueLeads: 43, clockedHrs: 82, casesPrepped: 70, docFollowups: 3, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 24, crmCurrent: false, score: 58, weekHistory: [52,54,55,57,58], morningPrepOnTime: false, tasks: []},
  { id: 139, rank: 39, name: "Marcos Nevarez", brand: "VAC", assignedCM: "Antonio Rodas", baltoScore: 76.7, totalCalls: 30, talkTime: 71, totalActions: 8, uniqueLeads: 40, clockedHrs: 80, casesPrepped: 70, docFollowups: 3, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 28, crmCurrent: false, score: 57, weekHistory: [51,53,54,56,57], morningPrepOnTime: false, tasks: []},
  { id: 140, rank: 40, name: "Emily Pimentel", brand: "VDA", assignedCM: "Omar Alami", baltoScore: 73.0, totalCalls: 22, talkTime: 44, totalActions: 1, uniqueLeads: 40, clockedHrs: 80, casesPrepped: 69, docFollowups: 3, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 20, crmCurrent: false, score: 56, weekHistory: [50,52,53,55,56], morningPrepOnTime: false, tasks: []},

  // Rank 41-60
  { id: 141, rank: 41, name: "Cynthia Santana", brand: "VAC", assignedCM: "Vanessa James", baltoScore: 74.3, totalCalls: 46, talkTime: 183, totalActions: 9, uniqueLeads: 42, clockedHrs: 78, casesPrepped: 68, docFollowups: 3, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 44, crmCurrent: false, score: 55, weekHistory: [49,51,52,54,55], morningPrepOnTime: false, tasks: []},
  { id: 142, rank: 42, name: "Isabella Almanza", brand: "DVC", assignedCM: "Shannon Florez", baltoScore: null, totalCalls: 39, talkTime: 33, totalActions: 5, uniqueLeads: 38, clockedHrs: 79, casesPrepped: 66, docFollowups: 3, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 37, crmCurrent: false, score: 54, weekHistory: [48,50,51,53,54], morningPrepOnTime: false, tasks: []},
  { id: 143, rank: 43, name: "Victorious Garcia", brand: "VAC", assignedCM: "Jonathan Rivera", baltoScore: 69.8, totalCalls: 36, talkTime: 38, totalActions: 11, uniqueLeads: 36, clockedHrs: 80, casesPrepped: 64, docFollowups: 2, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 34, crmCurrent: false, score: 53, weekHistory: [47,49,50,52,53], morningPrepOnTime: false, tasks: []},
  { id: 144, rank: 44, name: "Brendan Steiner", brand: "VAC", assignedCM: "Eddy Torres", baltoScore: 64.8, totalCalls: 23, talkTime: 271, totalActions: 2, uniqueLeads: 66, clockedHrs: 86, casesPrepped: 62, docFollowups: 2, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 21, crmCurrent: false, score: 52, weekHistory: [46,48,49,51,52], morningPrepOnTime: false, tasks: []},
  { id: 145, rank: 45, name: "Monique Ezell", brand: "VAC", assignedCM: "Stephanie Tebbetts", baltoScore: 80.0, totalCalls: 30, talkTime: 39, totalActions: 2, uniqueLeads: 29, clockedHrs: 80, casesPrepped: 60, docFollowups: 2, newLeads: 1, preApptCalls: 1, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 28, crmCurrent: false, score: 51, weekHistory: [45,47,48,50,51], morningPrepOnTime: false, tasks: []},
  { id: 146, rank: 46, name: "Andrew Gladen", brand: "VAC", assignedCM: "Christian Meza", baltoScore: 96.7, totalCalls: 32, talkTime: 56, totalActions: 8, uniqueLeads: 71, clockedHrs: 78, casesPrepped: 60, docFollowups: 2, newLeads: 1, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 1, outboundCalls: 30, crmCurrent: false, score: 50, weekHistory: [44,46,47,49,50], morningPrepOnTime: false, tasks: []},
  { id: 147, rank: 47, name: "Josue Heredia", brand: "DVC", assignedCM: "Michael Trout", baltoScore: 60.0, totalCalls: 54, talkTime: 109, totalActions: 9, uniqueLeads: 32, clockedHrs: 80, casesPrepped: 58, docFollowups: 2, newLeads: 1, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 52, crmCurrent: false, score: 49, weekHistory: [43,45,46,48,49], morningPrepOnTime: false, tasks: []},
  { id: 148, rank: 48, name: "Janet Herrera", brand: "VAC", assignedCM: "Eric Torres", baltoScore: 91.3, totalCalls: 29, talkTime: 41, totalActions: 11, uniqueLeads: 27, clockedHrs: 80, casesPrepped: 56, docFollowups: 2, newLeads: 1, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 27, crmCurrent: false, score: 48, weekHistory: [42,44,45,47,48], morningPrepOnTime: false, tasks: []},
  { id: 149, rank: 49, name: "Troy Gutierrez", brand: "VC", assignedCM: "Eric Torres", baltoScore: null, totalCalls: 12, talkTime: 29, totalActions: 1, uniqueLeads: 50, clockedHrs: 82, casesPrepped: 54, docFollowups: 2, newLeads: 1, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 10, crmCurrent: false, score: 47, weekHistory: [41,43,44,46,47], morningPrepOnTime: false, tasks: []},
  { id: 150, rank: 50, name: "Gabriela Schneider", brand: "AVC", assignedCM: "Erik Burgin", baltoScore: null, totalCalls: 22, talkTime: 40, totalActions: 3, uniqueLeads: 28, clockedHrs: 80, casesPrepped: 52, docFollowups: 2, newLeads: 1, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 20, crmCurrent: false, score: 46, weekHistory: [40,42,43,45,46], morningPrepOnTime: false, tasks: []},
  { id: 151, rank: 51, name: "Judie Smith", brand: "AVC", assignedCM: "Kimberly Montoya", baltoScore: 56.9, totalCalls: 16, talkTime: 32, totalActions: 8, uniqueLeads: 27, clockedHrs: 76, casesPrepped: 50, docFollowups: 2, newLeads: 1, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 14, crmCurrent: false, score: 45, weekHistory: [39,41,42,44,45], morningPrepOnTime: false, tasks: []},
  { id: 152, rank: 52, name: "Dannette Ruiz", brand: "VRG", assignedCM: "Alexis Lopez Apodaca", baltoScore: null, totalCalls: 26, talkTime: 26, totalActions: 5, uniqueLeads: 27, clockedHrs: 82, casesPrepped: 48, docFollowups: 2, newLeads: 1, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 24, crmCurrent: false, score: 44, weekHistory: [38,40,41,43,44], morningPrepOnTime: false, tasks: []},
  { id: 153, rank: 53, name: "Lina Mashaleh", brand: "AVC", assignedCM: "Naely Serrano", baltoScore: 64.9, totalCalls: 27, talkTime: 52, totalActions: 6, uniqueLeads: 19, clockedHrs: 94, casesPrepped: 46, docFollowups: 2, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 25, crmCurrent: false, score: 43, weekHistory: [37,39,40,42,43], morningPrepOnTime: false, tasks: []},
  { id: 154, rank: 54, name: "Ruby Gandara", brand: "VAC", assignedCM: "Vanessa James", baltoScore: 69.2, totalCalls: 44, talkTime: 58, totalActions: 16, uniqueLeads: 26, clockedHrs: 78, casesPrepped: 44, docFollowups: 2, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 42, crmCurrent: false, score: 42, weekHistory: [36,38,39,41,42], morningPrepOnTime: false, tasks: []},
  { id: 155, rank: 55, name: "Drakar Payne", brand: "VDR", assignedCM: "Kristen Wilkinson", baltoScore: null, totalCalls: 17, talkTime: 54, totalActions: 11, uniqueLeads: 20, clockedHrs: 80, casesPrepped: 42, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 15, crmCurrent: false, score: 41, weekHistory: [35,37,38,40,41], morningPrepOnTime: false, tasks: []},
  { id: 156, rank: 56, name: "Matthew Mena", brand: "VDA", assignedCM: "Carlos Jaimes", baltoScore: 46.0, totalCalls: 8, talkTime: 21, totalActions: 6, uniqueLeads: 25, clockedHrs: 80, casesPrepped: 40, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 6, crmCurrent: false, score: 40, weekHistory: [34,36,37,39,40], morningPrepOnTime: false, tasks: []},
  { id: 157, rank: 57, name: "Makayla Mouton", brand: "VAC", assignedCM: "Eddy Torres", baltoScore: 82.8, totalCalls: 16, talkTime: 41, totalActions: 5, uniqueLeads: 24, clockedHrs: 80, casesPrepped: 38, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 14, crmCurrent: false, score: 39, weekHistory: [33,35,36,38,39], morningPrepOnTime: false, tasks: []},
  { id: 158, rank: 58, name: "Baby Jaramillo", brand: "DVC", assignedCM: "Michael Trout", baltoScore: 83.3, totalCalls: 22, talkTime: 29, totalActions: 2, uniqueLeads: 18, clockedHrs: 80, casesPrepped: 36, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 20, crmCurrent: false, score: 38, weekHistory: [32,34,35,37,38], morningPrepOnTime: false, tasks: []},
  { id: 159, rank: 59, name: "Sierra Gonzalez", brand: "VDR", assignedCM: "Vanessa Zapata", baltoScore: 84.1, totalCalls: 19, talkTime: 60, totalActions: 17, uniqueLeads: 17, clockedHrs: 39, casesPrepped: 34, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 17, crmCurrent: false, score: 37, weekHistory: [31,33,34,36,37], morningPrepOnTime: false, tasks: []},
  { id: 160, rank: 60, name: "Chelsea Garcia", brand: "VDA", assignedCM: "Omar Alami", baltoScore: 72.7, totalCalls: 18, talkTime: 35, totalActions: 5, uniqueLeads: 23, clockedHrs: 80, casesPrepped: 32, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 16, crmCurrent: false, score: 36, weekHistory: [30,32,33,35,36], morningPrepOnTime: false, tasks: []},

  // Rank 61-85
  { id: 161, rank: 61, name: "Bria Olvera", brand: "AVC", assignedCM: "Naely Serrano", baltoScore: 66.7, totalCalls: 20, talkTime: 51, totalActions: 5, uniqueLeads: 21, clockedHrs: 80, casesPrepped: 31, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 18, crmCurrent: false, score: 35, weekHistory: [29,31,32,34,35], morningPrepOnTime: false, tasks: []},
  { id: 162, rank: 62, name: "Andy Rodriguez", brand: "VC", assignedCM: "Eric Torres", baltoScore: null, totalCalls: 4, talkTime: 20, totalActions: 5, uniqueLeads: 21, clockedHrs: 81, casesPrepped: 30, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 2, crmCurrent: false, score: 34, weekHistory: [28,30,31,33,34], morningPrepOnTime: false, tasks: []},
  { id: 163, rank: 63, name: "Skylar High", brand: "VDR", assignedCM: "Matthew Recce", baltoScore: 81.0, totalCalls: 33, talkTime: 237, totalActions: 10, uniqueLeads: 18, clockedHrs: 80, casesPrepped: 28, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 31, crmCurrent: false, score: 33, weekHistory: [27,29,30,32,33], morningPrepOnTime: false, tasks: []},
  { id: 164, rank: 64, name: "Daeja Perez", brand: "DVC", assignedCM: "Enrique Diaz", baltoScore: 69.3, totalCalls: 14, talkTime: 19, totalActions: 1, uniqueLeads: 18, clockedHrs: 88, casesPrepped: 26, docFollowups: 1, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 12, crmCurrent: false, score: 32, weekHistory: [26,28,29,31,32], morningPrepOnTime: false, tasks: []},
  { id: 165, rank: 65, name: "Veronica Alvarado", brand: "VO", assignedCM: "Kellie Thalhamer", baltoScore: 55.6, totalCalls: 29, talkTime: 348, totalActions: 3, uniqueLeads: 22, clockedHrs: 80, casesPrepped: 24, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 27, crmCurrent: false, score: 31, weekHistory: [25,27,28,30,31], morningPrepOnTime: false, tasks: []},
  { id: 166, rank: 66, name: "Tiffany Garancicsky", brand: "VDA", assignedCM: "Cecilia Beltran", baltoScore: 53.3, totalCalls: 8, talkTime: 50, totalActions: 4, uniqueLeads: 13, clockedHrs: 80, casesPrepped: 22, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 6, crmCurrent: false, score: 30, weekHistory: [24,26,27,29,30], morningPrepOnTime: false, tasks: []},
  { id: 167, rank: 67, name: "Lamar Grayson", brand: "VAC", assignedCM: "Millie Murillo", baltoScore: null, totalCalls: 22, talkTime: 245, totalActions: 22, uniqueLeads: 16, clockedHrs: 82, casesPrepped: 20, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 20, crmCurrent: false, score: 29, weekHistory: [23,25,26,28,29], morningPrepOnTime: false, tasks: []},
  { id: 168, rank: 68, name: "Kaitlynn Morales", brand: "VO", assignedCM: "Patricia Seary", baltoScore: 52.9, totalCalls: 14, talkTime: 361, totalActions: 20, uniqueLeads: 16, clockedHrs: 41, casesPrepped: 18, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 12, crmCurrent: false, score: 28, weekHistory: [22,24,25,27,28], morningPrepOnTime: false, tasks: []},
  { id: 169, rank: 69, name: "Blanca Casillas", brand: "VAC", assignedCM: "Christian Meza", baltoScore: 83.3, totalCalls: 24, talkTime: 33, totalActions: 2, uniqueLeads: 67, clockedHrs: 40, casesPrepped: 16, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 22, crmCurrent: false, score: 27, weekHistory: [21,23,24,26,27], morningPrepOnTime: false, tasks: []},
  { id: 170, rank: 70, name: "Vanessa Scott", brand: "VDC-FTF", assignedCM: "Cesar Sanchez", baltoScore: null, totalCalls: 1, talkTime: 2, totalActions: 1, uniqueLeads: 15, clockedHrs: 69, casesPrepped: 14, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 1, crmCurrent: false, score: 26, weekHistory: [20,22,23,25,26], morningPrepOnTime: false, tasks: []},
  { id: 171, rank: 71, name: "Ashley Vallejo", brand: "VDA", assignedCM: "Carlos Jaimes", baltoScore: 72.7, totalCalls: 18, talkTime: 44, totalActions: 2, uniqueLeads: 14, clockedHrs: 78, casesPrepped: 12, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 16, crmCurrent: false, score: 25, weekHistory: [19,21,22,24,25], morningPrepOnTime: false, tasks: []},
  { id: 172, rank: 72, name: "Tyshawnna Corley", brand: "VAC", assignedCM: "Eric Torres", baltoScore: 100.0, totalCalls: 16, talkTime: 19, totalActions: 2, uniqueLeads: 14, clockedHrs: 65, casesPrepped: 10, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 14, crmCurrent: false, score: 24, weekHistory: [18,20,21,23,24], morningPrepOnTime: false, tasks: []},
  { id: 173, rank: 73, name: "Vanessa Scott", brand: "ER-FTF", assignedCM: "Erik Burgin", baltoScore: null, totalCalls: 9, talkTime: 7, totalActions: 1, uniqueLeads: 16, clockedHrs: 87, casesPrepped: 9, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 7, crmCurrent: false, score: 23, weekHistory: [17,19,20,22,23], morningPrepOnTime: false, tasks: []},
  { id: 174, rank: 74, name: "Natasha Davis", brand: "PVC", assignedCM: "Eric Torres", baltoScore: null, totalCalls: 11, talkTime: 0, totalActions: 1, uniqueLeads: 10, clockedHrs: 87, casesPrepped: 8, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 9, crmCurrent: false, score: 22, weekHistory: [16,18,19,21,22], morningPrepOnTime: false, tasks: []},
  { id: 175, rank: 75, name: "Vanessa Scott", brand: "PVC-FTF", assignedCM: "Kahari Reese", baltoScore: null, totalCalls: 1, talkTime: 1, totalActions: 1, uniqueLeads: 9, clockedHrs: 87, casesPrepped: 8, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 0, crmCurrent: false, score: 21, weekHistory: [15,17,18,20,21], morningPrepOnTime: false, tasks: []},
  { id: 176, rank: 76, name: "Elena Montes", brand: "VAC", assignedCM: "Jonathan Rivera", baltoScore: 80.0, totalCalls: 15, talkTime: 26, totalActions: 6, uniqueLeads: 9, clockedHrs: 87, casesPrepped: 7, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 13, crmCurrent: false, score: 20, weekHistory: [14,16,17,19,20], morningPrepOnTime: false, tasks: []},
  { id: 177, rank: 77, name: "Ruben Nava", brand: "VDA", assignedCM: "Carlos Jaimes", baltoScore: 71.1, totalCalls: 8, talkTime: 26, totalActions: 1, uniqueLeads: 8, clockedHrs: 82, casesPrepped: 6, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 6, crmCurrent: false, score: 19, weekHistory: [13,15,16,18,19], morningPrepOnTime: false, tasks: []},
  { id: 178, rank: 78, name: "Latoya Chaffin", brand: "DVC", assignedCM: "Michael Trout", baltoScore: null, totalCalls: 1, talkTime: 1, totalActions: 1, uniqueLeads: 5, clockedHrs: 87, casesPrepped: 6, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 0, crmCurrent: false, score: 18, weekHistory: [12,14,15,17,18], morningPrepOnTime: false, tasks: []},
  { id: 179, rank: 79, name: "Vanessa Scott", brand: "VFCG", assignedCM: "Abby Miller", baltoScore: 76.0, totalCalls: 23, talkTime: 37, totalActions: 60, uniqueLeads: 4, clockedHrs: 87, casesPrepped: 5, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 21, crmCurrent: false, score: 17, weekHistory: [11,13,14,16,17], morningPrepOnTime: false, tasks: []},
  { id: 180, rank: 80, name: "John Hause", brand: "ER-FTF", assignedCM: "Erik Burgin", baltoScore: null, totalCalls: 1, talkTime: 1, totalActions: 1, uniqueLeads: 2, clockedHrs: 42, casesPrepped: 5, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 0, crmCurrent: false, score: 16, weekHistory: [10,12,13,15,16], morningPrepOnTime: false, tasks: []},
  { id: 181, rank: 81, name: "Cody Martinez", brand: "BP", assignedCM: "Abby Miller", baltoScore: null, totalCalls: 11, talkTime: 63, totalActions: 74, uniqueLeads: 19, clockedHrs: 87, casesPrepped: 4, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 9, crmCurrent: false, score: 15, weekHistory: [9,11,12,14,15], morningPrepOnTime: false, tasks: []},
  { id: 182, rank: 82, name: "Ruben Quesada", brand: "VFCG", assignedCM: "Abby Miller", baltoScore: 67.1, totalCalls: 13, talkTime: 76, totalActions: 89, uniqueLeads: 19, clockedHrs: 80, casesPrepped: 4, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 11, crmCurrent: false, score: 14, weekHistory: [8,10,11,13,14], morningPrepOnTime: false, tasks: []},
  { id: 183, rank: 83, name: "Chayenne Barrientos", brand: "BP", assignedCM: "Kahari Reese", baltoScore: null, totalCalls: 12, talkTime: 61, totalActions: 73, uniqueLeads: 11, clockedHrs: 80, casesPrepped: 3, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 10, crmCurrent: false, score: 13, weekHistory: [7,9,10,12,13], morningPrepOnTime: false, tasks: []},
  { id: 184, rank: 84, name: "David North", brand: "AVC", assignedCM: "Kimberly Montoya", baltoScore: null, totalCalls: 33, talkTime: 37, totalActions: 70, uniqueLeads: 17, clockedHrs: 80, casesPrepped: 2, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 31, crmCurrent: false, score: 12, weekHistory: [6,8,9,11,12], morningPrepOnTime: false, tasks: [
    { task: "Minimal case prep activity", time: "11:00 AM", status: "Late" },
    { task: "CRM notes outdated", time: "—", status: "Missing" },
    { task: "Zero new business leads", time: "—", status: "Missing" },
  ]},
  { id: 185, rank: 85, name: "Edwin Garcia", brand: "AVC", assignedCM: "Kimberly Montoya", baltoScore: null, totalCalls: 17, talkTime: 23, totalActions: 7, uniqueLeads: 8, clockedHrs: 88, casesPrepped: 2, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 15, crmCurrent: false, score: 10, weekHistory: [5,7,8,10,10], morningPrepOnTime: false, tasks: [
    { task: "Minimal case prep activity", time: "11:00 AM", status: "Late" },
    { task: "CRM notes outdated", time: "—", status: "Missing" },
    { task: "Zero new business leads", time: "—", status: "Missing" },
  ]},

  // Additional CMAs from screenshot rank 83-88 region
  { id: 186, rank: 83, name: "Matthew Youker", brand: "VDR", assignedCM: "Matthew Recce", baltoScore: null, totalCalls: 33, talkTime: 37, totalActions: 70, uniqueLeads: 17, clockedHrs: 80, casesPrepped: 28, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 31, crmCurrent: false, score: 11, weekHistory: [6,8,9,11,11], morningPrepOnTime: false, tasks: []},
  { id: 187, rank: 84, name: "Zain Rodriguez", brand: "VDR", assignedCM: "Vanessa Zapata", baltoScore: null, totalCalls: 28, talkTime: 28, totalActions: 8, uniqueLeads: 5, clockedHrs: 80, casesPrepped: 18, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 26, crmCurrent: false, score: 12, weekHistory: [7,9,10,11,12], morningPrepOnTime: false, tasks: []},
  { id: 188, rank: 86, name: "Mia Rutiaga", brand: "VAC", assignedCM: "Christian Meza", baltoScore: null, totalCalls: 24, talkTime: 0, totalActions: 2, uniqueLeads: 2, clockedHrs: 80, casesPrepped: 16, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 22, crmCurrent: false, score: 9, weekHistory: [4,6,7,9,9], morningPrepOnTime: false, tasks: []},
  { id: 189, rank: 87, name: "Alexes Geter", brand: "VO", assignedCM: "Patricia Seary", baltoScore: null, totalCalls: 23, talkTime: 0, totalActions: 8, uniqueLeads: 3, clockedHrs: 80, casesPrepped: 14, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 21, crmCurrent: false, score: 8, weekHistory: [3,5,6,8,8], morningPrepOnTime: false, tasks: []},

  // Pink section — ranks 89-97 (bottom tier)
  { id: 190, rank: 89, name: "John Hause", brand: "VFCG", assignedCM: "Abby Miller", baltoScore: 61.7, totalCalls: 3, talkTime: 11, totalActions: 14, uniqueLeads: 132, clockedHrs: 42, casesPrepped: 12, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 2, crmCurrent: false, score: 7, weekHistory: [2,4,5,7,7], morningPrepOnTime: false, tasks: []},
  { id: 191, rank: 90, name: "Andrea Carabajal", brand: "VAC", assignedCM: "Millie Murillo", baltoScore: null, totalCalls: 11, talkTime: 8, totalActions: 1, uniqueLeads: 6, clockedHrs: 80, casesPrepped: 10, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 9, crmCurrent: false, score: 7, weekHistory: [2,4,5,7,7], morningPrepOnTime: false, tasks: []},
  { id: 192, rank: 90, name: "Uriah Newsom", brand: "VAC", assignedCM: "Vanessa James", baltoScore: null, totalCalls: 11, talkTime: 0, totalActions: 1, uniqueLeads: 1, clockedHrs: 80, casesPrepped: 10, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 9, crmCurrent: false, score: 7, weekHistory: [2,4,5,7,7], morningPrepOnTime: false, tasks: []},
  { id: 193, rank: 91, name: "Brittany Narosky", brand: "VAC", assignedCM: "Eric Torres", baltoScore: null, totalCalls: 10, talkTime: 0, totalActions: 1, uniqueLeads: 1, clockedHrs: 82, casesPrepped: 8, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 8, crmCurrent: false, score: 6, weekHistory: [1,3,4,6,6], morningPrepOnTime: false, tasks: []},
  { id: 194, rank: 91, name: "Justine Jones", brand: "VAC", assignedCM: "Victoria Wood", baltoScore: null, totalCalls: 10, talkTime: 10, totalActions: 0, uniqueLeads: 0, clockedHrs: 80, casesPrepped: 7, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 8, crmCurrent: false, score: 6, weekHistory: [1,3,4,6,6], morningPrepOnTime: false, tasks: []},
  { id: 195, rank: 92, name: "Angelique Padilla", brand: "VDR", assignedCM: "Matthew Recce", baltoScore: null, totalCalls: 5, talkTime: 4, totalActions: 3, uniqueLeads: 5, clockedHrs: 82, casesPrepped: 6, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 3, crmCurrent: false, score: 5, weekHistory: [0,2,3,5,5], morningPrepOnTime: false, tasks: []},
  { id: 196, rank: 93, name: "Liliana Maldonado", brand: "VO", assignedCM: "Kellie Thalhamer", baltoScore: null, totalCalls: 4, talkTime: 4, totalActions: 3, uniqueLeads: 5, clockedHrs: 80, casesPrepped: 5, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 2, crmCurrent: false, score: 5, weekHistory: [0,2,3,5,5], morningPrepOnTime: false, tasks: []},
  { id: 197, rank: 94, name: "Peyton Tucker", brand: "AVC", assignedCM: "Kimberly Montoya", baltoScore: null, totalCalls: 4, talkTime: 2, totalActions: 1, uniqueLeads: 2, clockedHrs: 80, casesPrepped: 4, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 3, crmCurrent: false, score: 4, weekHistory: [0,1,2,4,4], morningPrepOnTime: false, tasks: []},
  { id: 198, rank: 94, name: "Christina McElhannon", brand: "VC", assignedCM: "Eric Torres", baltoScore: null, totalCalls: 3, talkTime: 1, totalActions: 2, uniqueLeads: 1, clockedHrs: 80, casesPrepped: 4, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 2, crmCurrent: false, score: 4, weekHistory: [0,1,2,4,4], morningPrepOnTime: false, tasks: []},
  { id: 199, rank: 95, name: "Melody Key", brand: "DVC", assignedCM: "Shannon Florez", baltoScore: null, totalCalls: 2, talkTime: 1, totalActions: 1, uniqueLeads: 2, clockedHrs: 80, casesPrepped: 3, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 1, crmCurrent: false, score: 3, weekHistory: [0,0,1,3,3], morningPrepOnTime: false, tasks: []},
  { id: 200, rank: 95, name: "Cythally Laguna", brand: "VAC", assignedCM: "Jonathan Rivera", baltoScore: null, totalCalls: 2, talkTime: 0, totalActions: 1, uniqueLeads: 1, clockedHrs: 80, casesPrepped: 3, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 1, crmCurrent: false, score: 3, weekHistory: [0,0,1,3,3], morningPrepOnTime: false, tasks: []},
  { id: 201, rank: 96, name: "Elisha McDaniel", brand: "VAC", assignedCM: "Antonio Rodas", baltoScore: null, totalCalls: 1, talkTime: 1, totalActions: 1, uniqueLeads: 1, clockedHrs: 80, casesPrepped: 2, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 0, crmCurrent: false, score: 2, weekHistory: [0,0,0,2,2], morningPrepOnTime: false, tasks: []},
  { id: 202, rank: 96, name: "Caliandra Mascarenhas Ribeiro", brand: "VAC", assignedCM: "Stephanie Tebbetts", baltoScore: null, totalCalls: 1, talkTime: 0, totalActions: 0, uniqueLeads: 0, clockedHrs: 80, casesPrepped: 2, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 0, crmCurrent: false, score: 2, weekHistory: [0,0,0,2,2], morningPrepOnTime: false, tasks: []},
  { id: 203, rank: 96, name: "Valeria Fitch", brand: "VAC", assignedCM: "Eddy Torres", baltoScore: null, totalCalls: 1, talkTime: 0, totalActions: 0, uniqueLeads: 0, clockedHrs: 80, casesPrepped: 2, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 0, crmCurrent: false, score: 2, weekHistory: [0,0,0,2,2], morningPrepOnTime: false, tasks: []},
  { id: 204, rank: 97, name: "Gabriella Cabrera", brand: "DVC", assignedCM: "Enrique Diaz", baltoScore: null, totalCalls: 0, talkTime: 0, totalActions: 0, uniqueLeads: 0, clockedHrs: 80, casesPrepped: 1, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 0, crmCurrent: false, score: 1, weekHistory: [0,0,0,1,1], morningPrepOnTime: false, tasks: []},
  { id: 205, rank: 97, name: "Brianna Hammond", brand: "VAC", assignedCM: "Millie Murillo", baltoScore: null, totalCalls: 0, talkTime: 0, totalActions: 0, uniqueLeads: 0, clockedHrs: 80, casesPrepped: 1, docFollowups: 0, newLeads: 0, preApptCalls: 0, fqcMonitored: 0, invoicesFollowed: 0, outboundCalls: 0, crmCurrent: false, score: 1, weekHistory: [0,0,0,1,1], morningPrepOnTime: false, tasks: []},
];

const WEEKLY = [
  { day: "Mon", totalCalls: 1812, totalGPVs: 42, avgTalkTime: 2.6 },
  { day: "Tue", totalCalls: 2145, totalGPVs: 58, avgTalkTime: 2.9 },
  { day: "Wed", totalCalls: 1998, totalGPVs: 51, avgTalkTime: 2.7 },
  { day: "Thu", totalCalls: 2281, totalGPVs: 65, avgTalkTime: 3.1 },
  { day: "Fri", totalCalls: 1687, totalGPVs: 47, avgTalkTime: 2.5 },
];

// All real brands from Chris's data
const BRANDS = ["All","VAC","VDC","VRG","DVC","VO","AVC","VDR","VDA","MULTI","VFCG","VBCG","BP","PVC","VC","ER-FTF","PVC-FTF","VDC-FTF"];
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

// Conversion funnel — dynamically built from MOCK_CMS so names always match
const CM_FUNNEL = MOCK_CMS.map(cm => ({
  cmId: cm.id,
  name: cm.name,
  brand: cm.brand,
  leadsAssigned: cm.pipeline + cm.untouched,
  contacted: cm.contacted,
  apptSet: Math.round(cm.contacted * 0.55),
  pitchDelivered: Math.round(cm.contacted * 0.48),
  csaSent: cm.csaClosed + cm.csaSent,
  csaSigned: cm.csaClosed,
  csaDeclined: Math.max(1, Math.round(cm.csaSent * 0.3)),
  csaNoShow: Math.max(0, Math.round(cm.csaSent * 0.2)),
  csaUnknown: cm.score < 50 ? Math.max(1, Math.round(cm.csaSent * 0.3)) : 0,
  gpvSubmitted: cm.gpvs,
  pitchVerified: cm.score >= 60,
  avgDaysToClose: cm.gpvs > 0 ? Math.round(25 - (cm.score / 10)) : 0,
}));

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

// ═══ YTD DATA from PowerBI rawData_Consultants (Jan 1 – Apr 17, 2026) ═══
const YTD_DATA = [{"id":9000,"name":"Brandon Stevens","role":"HIGH-CSA?","leads":1125,"inbound":1976,"outbound":0,"total":1976,"csaCreated":411,"csaSigned":410,"signRate":99.8,"gpvLeads":229,"referrals":0},{"id":9001,"name":"Ritchie Sanchez","role":"HIGH-CSA?","leads":1058,"inbound":1913,"outbound":52,"total":1965,"csaCreated":402,"csaSigned":402,"signRate":100.0,"gpvLeads":147,"referrals":2},{"id":9002,"name":"Eddy Torres","role":"CM-INC#13","leads":958,"inbound":1768,"outbound":339,"total":2107,"csaCreated":279,"csaSigned":278,"signRate":99.6,"gpvLeads":2051,"referrals":0},{"id":9003,"name":"Clint Russell","role":"HIGH-CSA?","leads":280,"inbound":0,"outbound":0,"total":0,"csaCreated":186,"csaSigned":184,"signRate":98.9,"gpvLeads":2143,"referrals":88},{"id":9004,"name":"Patricia Seary","role":"CM-INC#2","leads":147,"inbound":2057,"outbound":2443,"total":4500,"csaCreated":154,"csaSigned":154,"signRate":100.0,"gpvLeads":1072,"referrals":19},{"id":9005,"name":"Enrique Diaz","role":"CM-INC#14","leads":188,"inbound":1691,"outbound":1864,"total":3555,"csaCreated":164,"csaSigned":139,"signRate":84.8,"gpvLeads":1942,"referrals":0},{"id":9006,"name":"Paulina Guido","role":"CM-INC#7","leads":188,"inbound":1110,"outbound":1842,"total":2952,"csaCreated":156,"csaSigned":120,"signRate":76.9,"gpvLeads":1267,"referrals":65},{"id":9007,"name":"Shannon Florez","role":"CM-INC#11","leads":152,"inbound":1400,"outbound":1111,"total":2511,"csaCreated":121,"csaSigned":99,"signRate":81.8,"gpvLeads":1443,"referrals":0},{"id":9008,"name":"Jonathan Rivera","role":"CM-INC#5","leads":106,"inbound":1235,"outbound":806,"total":2041,"csaCreated":93,"csaSigned":93,"signRate":100.0,"gpvLeads":2036,"referrals":0},{"id":9009,"name":"Christopher Mark","role":"CM-INC#12","leads":180,"inbound":1414,"outbound":8384,"total":9798,"csaCreated":78,"csaSigned":77,"signRate":98.7,"gpvLeads":548,"referrals":0},{"id":9010,"name":"Elyse Hubbard","role":"HIGH-CSA?","leads":87,"inbound":0,"outbound":0,"total":0,"csaCreated":69,"csaSigned":69,"signRate":100.0,"gpvLeads":393,"referrals":5},{"id":9011,"name":"Alexandria Lewis","role":"HIGH-CSA?","leads":88,"inbound":0,"outbound":0,"total":0,"csaCreated":63,"csaSigned":63,"signRate":100.0,"gpvLeads":419,"referrals":0},{"id":9012,"name":"Heather Johnson","role":"HIGH-CSA?","leads":98,"inbound":0,"outbound":0,"total":0,"csaCreated":61,"csaSigned":61,"signRate":100.0,"gpvLeads":347,"referrals":0},{"id":9013,"name":"Robert Johnston","role":"HIGH-CSA?","leads":123,"inbound":0,"outbound":0,"total":0,"csaCreated":60,"csaSigned":58,"signRate":96.7,"gpvLeads":431,"referrals":2},{"id":9014,"name":"Kellie Thalhamer","role":"CM-INC#16","leads":71,"inbound":2084,"outbound":9318,"total":11402,"csaCreated":54,"csaSigned":54,"signRate":100.0,"gpvLeads":568,"referrals":5},{"id":9015,"name":"Garrett Schavier","role":"HIGH-CSA?","leads":60,"inbound":1579,"outbound":2388,"total":3967,"csaCreated":57,"csaSigned":50,"signRate":87.7,"gpvLeads":76,"referrals":9},{"id":9016,"name":"Bobby Leger","role":"PRODUCER","leads":63,"inbound":0,"outbound":0,"total":0,"csaCreated":49,"csaSigned":49,"signRate":100.0,"gpvLeads":245,"referrals":0},{"id":9017,"name":"Eric Torres","role":"CM-INC#3","leads":74,"inbound":3162,"outbound":861,"total":4023,"csaCreated":48,"csaSigned":48,"signRate":100.0,"gpvLeads":2191,"referrals":0},{"id":9018,"name":"Manny Martinez","role":"PRODUCER","leads":77,"inbound":0,"outbound":0,"total":0,"csaCreated":49,"csaSigned":48,"signRate":98.0,"gpvLeads":578,"referrals":18},{"id":9019,"name":"Ashlynne Shafer","role":"CM-INC#19","leads":82,"inbound":767,"outbound":4099,"total":4866,"csaCreated":67,"csaSigned":45,"signRate":67.2,"gpvLeads":79,"referrals":0},{"id":9020,"name":"Chris Goff","role":"PRODUCER","leads":109,"inbound":0,"outbound":0,"total":0,"csaCreated":51,"csaSigned":44,"signRate":86.3,"gpvLeads":321,"referrals":0},{"id":9021,"name":"Carolina Beresford","role":"PRODUCER","leads":88,"inbound":0,"outbound":0,"total":0,"csaCreated":43,"csaSigned":43,"signRate":100.0,"gpvLeads":412,"referrals":0},{"id":9022,"name":"Stephanie Tebbetts","role":"CM-INC#15","leads":66,"inbound":2690,"outbound":789,"total":3479,"csaCreated":42,"csaSigned":42,"signRate":100.0,"gpvLeads":1842,"referrals":1},{"id":9023,"name":"Isah Cruz","role":"PRODUCER","leads":79,"inbound":0,"outbound":0,"total":0,"csaCreated":41,"csaSigned":41,"signRate":100.0,"gpvLeads":690,"referrals":5},{"id":9024,"name":"Estevan Canciller","role":"PRODUCER","leads":65,"inbound":0,"outbound":0,"total":0,"csaCreated":39,"csaSigned":39,"signRate":100.0,"gpvLeads":565,"referrals":2},{"id":9025,"name":"L Glez","role":"SYSTEM","leads":0,"inbound":809,"outbound":690,"total":1499,"csaCreated":44,"csaSigned":38,"signRate":86.4,"gpvLeads":816,"referrals":0},{"id":9026,"name":"Jonathan Cooper","role":"PRODUCER","leads":45,"inbound":0,"outbound":0,"total":0,"csaCreated":39,"csaSigned":38,"signRate":97.4,"gpvLeads":507,"referrals":0},{"id":9027,"name":"Aaron Rhodes","role":"PRODUCER","leads":78,"inbound":277,"outbound":380,"total":657,"csaCreated":39,"csaSigned":37,"signRate":94.9,"gpvLeads":373,"referrals":0},{"id":9028,"name":"Esteban Moreno","role":"PRODUCER","leads":54,"inbound":754,"outbound":390,"total":1144,"csaCreated":46,"csaSigned":34,"signRate":73.9,"gpvLeads":418,"referrals":0},{"id":9029,"name":"Starr Leger","role":"PRODUCER","leads":78,"inbound":0,"outbound":0,"total":0,"csaCreated":34,"csaSigned":34,"signRate":100.0,"gpvLeads":188,"referrals":0},{"id":9030,"name":"Jd Mullen","role":"PRODUCER","leads":84,"inbound":0,"outbound":0,"total":0,"csaCreated":33,"csaSigned":33,"signRate":100.0,"gpvLeads":575,"referrals":0},{"id":9031,"name":"Miguel Martinez","role":"PRODUCER","leads":46,"inbound":0,"outbound":0,"total":0,"csaCreated":32,"csaSigned":32,"signRate":100.0,"gpvLeads":377,"referrals":2},{"id":9032,"name":"Julia Cox","role":"PRODUCER","leads":54,"inbound":0,"outbound":0,"total":0,"csaCreated":30,"csaSigned":30,"signRate":100.0,"gpvLeads":526,"referrals":1},{"id":9033,"name":"Jerehme Acosta","role":"PRODUCER","leads":77,"inbound":0,"outbound":0,"total":0,"csaCreated":25,"csaSigned":25,"signRate":100.0,"gpvLeads":360,"referrals":0},{"id":9034,"name":"Melly Lopez","role":"PRODUCER","leads":40,"inbound":0,"outbound":0,"total":0,"csaCreated":22,"csaSigned":22,"signRate":100.0,"gpvLeads":83,"referrals":0},{"id":9035,"name":"John Sise","role":"PRODUCER","leads":226,"inbound":517,"outbound":0,"total":517,"csaCreated":43,"csaSigned":22,"signRate":51.2,"gpvLeads":37,"referrals":0},{"id":9036,"name":"Cesar Sanchez","role":"CM-INC#1","leads":245,"inbound":1193,"outbound":4233,"total":5426,"csaCreated":21,"csaSigned":19,"signRate":90.5,"gpvLeads":1270,"referrals":0},{"id":9037,"name":"Horacio Celaya","role":"PRODUCER","leads":64,"inbound":0,"outbound":0,"total":0,"csaCreated":18,"csaSigned":18,"signRate":100.0,"gpvLeads":41,"referrals":2},{"id":9038,"name":"Liz Cisneros","role":"PRODUCER","leads":17,"inbound":0,"outbound":0,"total":0,"csaCreated":17,"csaSigned":17,"signRate":100.0,"gpvLeads":109,"referrals":0},{"id":9039,"name":"Jason Garcia","role":"PRODUCER","leads":54,"inbound":0,"outbound":0,"total":0,"csaCreated":17,"csaSigned":17,"signRate":100.0,"gpvLeads":260,"referrals":0},{"id":9040,"name":"Rick Raymond","role":"PRODUCER","leads":20,"inbound":0,"outbound":0,"total":0,"csaCreated":16,"csaSigned":16,"signRate":100.0,"gpvLeads":254,"referrals":0},{"id":9041,"name":"Krasimir Kolev","role":"PRODUCER","leads":43,"inbound":0,"outbound":0,"total":0,"csaCreated":27,"csaSigned":16,"signRate":59.3,"gpvLeads":101,"referrals":0},{"id":9042,"name":"Victor Baylon","role":"PRODUCER","leads":24,"inbound":0,"outbound":0,"total":0,"csaCreated":15,"csaSigned":15,"signRate":100.0,"gpvLeads":52,"referrals":0},{"id":9043,"name":"Michael Trout","role":"CM-INC#17","leads":23,"inbound":1406,"outbound":4987,"total":6393,"csaCreated":19,"csaSigned":15,"signRate":78.9,"gpvLeads":65,"referrals":2},{"id":9044,"name":"Dawn Luther","role":"PRODUCER","leads":53,"inbound":0,"outbound":0,"total":0,"csaCreated":14,"csaSigned":14,"signRate":100.0,"gpvLeads":39,"referrals":0},{"id":9045,"name":"Kristen Wilkinson","role":"CM-FTF#6","leads":254,"inbound":2146,"outbound":3245,"total":5391,"csaCreated":15,"csaSigned":14,"signRate":93.3,"gpvLeads":737,"referrals":3},{"id":9046,"name":"Jennifer Thomas","role":"PRODUCER","leads":66,"inbound":319,"outbound":321,"total":640,"csaCreated":14,"csaSigned":14,"signRate":100.0,"gpvLeads":180,"referrals":0},{"id":9047,"name":"David Scott","role":"PRODUCER","leads":37,"inbound":7,"outbound":0,"total":7,"csaCreated":13,"csaSigned":13,"signRate":100.0,"gpvLeads":198,"referrals":1},{"id":9048,"name":"Jesus Armendariz","role":"PRODUCER","leads":11,"inbound":1299,"outbound":3539,"total":4838,"csaCreated":14,"csaSigned":12,"signRate":85.7,"gpvLeads":50,"referrals":75},{"id":9049,"name":"Juan Rodriguez","role":"PRODUCER","leads":40,"inbound":0,"outbound":0,"total":0,"csaCreated":18,"csaSigned":12,"signRate":66.7,"gpvLeads":193,"referrals":2},{"id":9050,"name":"Christian Meza","role":"CM-INC#8","leads":142,"inbound":2373,"outbound":2565,"total":4938,"csaCreated":12,"csaSigned":12,"signRate":100.0,"gpvLeads":1742,"referrals":6},{"id":9051,"name":"Jackie Perez","role":"PRODUCER","leads":20,"inbound":0,"outbound":0,"total":0,"csaCreated":11,"csaSigned":11,"signRate":100.0,"gpvLeads":93,"referrals":0},{"id":9052,"name":"Vanessa James","role":"CM-INC#6","leads":29,"inbound":1538,"outbound":1232,"total":2770,"csaCreated":11,"csaSigned":11,"signRate":100.0,"gpvLeads":944,"referrals":1},{"id":9053,"name":"Nayeli Carbajal","role":"PRODUCER","leads":3,"inbound":1442,"outbound":1285,"total":2727,"csaCreated":11,"csaSigned":11,"signRate":100.0,"gpvLeads":87,"referrals":156},{"id":9054,"name":"Millie Murillo","role":"CM-INC#10","leads":13,"inbound":2196,"outbound":1644,"total":3840,"csaCreated":8,"csaSigned":8,"signRate":100.0,"gpvLeads":951,"referrals":16},{"id":9055,"name":"Kahari Reese","role":"CM-FTF#9","leads":427,"inbound":2002,"outbound":1709,"total":3711,"csaCreated":6,"csaSigned":6,"signRate":100.0,"gpvLeads":819,"referrals":0},{"id":9056,"name":"Delia Cardenas","role":"PRODUCER","leads":3,"inbound":281,"outbound":733,"total":1014,"csaCreated":5,"csaSigned":5,"signRate":100.0,"gpvLeads":134,"referrals":137},{"id":9057,"name":"Heidi Roxburgh","role":"PRODUCER","leads":4,"inbound":0,"outbound":0,"total":0,"csaCreated":5,"csaSigned":5,"signRate":100.0,"gpvLeads":37,"referrals":0},{"id":9058,"name":"Mia Rutiaga","role":"PRODUCER","leads":13,"inbound":2369,"outbound":2352,"total":4721,"csaCreated":4,"csaSigned":4,"signRate":100.0,"gpvLeads":0,"referrals":0},{"id":9059,"name":"Sabrina Lopez","role":"CM-FTF#3","leads":345,"inbound":0,"outbound":0,"total":0,"csaCreated":6,"csaSigned":4,"signRate":66.7,"gpvLeads":130,"referrals":95},{"id":9060,"name":"Victoria Wood","role":"CM-INC#4","leads":15,"inbound":3077,"outbound":2122,"total":5199,"csaCreated":4,"csaSigned":4,"signRate":100.0,"gpvLeads":912,"referrals":0},{"id":9061,"name":"Matthew Recce","role":"CM-FTF#13","leads":239,"inbound":2176,"outbound":3699,"total":5875,"csaCreated":8,"csaSigned":4,"signRate":50.0,"gpvLeads":341,"referrals":0},{"id":9062,"name":"Blanca Casillas","role":"PRODUCER","leads":6,"inbound":1826,"outbound":1166,"total":2992,"csaCreated":3,"csaSigned":3,"signRate":100.0,"gpvLeads":0,"referrals":0},{"id":9063,"name":"Marcos Nevarez","role":"PRODUCER","leads":5,"inbound":2622,"outbound":2222,"total":4844,"csaCreated":3,"csaSigned":3,"signRate":100.0,"gpvLeads":0,"referrals":0},{"id":9064,"name":"Vanessa Zapata","role":"CM-FTF#11","leads":293,"inbound":2521,"outbound":3024,"total":5545,"csaCreated":5,"csaSigned":3,"signRate":60.0,"gpvLeads":703,"referrals":122},{"id":9065,"name":"Alexis Lopez Apodaca","role":"CM-INC#18","leads":14,"inbound":920,"outbound":3110,"total":4030,"csaCreated":5,"csaSigned":3,"signRate":60.0,"gpvLeads":51,"referrals":0},{"id":9066,"name":"Elena Montes","role":"PRODUCER","leads":9,"inbound":716,"outbound":1122,"total":1838,"csaCreated":2,"csaSigned":2,"signRate":100.0,"gpvLeads":0,"referrals":0},{"id":9067,"name":"Daniel Martinez","role":"PRODUCER","leads":1976,"inbound":568,"outbound":1768,"total":2336,"csaCreated":4,"csaSigned":2,"signRate":50.0,"gpvLeads":460,"referrals":1},{"id":9068,"name":"Antonio Rodas","role":"CM-INC#9","leads":43,"inbound":1318,"outbound":3463,"total":4781,"csaCreated":2,"csaSigned":2,"signRate":100.0,"gpvLeads":740,"referrals":14},{"id":9069,"name":"Lizzy Lopez","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":2,"csaSigned":2,"signRate":100.0,"gpvLeads":39,"referrals":0},{"id":9070,"name":"Uriah Newsom","role":"HIGH-CALL?","leads":4,"inbound":942,"outbound":4832,"total":5774,"csaCreated":2,"csaSigned":2,"signRate":100.0,"gpvLeads":289,"referrals":0},{"id":9071,"name":"Ryan Sutton","role":"PRODUCER","leads":2,"inbound":38,"outbound":5,"total":43,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":63,"referrals":0},{"id":9072,"name":"Christina Deahl","role":"PRODUCER","leads":1,"inbound":0,"outbound":0,"total":0,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":0,"referrals":0},{"id":9073,"name":"Justin Figueroa","role":"PRODUCER","leads":1,"inbound":1970,"outbound":1587,"total":3557,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":0,"referrals":1},{"id":9074,"name":"Alyssa Castillo","role":"HIGH-CALL?","leads":2,"inbound":2244,"outbound":2863,"total":5107,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":0,"referrals":0},{"id":9075,"name":"Kaitlynn Morales","role":"PRODUCER","leads":1,"inbound":1777,"outbound":1029,"total":2806,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":0,"referrals":79},{"id":9076,"name":"Lizza Mota","role":"PRODUCER","leads":3,"inbound":892,"outbound":2075,"total":2967,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":0,"referrals":56},{"id":9077,"name":"Felix Brown","role":"SYSTEM","leads":1421,"inbound":0,"outbound":0,"total":0,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":358,"referrals":0},{"id":9078,"name":"Naely Serrano","role":"CM-FTF#4","leads":96,"inbound":2049,"outbound":2105,"total":4154,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":609,"referrals":0},{"id":9079,"name":"Elizabeth Cisneros","role":"PRODUCER","leads":15,"inbound":0,"outbound":0,"total":0,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":2,"referrals":11},{"id":9080,"name":"Keaton Wolfe","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":2,"referrals":0},{"id":9081,"name":"Erik Burgin","role":"CM-FTF#8","leads":66,"inbound":588,"outbound":3833,"total":4421,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":58,"referrals":0},{"id":9082,"name":"Tony Gonzalez","role":"PRODUCER","leads":296,"inbound":0,"outbound":0,"total":0,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":286,"referrals":0},{"id":9083,"name":"Eric Oconnor","role":"CM-FTF#10","leads":324,"inbound":1101,"outbound":1287,"total":2388,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":644,"referrals":8},{"id":9084,"name":"Cheryl White","role":"PRODUCER","leads":27,"inbound":122,"outbound":37,"total":159,"csaCreated":4,"csaSigned":1,"signRate":25.0,"gpvLeads":200,"referrals":0},{"id":9085,"name":"Angelique Padilla","role":"PRODUCER","leads":70,"inbound":1310,"outbound":3167,"total":4477,"csaCreated":1,"csaSigned":1,"signRate":100.0,"gpvLeads":5,"referrals":2},{"id":9086,"name":"Eric Anticola","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9087,"name":"Eric Curtis","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9088,"name":"Eric Frank","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9089,"name":"Fermin Sanchez","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9090,"name":"Francis Del Rosario","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9091,"name":"Eric Holt","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9092,"name":"Francisco Del Castillo","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9093,"name":"Florian Gavin Dalin","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9094,"name":"Eric Hyde","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9095,"name":"Enrique Montesinos","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9096,"name":"Fernando Sanchez","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9097,"name":"Emmanuel Stoner","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9098,"name":"Francisco Gonzalez Castillo","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9099,"name":"Erika Felix","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9100,"name":"Francisco Herrera Amezcua","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9101,"name":"Erin Zupko","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9102,"name":"Erik Duane Arce","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9103,"name":"Ernest Green","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9104,"name":"Eric Willams Ii","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9105,"name":"Ernesto Tarango","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9106,"name":"Felix Negron","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9107,"name":"Esteban Lobos","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9108,"name":"Esteban Marin","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9109,"name":"Eugene Loyd","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9110,"name":"Eric Rondeay","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9111,"name":"Evgeny Bibikov","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9112,"name":"Fadore Bing","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9113,"name":"Fantasia Thompson","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9114,"name":"Eric Jones","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9115,"name":"Eric Seth Nelson","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9116,"name":"George Karcher","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9117,"name":"George Nelson","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9118,"name":"Gerald Campbell","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9119,"name":"Elijah Sanchez","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9120,"name":"Hawa Ngaojia","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9121,"name":"Gustavo Hernandez","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9122,"name":"Guillermo Meza","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9123,"name":"Elizabeth De La Cruz","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9124,"name":"Gregory Newman","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9125,"name":"Geraldo Ngiraklang","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9126,"name":"Gregory L Proctor","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9127,"name":"Gerrit Gribble","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9128,"name":"Greg Cunningham","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9129,"name":"Gilberto A Padua","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9130,"name":"Giovanni Etling","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9131,"name":"Grace Viljoen","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9132,"name":"Gerald Gravelle","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9133,"name":"Frank Costa","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9134,"name":"Frank Magyar","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9135,"name":"Frankie Smalls Jr.","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9136,"name":"Franklin Samuels","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9137,"name":"Gabriel Correa Diaz","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9138,"name":"Gabriel Jean-Charles","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9139,"name":"Gabriel Manzueta","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9140,"name":"George Carl Williamson","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9141,"name":"Garrett Clemo","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9142,"name":"Garrett Forcum","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9143,"name":"Gary Mcdonald","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9144,"name":"Gary Stepien","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9145,"name":"Gary Williamson","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9146,"name":"Gaudencio Saucedo","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9147,"name":"Gen Li","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9148,"name":"Gene Bennett","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9149,"name":"Gardy Charlot","role":"UNKNOWN","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9150,"name":"Jory Chambers","role":"DIALER?","leads":1,"inbound":109,"outbound":25697,"total":25806,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9151,"name":"Norma Villalobos","role":"DIALER?","leads":0,"inbound":593,"outbound":21560,"total":22153,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9152,"name":"Kimberly Divens","role":"DIALER?","leads":0,"inbound":488,"outbound":18869,"total":19357,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9153,"name":"Nicole Smith","role":"DIALER?","leads":332,"inbound":688,"outbound":18013,"total":18701,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":1,"referrals":0},{"id":9154,"name":"Michaela Thorn","role":"DIALER?","leads":83,"inbound":222,"outbound":18451,"total":18673,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9155,"name":"Ebony Tuck-Cole","role":"DIALER?","leads":0,"inbound":281,"outbound":16059,"total":16340,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9156,"name":"Chelsie Wilson","role":"DIALER?","leads":83,"inbound":393,"outbound":15554,"total":15947,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9157,"name":"Paulina Cano","role":"DIALER?","leads":121,"inbound":2074,"outbound":13704,"total":15778,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":270,"referrals":273},{"id":9158,"name":"Grace Hanners","role":"DIALER?","leads":5,"inbound":436,"outbound":15053,"total":15489,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9159,"name":"Jessie Crawford","role":"DIALER?","leads":0,"inbound":311,"outbound":14887,"total":15198,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9160,"name":"Tiffany Roberts","role":"HIGH-CALL?","leads":0,"inbound":344,"outbound":14375,"total":14719,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9161,"name":"Sharon King","role":"HIGH-CALL?","leads":96,"inbound":233,"outbound":13669,"total":13902,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9162,"name":"Ashley Cavallaro","role":"HIGH-CALL?","leads":4,"inbound":450,"outbound":12992,"total":13442,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9163,"name":"Jessica Espinoza","role":"HIGH-CALL?","leads":102,"inbound":474,"outbound":12230,"total":12704,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9164,"name":"Alexes Geter","role":"HIGH-CALL?","leads":0,"inbound":1863,"outbound":8310,"total":10173,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9165,"name":"Amber Perry","role":"HIGH-CALL?","leads":0,"inbound":43,"outbound":7921,"total":7964,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9166,"name":"Jose Morales","role":"HIGH-CALL?","leads":0,"inbound":1966,"outbound":5076,"total":7042,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":567,"referrals":217},{"id":9167,"name":"Skylar High","role":"HIGH-CALL?","leads":0,"inbound":2680,"outbound":4191,"total":6871,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9168,"name":"Gabriela Schneider","role":"HIGH-CALL?","leads":0,"inbound":2567,"outbound":4242,"total":6809,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9169,"name":"Teviana Rollins","role":"HIGH-CALL?","leads":0,"inbound":65,"outbound":6660,"total":6725,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9170,"name":"Destinie Jones","role":"HIGH-CALL?","leads":0,"inbound":1800,"outbound":4768,"total":6568,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":2},{"id":9171,"name":"Liliana Maldonado","role":"HIGH-CALL?","leads":0,"inbound":769,"outbound":5670,"total":6439,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":23},{"id":9172,"name":"Vicky Smith","role":"HIGH-CALL?","leads":0,"inbound":1274,"outbound":5111,"total":6385,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9173,"name":"Jacquelyn Cabral","role":"HIGH-CALL?","leads":0,"inbound":575,"outbound":5742,"total":6317,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":16,"referrals":23},{"id":9174,"name":"Quincy Pratt","role":"HIGH-CALL?","leads":0,"inbound":344,"outbound":5863,"total":6207,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9175,"name":"David North","role":"HIGH-CALL?","leads":0,"inbound":1453,"outbound":4636,"total":6089,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9176,"name":"Kaliyah Strickland","role":"HIGH-CALL?","leads":0,"inbound":1908,"outbound":4079,"total":5987,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":13},{"id":9177,"name":"Alexis Delgado","role":"HIGH-CALL?","leads":2,"inbound":2230,"outbound":3743,"total":5973,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9178,"name":"Edwin Garcia","role":"HIGH-CALL?","leads":2,"inbound":1950,"outbound":3982,"total":5932,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9179,"name":"Shawnee Ward","role":"HIGH-CALL?","leads":0,"inbound":9,"outbound":5692,"total":5701,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9180,"name":"Gabby Serecerez","role":"HIGH-CALL?","leads":0,"inbound":576,"outbound":4841,"total":5417,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":11},{"id":9181,"name":"Vanessa Scott","role":"HIGH-CALL?","leads":72,"inbound":1764,"outbound":3647,"total":5411,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":11,"referrals":0},{"id":9182,"name":"Sierra Gonzalez","role":"HIGH-CALL?","leads":0,"inbound":3004,"outbound":2398,"total":5402,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9183,"name":"Madison Mouton","role":"HIGH-CALL?","leads":1,"inbound":2133,"outbound":3128,"total":5261,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9184,"name":"Andrea Phillips","role":"HIGH-CALL?","leads":1,"inbound":1823,"outbound":3367,"total":5190,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":163,"referrals":6},{"id":9185,"name":"Meredith Gaxiola","role":"HIGH-CALL?","leads":0,"inbound":1636,"outbound":3483,"total":5119,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":9,"referrals":49},{"id":9186,"name":"Bria Olvera","role":"HIGH-CALL?","leads":0,"inbound":1505,"outbound":3598,"total":5103,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9187,"name":"Sergio Alegria","role":"HIGH-CALL?","leads":0,"inbound":344,"outbound":4690,"total":5034,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9188,"name":"Shevon George","role":"UNKNOWN","leads":0,"inbound":1909,"outbound":3069,"total":4978,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":18},{"id":9189,"name":"Katia Rodriguez","role":"UNKNOWN","leads":0,"inbound":3068,"outbound":1802,"total":4870,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":4,"referrals":26},{"id":9190,"name":"Chayenne Barrientos","role":"UNKNOWN","leads":0,"inbound":1245,"outbound":3559,"total":4804,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9191,"name":"Cassandra Acero","role":"UNKNOWN","leads":0,"inbound":984,"outbound":3796,"total":4780,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9192,"name":"Brendan Steiner","role":"UNKNOWN","leads":0,"inbound":3125,"outbound":1651,"total":4776,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":42,"referrals":26},{"id":9193,"name":"Josue Heredia","role":"UNKNOWN","leads":0,"inbound":206,"outbound":4546,"total":4752,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9194,"name":"Zain Rodriguez","role":"UNKNOWN","leads":0,"inbound":1275,"outbound":3471,"total":4746,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9195,"name":"Ruby Gandara","role":"UNKNOWN","leads":0,"inbound":2488,"outbound":2246,"total":4734,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9196,"name":"Jennifer Sisk","role":"UNKNOWN","leads":0,"inbound":372,"outbound":4361,"total":4733,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9197,"name":"Samantha Hernandez","role":"UNKNOWN","leads":0,"inbound":1367,"outbound":3300,"total":4667,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9198,"name":"Andrea Ozuna","role":"UNKNOWN","leads":3,"inbound":2054,"outbound":2586,"total":4640,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":3,"referrals":0},{"id":9199,"name":"Lina Mashaleh","role":"UNKNOWN","leads":0,"inbound":1721,"outbound":2911,"total":4632,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":5},{"id":9200,"name":"Jude Smith","role":"UNKNOWN","leads":0,"inbound":1337,"outbound":3215,"total":4552,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9201,"name":"Ruben Quesada","role":"UNKNOWN","leads":0,"inbound":773,"outbound":3747,"total":4520,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9202,"name":"Cody Martinez","role":"UNKNOWN","leads":0,"inbound":906,"outbound":3539,"total":4445,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9203,"name":"Makayla Mouton","role":"UNKNOWN","leads":3,"inbound":1262,"outbound":3165,"total":4427,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":12,"referrals":0},{"id":9204,"name":"Lauren Jennings","role":"UNKNOWN","leads":67,"inbound":795,"outbound":3545,"total":4340,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":15,"referrals":0},{"id":9205,"name":"Kimberli Acevedo","role":"UNKNOWN","leads":0,"inbound":1215,"outbound":3117,"total":4332,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9206,"name":"Daeja Perez","role":"UNKNOWN","leads":0,"inbound":783,"outbound":3391,"total":4174,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":24},{"id":9207,"name":"Tiffany Garancosky","role":"UNKNOWN","leads":0,"inbound":1612,"outbound":2508,"total":4120,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9208,"name":"Edward Sanchez","role":"UNKNOWN","leads":0,"inbound":924,"outbound":3113,"total":4037,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9209,"name":"Cynthia Santana","role":"UNKNOWN","leads":0,"inbound":698,"outbound":3305,"total":4003,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9210,"name":"Tricia Rodriguez","role":"UNKNOWN","leads":2,"inbound":2667,"outbound":1272,"total":3939,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9211,"name":"Alexis Morales","role":"UNKNOWN","leads":0,"inbound":296,"outbound":3512,"total":3808,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":25},{"id":9212,"name":"Haevyn Council","role":"UNKNOWN","leads":7,"inbound":2088,"outbound":1711,"total":3799,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9213,"name":"Amber Olvera","role":"UNKNOWN","leads":0,"inbound":947,"outbound":2811,"total":3758,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9214,"name":"Natalie Orr","role":"UNKNOWN","leads":0,"inbound":1119,"outbound":2579,"total":3698,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9215,"name":"Abby Miller","role":"CM-FTF#1","leads":149,"inbound":1670,"outbound":2019,"total":3689,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":401,"referrals":38},{"id":9216,"name":"Kimberly Montoya","role":"CM-FTF#14","leads":8,"inbound":106,"outbound":3565,"total":3671,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":499,"referrals":42},{"id":9217,"name":"Michelle Sorise","role":"UNKNOWN","leads":0,"inbound":60,"outbound":3610,"total":3670,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9218,"name":"Andrew Gladen","role":"UNKNOWN","leads":2,"inbound":983,"outbound":2599,"total":3582,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9219,"name":"Janet Herrera","role":"UNKNOWN","leads":0,"inbound":1019,"outbound":2409,"total":3428,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9220,"name":"Matthew Youker","role":"UNKNOWN","leads":1,"inbound":1564,"outbound":1741,"total":3305,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9221,"name":"Baby Jaramillo","role":"UNKNOWN","leads":0,"inbound":290,"outbound":2965,"total":3255,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9222,"name":"Navonce Taylor","role":"UNKNOWN","leads":0,"inbound":167,"outbound":3079,"total":3246,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9223,"name":"Monique Ezell","role":"UNKNOWN","leads":0,"inbound":1184,"outbound":2054,"total":3238,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9224,"name":"Chelsea Garcia","role":"UNKNOWN","leads":0,"inbound":1337,"outbound":1761,"total":3098,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":1,"referrals":0},{"id":9225,"name":"Troy Gutierrez","role":"UNKNOWN","leads":0,"inbound":1052,"outbound":1955,"total":3007,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":11,"referrals":24},{"id":9226,"name":"Drakar Payne","role":"UNKNOWN","leads":0,"inbound":1060,"outbound":1871,"total":2931,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9227,"name":"John Hause","role":"UNKNOWN","leads":0,"inbound":1058,"outbound":1846,"total":2904,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9228,"name":"Ashley Vallejo","role":"UNKNOWN","leads":4,"inbound":1801,"outbound":1080,"total":2881,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9229,"name":"Justine Jones","role":"UNKNOWN","leads":6,"inbound":796,"outbound":2034,"total":2830,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9230,"name":"Alissa Kokin","role":"UNKNOWN","leads":11,"inbound":1345,"outbound":1456,"total":2801,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":2},{"id":9231,"name":"Anna Vega","role":"UNKNOWN","leads":4,"inbound":955,"outbound":1727,"total":2682,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9232,"name":"Edward De Los Reyes","role":"CM-FTF#12","leads":130,"inbound":2232,"outbound":435,"total":2667,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":2222,"referrals":69},{"id":9233,"name":"Matthew Mena","role":"UNKNOWN","leads":1,"inbound":1092,"outbound":1500,"total":2592,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9234,"name":"Alex Casian","role":"UNKNOWN","leads":1,"inbound":2061,"outbound":476,"total":2537,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9235,"name":"Emily Pimentel","role":"UNKNOWN","leads":0,"inbound":1092,"outbound":1337,"total":2429,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9236,"name":"Peyton Tucker","role":"UNKNOWN","leads":0,"inbound":74,"outbound":2192,"total":2266,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9237,"name":"Joseph Hopper","role":"UNKNOWN","leads":0,"inbound":420,"outbound":1811,"total":2231,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9238,"name":"Jasmin Fuentes","role":"UNKNOWN","leads":5,"inbound":637,"outbound":1483,"total":2120,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":18},{"id":9239,"name":"Isabella Almanza","role":"UNKNOWN","leads":0,"inbound":110,"outbound":2003,"total":2113,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9240,"name":"Andrea Carabajal","role":"UNKNOWN","leads":0,"inbound":1011,"outbound":938,"total":1949,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9241,"name":"Carlos Jaimes","role":"CM-FTF#2","leads":0,"inbound":1158,"outbound":732,"total":1890,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":418,"referrals":0},{"id":9242,"name":"Kelly Spencer","role":"UNKNOWN","leads":0,"inbound":36,"outbound":1753,"total":1789,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9243,"name":"Omar Alami","role":"CM-FTF#7","leads":9,"inbound":704,"outbound":964,"total":1668,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":406,"referrals":0},{"id":9244,"name":"Alex Munoz","role":"UNKNOWN","leads":0,"inbound":754,"outbound":885,"total":1639,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9245,"name":"Andy Rodriguez","role":"UNKNOWN","leads":0,"inbound":301,"outbound":1337,"total":1638,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9246,"name":"Lamar Grayson","role":"UNKNOWN","leads":1,"inbound":498,"outbound":1052,"total":1550,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9247,"name":"Ruben Nava","role":"UNKNOWN","leads":0,"inbound":1059,"outbound":403,"total":1462,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9248,"name":"Christina Mcelhannon","role":"UNKNOWN","leads":0,"inbound":179,"outbound":1277,"total":1456,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9249,"name":"Sam Glez","role":"SYSTEM","leads":0,"inbound":977,"outbound":478,"total":1455,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9250,"name":"Tyshawnna Corley","role":"UNKNOWN","leads":1,"inbound":107,"outbound":1347,"total":1454,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9251,"name":"Veronica Alvarado","role":"UNKNOWN","leads":0,"inbound":190,"outbound":1252,"total":1442,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":17},{"id":9252,"name":"Devin Session","role":"UNKNOWN","leads":0,"inbound":20,"outbound":1362,"total":1382,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":0},{"id":9253,"name":"Cecilia Beltran","role":"CM-FTF#5","leads":9,"inbound":677,"outbound":605,"total":1282,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":765,"referrals":0},{"id":9254,"name":"Claire Mejia","role":"UNKNOWN","leads":0,"inbound":149,"outbound":939,"total":1088,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":0,"referrals":1},{"id":9255,"name":"Susana Islas","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":1251,"referrals":0},{"id":9256,"name":"Victor Huerta","role":"PRODUCER","leads":175,"inbound":569,"outbound":0,"total":569,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":869,"referrals":0},{"id":9257,"name":"Chad Comfort","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":653,"referrals":0},{"id":9258,"name":"Starla Padilla","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":534,"referrals":0},{"id":9259,"name":"Kodie Martinez","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":491,"referrals":0},{"id":9260,"name":"Starr Shropshire","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":473,"referrals":217},{"id":9261,"name":"Chris Murphy","role":"PRODUCER","leads":59,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":447,"referrals":0},{"id":9262,"name":"Jesse Segura","role":"PRODUCER","leads":2,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":347,"referrals":0},{"id":9263,"name":"Viviana Barrera","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":192,"referrals":0},{"id":9264,"name":"Juliana","role":"SYSTEM","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":191,"referrals":0},{"id":9265,"name":"Kristen Hamilton","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":185,"referrals":194},{"id":9266,"name":"Steve Ung","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":142,"referrals":46},{"id":9267,"name":"Bradley Cloyd","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":125,"referrals":0},{"id":9268,"name":"Brittanie Butcher","role":"PRODUCER","leads":5,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":122,"referrals":13},{"id":9269,"name":"Michelle","role":"SYSTEM","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":84,"referrals":0},{"id":9270,"name":"Isabel Dominguez","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":80,"referrals":0},{"id":9271,"name":"Pamela Escalante","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":80,"referrals":0},{"id":9272,"name":"Eduardo Valdez","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":69,"referrals":55},{"id":9273,"name":"Meltem Kocak","role":"PRODUCER","leads":0,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":68,"referrals":15},{"id":9274,"name":"Matthew Colwell","role":"UNKNOWN","leads":15,"inbound":0,"outbound":0,"total":0,"csaCreated":0,"csaSigned":0,"signRate":0.0,"gpvLeads":48,"referrals":6}];

const YTD_TOTALS = {
  dateRange: "Jan 1 – Apr 17, 2026",
  totalLeads: 36313,
  totalCalls: 788105,
  totalInbound: 186374,
  totalOutbound: 601731,
  totalCSAsCreated: 3599,
  totalCSAsSigned: 3389,
  companySignRate: 94.2,
  totalGPVLeads: 53094,
  totalReferrals: 8579,
  activeUsers: 511,
  systemAccounts: 11,
  dialerFlagged: 10,
};


// ═══ ATTRIBUTION DATA — Who really did the work vs who got credit ═══
const ATTRIBUTION_DATA = [{"id":26825,"name":"Brandon Stevens","rankTag":"","role":"CLOSER","gpvLeads":224,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":405,"closesOwnGpv":0,"closesOthersGpv":399,"closesNoGpv":6,"totalCalls":376,"callConnected":0,"voicemail":190,"topClosers":[],"topOriginators":[{"name":"Victoria Wood","count":118},{"name":"Vanessa James","count":100},{"name":"Antonio Rodas","count":80}]},{"id":4125,"name":"Ritchie Sanchez","rankTag":"","role":"CLOSER","gpvLeads":146,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":401,"closesOwnGpv":0,"closesOthersGpv":394,"closesNoGpv":7,"totalCalls":392,"callConnected":10,"voicemail":56,"topClosers":[],"topOriginators":[{"name":"Stephanie Tebbetts","count":119},{"name":"Eric Torres","count":95},{"name":"Millie Murillo","count":84}]},{"id":65773,"name":"Eddy Torres","rankTag":"INC#13","role":"FULL-CYCLE","gpvLeads":1992,"gpvsClosedBySelf":108,"gpvsClosedByOther":13,"selfCloseRate":5.4,"csaCloses":278,"closesOwnGpv":108,"closesOthersGpv":161,"closesNoGpv":9,"totalCalls":347,"callConnected":40,"voicemail":159,"topClosers":[{"name":"Brandon Stevens","count":6},{"name":"Ritchie Sanchez","count":5},{"name":"Eric Torres","count":1}],"topOriginators":[{"name":"Christian Meza","count":96},{"name":"Jonathan Rivera","count":27},{"name":"Antonio Rodas","count":14}]},{"id":90137,"name":"Clint Russell","rankTag":"","role":"FULL-CYCLE","gpvLeads":2065,"gpvsClosedBySelf":175,"gpvsClosedByOther":0,"selfCloseRate":8.5,"csaCloses":184,"closesOwnGpv":175,"closesOthersGpv":0,"closesNoGpv":9,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":29000,"name":"Patricia Seary","rankTag":"INC#2","role":"FULL-CYCLE","gpvLeads":972,"gpvsClosedBySelf":151,"gpvsClosedByOther":1,"selfCloseRate":15.5,"csaCloses":154,"closesOwnGpv":148,"closesOthersGpv":3,"closesNoGpv":3,"totalCalls":1050,"callConnected":446,"voicemail":89,"topClosers":[{"name":"Kaitlynn Morales","count":1}],"topOriginators":[{"name":"Starla Padilla","count":1},{"name":"Eric Torres","count":1},{"name":"Naely Serrano","count":1}]},{"id":51126,"name":"Enrique Diaz","rankTag":"INC#14","role":"FULL-CYCLE","gpvLeads":1851,"gpvsClosedBySelf":125,"gpvsClosedByOther":8,"selfCloseRate":6.8,"csaCloses":138,"closesOwnGpv":125,"closesOthersGpv":12,"closesNoGpv":1,"totalCalls":696,"callConnected":403,"voicemail":64,"topClosers":[{"name":"John Sise","count":6},{"name":"Shannon Florez","count":2}],"topOriginators":[{"name":"Michael Trout","count":7},{"name":"Garrett Schavier","count":4},{"name":"Shannon Florez","count":1}]},{"id":92234,"name":"Paulina Guido","rankTag":"INC#7","role":"FULL-CYCLE","gpvLeads":1219,"gpvsClosedBySelf":115,"gpvsClosedByOther":0,"selfCloseRate":9.4,"csaCloses":117,"closesOwnGpv":115,"closesOthersGpv":0,"closesNoGpv":2,"totalCalls":536,"callConnected":321,"voicemail":40,"topClosers":[],"topOriginators":[]},{"id":93546,"name":"Shannon Florez","rankTag":"INC#11","role":"FULL-CYCLE","gpvLeads":1364,"gpvsClosedBySelf":84,"gpvsClosedByOther":3,"selfCloseRate":6.2,"csaCloses":99,"closesOwnGpv":84,"closesOthersGpv":12,"closesNoGpv":3,"totalCalls":477,"callConnected":216,"voicemail":42,"topClosers":[{"name":"John Sise","count":2},{"name":"Enrique Diaz","count":1}],"topOriginators":[{"name":"Garrett Schavier","count":5},{"name":"Michael Trout","count":5},{"name":"Enrique Diaz","count":2}]},{"id":48152,"name":"Jonathan Rivera","rankTag":"INC#5","role":"FULL-CYCLE","gpvLeads":1913,"gpvsClosedBySelf":65,"gpvsClosedByOther":103,"selfCloseRate":3.4,"csaCloses":93,"closesOwnGpv":62,"closesOthersGpv":30,"closesNoGpv":1,"totalCalls":419,"callConnected":165,"voicemail":120,"topClosers":[{"name":"Brandon Stevens","count":45},{"name":"Eddy Torres","count":27},{"name":"Ritchie Sanchez","count":24}],"topOriginators":[{"name":"Vanessa James","count":12},{"name":"Christian Meza","count":7},{"name":"Eric Torres","count":3}]},{"id":82103,"name":"Christopher Mark","rankTag":"INC#12","role":"FULL-CYCLE","gpvLeads":513,"gpvsClosedBySelf":76,"gpvsClosedByOther":0,"selfCloseRate":14.8,"csaCloses":77,"closesOwnGpv":75,"closesOthersGpv":1,"closesNoGpv":1,"totalCalls":2047,"callConnected":716,"voicemail":56,"topClosers":[],"topOriginators":[{"name":"Starr Shropshire","count":1}]},{"id":98224,"name":"Elyse Hubbard","rankTag":"","role":"FULL-CYCLE","gpvLeads":362,"gpvsClosedBySelf":64,"gpvsClosedByOther":0,"selfCloseRate":17.7,"csaCloses":69,"closesOwnGpv":64,"closesOthersGpv":0,"closesNoGpv":5,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":48906,"name":"Alexandria Lewis","rankTag":"","role":"FULL-CYCLE","gpvLeads":385,"gpvsClosedBySelf":62,"gpvsClosedByOther":0,"selfCloseRate":16.1,"csaCloses":63,"closesOwnGpv":62,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[{"name":"Jesse Segura","count":1}]},{"id":57400,"name":"Heather Johnson","rankTag":"","role":"FULL-CYCLE","gpvLeads":325,"gpvsClosedBySelf":59,"gpvsClosedByOther":1,"selfCloseRate":18.2,"csaCloses":60,"closesOwnGpv":59,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Heidi Roxburgh","count":1}],"topOriginators":[{"name":"Jesse Segura","count":1}]},{"id":43036,"name":"Robert Johnston","rankTag":"","role":"FULL-CYCLE","gpvLeads":424,"gpvsClosedBySelf":41,"gpvsClosedByOther":0,"selfCloseRate":9.7,"csaCloses":58,"closesOwnGpv":41,"closesOthersGpv":15,"closesNoGpv":2,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[{"name":"Lizzy Lopez","count":15}]},{"id":15163,"name":"Kellie Thalhamer","rankTag":"INC#16","role":"FULL-CYCLE","gpvLeads":532,"gpvsClosedBySelf":54,"gpvsClosedByOther":0,"selfCloseRate":10.2,"csaCloses":54,"closesOwnGpv":53,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":2491,"callConnected":760,"voicemail":147,"topClosers":[],"topOriginators":[{"name":"Starr Shropshire","count":1}]},{"id":62274,"name":"Garrett Schavier","rankTag":"","role":"FULL-CYCLE","gpvLeads":75,"gpvsClosedBySelf":49,"gpvsClosedByOther":15,"selfCloseRate":65.3,"csaCloses":50,"closesOwnGpv":49,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":1353,"callConnected":198,"voicemail":30,"topClosers":[{"name":"Shannon Florez","count":5},{"name":"John Sise","count":4},{"name":"Enrique Diaz","count":4}],"topOriginators":[]},{"id":33525,"name":"Eric Torres","rankTag":"INC#3","role":"FULL-CYCLE","gpvLeads":2073,"gpvsClosedBySelf":41,"gpvsClosedByOther":112,"selfCloseRate":2.0,"csaCloses":48,"closesOwnGpv":41,"closesOthersGpv":5,"closesNoGpv":2,"totalCalls":818,"callConnected":180,"voicemail":193,"topClosers":[{"name":"Ritchie Sanchez","count":97},{"name":"Brandon Stevens","count":4},{"name":"Mia Rutiaga","count":3}],"topOriginators":[{"name":"Jonathan Rivera","count":3},{"name":"Victoria Wood","count":1},{"name":"Eddy Torres","count":1}]},{"id":87038,"name":"Manny Martinez","rankTag":"","role":"FULL-CYCLE","gpvLeads":542,"gpvsClosedBySelf":48,"gpvsClosedByOther":0,"selfCloseRate":8.9,"csaCloses":48,"closesOwnGpv":48,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":50045,"name":"Bobby Leger","rankTag":"","role":"FULL-CYCLE","gpvLeads":239,"gpvsClosedBySelf":48,"gpvsClosedByOther":0,"selfCloseRate":20.1,"csaCloses":48,"closesOwnGpv":48,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":77672,"name":"Chris Goff","rankTag":"","role":"FULL-CYCLE","gpvLeads":305,"gpvsClosedBySelf":39,"gpvsClosedByOther":1,"selfCloseRate":12.8,"csaCloses":44,"closesOwnGpv":39,"closesOthersGpv":0,"closesNoGpv":5,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Christina Deahl","count":1}],"topOriginators":[]},{"id":14554,"name":"Carolina Beresford","rankTag":"","role":"FULL-CYCLE","gpvLeads":381,"gpvsClosedBySelf":43,"gpvsClosedByOther":0,"selfCloseRate":11.3,"csaCloses":43,"closesOwnGpv":43,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":55382,"name":"Ashlynne Shafer","rankTag":"INC#19","role":"FULL-CYCLE","gpvLeads":73,"gpvsClosedBySelf":43,"gpvsClosedByOther":5,"selfCloseRate":58.9,"csaCloses":43,"closesOwnGpv":42,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Esteban Moreno","count":5}],"topOriginators":[{"name":"Starla Padilla","count":1}]},{"id":35720,"name":"Stephanie Tebbetts","rankTag":"INC#15","role":"FULL-CYCLE","gpvLeads":1757,"gpvsClosedBySelf":36,"gpvsClosedByOther":130,"selfCloseRate":2.0,"csaCloses":42,"closesOwnGpv":36,"closesOthersGpv":6,"closesNoGpv":0,"totalCalls":715,"callConnected":162,"voicemail":149,"topClosers":[{"name":"Ritchie Sanchez","count":120},{"name":"Brandon Stevens","count":9},{"name":"Eddy Torres","count":1}],"topOriginators":[{"name":"Millie Murillo","count":3},{"name":"Antonio Rodas","count":1},{"name":"Eddy Torres","count":1}]},{"id":40630,"name":"Isah Cruz","rankTag":"","role":"FULL-CYCLE","gpvLeads":657,"gpvsClosedBySelf":40,"gpvsClosedByOther":1,"selfCloseRate":6.1,"csaCloses":41,"closesOwnGpv":40,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Julia Cox","count":1}],"topOriginators":[]},{"id":74316,"name":"Estevan Canciller","rankTag":"","role":"FULL-CYCLE","gpvLeads":532,"gpvsClosedBySelf":38,"gpvsClosedByOther":0,"selfCloseRate":7.1,"csaCloses":39,"closesOwnGpv":38,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":52843,"name":"L Glez","rankTag":"","role":"FULL-CYCLE","gpvLeads":785,"gpvsClosedBySelf":38,"gpvsClosedByOther":0,"selfCloseRate":4.8,"csaCloses":38,"closesOwnGpv":38,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":295,"callConnected":98,"voicemail":62,"topClosers":[],"topOriginators":[]},{"id":24241,"name":"Jonathan Cooper","rankTag":"","role":"FULL-CYCLE","gpvLeads":501,"gpvsClosedBySelf":37,"gpvsClosedByOther":0,"selfCloseRate":7.4,"csaCloses":38,"closesOwnGpv":37,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":56845,"name":"Aaron Rhodes","rankTag":"","role":"FULL-CYCLE","gpvLeads":369,"gpvsClosedBySelf":36,"gpvsClosedByOther":0,"selfCloseRate":9.8,"csaCloses":37,"closesOwnGpv":36,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":142,"callConnected":76,"voicemail":19,"topClosers":[],"topOriginators":[]},{"id":77617,"name":"Esteban Moreno","rankTag":"","role":"GPV-WORKER","gpvLeads":414,"gpvsClosedBySelf":8,"gpvsClosedByOther":0,"selfCloseRate":1.9,"csaCloses":34,"closesOwnGpv":5,"closesOthersGpv":25,"closesNoGpv":4,"totalCalls":202,"callConnected":90,"voicemail":56,"topClosers":[],"topOriginators":[{"name":"Alexis Lopez Apodaca","count":17},{"name":"Ashlynne Shafer","count":5},{"name":"Kristen Hamilton","count":3}]},{"id":83058,"name":"Starr Leger","rankTag":"","role":"FULL-CYCLE","gpvLeads":181,"gpvsClosedBySelf":33,"gpvsClosedByOther":0,"selfCloseRate":18.2,"csaCloses":34,"closesOwnGpv":33,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[{"name":"Jesse Segura","count":1}]},{"id":25320,"name":"Jd Mullen","rankTag":"","role":"FULL-CYCLE","gpvLeads":567,"gpvsClosedBySelf":32,"gpvsClosedByOther":0,"selfCloseRate":5.6,"csaCloses":33,"closesOwnGpv":32,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":56425,"name":"Miguel Martinez","rankTag":"","role":"FULL-CYCLE","gpvLeads":344,"gpvsClosedBySelf":31,"gpvsClosedByOther":0,"selfCloseRate":9.0,"csaCloses":32,"closesOwnGpv":31,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":7060,"name":"Julia Cox","rankTag":"","role":"FULL-CYCLE","gpvLeads":514,"gpvsClosedBySelf":28,"gpvsClosedByOther":0,"selfCloseRate":5.4,"csaCloses":30,"closesOwnGpv":28,"closesOthersGpv":1,"closesNoGpv":1,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[{"name":"Isah Cruz","count":1}]},{"id":85522,"name":"Jerehme Acosta","rankTag":"","role":"FULL-CYCLE","gpvLeads":356,"gpvsClosedBySelf":23,"gpvsClosedByOther":0,"selfCloseRate":6.5,"csaCloses":25,"closesOwnGpv":23,"closesOthersGpv":0,"closesNoGpv":2,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":83348,"name":"Melly Lopez","rankTag":"","role":"FULL-CYCLE","gpvLeads":73,"gpvsClosedBySelf":22,"gpvsClosedByOther":0,"selfCloseRate":30.1,"csaCloses":22,"closesOwnGpv":22,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":65143,"name":"John Sise","rankTag":"","role":"OCCASIONAL","gpvLeads":36,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":22,"closesOwnGpv":0,"closesOthersGpv":22,"closesNoGpv":0,"totalCalls":94,"callConnected":0,"voicemail":3,"topClosers":[],"topOriginators":[{"name":"Michael Trout","count":9},{"name":"Enrique Diaz","count":6},{"name":"Garrett Schavier","count":4}]},{"id":91325,"name":"Cesar Sanchez","rankTag":"INC#1","role":"FULL-CYCLE","gpvLeads":1220,"gpvsClosedBySelf":19,"gpvsClosedByOther":0,"selfCloseRate":1.6,"csaCloses":19,"closesOwnGpv":19,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1237,"callConnected":393,"voicemail":51,"topClosers":[],"topOriginators":[]},{"id":57223,"name":"Horacio Celaya","rankTag":"","role":"OCCASIONAL","gpvLeads":41,"gpvsClosedBySelf":18,"gpvsClosedByOther":0,"selfCloseRate":43.9,"csaCloses":18,"closesOwnGpv":18,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":85988,"name":"Jason Garcia","rankTag":"","role":"FULL-CYCLE","gpvLeads":255,"gpvsClosedBySelf":17,"gpvsClosedByOther":0,"selfCloseRate":6.7,"csaCloses":17,"closesOwnGpv":17,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":35871,"name":"Liz Cisneros","rankTag":"","role":"FULL-CYCLE","gpvLeads":106,"gpvsClosedBySelf":17,"gpvsClosedByOther":0,"selfCloseRate":16.0,"csaCloses":17,"closesOwnGpv":17,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":34085,"name":"Krasimir Kolev","rankTag":"","role":"FULL-CYCLE","gpvLeads":101,"gpvsClosedBySelf":16,"gpvsClosedByOther":0,"selfCloseRate":15.8,"csaCloses":16,"closesOwnGpv":16,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":16035,"name":"Rick Raymond","rankTag":"","role":"FULL-CYCLE","gpvLeads":245,"gpvsClosedBySelf":15,"gpvsClosedByOther":0,"selfCloseRate":6.1,"csaCloses":15,"closesOwnGpv":15,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":53577,"name":"Michael Trout","rankTag":"INC#17","role":"FULL-CYCLE","gpvLeads":65,"gpvsClosedBySelf":15,"gpvsClosedByOther":30,"selfCloseRate":23.1,"csaCloses":15,"closesOwnGpv":15,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1023,"callConnected":744,"voicemail":22,"topClosers":[{"name":"John Sise","count":9},{"name":"Jesus Armendariz","count":9},{"name":"Enrique Diaz","count":7}],"topOriginators":[]},{"id":64099,"name":"Victor Baylon","rankTag":"","role":"FULL-CYCLE","gpvLeads":52,"gpvsClosedBySelf":15,"gpvsClosedByOther":0,"selfCloseRate":28.8,"csaCloses":15,"closesOwnGpv":15,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":82060,"name":"Kristen Wilkinson","rankTag":"FTF#6","role":"FULL-CYCLE","gpvLeads":642,"gpvsClosedBySelf":12,"gpvsClosedByOther":0,"selfCloseRate":1.9,"csaCloses":14,"closesOwnGpv":12,"closesOthersGpv":0,"closesNoGpv":2,"totalCalls":1223,"callConnected":787,"voicemail":139,"topClosers":[],"topOriginators":[]},{"id":46335,"name":"Jennifer Thomas","rankTag":"","role":"FULL-CYCLE","gpvLeads":180,"gpvsClosedBySelf":13,"gpvsClosedByOther":0,"selfCloseRate":7.2,"csaCloses":14,"closesOwnGpv":13,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":92,"callConnected":37,"voicemail":30,"topClosers":[],"topOriginators":[]},{"id":16255,"name":"Dawn Luther","rankTag":"","role":"OCCASIONAL","gpvLeads":37,"gpvsClosedBySelf":13,"gpvsClosedByOther":0,"selfCloseRate":35.1,"csaCloses":14,"closesOwnGpv":13,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":97027,"name":"David Scott","rankTag":"","role":"FULL-CYCLE","gpvLeads":194,"gpvsClosedBySelf":13,"gpvsClosedByOther":0,"selfCloseRate":6.7,"csaCloses":13,"closesOwnGpv":13,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":65084,"name":"Christian Meza","rankTag":"INC#8","role":"FULL-CYCLE","gpvLeads":1647,"gpvsClosedBySelf":12,"gpvsClosedByOther":137,"selfCloseRate":0.7,"csaCloses":12,"closesOwnGpv":12,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":944,"callConnected":391,"voicemail":194,"topClosers":[{"name":"Eddy Torres","count":97},{"name":"Ritchie Sanchez","count":17},{"name":"Brandon Stevens","count":16}],"topOriginators":[]},{"id":41103,"name":"Juan Rodriguez","rankTag":"","role":"FULL-CYCLE","gpvLeads":189,"gpvsClosedBySelf":10,"gpvsClosedByOther":0,"selfCloseRate":5.3,"csaCloses":12,"closesOwnGpv":10,"closesOthersGpv":0,"closesNoGpv":2,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":90381,"name":"Jesus Armendariz","rankTag":"","role":"OCCASIONAL","gpvLeads":47,"gpvsClosedBySelf":1,"gpvsClosedByOther":1,"selfCloseRate":2.1,"csaCloses":12,"closesOwnGpv":1,"closesOthersGpv":11,"closesNoGpv":0,"totalCalls":1702,"callConnected":75,"voicemail":42,"topClosers":[{"name":"John Sise","count":1}],"topOriginators":[{"name":"Michael Trout","count":9},{"name":"Garrett Schavier","count":2}]},{"id":89792,"name":"Vanessa James","rankTag":"INC#6","role":"HUNTER","gpvLeads":878,"gpvsClosedBySelf":9,"gpvsClosedByOther":137,"selfCloseRate":1.0,"csaCloses":11,"closesOwnGpv":9,"closesOthersGpv":2,"closesNoGpv":0,"totalCalls":587,"callConnected":250,"voicemail":144,"topClosers":[{"name":"Brandon Stevens","count":101},{"name":"Jonathan Rivera","count":12},{"name":"Ritchie Sanchez","count":10}],"topOriginators":[{"name":"Victoria Wood","count":1},{"name":"Antonio Rodas","count":1}]},{"id":60322,"name":"Jackie Perez","rankTag":"","role":"FULL-CYCLE","gpvLeads":91,"gpvsClosedBySelf":11,"gpvsClosedByOther":0,"selfCloseRate":12.1,"csaCloses":11,"closesOwnGpv":11,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":19178,"name":"Nayeli Carbajal","rankTag":"","role":"FULL-CYCLE","gpvLeads":81,"gpvsClosedBySelf":11,"gpvsClosedByOther":0,"selfCloseRate":13.6,"csaCloses":11,"closesOwnGpv":11,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":481,"callConnected":236,"voicemail":29,"topClosers":[],"topOriginators":[]},{"id":33737,"name":"Millie Murillo","rankTag":"INC#10","role":"HUNTER","gpvLeads":910,"gpvsClosedBySelf":7,"gpvsClosedByOther":110,"selfCloseRate":0.8,"csaCloses":8,"closesOwnGpv":7,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":748,"callConnected":307,"voicemail":243,"topClosers":[{"name":"Ritchie Sanchez","count":84},{"name":"Brandon Stevens","count":15},{"name":"Eddy Torres","count":4}],"topOriginators":[{"name":"Antonio Rodas","count":1}]},{"id":22191,"name":"Kahari Reese","rankTag":"FTF#9","role":"GPV-WORKER","gpvLeads":699,"gpvsClosedBySelf":5,"gpvsClosedByOther":0,"selfCloseRate":0.7,"csaCloses":6,"closesOwnGpv":5,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":763,"callConnected":381,"voicemail":158,"topClosers":[],"topOriginators":[]},{"id":15968,"name":"Delia Cardenas","rankTag":"","role":"GPV-WORKER","gpvLeads":125,"gpvsClosedBySelf":4,"gpvsClosedByOther":0,"selfCloseRate":3.2,"csaCloses":5,"closesOwnGpv":4,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":448,"callConnected":347,"voicemail":43,"topClosers":[],"topOriginators":[]},{"id":30307,"name":"Heidi Roxburgh","rankTag":"","role":"OCCASIONAL","gpvLeads":35,"gpvsClosedBySelf":4,"gpvsClosedByOther":0,"selfCloseRate":11.4,"csaCloses":5,"closesOwnGpv":4,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[{"name":"Heather Johnson","count":1}]},{"id":49863,"name":"Matthew Recce","rankTag":"FTF#13","role":"GPV-WORKER","gpvLeads":291,"gpvsClosedBySelf":4,"gpvsClosedByOther":1,"selfCloseRate":1.4,"csaCloses":4,"closesOwnGpv":4,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1856,"callConnected":250,"voicemail":111,"topClosers":[{"name":"Jason Garcia","count":1}],"topOriginators":[]},{"id":64898,"name":"Sabrina Lopez","rankTag":"FTF#3","role":"GPV-WORKER","gpvLeads":112,"gpvsClosedBySelf":4,"gpvsClosedByOther":0,"selfCloseRate":3.6,"csaCloses":4,"closesOwnGpv":4,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":82271,"name":"Mia Rutiaga","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":4,"closesOwnGpv":0,"closesOthersGpv":4,"closesNoGpv":0,"totalCalls":849,"callConnected":301,"voicemail":83,"topClosers":[],"topOriginators":[{"name":"Eric Torres","count":3},{"name":"Millie Murillo","count":1}]},{"id":21472,"name":"Victoria Wood","rankTag":"INC#4","role":"HUNTER","gpvLeads":857,"gpvsClosedBySelf":3,"gpvsClosedByOther":145,"selfCloseRate":0.4,"csaCloses":3,"closesOwnGpv":3,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":833,"callConnected":287,"voicemail":277,"topClosers":[{"name":"Brandon Stevens","count":120},{"name":"Ritchie Sanchez","count":14},{"name":"Eddy Torres","count":6}],"topOriginators":[]},{"id":83093,"name":"Vanessa Zapata","rankTag":"FTF#11","role":"GPV-WORKER","gpvLeads":631,"gpvsClosedBySelf":2,"gpvsClosedByOther":0,"selfCloseRate":0.3,"csaCloses":3,"closesOwnGpv":2,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":1203,"callConnected":608,"voicemail":170,"topClosers":[],"topOriginators":[]},{"id":75117,"name":"Alexis Lopez Apodaca","rankTag":"INC#18","role":"GPV-WORKER","gpvLeads":51,"gpvsClosedBySelf":2,"gpvsClosedByOther":17,"selfCloseRate":3.9,"csaCloses":3,"closesOwnGpv":2,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":687,"callConnected":465,"voicemail":67,"topClosers":[{"name":"Esteban Moreno","count":17}],"topOriginators":[]},{"id":69705,"name":"Marcos Nevarez","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":3,"closesOwnGpv":0,"closesOthersGpv":1,"closesNoGpv":2,"totalCalls":1015,"callConnected":462,"voicemail":87,"topClosers":[],"topOriginators":[{"name":"Victoria Wood","count":1}]},{"id":1501,"name":"Blanca Casillas","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":3,"closesOwnGpv":0,"closesOthersGpv":3,"closesNoGpv":0,"totalCalls":628,"callConnected":211,"voicemail":200,"topClosers":[],"topOriginators":[{"name":"Vanessa James","count":3}]},{"id":4604,"name":"Antonio Rodas","rankTag":"INC#9","role":"HUNTER","gpvLeads":674,"gpvsClosedBySelf":2,"gpvsClosedByOther":122,"selfCloseRate":0.3,"csaCloses":2,"closesOwnGpv":2,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":757,"callConnected":553,"voicemail":63,"topClosers":[{"name":"Brandon Stevens","count":81},{"name":"Ritchie Sanchez","count":22},{"name":"Eddy Torres","count":14}],"topOriginators":[]},{"id":75984,"name":"Daniel Martinez","rankTag":"","role":"GPV-WORKER","gpvLeads":425,"gpvsClosedBySelf":2,"gpvsClosedByOther":0,"selfCloseRate":0.5,"csaCloses":2,"closesOwnGpv":2,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":855,"callConnected":80,"voicemail":26,"topClosers":[],"topOriginators":[]},{"id":56385,"name":"Uriah Newsom","rankTag":"","role":"GPV-WORKER","gpvLeads":285,"gpvsClosedBySelf":0,"gpvsClosedByOther":1,"selfCloseRate":0.0,"csaCloses":2,"closesOwnGpv":0,"closesOthersGpv":2,"closesNoGpv":0,"totalCalls":1202,"callConnected":938,"voicemail":70,"topClosers":[{"name":"Jonathan Rivera","count":1}],"topOriginators":[{"name":"Jonathan Rivera","count":1},{"name":"Millie Murillo","count":1}]},{"id":3564,"name":"Lizzy Lopez","rankTag":"","role":"OCCASIONAL","gpvLeads":38,"gpvsClosedBySelf":2,"gpvsClosedByOther":15,"selfCloseRate":5.3,"csaCloses":2,"closesOwnGpv":2,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Robert Johnston","count":15}],"topOriginators":[]},{"id":77539,"name":"Elena Montes","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":2,"closesOwnGpv":0,"closesOthersGpv":2,"closesNoGpv":0,"totalCalls":345,"callConnected":217,"voicemail":47,"topClosers":[],"topOriginators":[{"name":"Jonathan Rivera","count":2}]},{"id":5666,"name":"Eric Oconnor","rankTag":"FTF#10","role":"GPV-WORKER","gpvLeads":567,"gpvsClosedBySelf":1,"gpvsClosedByOther":0,"selfCloseRate":0.2,"csaCloses":1,"closesOwnGpv":1,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":478,"callConnected":266,"voicemail":102,"topClosers":[],"topOriginators":[]},{"id":44714,"name":"Naely Serrano","rankTag":"FTF#4","role":"GPV-WORKER","gpvLeads":539,"gpvsClosedBySelf":1,"gpvsClosedByOther":1,"selfCloseRate":0.2,"csaCloses":1,"closesOwnGpv":1,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":873,"callConnected":369,"voicemail":173,"topClosers":[{"name":"Patricia Seary","count":1}],"topOriginators":[]},{"id":99681,"name":"Felix Brown","rankTag":"","role":"GPV-WORKER","gpvLeads":339,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":1,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":78650,"name":"Tony Gonzalez","rankTag":"","role":"GPV-WORKER","gpvLeads":272,"gpvsClosedBySelf":1,"gpvsClosedByOther":0,"selfCloseRate":0.4,"csaCloses":1,"closesOwnGpv":1,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":75189,"name":"Cheryl White","rankTag":"","role":"GPV-WORKER","gpvLeads":196,"gpvsClosedBySelf":1,"gpvsClosedByOther":0,"selfCloseRate":0.5,"csaCloses":1,"closesOwnGpv":1,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":28,"callConnected":4,"voicemail":9,"topClosers":[],"topOriginators":[]},{"id":19062,"name":"Ryan Sutton","rankTag":"","role":"GPV-WORKER","gpvLeads":62,"gpvsClosedBySelf":1,"gpvsClosedByOther":0,"selfCloseRate":1.6,"csaCloses":1,"closesOwnGpv":1,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":8,"callConnected":4,"voicemail":1,"topClosers":[],"topOriginators":[]},{"id":44821,"name":"Erik Burgin","rankTag":"FTF#8","role":"GPV-WORKER","gpvLeads":55,"gpvsClosedBySelf":1,"gpvsClosedByOther":0,"selfCloseRate":1.8,"csaCloses":1,"closesOwnGpv":1,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1254,"callConnected":839,"voicemail":61,"topClosers":[],"topOriginators":[]},{"id":25453,"name":"Angelique Padilla","rankTag":"","role":"OCCASIONAL","gpvLeads":5,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":1,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":1,"totalCalls":1049,"callConnected":567,"voicemail":89,"topClosers":[],"topOriginators":[]},{"id":16513,"name":"Keaton Wolfe","rankTag":"","role":"OCCASIONAL","gpvLeads":2,"gpvsClosedBySelf":1,"gpvsClosedByOther":0,"selfCloseRate":50.0,"csaCloses":1,"closesOwnGpv":1,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":75668,"name":"Elizabeth Cisneros","rankTag":"","role":"OCCASIONAL","gpvLeads":2,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":1,"closesOwnGpv":0,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[{"name":"Eric Torres","count":1}]},{"id":14088,"name":"Lizza Mota","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":1,"closesOwnGpv":0,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":520,"callConnected":268,"voicemail":64,"topClosers":[],"topOriginators":[{"name":"Eric Torres","count":1}]},{"id":49546,"name":"Justin Figueroa","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":1,"closesOwnGpv":0,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":981,"callConnected":562,"voicemail":162,"topClosers":[],"topOriginators":[{"name":"Vanessa James","count":1}]},{"id":36620,"name":"Alyssa Castillo","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":1,"closesOwnGpv":0,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":890,"callConnected":413,"voicemail":95,"topClosers":[],"topOriginators":[{"name":"Eric Torres","count":1}]},{"id":65428,"name":"Kaitlynn Morales","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":1,"closesOwnGpv":0,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":620,"callConnected":219,"voicemail":98,"topClosers":[],"topOriginators":[{"name":"Patricia Seary","count":1}]},{"id":17888,"name":"Christina Deahl","rankTag":"","role":"OCCASIONAL","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":1,"closesOwnGpv":0,"closesOthersGpv":1,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[{"name":"Chris Goff","count":1}]},{"id":1800,"name":"Edward De Los Reyes","rankTag":"FTF#12","role":"GPV-WORKER","gpvLeads":2042,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":686,"callConnected":166,"voicemail":206,"topClosers":[],"topOriginators":[]},{"id":76416,"name":"Susana Islas","rankTag":"","role":"GPV-WORKER","gpvLeads":1237,"gpvsClosedBySelf":0,"gpvsClosedByOther":1,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Eddy Torres","count":1}],"topOriginators":[]},{"id":8624,"name":"Victor Huerta","rankTag":"","role":"GPV-WORKER","gpvLeads":855,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":113,"callConnected":0,"voicemail":6,"topClosers":[],"topOriginators":[]},{"id":98323,"name":"Cecilia Beltran","rankTag":"FTF#5","role":"GPV-WORKER","gpvLeads":642,"gpvsClosedBySelf":0,"gpvsClosedByOther":7,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":290,"callConnected":133,"voicemail":60,"topClosers":[{"name":"Ritchie Sanchez","count":3},{"name":"Brandon Stevens","count":3},{"name":"Jonathan Rivera","count":1}],"topOriginators":[]},{"id":14562,"name":"Chad Comfort","rankTag":"","role":"GPV-WORKER","gpvLeads":631,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":94475,"name":"Jose Morales","rankTag":"","role":"GPV-WORKER","gpvLeads":544,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1552,"callConnected":285,"voicemail":64,"topClosers":[],"topOriginators":[]},{"id":10281,"name":"Starla Padilla","rankTag":"","role":"GPV-WORKER","gpvLeads":525,"gpvsClosedBySelf":0,"gpvsClosedByOther":2,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Patricia Seary","count":1},{"name":"Ashlynne Shafer","count":1}],"topOriginators":[]},{"id":81024,"name":"Kimberly Montoya","rankTag":"FTF#14","role":"GPV-WORKER","gpvLeads":494,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":16165,"name":"Kodie Martinez","rankTag":"","role":"GPV-WORKER","gpvLeads":487,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":71300,"name":"Starr Shropshire","rankTag":"","role":"GPV-WORKER","gpvLeads":453,"gpvsClosedBySelf":0,"gpvsClosedByOther":2,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Kellie Thalhamer","count":1},{"name":"Christopher Mark","count":1}],"topOriginators":[]},{"id":32626,"name":"Chris Murphy","rankTag":"","role":"GPV-WORKER","gpvLeads":442,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":41920,"name":"Abby Miller","rankTag":"FTF#1","role":"GPV-WORKER","gpvLeads":363,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":840,"callConnected":453,"voicemail":177,"topClosers":[],"topOriginators":[]},{"id":20551,"name":"Carlos Jaimes","rankTag":"FTF#2","role":"GPV-WORKER","gpvLeads":342,"gpvsClosedBySelf":0,"gpvsClosedByOther":5,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":339,"callConnected":164,"voicemail":41,"topClosers":[{"name":"Brandon Stevens","count":2},{"name":"Ritchie Sanchez","count":1},{"name":"Jonathan Rivera","count":1}],"topOriginators":[]},{"id":45960,"name":"Jesse Segura","rankTag":"","role":"GPV-WORKER","gpvLeads":340,"gpvsClosedBySelf":0,"gpvsClosedByOther":3,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Alexandria Lewis","count":1},{"name":"Heather Johnson","count":1},{"name":"Starr Leger","count":1}],"topOriginators":[]},{"id":73129,"name":"Omar Alami","rankTag":"FTF#7","role":"GPV-WORKER","gpvLeads":339,"gpvsClosedBySelf":0,"gpvsClosedByOther":2,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":417,"callConnected":265,"voicemail":43,"topClosers":[{"name":"Brandon Stevens","count":1},{"name":"Ritchie Sanchez","count":1}],"topOriginators":[]},{"id":72882,"name":"Paulina Cano","rankTag":"","role":"GPV-WORKER","gpvLeads":262,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":3783,"callConnected":855,"voicemail":72,"topClosers":[],"topOriginators":[]},{"id":55184,"name":"Juliana","rankTag":"","role":"GPV-WORKER","gpvLeads":190,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":30219,"name":"Viviana Barrera","rankTag":"","role":"GPV-WORKER","gpvLeads":185,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":36996,"name":"Kristen Hamilton","rankTag":"","role":"GPV-WORKER","gpvLeads":182,"gpvsClosedBySelf":0,"gpvsClosedByOther":3,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[{"name":"Esteban Moreno","count":3}],"topOriginators":[]},{"id":50462,"name":"Andrea Phillips","rankTag":"","role":"GPV-WORKER","gpvLeads":155,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1020,"callConnected":556,"voicemail":146,"topClosers":[],"topOriginators":[]},{"id":70901,"name":"Steve Ung","rankTag":"","role":"GPV-WORKER","gpvLeads":133,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":18425,"name":"Bradley Cloyd","rankTag":"","role":"GPV-WORKER","gpvLeads":124,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":78702,"name":"Brittanie Butcher","rankTag":"","role":"GPV-WORKER","gpvLeads":121,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":22574,"name":"Michelle","rankTag":"","role":"GPV-WORKER","gpvLeads":83,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":34100,"name":"Isabel Dominguez","rankTag":"","role":"GPV-WORKER","gpvLeads":80,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":55064,"name":"Pamela Escalante","rankTag":"","role":"GPV-WORKER","gpvLeads":79,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":51414,"name":"Eduardo Valdez","rankTag":"","role":"GPV-WORKER","gpvLeads":67,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":46669,"name":"Meltem Kocak","rankTag":"","role":"GPV-WORKER","gpvLeads":63,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":57932,"name":"Matthew Colwell","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":47,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":28714,"name":"Brendan Steiner","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":40,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":883,"callConnected":209,"voicemail":296,"topClosers":[],"topOriginators":[]},{"id":97432,"name":"Austin Kokin","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":37,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":14381,"name":"Beronica Salas","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":35,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":81159,"name":"Al Gillett","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":27,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":31170,"name":"Shark Tank Admin","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":27,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":19369,"name":"Austin","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":22,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":0,"callConnected":0,"voicemail":0,"topClosers":[],"topOriginators":[]},{"id":46197,"name":"Jacquelyn Cabral","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":16,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1293,"callConnected":1069,"voicemail":33,"topClosers":[],"topOriginators":[]},{"id":8911,"name":"Lauren Jennings","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":15,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":829,"callConnected":587,"voicemail":56,"topClosers":[],"topOriginators":[]},{"id":48579,"name":"Makayla Mouton","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":12,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":979,"callConnected":678,"voicemail":28,"topClosers":[],"topOriginators":[]},{"id":59297,"name":"Troy Gutierrez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":11,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":728,"callConnected":495,"voicemail":51,"topClosers":[],"topOriginators":[]},{"id":8710,"name":"Vanessa Scott","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":11,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1148,"callConnected":692,"voicemail":138,"topClosers":[],"topOriginators":[]},{"id":23253,"name":"Meredith Gaxiola","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":8,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1100,"callConnected":706,"voicemail":115,"topClosers":[],"topOriginators":[]},{"id":67322,"name":"Katia Rodriguez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":4,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1007,"callConnected":285,"voicemail":285,"topClosers":[],"topOriginators":[]},{"id":33242,"name":"Andrea Ozuna","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":3,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1069,"callConnected":599,"voicemail":223,"topClosers":[],"topOriginators":[]},{"id":58350,"name":"Chelsea Garcia","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":1,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":685,"callConnected":476,"voicemail":62,"topClosers":[],"topOriginators":[]},{"id":87547,"name":"Nicole Smith","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":1,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":4707,"callConnected":1082,"voicemail":2087,"topClosers":[],"topOriginators":[]},{"id":55720,"name":"Tiffany Roberts","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":3702,"callConnected":81,"voicemail":2933,"topClosers":[],"topOriginators":[]},{"id":17435,"name":"Liliana Maldonado","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1198,"callConnected":970,"voicemail":49,"topClosers":[],"topOriginators":[]},{"id":40052,"name":"Andrea Carabajal","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":864,"callConnected":472,"voicemail":149,"topClosers":[],"topOriginators":[]},{"id":87451,"name":"Cody Martinez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":787,"callConnected":138,"voicemail":56,"topClosers":[],"topOriginators":[]},{"id":12182,"name":"Ashley Vallejo","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":541,"callConnected":223,"voicemail":92,"topClosers":[],"topOriginators":[]},{"id":55813,"name":"Ruby Gandara","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":781,"callConnected":519,"voicemail":30,"topClosers":[],"topOriginators":[]},{"id":24808,"name":"Alexis Delgado","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1046,"callConnected":565,"voicemail":92,"topClosers":[],"topOriginators":[]},{"id":94323,"name":"Ruben Quesada","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":805,"callConnected":170,"voicemail":24,"topClosers":[],"topOriginators":[]},{"id":94567,"name":"David North","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1122,"callConnected":704,"voicemail":105,"topClosers":[],"topOriginators":[]},{"id":2119,"name":"Madison Mouton","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1181,"callConnected":690,"voicemail":144,"topClosers":[],"topOriginators":[]},{"id":90706,"name":"Alissa Kokin","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":537,"callConnected":271,"voicemail":121,"topClosers":[],"topOriginators":[]},{"id":51645,"name":"Tricia Rodriguez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":965,"callConnected":369,"voicemail":106,"topClosers":[],"topOriginators":[]},{"id":95349,"name":"Chayenne Barrientos","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1051,"callConnected":783,"voicemail":65,"topClosers":[],"topOriginators":[]},{"id":45535,"name":"Cassandra Acero","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":878,"callConnected":651,"voicemail":70,"topClosers":[],"topOriginators":[]},{"id":26056,"name":"Ashley Cavallaro","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":3475,"callConnected":509,"voicemail":1931,"topClosers":[],"topOriginators":[]},{"id":29959,"name":"Sierra Gonzalez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":891,"callConnected":382,"voicemail":156,"topClosers":[],"topOriginators":[]},{"id":52571,"name":"Shevon George","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":945,"callConnected":492,"voicemail":153,"topClosers":[],"topOriginators":[]},{"id":57361,"name":"Lina Mashaleh","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1330,"callConnected":907,"voicemail":98,"topClosers":[],"topOriginators":[]},{"id":99828,"name":"Gabby Serecerez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1027,"callConnected":809,"voicemail":43,"topClosers":[],"topOriginators":[]},{"id":29809,"name":"Sharon King","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":2782,"callConnected":333,"voicemail":1985,"topClosers":[],"topOriginators":[]},{"id":22499,"name":"Ebony Tuck-Cole","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":3683,"callConnected":166,"voicemail":2051,"topClosers":[],"topOriginators":[]},{"id":3667,"name":"Haevyn Council","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":611,"callConnected":236,"voicemail":156,"topClosers":[],"topOriginators":[]},{"id":73523,"name":"Jory Chambers","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":5677,"callConnected":8,"voicemail":680,"topClosers":[],"topOriginators":[]},{"id":5003,"name":"Destinie Jones","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1363,"callConnected":876,"voicemail":127,"topClosers":[],"topOriginators":[]},{"id":27430,"name":"Jessie Crawford","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":2995,"callConnected":162,"voicemail":1899,"topClosers":[],"topOriginators":[]},{"id":70936,"name":"Norma Villalobos","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":4296,"callConnected":20,"voicemail":3431,"topClosers":[],"topOriginators":[]},{"id":61295,"name":"Daeja Perez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":882,"callConnected":635,"voicemail":23,"topClosers":[],"topOriginators":[]},{"id":22466,"name":"John Hause","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":541,"callConnected":328,"voicemail":72,"topClosers":[],"topOriginators":[]},{"id":72022,"name":"Skylar High","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1258,"callConnected":608,"voicemail":221,"topClosers":[],"topOriginators":[]},{"id":59391,"name":"Chelsie Wilson","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":2954,"callConnected":421,"voicemail":1492,"topClosers":[],"topOriginators":[]},{"id":43379,"name":"Kimberli Acevedo","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":847,"callConnected":592,"voicemail":39,"topClosers":[],"topOriginators":[]},{"id":32808,"name":"Jennifer Sisk","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1197,"callConnected":777,"voicemail":5,"topClosers":[],"topOriginators":[]},{"id":47127,"name":"Kaliyah Strickland","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1157,"callConnected":643,"voicemail":173,"topClosers":[],"topOriginators":[]},{"id":97319,"name":"Jessica Espinoza","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1631,"callConnected":53,"voicemail":1105,"topClosers":[],"topOriginators":[]},{"id":85533,"name":"Quincy Pratt","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1807,"callConnected":1588,"voicemail":20,"topClosers":[],"topOriginators":[]},{"id":99969,"name":"Michaela Thorn","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":3814,"callConnected":304,"voicemail":2925,"topClosers":[],"topOriginators":[]},{"id":15431,"name":"Alexes Geter","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1601,"callConnected":1044,"voicemail":146,"topClosers":[],"topOriginators":[]},{"id":7903,"name":"Bria Olvera","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1173,"callConnected":390,"voicemail":108,"topClosers":[],"topOriginators":[]},{"id":35171,"name":"Vicky Smith","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1159,"callConnected":471,"voicemail":70,"topClosers":[],"topOriginators":[]},{"id":79659,"name":"Gabriela Schneider","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1803,"callConnected":1066,"voicemail":307,"topClosers":[],"topOriginators":[]},{"id":42937,"name":"Edwin Garcia","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1431,"callConnected":746,"voicemail":240,"topClosers":[],"topOriginators":[]},{"id":96300,"name":"Zain Rodriguez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":657,"callConnected":487,"voicemail":42,"topClosers":[],"topOriginators":[]},{"id":95308,"name":"Sergio Alegria","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":944,"callConnected":733,"voicemail":25,"topClosers":[],"topOriginators":[]},{"id":16415,"name":"Amber Olvera","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":821,"callConnected":586,"voicemail":77,"topClosers":[],"topOriginators":[]},{"id":13774,"name":"Samantha Hernandez","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1111,"callConnected":725,"voicemail":145,"topClosers":[],"topOriginators":[]},{"id":21156,"name":"Cynthia Santana","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":1165,"callConnected":747,"voicemail":12,"topClosers":[],"topOriginators":[]},{"id":88899,"name":"Kimberly Divens","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":3314,"callConnected":115,"voicemail":2542,"topClosers":[],"topOriginators":[]},{"id":39208,"name":"Josue Heredia","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":889,"callConnected":716,"voicemail":13,"topClosers":[],"topOriginators":[]},{"id":33504,"name":"Janet Herrera","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":558,"callConnected":440,"voicemail":25,"topClosers":[],"topOriginators":[]},{"id":70250,"name":"Grace Hanners","rankTag":"","role":"HIGH-CALL-NO-CLOSE","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":3291,"callConnected":87,"voicemail":2046,"topClosers":[],"topOriginators":[]},{"id":85018,"name":"Jude Smith","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":957,"callConnected":639,"voicemail":94,"topClosers":[],"topOriginators":[]},{"id":83966,"name":"Monique Ezell","rankTag":"","role":"LIGHT-ACTIVITY","gpvLeads":0,"gpvsClosedBySelf":0,"gpvsClosedByOther":0,"selfCloseRate":0.0,"csaCloses":0,"closesOwnGpv":0,"closesOthersGpv":0,"closesNoGpv":0,"totalCalls":599,"callConnected":436,"voicemail":12,"topClosers":[],"topOriginators":[]}];

const ATTRIBUTION_INSIGHT = {
  totalSigned: 3373,
  sameRep: 2165,
  diffRep: 1124,
  noGpv: 84,
  medianDaysToClose: 0,
  sameDayClosePct: 85.3,
};

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
  const [cmType, setCmType] = useState("All"); // NEW: INC / FTF filter
  const [sortBy, setSortBy] = useState("rank");
  const [sortDir, setSortDir] = useState("asc");
  const [selectedCM, setSelectedCM] = useState(null);
  const [selectedCMA, setSelectedCMA] = useState(null);
  const [logEntries, setLogEntries] = useState([
    { id: 1, date: "2026-04-14", manager: "Tony Gonzalez", employee: "Ashlynne Shafer", brand: "VRG", type: "Stage 1 Coaching", trigger: "Rank 19 INC, declining trend, 20 untouched leads, score 35", action: "Met 1-on-1. Discussed call follow-through and pipeline neglect. Agreed to 30 calls/day minimum and work untouched leads first. Tony to check daily.", outcome: "pending", followUpDate: "2026-04-21", resolved: false },
    { id: 2, date: "2026-04-14", manager: "Tony Gonzalez", employee: "Alexis Lopez Apodaca", brand: "VRG", type: "Stage 1 Coaching", trigger: "Rank 18 INC, 18 untouched leads, declining 5 weeks, score 38", action: "Met 1-on-1. Cited lead quality concerns. Agreed to work existing leads first. Daily check-in for 1 week.", outcome: "pending", followUpDate: "2026-04-21", resolved: false },
    { id: 3, date: "2026-04-12", manager: "Tony Gonzalez", employee: "Kimberly Montoya", brand: "AVC", type: "Stage 2 Formal Warning", trigger: "Rank 14 FTF (last), 1 PassGP, 28 untouched leads, score 22. Declining trend 5 weeks.", action: "Formal documented warning issued. Written improvement plan: 40 calls/day, contact all untouched leads within 48hrs. Daily activity review for 2 weeks.", outcome: "in_progress", followUpDate: "2026-04-26", resolved: false },
    { id: 4, date: "2026-04-10", manager: "Tony Gonzalez", employee: "Matthew Recce", brand: "VDR", type: "Stage 1 Coaching", trigger: "Rank 13 FTF, 3 PassGP despite 265 calls. Activity but low output.", action: "Discussed close-on-the-call methodology. Roleplay session scheduled. Matthew to shadow Cesar for 2 calls.", outcome: "in_progress", followUpDate: "2026-04-17", resolved: false },
    { id: 5, date: "2026-04-08", manager: "Tony Gonzalez", employee: "Stephanie Tebbetts", brand: "VAC", type: "Stage 1 Coaching", trigger: "Rank 15 INC, 4 PassGP, 14 untouched leads, trend flat", action: "Met 1-on-1. Acknowledged need for more follow-through. Agreed to 40 calls/day minimum.", outcome: "no_change", followUpDate: "2026-04-15", resolved: false },
    { id: 6, date: "2026-04-05", manager: "Tony Gonzalez", employee: "Eddy Torres", brand: "VAC", type: "Stage 1 Coaching", trigger: "Rank 13 INC, 10 untouched leads, score 55", action: "Quick check-in. Eddy committed to clearing untouched leads by end of week.", outcome: "improved", followUpDate: "2026-04-12", resolved: true },
    { id: 7, date: "2026-04-03", manager: "Tony Gonzalez", employee: "Enrique Diaz", brand: "DVC", type: "Stage 1 Coaching", trigger: "Rank 14 INC, 12 untouched leads, leads aging 4-6 days", action: "Discussed pipeline management. Enrique to prioritize aging leads in morning power block.", outcome: "improved", followUpDate: "2026-04-10", resolved: true },
    { id: 8, date: "2026-04-01", manager: "Tony Gonzalez", employee: "Michael Trout", brand: "DVC", type: "Stage 1 Coaching", trigger: "Rank 17 INC, 11 untouched leads, 0 CSAs closed on-call despite 407 calls", action: "Close-on-call training session. Michael committed to attempting live close on every pitch.", outcome: "improved", followUpDate: "2026-04-08", resolved: true },
  ]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [ytdSortKey, setYtdSort] = useState("csaSigned");
  const [ytdRoleFilter, setYtdRoleFilter] = useState("All");
  const [ytdSearchText, setYtdSearchText] = useState("");
  const [attribRoleFilter, setAttribRoleFilter] = useState("All");
  const [consultView, setConsultView] = useState("oversight"); // oversight | attribution | revenue | brands
  const [newLog, setNewLog] = useState({ manager: "", employee: "", brand: "", type: "Stage 1 Coaching", trigger: "", action: "", followUpDate: "" });

  const filteredCMs = useMemo(() => {
    let data = [...MOCK_CMS];
    if (brand !== "All") data = data.filter(cm => cm.brand === brand);
    if (cmType !== "All") data = data.filter(cm => cm.type === cmType);
    data.sort((a, b) => {
      const aVal = a[sortBy], bVal = b[sortBy];
      if (typeof aVal === "string") return sortDir === "desc" ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    });
    return data;
  }, [brand, cmType, sortBy, sortDir]);

  const totals = useMemo(() => {
    let cms = [...MOCK_CMS];
    if (brand !== "All") cms = cms.filter(c => c.brand === brand);
    if (cmType !== "All") cms = cms.filter(c => c.type === cmType);
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
  }, [brand, cmType]);

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortBy(col); setSortDir(col === "rank" || col === "name" ? "asc" : "desc"); }
  };

  const Arrow = ({ col }) => sortBy !== col ? <span style={{ opacity: 0.3, fontSize: 9 }}>↕</span> : <span style={{ fontSize: 9 }}>{sortDir === "desc" ? "↓" : "↑"}</span>;

  const revenueImpact = useMemo(() => {
    let cms = [...MOCK_CMS];
    if (brand !== "All") cms = cms.filter(c => c.brand === brand);
    if (cmType !== "All") cms = cms.filter(c => c.type === cmType);
    const untouched = cms.reduce((s, c) => s + c.untouched, 0);
    const belowMin = cms.filter(c => c.calls < 50);
    const missedCalls = belowMin.reduce((s, c) => s + (50 - c.calls), 0);
    const estConvRate = 0.08;
    const untouchedRev = Math.round(untouched * estConvRate * AVG_CONTRACT);
    const callGapRev = Math.round(missedCalls * 0.03 * AVG_CONTRACT);
    const noCloseOnCall = cms.filter(c => c.csaSent > c.csaClosed);
    const csaLeakRev = Math.round(noCloseOnCall.reduce((s,c) => s + c.csaSent, 0) * 0.4 * AVG_CONTRACT);
    return { untouched, untouchedRev, missedCalls, callGapRev, noCloseCount: noCloseOnCall.length, csaLeakRev, total: untouchedRev + callGapRev + csaLeakRev };
  }, [brand, cmType]);

  const filteredCMAs = useMemo(() => {
    let data = [...MOCK_CMAS];
    if (brand !== "All") data = data.filter(c => c.brand === brand);
    data.sort((a, b) => a.rank - b.rank);
    return data;
  }, [brand]);

  // CMA Detail modal
  const CMADetailCard = ({ cma, onClose }) => {
    const st = getStatus(cma.score);
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={onClose}>
        <div style={{ background: "white", borderRadius: 16, maxWidth: 680, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
          <div style={{ padding: "20px 24px", background: "linear-gradient(135deg, #2D8B4E, #1a6b35)", color: "white", borderRadius: "16px 16px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{cma.name}</div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>CMA #{cma.rank} of 85 | Supports: {cma.assignedCM} | Brand: {cma.brand} | Score: {cma.score}</div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16, fontFamily: "inherit" }}>✕</button>
          </div>
          <div style={{ padding: "20px 24px" }}>
            {/* Real data section */}
            <div style={{ marginBottom: 16, padding: 12, background: "#f0f9ff", borderRadius: 8, borderLeft: "3px solid #3B7DD8" }}>
              <div style={{ fontSize: 10, color: "#1B2A4A", fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>📊 Real Data (from Chris's system)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 9, color: "#6b7280" }}>Total Calls</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1B2A4A" }}>{cma.totalCalls}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "#6b7280" }}>Talk Time</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1B2A4A" }}>{cma.talkTime}m</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "#6b7280" }}>Balto Score</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: cma.baltoScore && cma.baltoScore >= 80 ? "#166534" : cma.baltoScore && cma.baltoScore >= 60 ? "#854d0e" : cma.baltoScore ? "#991b1b" : "#9ca3af" }}>{cma.baltoScore ? cma.baltoScore.toFixed(1) : "—"}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "#6b7280" }}>Clocked Hrs</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1B2A4A" }}>{cma.clockedHrs}h</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Unique Leads", value: cma.uniqueLeads, color: "#3B7DD8" },
                { label: "Outbound Calls", value: cma.outboundCalls, color: cma.outboundCalls >= 40 ? "#22c55e" : cma.outboundCalls >= 20 ? "#eab308" : "#ef4444" },
                { label: "Total Actions", value: cma.totalActions, color: "#6C3FA0" },
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
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Cases Prepped</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1B2A4A" }}>{cma.casesPrepped}%</div>
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
                          <span style={{ padding: "1px 6px", borderRadius: 8, fontSize: 9, fontWeight: 700,
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
        <div style={{ background: "white", borderRadius: 16, maxWidth: 720, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
          <div style={{ padding: "20px 24px", background: "linear-gradient(135deg, #1B2A4A, #2C3E6B)", color: "white", borderRadius: "16px 16px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{cm.name}</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>Rank #{cm.rank} {cm.type} | Brand: {cm.brand} | Score: {cm.score} | Status: {st.label}</div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16, fontFamily: "inherit" }}>✕</button>
          </div>
          <div style={{ padding: "20px 24px" }}>
            {/* Real Chris data */}
            <div style={{ marginBottom: 16, padding: 12, background: "#f0f9ff", borderRadius: 8, borderLeft: "3px solid #3B7DD8" }}>
              <div style={{ fontSize: 10, color: "#1B2A4A", fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>📊 Weekly Ranking Data (Chris — Week of 4/4 to 4/10)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                <div><div style={{ fontSize: 9, color: "#6b7280" }}>PassGP</div><div style={{ fontSize: 18, fontWeight: 700, color: "#2D8B4E" }}>{cm.passGP}</div></div>
                <div><div style={{ fontSize: 9, color: "#6b7280" }}>FileToVA</div><div style={{ fontSize: 18, fontWeight: 700, color: "#1B2A4A" }}>{cm.fileToVa}</div></div>
                <div><div style={{ fontSize: 9, color: "#6b7280" }}>TPsych</div><div style={{ fontSize: 18, fontWeight: 700, color: "#1B2A4A" }}>{cm.tPsych}</div></div>
                <div><div style={{ fontSize: 9, color: "#6b7280" }}>Actions</div><div style={{ fontSize: 18, fontWeight: 700, color: "#1B2A4A" }}>{cm.actions}</div></div>
                <div><div style={{ fontSize: 9, color: "#6b7280" }}>Real Calls</div><div style={{ fontSize: 18, fontWeight: 700, color: "#1B2A4A" }}>{cm.realCalls}</div></div>
              </div>
            </div>

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
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
              <div style={{ padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>GPVs</div>
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

            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1, padding: 14, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Score Trend (5 weeks)</div>
                <SparkLine data={cm.weekHistory} color={st.dot} width={120} height={40} />
              </div>
              <div style={{ flex: 1, padding: 14, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>GPV Trend (5 weeks)</div>
                <SparkLine data={cm.gpvHistory} color="#2D8B4E" width={120} height={40} />
              </div>
            </div>

            {cm.leads && cm.leads.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>Pipeline Sample ({cm.leads.length} shown)</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Veteran", "Status", "Days in Pipeline", "Since Contact", "Risk"].map(h => (
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
                          <td style={{ padding: "8px 10px" }}><span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, background: "#f3f4f6" }}>{lead.status}</span></td>
                          <td style={{ padding: "8px 10px" }}>{lead.daysInPipeline}d</td>
                          <td style={{ padding: "8px 10px", fontWeight: 600, color: riskColor }}>{lead.lastContact === 0 ? "Today" : `${lead.lastContact}d ago`}</td>
                          <td style={{ padding: "8px 10px" }}><span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: riskBg, color: riskColor }}>{risk}</span></td>
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

      <div style={{ background: "linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)", padding: "16px 24px", color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>GlobalTekMed Performance Dashboard</div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 1 }}>Real CM/CMA Roster | Week of 2026-04-04 to 2026-04-10 | Data from Chris (IT)</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ padding: "3px 8px", background: "rgba(34,197,94,0.25)", borderRadius: 4, fontSize: 10, fontWeight: 600, color: "#86efac" }}>REAL DATA</div>
            <div style={{ padding: "3px 10px", background: "rgba(255,255,255,0.12)", borderRadius: 4, fontSize: 11 }}>Apr 16, 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 12, alignItems: "center", flexWrap: "wrap" }}>
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

          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", margin: "0 2px" }} />

          {[
            { key: "ytd", label: "📅 YTD Full Data" },
            { key: "funnel", label: "🔄 Conversion" },
            { key: "speed", label: "⏱ Speed" },
            { key: "trends", label: "📊 Trends" },
          ].map(tab => (
            <button key={tab.key} onClick={() => setView(tab.key)} style={{
              padding: "6px 10px", borderRadius: 6, border: "none", cursor: "pointer",
              fontSize: 10, fontWeight: 500, fontFamily: "inherit",
              background: view === tab.key ? "white" : "rgba(255,255,255,0.06)",
              color: view === tab.key ? "#1B2A4A" : "rgba(255,255,255,0.5)",
            }}>{tab.label}</button>
          ))}

          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", margin: "0 2px" }} />

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

      <div style={{ padding: "16px 24px", maxWidth: 1400 }}>
        {/* Brand filter */}
        <div style={{ display: "flex", gap: 3, marginBottom: 8, flexWrap: "wrap", alignItems: "center" }}>
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

        {/* CM Type filter — only when on CM tab */}
        {view === "cm" && (
          <div style={{ display: "flex", gap: 3, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, marginRight: 4 }}>TYPE:</span>
            {["All", "INC", "FTF"].map(t => (
              <button key={t} onClick={() => setCmType(t)} style={{
                padding: "3px 12px", borderRadius: 16, border: "1px solid", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                borderColor: cmType === t ? "#6C3FA0" : "#e5e7eb",
                background: cmType === t ? "#6C3FA0" : "white",
                color: cmType === t ? "white" : "#6b7280",
              }}>{t === "All" ? "All CMs" : t === "INC" ? "Increase (19)" : "First-Time Filer (14)"}</button>
            ))}
          </div>
        )}

        {/* Consultant sub-navigation — only when inside Consultant tab */}
        {view === "corp" && (
          <div style={{ background: "linear-gradient(135deg, #1B2A4A, #0f1a2e)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 700, marginRight: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>🔒 Consultant View:</span>
            {[
              { key: "oversight", label: "👥 Personnel Oversight", desc: "Manager follow-through, ping log, red-zone CMs" },
              { key: "attribution", label: "🎯 Role Attribution", desc: "Who did the GPV work vs. who closed the CSA" },
              { key: "revenue", label: "💰 Revenue Impact", desc: "Dollar value of gaps and leakage" },
              { key: "brands", label: "🏢 Brand Comparison", desc: "Head-to-head brand performance" },
            ].map(tab => (
              <button key={tab.key} onClick={() => setConsultView(tab.key)} title={tab.desc} style={{
                padding: "5px 12px", borderRadius: 6, border: "1px solid", cursor: "pointer",
                fontSize: 10, fontWeight: 600, fontFamily: "inherit",
                background: consultView === tab.key ? "white" : "rgba(255,255,255,0.08)",
                borderColor: consultView === tab.key ? "white" : "rgba(255,255,255,0.2)",
                color: consultView === tab.key ? "#1B2A4A" : "rgba(255,255,255,0.8)",
              }}>{tab.label}</button>
            ))}
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginLeft: "auto", fontStyle: "italic" }}>Drew &amp; David only — not visible to Tony or management</span>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <StatCard label="CMs" value={totals.cmCount} sub={`${totals.greenCount}G / ${totals.yellowCount}Y / ${totals.redCount}R`} icon="👥" />
          <StatCard label="Avg Calls" value={totals.avgCalls} sub={`Target: 50+ | Total: ${totals.totalCalls}`} icon="📞" />
          <StatCard label="Talk Time" value={`${totals.avgTalkTime}h`} sub="Target: 3+" icon="⏱" />
          <StatCard label="Total GPVs" value={totals.totalGPVs} sub="This week" icon="📦" />
          <StatCard label="Close Rate" value={`${totals.closeRate}%`} sub="Target: 80%+" icon="✅" />
          <StatCard label="Untouched" value={totals.totalUntouched} sub="⚠️ Immediate action" icon="🚨" />
        </div>

        {/* ═══ CM TABLE ═══ */}
        {view === "cm" && (
          <div style={{ background: "white", borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>CM Performance — {brand === "All" ? "All Brands" : brand} {cmType !== "All" ? `(${cmType})` : ""} ({filteredCMs.length} CMs)</span>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>Click a name for detail view</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {[
                      { key: "rank", l: "Rank" },{ key: "name", l: "CM Name" },{ key: "type", l: "Type" },
                      { key: "brand", l: "Brand" },{ key: "passGP", l: "PassGP" },{ key: "realCalls", l: "Calls" },
                      { key: "actions", l: "Actions" },{ key: "gpvs", l: "GPVs" },
                      { key: "untouched", l: "Untouched" },{ key: "trend", l: "Trend" },{ key: "score", l: "Score" },
                    ].map(col => (
                      <th key={col.key} onClick={() => col.key !== "trend" ? handleSort(col.key) : null} style={{
                        padding: "8px 8px", textAlign: "left", fontSize: 9, fontWeight: 600,
                        color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.4,
                        cursor: "pointer", borderBottom: "2px solid #e5e7eb", userSelect: "none", whiteSpace: "nowrap",
                      }}>
                        {col.l} {col.key !== "trend" && <Arrow col={col.key} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCMs.map((cm, i) => {
                    const st = getStatus(cm.score);
                    return (
                      <tr key={cm.id} style={{ borderBottom: "1px solid #f3f4f6", background: cm.score < 30 ? "#fff5f5" : i % 2 === 1 ? "#fafbfc" : "white", cursor: "pointer" }} onClick={() => setSelectedCM(cm)}>
                        <td style={{ padding: "8px 8px", fontWeight: 700, color: cm.rank <= 3 ? "#166534" : cm.rank >= (cm.type === "INC" ? 15 : 12) ? "#991b1b" : "#6b7280" }}>#{cm.rank}</td>
                        <td style={{ padding: "8px 8px", fontWeight: 600, color: "#3B7DD8", whiteSpace: "nowrap", textDecoration: "underline", textDecorationColor: "#3B7DD830" }}>{cm.name}</td>
                        <td style={{ padding: "8px 8px" }}><span style={{ padding: "1px 6px", background: cm.type === "INC" ? "#E8F0FE" : "#F3E8FF", color: cm.type === "INC" ? "#3B7DD8" : "#6C3FA0", borderRadius: 3, fontSize: 9, fontWeight: 700 }}>{cm.type}</span></td>
                        <td style={{ padding: "8px 8px" }}><span style={{ padding: "1px 6px", background: "#f3f4f6", borderRadius: 3, fontSize: 10 }}>{cm.brand}</span></td>
                        <td style={{ padding: "8px 8px", fontWeight: 700, fontSize: 13, color: cm.passGP >= 10 ? "#166534" : cm.passGP >= 5 ? "#854d0e" : "#991b1b" }}>{cm.passGP}</td>
                        <td style={{ padding: "8px 8px" }}>
                          <div style={{ fontWeight: 600, color: cm.realCalls >= 250 ? "#166534" : cm.realCalls >= 150 ? "#854d0e" : "#991b1b", marginBottom: 2 }}>{cm.realCalls}</div>
                          <MiniBar value={cm.realCalls} max={700} color={cm.realCalls >= 250 ? "#22c55e" : cm.realCalls >= 150 ? "#eab308" : "#ef4444"} />
                        </td>
                        <td style={{ padding: "8px 8px", fontWeight: 500 }}>{cm.actions}</td>
                        <td style={{ padding: "8px 8px", fontSize: 14, fontWeight: 700, color: cm.gpvs > 0 ? "#1B2A4A" : "#991b1b" }}>{cm.gpvs}</td>
                        <td style={{ padding: "8px 8px" }}>
                          <span style={{ padding: "1px 6px", borderRadius: 3, fontSize: 10, fontWeight: 600, background: cm.untouched > 20 ? "#fee2e2" : cm.untouched > 10 ? "#fef9c3" : "#dcfce7", color: cm.untouched > 20 ? "#991b1b" : cm.untouched > 10 ? "#854d0e" : "#166534" }}>{cm.untouched}</span>
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

        {/* ═══ CMA TABLE ═══ */}
        {view === "cma" && (
          <div style={{ background: "white", borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>📋 CMA Performance — {brand === "All" ? "All Brands" : brand} ({filteredCMAs.length} CMAs)</span>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>Ranked by composite score | Click a name for detail</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["Rank", "CMA Name", "Assigned CM", "Brand", "Balto", "Total Calls", "Talk (min)", "Actions", "Unique Leads", "Clocked Hrs", "Trend", "Score"].map(h => (
                      <th key={h} style={{ padding: "8px 7px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCMAs.map((cma, i) => {
                    const st = getStatus(cma.score);
                    return (
                      <tr key={cma.id} style={{ borderBottom: "1px solid #f3f4f6", background: cma.score < 30 ? "#fff5f5" : i % 2 === 1 ? "#fafbfc" : "white", cursor: "pointer" }} onClick={() => setSelectedCMA(cma)}>
                        <td style={{ padding: "8px 7px", fontWeight: 700, color: cma.rank <= 10 ? "#166534" : cma.rank >= 70 ? "#991b1b" : "#6b7280" }}>#{cma.rank}</td>
                        <td style={{ padding: "8px 7px", fontWeight: 600, color: "#2D8B4E", whiteSpace: "nowrap", textDecoration: "underline", textDecorationColor: "#2D8B4E30" }}>{cma.name}</td>
                        <td style={{ padding: "8px 7px", fontSize: 10, color: "#6b7280" }}>{cma.assignedCM}</td>
                        <td style={{ padding: "8px 7px" }}><span style={{ padding: "1px 6px", background: "#f3f4f6", borderRadius: 3, fontSize: 10 }}>{cma.brand}</span></td>
                        <td style={{ padding: "8px 7px", fontWeight: 600, color: cma.baltoScore === null ? "#9ca3af" : cma.baltoScore >= 80 ? "#166534" : cma.baltoScore >= 60 ? "#854d0e" : "#991b1b" }}>{cma.baltoScore ? cma.baltoScore.toFixed(1) : "—"}</td>
                        <td style={{ padding: "8px 7px", fontWeight: 500 }}>{cma.totalCalls}</td>
                        <td style={{ padding: "8px 7px" }}>{cma.talkTime}</td>
                        <td style={{ padding: "8px 7px", fontWeight: 500 }}>{cma.totalActions}</td>
                        <td style={{ padding: "8px 7px" }}>{cma.uniqueLeads}</td>
                        <td style={{ padding: "8px 7px" }}>{cma.clockedHrs}h</td>
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
              Showing {filteredCMAs.length} of 85 CMAs | Data source: Chris (IT) — Week of 2026-04-04 to 2026-04-10 | Balto, Calls, Talk Time, Actions, Leads, Clocked Hrs are REAL values
            </div>
          </div>
        )}

        {/* ═══ ALERTS ═══ */}
        {view === "alerts" && (() => {
          const criticalCMs = MOCK_CMS.filter(cm => (cm.score < 40 || cm.untouched > 20) && (brand === "All" || cm.brand === brand));
          const warningCMs = MOCK_CMS.filter(cm => cm.score >= 40 && cm.score < 70 && (brand === "All" || cm.brand === brand));
          const topCMs = MOCK_CMS.filter(cm => cm.score >= 70 && (brand === "All" || cm.brand === brand));
          const cmaCritical = MOCK_CMAS.filter(cma => cma.score < 30 && (brand === "All" || cma.brand === brand));

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { icon: "🚨", label: "Critical CMs", count: criticalCMs.length, bg: "#991b1b" },
                  { icon: "⚠️", label: "Needs Coaching", count: warningCMs.length, bg: "#854d0e" },
                  { icon: "📋", label: "CMA Issues", count: cmaCritical.length, bg: "#6C3FA0" },
                  { icon: "🌟", label: "Top Performers", count: topCMs.length, bg: "#166534" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: s.bg, borderRadius: 8, minWidth: 140 }}>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>{s.count}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 10 }}>🚨 CM Performance — Critical Issues</div>
                {criticalCMs.map(cm => (
                  <div key={cm.id} style={{ padding: "10px 12px", background: "#fee2e2", borderRadius: 6, borderLeft: "3px solid #ef4444", marginBottom: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => setSelectedCM(cm)}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#991b1b", fontSize: 12 }}>
                        {cm.name} ({cm.brand}, {cm.type} rank #{cm.rank})
                      </div>
                      <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>
                        PassGP: {cm.passGP} | Calls: {cm.realCalls} | Actions: {cm.actions} | Untouched: {cm.untouched} | Score: {cm.score}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {cm.score < 25 && <span style={{ padding: "3px 8px", borderRadius: 4, background: "#991b1b", color: "white", fontSize: 9, fontWeight: 700 }}>PIP CANDIDATE</span>}
                      {cm.weekHistory[4] < cm.weekHistory[0] && <span style={{ padding: "3px 8px", borderRadius: 4, background: "#7f1d1d", color: "white", fontSize: 9, fontWeight: 700 }}>DECLINING</span>}
                    </div>
                  </div>
                ))}
              </div>

              {cmaCritical.length > 0 && (
                <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#6C3FA0", marginBottom: 10 }}>📋 CMA Performance — Impacting CM Output</div>
                  {cmaCritical.map(cma => (
                    <div key={cma.id} style={{ padding: "10px 12px", background: "#F3E8FF", borderRadius: 6, borderLeft: "3px solid #6C3FA0", marginBottom: 6, cursor: "pointer" }} onClick={() => setSelectedCMA(cma)}>
                      <div style={{ fontWeight: 700, color: "#6C3FA0", fontSize: 12 }}>
                        {cma.name} ({cma.brand}) — Rank #{cma.rank} — Supports: {cma.assignedCM}
                      </div>
                      <div style={{ fontSize: 10, color: "#6C3FA0", marginTop: 2 }}>
                        Balto: {cma.baltoScore ? cma.baltoScore.toFixed(1) : "—"} | Total Calls: {cma.totalCalls} | Actions: {cma.totalActions} | Score: {cma.score}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#854d0e", marginBottom: 10 }}>⚠️ Needs Coaching — Yellow Zone CMs</div>
                {warningCMs.map(cm => (
                  <div key={cm.id} style={{ padding: "10px 12px", background: "#fef9c3", borderRadius: 6, borderLeft: "3px solid #eab308", marginBottom: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => setSelectedCM(cm)}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#854d0e", fontSize: 12 }}>{cm.name} ({cm.brand}, {cm.type} rank #{cm.rank}) — Score: {cm.score}</div>
                      <div style={{ fontSize: 10, color: "#854d0e", marginTop: 2 }}>PassGP: {cm.passGP} | Calls: {cm.realCalls} | Untouched: {cm.untouched}</div>
                    </div>
                    <span style={{ padding: "3px 8px", borderRadius: 4, background: "#854d0e", color: "white", fontSize: 9, fontWeight: 700 }}>STAGE 1 COACHING</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#166534", marginBottom: 10 }}>🌟 Top Performers — Recognize &amp; Reward</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
                  {topCMs.sort((a,b) => b.score - a.score).map((cm, i) => (
                    <div key={cm.id} style={{ padding: "12px 14px", background: i === 0 ? "linear-gradient(135deg, #166534, #15803d)" : "#dcfce7", borderRadius: 8, cursor: "pointer", border: i === 0 ? "none" : "1px solid #bbf7d0" }} onClick={() => setSelectedCM(cm)}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 700, color: i === 0 ? "white" : "#166534", fontSize: 13 }}>{i === 0 ? "👑 " : "🌟 "}{cm.name}</div>
                          <div style={{ fontSize: 10, color: i === 0 ? "rgba(255,255,255,0.8)" : "#166534", marginTop: 2 }}>{cm.brand} · {cm.type} rank #{cm.rank} · {cm.passGP} PassGP · {cm.gpvs} GPVs</div>
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: i === 0 ? "rgba(255,255,255,0.9)" : "#166534" }}>{cm.score}</div>
                      </div>
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
          const overdue = open.filter(e => new Date(e.followUpDate) <= new Date("2026-04-16"));
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
            setLogEntries(prev => [{ id: prev.length + 1, date: "2026-04-16", ...newLog, outcome: "pending", resolved: false }, ...prev]);
            setNewLog({ manager: "", employee: "", brand: "", type: "Stage 1 Coaching", trigger: "", action: "", followUpDate: "" });
            setShowLogForm(false);
          };

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { icon: "📂", label: "Open Actions", count: open.length, bg: "#3B7DD8" },
                  { icon: "⏰", label: "Overdue Follow-Ups", count: overdue.length, bg: overdue.length > 0 ? "#991b1b" : "#166534" },
                  { icon: "🔴", label: "No Change After Coaching", count: noChange.length, bg: noChange.length > 0 ? "#7f1d1d" : "#166534" },
                  { icon: "✅", label: "Resolved", count: resolved.length, bg: "#166534" },
                  { icon: "📝", label: "Total Logged", count: logEntries.length, bg: "#1B2A4A" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: s.bg, borderRadius: 8, minWidth: 140 }}>
                    <span style={{ fontSize: 16 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>{s.count}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>📝 Management Accountability Log</div>
                <button onClick={() => setShowLogForm(!showLogForm)} style={{
                  padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                  background: showLogForm ? "#ef4444" : "#3B7DD8", color: "white",
                  fontSize: 11, fontWeight: 600, fontFamily: "inherit",
                }}>{showLogForm ? "✕ Cancel" : "+ Log New Action"}</button>
              </div>

              {showLogForm && (
                <div style={{ background: "white", borderRadius: 10, padding: 16, border: "2px solid #3B7DD8" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>Log a Coaching / Accountability Action</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                    {[
                      { key: "manager", placeholder: "Manager Name" },
                      { key: "employee", placeholder: "Employee Name" },
                      { key: "brand", placeholder: "Brand" },
                      { key: "followUpDate", placeholder: "Follow-Up Date (YYYY-MM-DD)" },
                    ].map(f => (
                      <input key={f.key} value={newLog[f.key]} onChange={e => setNewLog(p => ({...p, [f.key]: e.target.value}))}
                        placeholder={f.placeholder} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11, fontFamily: "inherit", outline: "none" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <select value={newLog.type} onChange={e => setNewLog(p => ({...p, type: e.target.value}))} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11, fontFamily: "inherit", flex: 1 }}>
                      <option>Stage 1 Coaching</option>
                      <option>Stage 2 Formal Warning</option>
                      <option>Stage 3 PIP</option>
                      <option>Recognition</option>
                      <option>Lead Redistribution</option>
                      <option>Escalation to Leadership</option>
                    </select>
                    <input value={newLog.trigger} onChange={e => setNewLog(p => ({...p, trigger: e.target.value}))}
                      placeholder="What triggered this?" style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11, fontFamily: "inherit", flex: 2 }} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={newLog.action} onChange={e => setNewLog(p => ({...p, action: e.target.value}))}
                      placeholder="What action was taken?" style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11, fontFamily: "inherit", flex: 1 }} />
                    <button onClick={handleAddLog} style={{ padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer", background: "#3B7DD8", color: "white", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap" }}>Save Entry</button>
                  </div>
                </div>
              )}

              <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", background: "#f8fafc" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A" }}>Open Actions ({open.length})</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["Date", "Manager", "Employee", "Brand", "Type", "Trigger", "Action", "Follow-Up", "Outcome", "Update"].map(h => (
                          <th key={h} style={{ padding: "7px 6px", textAlign: "left", fontSize: 8, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.3, borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {open.sort((a,b) => new Date(a.followUpDate) - new Date(b.followUpDate)).map(entry => {
                        const oc = outcomeColor(entry.outcome);
                        const tc = typeColor(entry.type);
                        const isOverdue = new Date(entry.followUpDate) <= new Date("2026-04-16");
                        return (
                          <tr key={entry.id} style={{ borderBottom: "1px solid #f3f4f6", background: isOverdue ? "#fff5f5" : "white" }}>
                            <td style={{ padding: "7px 6px", whiteSpace: "nowrap", fontWeight: 500 }}>{entry.date}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: "#1B2A4A" }}>{entry.manager}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: "#3B7DD8" }}>{entry.employee}</td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "1px 5px", background: "#f3f4f6", borderRadius: 3, fontSize: 9 }}>{entry.brand}</span></td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 8, fontWeight: 700, background: tc.bg, color: tc.tc }}>{entry.type}</span></td>
                            <td style={{ padding: "7px 6px", maxWidth: 140, fontSize: 9, color: "#6b7280" }}>{entry.trigger}</td>
                            <td style={{ padding: "7px 6px", maxWidth: 180, fontSize: 9 }}>{entry.action}</td>
                            <td style={{ padding: "7px 6px", whiteSpace: "nowrap" }}><span style={{ fontWeight: 600, color: isOverdue ? "#991b1b" : "#6b7280" }}>{isOverdue ? "⏰ " : ""}{entry.followUpDate}</span></td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "2px 6px", borderRadius: 10, fontSize: 8, fontWeight: 700, background: oc.bg, color: oc.tc }}>{oc.label}</span></td>
                            <td style={{ padding: "7px 6px" }}>
                              <div style={{ display: "flex", gap: 3 }}>
                                <button onClick={() => setLogEntries(prev => prev.map(e => e.id === entry.id ? {...e, outcome: "improved", resolved: true} : e))} style={{ padding: "3px 6px", borderRadius: 3, border: "none", cursor: "pointer", fontSize: 8, fontWeight: 700, background: "#dcfce7", color: "#166534", fontFamily: "inherit" }}>✅ Improved</button>
                                <button onClick={() => setLogEntries(prev => prev.map(e => e.id === entry.id ? {...e, outcome: "no_change"} : e))} style={{ padding: "3px 6px", borderRadius: 3, border: "none", cursor: "pointer", fontSize: 8, fontWeight: 700, background: "#fee2e2", color: "#991b1b", fontFamily: "inherit" }}>🔴 No Change</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {resolved.length > 0 && (
                <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", background: "#dcfce7" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#166534" }}>✅ Resolved Actions ({resolved.length})</span>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                      <thead>
                        <tr style={{ background: "#f8fafc" }}>
                          {["Date", "Manager", "Employee", "Brand", "Type", "Action", "Outcome"].map(h => (
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
            </div>
          );
        })()}

        {/* ═══ SPEED-TO-CONTACT ═══ */}
        {view === "speed" && (() => {
          const s = STC_SUMMARY;
          const onTimePct = Math.round(s.onTime / s.valid * 100);
          const sigLatePct = Math.round(s.sigLate / s.valid * 100);
          const notOnTimePct = 100 - onTimePct;

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>no call made</div>
                </div>
              </div>

              <div style={{ padding: "12px 16px", background: "#fee2e2", borderRadius: 8, borderLeft: "4px solid #ef4444" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#991b1b" }}>The system is tracking. Nobody is acting.</div>
                <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>Chris's speed-to-contact system has captured this since January. {notOnTimePct}% of calls going out late or missed entirely across {s.total.toLocaleString()} appointments. The tool works. The accountability around it doesn't.</div>
              </div>

              <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>Per-Rep Speed-to-Contact — Top 20 by Volume</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["Rep Name", "Total", "On Time", "On Time %", "Late", "15+ Late", "Missed", "Status"].map(h => (
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
                            <td style={{ padding: "8px 8px" }}>{r.total}</td>
                            <td style={{ padding: "8px 8px", color: "#166534", fontWeight: 600 }}>{r.onTime}</td>
                            <td style={{ padding: "8px 8px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 40, height: 5, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
                                  <div style={{ width: `${r.onTimePct}%`, height: "100%", background: r.onTimePct >= 70 ? "#22c55e" : r.onTimePct >= 50 ? "#eab308" : "#ef4444" }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: r.onTimePct >= 70 ? "#166534" : r.onTimePct >= 50 ? "#854d0e" : "#991b1b" }}>{r.onTimePct}%</span>
                              </div>
                            </td>
                            <td style={{ padding: "8px 8px", color: "#854d0e" }}>{r.late}</td>
                            <td style={{ padding: "8px 8px", color: "#991b1b", fontWeight: r.sigLate > 50 ? 700 : 400 }}>{r.sigLate}</td>
                            <td style={{ padding: "8px 8px" }}>{r.missed}</td>
                            <td style={{ padding: "8px 8px" }}><span style={{ padding: "2px 8px", borderRadius: 16, fontSize: 9, fontWeight: 700, background: st.bg, color: st.tc }}>{st.label}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══ CONVERSION ═══ */}
        {view === "funnel" && (() => {
          const funnelData = brand === "All" ? CM_FUNNEL : CM_FUNNEL.filter(f => f.brand === brand);
          const fTotals = {
            leads: funnelData.reduce((s,f) => s + f.leadsAssigned, 0),
            contacted: funnelData.reduce((s,f) => s + f.contacted, 0),
            appt: funnelData.reduce((s,f) => s + f.apptSet, 0),
            pitch: funnelData.reduce((s,f) => s + f.pitchDelivered, 0),
            csaSent: funnelData.reduce((s,f) => s + f.csaSent, 0),
            csaSigned: funnelData.reduce((s,f) => s + f.csaSigned, 0),
            gpv: funnelData.reduce((s,f) => s + f.gpvSubmitted, 0),
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
              <div style={{ background: "white", borderRadius: 10, padding: 20, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 12 }}>🔄 Full Conversion Funnel — {brand === "All" ? "All Brands" : brand}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 180, marginBottom: 8 }}>
                  {stages.map((st, i) => {
                    const h = fTotals.leads > 0 ? (st.val / fTotals.leads) * 160 : 0;
                    const prevVal = i > 0 ? stages[i-1].val : st.val;
                    const dropoff = prevVal > 0 ? Math.round((1 - st.val / prevVal) * 100) : 0;
                    return (
                      <div key={st.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: st.color }}>{st.val}</span>
                        {i > 0 && <span style={{ fontSize: 8, color: "#ef4444", fontWeight: 600 }}>-{dropoff}%</span>}
                        <div style={{ width: "100%", maxWidth: 80, height: Math.max(h, 4), borderRadius: "6px 6px 0 0", background: st.color, opacity: 0.85 }} />
                        <span style={{ fontSize: 9, color: "#6b7280", fontWeight: 500, textAlign: "center", lineHeight: "1.2" }}>{st.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>Per-CM Conversion &amp; Attribution</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["CM","Brand","Leads","Contact%","Appt","Pitch","CSA Sent","Signed","GPVs","Lead→GPV","Pitch ✓"].map(h => (
                          <th key={h} style={{ padding: "7px 6px", textAlign: "left", fontSize: 8, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {funnelData.sort((a,b) => {
                        const ar = a.leadsAssigned > 0 ? a.gpvSubmitted / a.leadsAssigned : 0;
                        const br = b.leadsAssigned > 0 ? b.gpvSubmitted / b.leadsAssigned : 0;
                        return br - ar;
                      }).map((f, i) => {
                        const contactPct = f.leadsAssigned > 0 ? Math.round(f.contacted / f.leadsAssigned * 100) : 0;
                        const leadToGpv = f.leadsAssigned > 0 ? Math.round(f.gpvSubmitted / f.leadsAssigned * 100) : 0;
                        return (
                          <tr key={f.cmId} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 1 ? "#fafbfc" : "white" }}>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: "#1B2A4A", whiteSpace: "nowrap" }}>{f.name}</td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "1px 5px", background: "#f3f4f6", borderRadius: 3, fontSize: 9 }}>{f.brand}</span></td>
                            <td style={{ padding: "7px 6px" }}>{f.leadsAssigned}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 600, color: contactPct >= 80 ? "#166534" : "#854d0e" }}>{contactPct}%</td>
                            <td style={{ padding: "7px 6px" }}>{f.apptSet}</td>
                            <td style={{ padding: "7px 6px" }}>{f.pitchDelivered}</td>
                            <td style={{ padding: "7px 6px" }}>{f.csaSent}</td>
                            <td style={{ padding: "7px 6px", fontWeight: 700, color: "#166534" }}>{f.csaSigned}</td>
                            <td style={{ padding: "7px 6px", fontSize: 13, fontWeight: 700, color: f.gpvSubmitted > 0 ? "#1B2A4A" : "#991b1b" }}>{f.gpvSubmitted}</td>
                            <td style={{ padding: "7px 6px" }}><span style={{ padding: "2px 6px", borderRadius: 10, fontSize: 9, fontWeight: 700, background: leadToGpv >= 20 ? "#dcfce7" : leadToGpv >= 10 ? "#fef9c3" : "#fee2e2", color: leadToGpv >= 20 ? "#166534" : leadToGpv >= 10 ? "#854d0e" : "#991b1b" }}>{leadToGpv}%</span></td>
                            <td style={{ padding: "7px 6px", fontSize: 13 }}>{f.pitchVerified ? "✅" : "🔴"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══ REVENUE IMPACT ═══ */}
        {view === "corp" && consultView === "revenue" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "white", borderRadius: 10, padding: 20, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>💰 Revenue Impact Calculator</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 16 }}>Estimated revenue at risk. Assumes ${AVG_CONTRACT.toLocaleString()} average contract.</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
                <div style={{ padding: 16, borderRadius: 10, background: "#fee2e2", border: "1px solid #fca5a5" }}>
                  <div style={{ fontSize: 10, color: "#991b1b", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Untouched Lead Revenue at Risk</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#991b1b" }}>${revenueImpact.untouchedRev.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#991b1b", marginTop: 4 }}>{revenueImpact.untouched} leads × 8% × ${AVG_CONTRACT.toLocaleString()}</div>
                </div>
                <div style={{ padding: 16, borderRadius: 10, background: "#fef9c3", border: "1px solid #fde68a" }}>
                  <div style={{ fontSize: 10, color: "#854d0e", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Missed Call Gap Revenue</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#854d0e" }}>${revenueImpact.callGapRev.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#854d0e", marginTop: 4 }}>{revenueImpact.missedCalls} calls below 50/day × 3%</div>
                </div>
                <div style={{ padding: 16, borderRadius: 10, background: "#fef3c7", border: "1px solid #fde68a" }}>
                  <div style={{ fontSize: 10, color: "#854d0e", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>CSA Not-Closed-on-Call</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#854d0e" }}>${revenueImpact.csaLeakRev.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#854d0e", marginTop: 4 }}>{revenueImpact.noCloseCount} CMs × 40% drop</div>
                </div>
              </div>
              <div style={{ padding: 20, borderRadius: 10, background: "linear-gradient(135deg, #1B2A4A, #2C3E6B)", color: "white", textAlign: "center" }}>
                <div style={{ fontSize: 11, opacity: 0.7, textTransform: "uppercase", fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>Total Estimated Monthly Revenue at Risk</div>
                <div style={{ fontSize: 42, fontWeight: 700 }}>${revenueImpact.total.toLocaleString()}</div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Based on current gaps across {brand === "All" ? "all brands" : brand}</div>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>CMs Contributing Most to Revenue Leakage</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["CM", "Brand", "Type", "Untouched", "Est. Lost Rev", "PassGP", "Score", "Action"].map(h => (
                      <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CMS.filter(cm => cm.score < 50 && (brand === "All" || cm.brand === brand)).sort((a,b) => b.untouched - a.untouched).map((cm, i) => {
                    const lostRev = Math.round(cm.untouched * 0.08 * AVG_CONTRACT);
                    return (
                      <tr key={cm.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 1 ? "#fafbfc" : "white", cursor: "pointer" }} onClick={() => setSelectedCM(cm)}>
                        <td style={{ padding: "8px 10px", fontWeight: 600, color: "#991b1b" }}>{cm.name}</td>
                        <td style={{ padding: "8px 10px" }}>{cm.brand}</td>
                        <td style={{ padding: "8px 10px" }}><span style={{ padding: "1px 6px", background: cm.type === "INC" ? "#E8F0FE" : "#F3E8FF", color: cm.type === "INC" ? "#3B7DD8" : "#6C3FA0", borderRadius: 3, fontSize: 9, fontWeight: 700 }}>{cm.type}</span></td>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: "#991b1b" }}>{cm.untouched}</td>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: "#991b1b" }}>${lostRev.toLocaleString()}</td>
                        <td style={{ padding: "8px 10px" }}>{cm.passGP}</td>
                        <td style={{ padding: "8px 10px" }}><span style={{ padding: "2px 6px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: "#fee2e2", color: "#991b1b" }}>{cm.score}</span></td>
                        <td style={{ padding: "8px 10px", fontSize: 10, color: "#991b1b" }}>
                          {cm.untouched > 20 ? "Redistribute leads" : cm.realCalls < 150 ? "Verify call activity" : "Stage 1 coaching"}
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
        {view === "corp" && consultView === "brands" && (() => {
          const bs = BRANDS.filter(b => b !== "All").map(b => {
            const cms = MOCK_CMS.filter(c => c.brand === b);
            if (!cms.length) return null;
            return {
              brand: b, n: cms.length,
              ac: Math.round(cms.reduce((s,c) => s+c.realCalls,0)/cms.length),
              passGP: cms.reduce((s,c) => s+c.passGP,0),
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
                      {["#","Brand","CMs","Avg Calls","Total PassGP","GPVs","Untouched","Rev Risk","Score","% Green","% Red"].map(h => (
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
                          <td style={{ padding: "8px 10px", fontWeight: 600 }}>{b.ac}</td>
                          <td style={{ padding: "8px 10px", fontWeight: 700, color: "#2D8B4E" }}>{b.passGP}</td>
                          <td style={{ padding: "8px 10px", fontWeight: 700 }}>{b.gp}</td>
                          <td style={{ padding: "8px 10px" }}><span style={{ padding: "1px 6px", borderRadius: 3, fontSize: 10, fontWeight: 600, background: b.ut > 40 ? "#fee2e2" : b.ut > 15 ? "#fef9c3" : "#dcfce7", color: b.ut > 40 ? "#991b1b" : b.ut > 15 ? "#854d0e" : "#166534" }}>{b.ut}</span></td>
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
                    <div style={{ width: "100%", maxWidth: 60, height: (d.totalCalls/2500)*140, borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg, #3B7DD8, #2C3E6B)" }} />
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
                      <div style={{ width: "100%", maxWidth: 50, height: (d.totalGPVs/70)*100, borderRadius: "6px 6px 0 0", background: "#2D8B4E" }} />
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

        {/* ═══ YTD FULL DATA (from PowerBI) ═══ */}
        {view === "ytd" && (() => {
          const ytdSort = ytdSortKey;
          const ytdFilter = ytdRoleFilter;
          const ytdSearch = ytdSearchText;

          // Filter and sort
          let filtered = YTD_DATA;
          if (ytdFilter !== "All") {
            filtered = filtered.filter(r => {
              if (ytdFilter === "Ranked CMs") return r.role.startsWith("CM-");
              if (ytdFilter === "INC CMs") return r.role.startsWith("CM-INC");
              if (ytdFilter === "FTF CMs") return r.role.startsWith("CM-FTF");
              if (ytdFilter === "Unknown/Investigate") return r.role === "UNKNOWN" || r.role === "HIGH-CSA?" || r.role === "HIGH-CALL?";
              if (ytdFilter === "System/Dialer") return r.role === "SYSTEM" || r.role === "DIALER?";
              if (ytdFilter === "Producers") return r.role === "PRODUCER";
              return true;
            });
          }
          if (ytdSearch) {
            const s = ytdSearch.toLowerCase();
            filtered = filtered.filter(r => r.name.toLowerCase().includes(s) || r.role.toLowerCase().includes(s));
          }
          filtered = [...filtered].sort((a, b) => {
            const av = a[ytdSort], bv = b[ytdSort];
            if (typeof av === "string") return bv.localeCompare(av);
            return bv - av;
          });

          const roleColor = (role) => {
            if (role.startsWith("CM-INC")) return { bg: "#E8F0FE", tc: "#3B7DD8" };
            if (role.startsWith("CM-FTF")) return { bg: "#F3E8FF", tc: "#6C3FA0" };
            if (role === "SYSTEM") return { bg: "#f3f4f6", tc: "#6b7280" };
            if (role === "DIALER?") return { bg: "#fef3c7", tc: "#92400e" };
            if (role === "HIGH-CSA?") return { bg: "#fee2e2", tc: "#991b1b" };
            if (role === "HIGH-CALL?") return { bg: "#fef9c3", tc: "#854d0e" };
            if (role === "PRODUCER") return { bg: "#dcfce7", tc: "#166534" };
            return { bg: "#f9fafb", tc: "#6b7280" };
          };

          const filterButtons = ["All", "Ranked CMs", "INC CMs", "FTF CMs", "Producers", "Unknown/Investigate", "System/Dialer"];

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ padding: "12px 16px", background: "linear-gradient(135deg, #1B2A4A, #2C3E6B)", borderRadius: 10, color: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>📅 YTD Full Data — From PowerBI rawData_Consultants</div>
                    <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{YTD_TOTALS.dateRange} | Refreshes 8x daily: 7a, 9a, 11a, 1p, 3p, 4:30p, 6p, 7p MT</div>
                  </div>
                  <div style={{ padding: "4px 10px", background: "rgba(34,197,94,0.25)", borderRadius: 4, fontSize: 10, fontWeight: 600, color: "#86efac" }}>LIVE DATA</div>
                </div>
              </div>

              {/* Company totals */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
                {[
                  { label: "Total Leads YTD", value: YTD_TOTALS.totalLeads.toLocaleString(), sub: `${YTD_TOTALS.activeUsers} active users`, color: "#3B7DD8" },
                  { label: "Total Calls YTD", value: YTD_TOTALS.totalCalls.toLocaleString(), sub: `${YTD_TOTALS.totalInbound.toLocaleString()} in / ${YTD_TOTALS.totalOutbound.toLocaleString()} out`, color: "#6C3FA0" },
                  { label: "CSAs Signed", value: YTD_TOTALS.totalCSAsSigned.toLocaleString(), sub: `${YTD_TOTALS.companySignRate}% sign rate`, color: "#166534" },
                  { label: "GPV Leads", value: YTD_TOTALS.totalGPVLeads.toLocaleString(), sub: "Total in GPV stage", color: "#D4860B" },
                  { label: "Referrals", value: YTD_TOTALS.totalReferrals.toLocaleString(), sub: "From all sources", color: "#2D8B4E" },
                  { label: "⚠️ Investigate", value: YTD_TOTALS.systemAccounts + YTD_TOTALS.dialerFlagged, sub: `${YTD_TOTALS.systemAccounts} system + ${YTD_TOTALS.dialerFlagged} dialer?`, color: "#991b1b" },
                ].map(s => (
                  <div key={s.label} style={{ padding: 12, background: "white", borderRadius: 8, border: `1px solid ${s.color}20`, borderTop: `3px solid ${s.color}` }}>
                    <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#1B2A4A" }}>{s.value}</div>
                    <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Anomaly callout */}
              <div style={{ padding: "12px 16px", background: "#fef3c7", borderRadius: 8, borderLeft: "4px solid #D4860B" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e" }}>🔍 YTD data reveals people NOT in Chris's weekly ranking</div>
                <div style={{ fontSize: 10, color: "#92400e", marginTop: 4 }}>
                  <b>Brandon Stevens</b> (410 CSAs, 99.8% sign rate), <b>Ritchie Sanchez</b> (402 CSAs, 100%), <b>Clint Russell</b> (184 CSAs) — these are top CSA producers but aren't in the INC/FTF rankings.
                  Also flagged: <b>Jory Chambers</b> (25,806 calls), <b>Norma Villalobos</b> (22,153), <b>Kimberly Divens</b> (19,357) — these look like team/dialer accounts. Use the "Unknown/Investigate" filter below to see all of them.
                </div>
              </div>

              {/* Filters */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>FILTER:</span>
                {filterButtons.map(f => (
                  <button key={f} onClick={() => setYtdRoleFilter(f)} style={{
                    padding: "4px 12px", borderRadius: 16, border: "1px solid", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    borderColor: ytdFilter === f ? "#3B7DD8" : "#e5e7eb",
                    background: ytdFilter === f ? "#3B7DD8" : "white",
                    color: ytdFilter === f ? "white" : "#6b7280",
                  }}>{f}</button>
                ))}
                <input value={ytdSearch} onChange={e => setYtdSearchText(e.target.value)}
                  placeholder="🔍 Search name or role..."
                  style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 11, fontFamily: "inherit", outline: "none", marginLeft: 8, minWidth: 200 }} />
                <span style={{ fontSize: 10, color: "#9ca3af", marginLeft: "auto" }}>Showing {filtered.length} of {YTD_DATA.length}</span>
              </div>

              {/* Main YTD table */}
              <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A" }}>Per-User YTD Performance — All Roles, All Brands</span>
                  <span style={{ fontSize: 10, color: "#6b7280" }}>Click column header to sort</span>
                </div>
                <div style={{ maxHeight: 600, overflowY: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead style={{ position: "sticky", top: 0, background: "#f8fafc", zIndex: 1 }}>
                      <tr>
                        {[
                          { k: "name", l: "User" },
                          { k: "role", l: "Role" },
                          { k: "leads", l: "Leads" },
                          { k: "total", l: "Calls" },
                          { k: "inbound", l: "Inbound" },
                          { k: "outbound", l: "Outbound" },
                          { k: "csaCreated", l: "CSA Sent" },
                          { k: "csaSigned", l: "CSA Signed" },
                          { k: "signRate", l: "Sign %" },
                          { k: "gpvLeads", l: "GPV Leads" },
                          { k: "referrals", l: "Referrals" },
                        ].map(col => (
                          <th key={col.k} onClick={() => setYtdSort(col.k)} style={{
                            padding: "8px 8px", textAlign: "left", fontSize: 9, fontWeight: 600,
                            color: ytdSort === col.k ? "#3B7DD8" : "#6b7280",
                            textTransform: "uppercase", letterSpacing: 0.3,
                            borderBottom: "2px solid #e5e7eb", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
                          }}>{col.l} {ytdSort === col.k ? "↓" : ""}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((r, i) => {
                        const rc = roleColor(r.role);
                        return (
                          <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 1 ? "#fafbfc" : "white" }}>
                            <td style={{ padding: "7px 8px", fontWeight: 600, color: "#1B2A4A", whiteSpace: "nowrap" }}>{r.name}</td>
                            <td style={{ padding: "7px 8px" }}>
                              <span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: rc.bg, color: rc.tc, whiteSpace: "nowrap" }}>{r.role}</span>
                            </td>
                            <td style={{ padding: "7px 8px", fontWeight: 500 }}>{r.leads.toLocaleString()}</td>
                            <td style={{ padding: "7px 8px", fontWeight: 600, color: r.total > 10000 ? "#854d0e" : r.total > 5000 ? "#166534" : "#1B2A4A" }}>{r.total.toLocaleString()}</td>
                            <td style={{ padding: "7px 8px", color: "#6b7280" }}>{r.inbound.toLocaleString()}</td>
                            <td style={{ padding: "7px 8px", color: "#6b7280" }}>{r.outbound.toLocaleString()}</td>
                            <td style={{ padding: "7px 8px" }}>{r.csaCreated}</td>
                            <td style={{ padding: "7px 8px", fontWeight: 700, color: r.csaSigned >= 50 ? "#166534" : r.csaSigned >= 10 ? "#854d0e" : "#1B2A4A" }}>{r.csaSigned}</td>
                            <td style={{ padding: "7px 8px" }}>
                              {r.csaCreated > 0 ? (
                                <span style={{ padding: "1px 6px", borderRadius: 3, fontSize: 10, fontWeight: 600, background: r.signRate >= 90 ? "#dcfce7" : r.signRate >= 70 ? "#fef9c3" : "#fee2e2", color: r.signRate >= 90 ? "#166534" : r.signRate >= 70 ? "#854d0e" : "#991b1b" }}>{r.signRate}%</span>
                              ) : <span style={{ color: "#d1d5db" }}>—</span>}
                            </td>
                            <td style={{ padding: "7px 8px", fontWeight: 600, color: r.gpvLeads > 1000 ? "#166534" : "#1B2A4A" }}>{r.gpvLeads.toLocaleString()}</td>
                            <td style={{ padding: "7px 8px" }}>{r.referrals}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "10px 16px", background: "#f8fafc", borderTop: "1px solid #e5e7eb", fontSize: 10, color: "#6b7280", display: "flex", justifyContent: "space-between" }}>
                  <span>Source: PowerBI rawData_Consultants | YTD 2026 | {filtered.length} rows displayed</span>
                  <span>Totals for filter: Calls {filtered.reduce((s,r)=>s+r.total,0).toLocaleString()} | CSAs {filtered.reduce((s,r)=>s+r.csaSigned,0).toLocaleString()} | GPVs {filtered.reduce((s,r)=>s+r.gpvLeads,0).toLocaleString()}</span>
                </div>
              </div>

              {/* Legend */}
              <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>🏷 Role Legend</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {[
                    { role: "CM-INC#N", desc: "Ranked Increase CM — appears in Chris's weekly INC ranking at position N", color: { bg: "#E8F0FE", tc: "#3B7DD8" } },
                    { role: "CM-FTF#N", desc: "Ranked First-Time Filer CM — appears in Chris's weekly FTF ranking at position N", color: { bg: "#F3E8FF", tc: "#6C3FA0" } },
                    { role: "HIGH-CSA?", desc: "High CSA signer (50+) NOT in ranking — likely exec, manager, or admin role", color: { bg: "#fee2e2", tc: "#991b1b" } },
                    { role: "HIGH-CALL?", desc: "5,000+ calls YTD but not in ranking — role unclear, investigate", color: { bg: "#fef9c3", tc: "#854d0e" } },
                    { role: "PRODUCER", desc: "Has CSA or 50+ GPV leads but not in weekly ranking — likely former CM or part-time", color: { bg: "#dcfce7", tc: "#166534" } },
                    { role: "DIALER?", desc: "Extreme call volume (15,000+) with <5 CSAs — likely team account or auto-dialer", color: { bg: "#fef3c7", tc: "#92400e" } },
                    { role: "SYSTEM", desc: "Known system account (Veteran Ratings, Jim Brown, Felix Brown, etc.)", color: { bg: "#f3f4f6", tc: "#6b7280" } },
                    { role: "UNKNOWN", desc: "Has some activity but role cannot be determined from this data alone", color: { bg: "#f9fafb", tc: "#6b7280" } },
                  ].map(l => (
                    <div key={l.role} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: 8, background: "#fafbfc", borderRadius: 6 }}>
                      <span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: l.color.bg, color: l.color.tc, whiteSpace: "nowrap", flexShrink: 0 }}>{l.role}</span>
                      <span style={{ fontSize: 10, color: "#6b7280" }}>{l.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next steps */}
              <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>📌 Investigation Checklist for Drew &amp; David</div>
                {[
                  "Ask Chris: Who are Brandon Stevens and Ritchie Sanchez? They have 410 and 402 CSAs signed but aren't in the CM rankings.",
                  "Ask Chris: Is Jory Chambers (25,806 calls) a dialer account or a person? Same question for Norma Villalobos and Kimberly Divens.",
                  "Ask Chris: Is 'Jim Brown' (9,963 leads, 1 CSA) a lead-intake account?",
                  "Ask Chris: What does 'Count of leadID' in the GPV file actually represent? Christian Meza shows 1,742 GPV leads but only 12 CSAs — doesn't reconcile.",
                  "Filter by 'HIGH-CSA?' above to see all unranked high producers. They may be doing unseen work worth recognizing.",
                  "Filter by 'Unknown/Investigate' to build a list of names to ask Chris about in a single consolidated message.",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "6px 10px", borderRadius: 4, marginBottom: 3, background: i < 2 ? "#fef2f2" : i < 4 ? "#fffbeb" : "#f8fafc" }}>
                    <div style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${i < 2 ? "#ef4444" : i < 4 ? "#f59e0b" : "#d1d5db"}`, flexShrink: 0, marginTop: 2 }} />
                    <div style={{ fontSize: 10, color: "#1B2A4A", lineHeight: 1.4 }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ═══ ROLE ATTRIBUTION — WHO DID THE WORK vs WHO GOT CREDIT ═══ */}
        {view === "corp" && consultView === "attribution" && (() => {
          let filtered = ATTRIBUTION_DATA;
          if (attribRoleFilter !== "All") {
            filtered = filtered.filter(r => r.role === attribRoleFilter);
          }
          filtered = [...filtered].sort((a, b) => b.csaCloses - a.csaCloses || b.gpvLeads - a.gpvLeads);

          const roleColor = (r) => {
            if (r === "CLOSER") return { bg: "#fee2e2", tc: "#991b1b", icon: "🎯" };
            if (r === "HUNTER") return { bg: "#fef9c3", tc: "#854d0e", icon: "🏹" };
            if (r === "FULL-CYCLE") return { bg: "#dcfce7", tc: "#166534", icon: "♻️" };
            if (r === "GPV-WORKER") return { bg: "#E8F0FE", tc: "#3B7DD8", icon: "📄" };
            if (r === "OCCASIONAL") return { bg: "#F3E8FF", tc: "#6C3FA0", icon: "◆" };
            if (r === "HIGH-CALL-NO-CLOSE") return { bg: "#fef3c7", tc: "#92400e", icon: "📞" };
            return { bg: "#f3f4f6", tc: "#6b7280", icon: "·" };
          };

          const roleFilters = ["All", "CLOSER", "HUNTER", "FULL-CYCLE", "GPV-WORKER", "OCCASIONAL", "HIGH-CALL-NO-CLOSE"];

          // Count by role
          const roleCounts = {};
          ATTRIBUTION_DATA.forEach(r => { roleCounts[r.role] = (roleCounts[r.role] || 0) + 1; });

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* HEADLINE DISCOVERY */}
              <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #7f1d1d, #991b1b)", borderRadius: 10, color: "white" }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>🎯 The Pitch Attribution Discovery</div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 6, lineHeight: 1.5 }}>
                  The CRM tracks <b>who signs the CSA</b>, not <b>who generated the lead</b>. This is the attribution problem Tony flagged from day one. The raw leadID data now lets us connect the two.
                  Of {ATTRIBUTION_INSIGHT.totalSigned.toLocaleString()} CSAs signed YTD: <b>{ATTRIBUTION_INSIGHT.sameRep.toLocaleString()}</b> ({Math.round(ATTRIBUTION_INSIGHT.sameRep/ATTRIBUTION_INSIGHT.totalSigned*100)}%) were same-rep end-to-end, <b>{ATTRIBUTION_INSIGHT.diffRep.toLocaleString()}</b> ({Math.round(ATTRIBUTION_INSIGHT.diffRep/ATTRIBUTION_INSIGHT.totalSigned*100)}%) had one rep generate the lead and another rep close it, and <b>{ATTRIBUTION_INSIGHT.noGpv.toLocaleString()}</b> ({Math.round(ATTRIBUTION_INSIGHT.noGpv/ATTRIBUTION_INSIGHT.totalSigned*100)}%) had no linkable GPV record at all.
                </div>
              </div>

              {/* Brandon/Ritchie reveal */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "2px solid #991b1b" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#991b1b", marginBottom: 4 }}>🔍 Brandon Stevens &amp; Ritchie Sanchez — Answered</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 12 }}>These are the two "unranked high producers" the YTD data flagged yesterday. The attribution data explains why they're not in the CM rankings.</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ padding: 14, background: "#fef2f2", borderRadius: 8, borderLeft: "4px solid #ef4444" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b" }}>Brandon Stevens — Pure CLOSER</div>
                    <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2, marginBottom: 8 }}>Brand: Veteran Adviser Consulting</div>
                    <div style={{ fontSize: 11, color: "#1B2A4A", marginBottom: 8 }}>405 CSAs signed YTD — <b>0 came from his own GPV work</b>. He closes other people's leads.</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 4 }}>Whose leads he closed:</div>
                    {[{n:"Victoria Wood", c:118},{n:"Vanessa James", c:100},{n:"Antonio Rodas", c:80},{n:"Jonathan Rivera", c:45},{n:"Christian Meza", c:16},{n:"Millie Murillo", c:15},{n:"Stephanie Tebbetts", c:9}].map(o => (
                      <div key={o.n} style={{ display: "flex", justifyContent: "space-between", fontSize: 10, padding: "3px 0" }}>
                        <span style={{ color: "#1B2A4A" }}>{o.n}</span>
                        <span style={{ color: "#991b1b", fontWeight: 600 }}>{o.c} closed</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 14, background: "#fef2f2", borderRadius: 8, borderLeft: "4px solid #ef4444" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b" }}>Ritchie Sanchez — Pure CLOSER</div>
                    <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2, marginBottom: 8 }}>Brand: Veteran Adviser Consulting</div>
                    <div style={{ fontSize: 11, color: "#1B2A4A", marginBottom: 8 }}>401 CSAs signed YTD — <b>0 came from his own GPV work</b>. Same pattern as Brandon.</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 4 }}>Whose leads he closed:</div>
                    {[{n:"Stephanie Tebbetts", c:119},{n:"Eric Torres", c:95},{n:"Millie Murillo", c:84},{n:"Antonio Rodas", c:22},{n:"Jonathan Rivera", c:22},{n:"Christian Meza", c:17},{n:"Victoria Wood", c:14}].map(o => (
                      <div key={o.n} style={{ display: "flex", justifyContent: "space-between", fontSize: 10, padding: "3px 0" }}>
                        <span style={{ color: "#1B2A4A" }}>{o.n}</span>
                        <span style={{ color: "#991b1b", fontWeight: 600 }}>{o.c} closed</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 12, padding: "10px 12px", background: "#fffbeb", borderRadius: 6, borderLeft: "3px solid #f59e0b" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e" }}>What this means for accountability:</div>
                  <div style={{ fontSize: 10, color: "#92400e", marginTop: 3, lineHeight: 1.5 }}>
                    The CMs in Chris's weekly ranking (Victoria, Vanessa James, Antonio Rodas, Jonathan Rivera, Stephanie Tebbetts, Eric Torres, Millie Murillo) are generating hundreds of GPVs but only getting credit for a fraction of closes. When you look at "PassGP" in the weekly ranking, that may reflect end-to-end closes only — missing the lead work they did for Brandon and Ritchie to close. <b>Their true production is significantly higher than their rank suggests.</b>
                  </div>
                </div>
              </div>

              {/* Role breakdown stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                {[
                  { role: "CLOSER", desc: "Closes others' leads", color: "#991b1b", bg: "#fee2e2" },
                  { role: "HUNTER", desc: "Generates, others close", color: "#854d0e", bg: "#fef9c3" },
                  { role: "FULL-CYCLE", desc: "End-to-end owner", color: "#166534", bg: "#dcfce7" },
                  { role: "GPV-WORKER", desc: "GPVs without closes", color: "#3B7DD8", bg: "#E8F0FE" },
                  { role: "OCCASIONAL", desc: "Low activity", color: "#6C3FA0", bg: "#F3E8FF" },
                  { role: "HIGH-CALL-NO-CLOSE", desc: "Calls, no CSAs", color: "#92400e", bg: "#fef3c7" },
                  { role: "LIGHT-ACTIVITY", desc: "Minimal YTD", color: "#6b7280", bg: "#f3f4f6" },
                ].map(r => (
                  <div key={r.role} style={{ padding: 10, background: r.bg, borderRadius: 8, border: `1px solid ${r.color}30`, textAlign: "center", cursor: "pointer" }} onClick={() => setAttribRoleFilter(r.role === "LIGHT-ACTIVITY" ? "All" : r.role)}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: r.color, textTransform: "uppercase" }}>{r.role}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: r.color, marginTop: 3 }}>{roleCounts[r.role] || 0}</div>
                    <div style={{ fontSize: 9, color: r.color, opacity: 0.75 }}>{r.desc}</div>
                  </div>
                ))}
              </div>

              {/* Filter */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>FILTER:</span>
                {roleFilters.map(f => (
                  <button key={f} onClick={() => setAttribRoleFilter(f)} style={{
                    padding: "4px 12px", borderRadius: 16, border: "1px solid", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    borderColor: attribRoleFilter === f ? "#3B7DD8" : "#e5e7eb",
                    background: attribRoleFilter === f ? "#3B7DD8" : "white",
                    color: attribRoleFilter === f ? "white" : "#6b7280",
                  }}>{f}</button>
                ))}
                <span style={{ fontSize: 10, color: "#9ca3af", marginLeft: "auto" }}>Showing {filtered.length} users</span>
              </div>

              {/* Main table */}
              <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", background: "#f8fafc" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A" }}>Per-User Attribution Table — leadID matched GPV to CSA</span>
                </div>
                <div style={{ maxHeight: 600, overflowY: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                    <thead style={{ position: "sticky", top: 0, background: "#f8fafc", zIndex: 1 }}>
                      <tr>
                        {["User", "Rank", "Role", "GPVs Generated", "Self-Closed", "Others Closed", "Self-Close %", "Total CSAs Signed", "From Own GPVs", "From Others' GPVs", "No GPV Link"].map(h => (
                          <th key={h} style={{ padding: "8px 7px", textAlign: "left", fontSize: 9, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((r, i) => {
                        const rc = roleColor(r.role);
                        return (
                          <tr key={r.id + '-' + i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 1 ? "#fafbfc" : "white" }}>
                            <td style={{ padding: "7px 7px", fontWeight: 600, color: "#1B2A4A", whiteSpace: "nowrap" }}>{r.name}</td>
                            <td style={{ padding: "7px 7px" }}>{r.rankTag ? <span style={{ padding: "1px 5px", background: r.rankTag.startsWith("INC") ? "#E8F0FE" : "#F3E8FF", color: r.rankTag.startsWith("INC") ? "#3B7DD8" : "#6C3FA0", borderRadius: 3, fontSize: 9, fontWeight: 700 }}>{r.rankTag}</span> : <span style={{ color: "#d1d5db" }}>—</span>}</td>
                            <td style={{ padding: "7px 7px" }}>
                              <span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: rc.bg, color: rc.tc, whiteSpace: "nowrap" }}>{rc.icon} {r.role}</span>
                            </td>
                            <td style={{ padding: "7px 7px", fontWeight: 600, color: r.gpvLeads > 500 ? "#166534" : "#1B2A4A" }}>{r.gpvLeads.toLocaleString()}</td>
                            <td style={{ padding: "7px 7px", fontWeight: 600, color: "#166534" }}>{r.gpvsClosedBySelf}</td>
                            <td style={{ padding: "7px 7px", fontWeight: 600, color: r.gpvsClosedByOther > 50 ? "#991b1b" : "#854d0e" }}>{r.gpvsClosedByOther}</td>
                            <td style={{ padding: "7px 7px" }}>
                              {r.gpvLeads > 0 ? (
                                <span style={{ padding: "1px 6px", borderRadius: 3, fontSize: 10, fontWeight: 600, background: r.selfCloseRate >= 20 ? "#dcfce7" : r.selfCloseRate >= 5 ? "#fef9c3" : "#fee2e2", color: r.selfCloseRate >= 20 ? "#166534" : r.selfCloseRate >= 5 ? "#854d0e" : "#991b1b" }}>{r.selfCloseRate}%</span>
                              ) : <span style={{ color: "#d1d5db" }}>—</span>}
                            </td>
                            <td style={{ padding: "7px 7px", fontWeight: 700, color: r.csaCloses >= 100 ? "#991b1b" : r.csaCloses >= 20 ? "#854d0e" : "#1B2A4A" }}>{r.csaCloses}</td>
                            <td style={{ padding: "7px 7px", color: "#166534", fontWeight: 500 }}>{r.closesOwnGpv}</td>
                            <td style={{ padding: "7px 7px", color: r.closesOthersGpv > 50 ? "#991b1b" : "#854d0e", fontWeight: r.closesOthersGpv > 50 ? 700 : 500 }}>{r.closesOthersGpv}</td>
                            <td style={{ padding: "7px 7px", color: "#6b7280" }}>{r.closesNoGpv}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Role legend */}
              <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>🏷 Role Definitions</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {[
                    { role: "CLOSER", desc: "50+ CSAs signed, <10% from own GPVs. Takes other reps' generated leads and closes them. Brandon Stevens and Ritchie Sanchez fit this pattern exactly.", color: { bg: "#fee2e2", tc: "#991b1b" } },
                    { role: "HUNTER", desc: "50+ GPVs that OTHERS closed, <10 they closed themselves. Generates leads but doesn't close. Raises question: are they handing off to closers by design, or is something blocking them from closing?", color: { bg: "#fef9c3", tc: "#854d0e" } },
                    { role: "FULL-CYCLE", desc: "Owns leads end-to-end. Generates GPV AND closes CSAs on their own work. This is the ideal CM profile — most ranked CMs fit here.", color: { bg: "#dcfce7", tc: "#166534" } },
                    { role: "GPV-WORKER", desc: "Generates 50+ GPVs but closes few or none. Could be lead-work specialists, or CMs whose leads get handed off to closers.", color: { bg: "#E8F0FE", tc: "#3B7DD8" } },
                    { role: "OCCASIONAL", desc: "Occasional closes. Likely part-time, new, or transitioning between roles.", color: { bg: "#F3E8FF", tc: "#6C3FA0" } },
                    { role: "HIGH-CALL-NO-CLOSE", desc: "2,000+ calls but no CSAs. Could be dialers, reception, or CMs whose calls aren't converting.", color: { bg: "#fef3c7", tc: "#92400e" } },
                  ].map(l => (
                    <div key={l.role} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: 10, background: "#fafbfc", borderRadius: 6 }}>
                      <span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: l.color.bg, color: l.color.tc, whiteSpace: "nowrap", flexShrink: 0 }}>{l.role}</span>
                      <span style={{ fontSize: 10, color: "#6b7280", lineHeight: 1.5 }}>{l.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action items */}
              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>📌 What This Changes — Questions for Mike &amp; Javi</div>
                {[
                  { p: "critical", t: "Is the CLOSER role (Brandon/Ritchie at Veteran Adviser Consulting) an intentional sales model, or did these two just end up doing all the closing by accident?" },
                  { p: "critical", t: "If the CMs who are generating leads (Victoria Wood, Vanessa James, Antonio Rodas, etc.) aren't getting PassGP credit for leads Brandon/Ritchie closed, their actual productivity is being understated in the weekly rankings." },
                  { p: "high", t: "Commission / compensation question: if a CM generates the lead and Brandon closes it, who gets paid? Are the CMs aware? Is this causing attrition risk?" },
                  { p: "high", t: "Of 3,373 signed CSAs, 1,124 (33%) had a different rep generate the lead vs. close it. Is the CRM set up to recognize both contributors, or just the closer?" },
                  { p: "high", t: "84 signed CSAs have no linkable GPV at all. These CSAs skipped the documented lead pipeline entirely. Worth asking Chris if this represents a data gap or a process gap." },
                  { p: "medium", t: "Does Javi know about the closer model at Veteran Adviser? If the brand runs on specialist closers but the ranking treats everyone as generalists, the whole ranking concept may need to be brand-specific." },
                  { p: "medium", t: "49,479 GPV leads never converted to a CSA. That's a huge pool — is it leads that were abandoned, leads still in progress, or leads that went elsewhere?" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: 6, marginBottom: 4, background: item.p === "critical" ? "#fef2f2" : item.p === "high" ? "#fffbeb" : "#f8fafc", border: `1px solid ${item.p === "critical" ? "#fca5a5" : item.p === "high" ? "#fde68a" : "#e5e7eb"}` }}>
                    <div style={{ width: 18, height: 18, borderRadius: 3, border: `2px solid ${item.p === "critical" ? "#ef4444" : item.p === "high" ? "#f59e0b" : "#d1d5db"}`, flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 11, color: "#1B2A4A", lineHeight: 1.4 }}>{item.t}</div>
                    <span style={{ padding: "2px 6px", borderRadius: 8, fontSize: 8, fontWeight: 700, textTransform: "uppercase", background: item.p === "critical" ? "#ef4444" : item.p === "high" ? "#f59e0b" : "#6b7280", color: "white" }}>{item.p}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ═══ CORPORATE OVERSIGHT (consultant) ═══ */}
        {view === "corp" && consultView === "oversight" && (() => {
          const managers = {};
          logEntries.forEach(e => {
            if (!managers[e.manager]) managers[e.manager] = { name: e.manager, total: 0, resolved: 0, noChange: 0, overdue: 0, open: 0 };
            managers[e.manager].total++;
            if (e.resolved) managers[e.manager].resolved++;
            if (e.outcome === "no_change") managers[e.manager].noChange++;
            if (!e.resolved && new Date(e.followUpDate) <= new Date("2026-04-16")) managers[e.manager].overdue++;
            if (!e.resolved) managers[e.manager].open++;
          });
          const mgrList = Object.values(managers);
          const redCMs = MOCK_CMS.filter(cm => cm.score < 40);
          const loggedEmployees = new Set(logEntries.map(e => e.employee));
          const unaddressedReds = redCMs.filter(cm => !loggedEmployees.has(cm.name));

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #1B2A4A, #0f1a2e)", borderRadius: 10, color: "white" }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>🔒 Consultant Data — Drew &amp; David</div>
                <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>Private view. Oversight across CMs, CMAs, executives, affiliate owners, national sales management.</div>
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}>👤 Personnel Oversight — All Levels</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 12 }}>Tracked by Drew &amp; David | Reviewed by Mike &amp; Javi</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
                  {[
                    { level: "CMs", icon: "📞", total: MOCK_CMS.length, red: MOCK_CMS.filter(c => c.score < 40).length, desc: "INC + FTF — tracked via PassGP, calls, GPVs" },
                    { level: "CMAs", icon: "📋", total: MOCK_CMAS.length, red: MOCK_CMAS.filter(c => c.score < 40).length, desc: "Tracked via Balto, calls, actions, clocked hours" },
                    { level: "Executives / Mgmt", icon: "👔", total: mgrList.length || 1, red: mgrList.filter(m => m.overdue > 2 || m.noChange > 2).length, desc: "Tracked via log follow-through" },
                    { level: "Affiliate Owners", icon: "🏢", total: 5, red: 2, desc: "Tracked via brand performance" },
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

                <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2A4A", marginBottom: 8 }}>📨 Contact &amp; Ping Log — Who Have We Reached Out To?</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10, marginBottom: 10 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Date", "By", "Person", "Role", "Brand", "Reason", "Method", "Response", "Next Step"].map(h => (
                        <th key={h} style={{ padding: "6px 5px", textAlign: "left", fontSize: 8, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "04/15", by: "David", person: "Kimberly Montoya", role: "CM", brand: "AVC", reason: "Rank 14 FTF (last), 1 PassGP, 28 untouched leads", method: "Slack DM", response: "No response", next: "Escalate to Tony + flag for Mike/Javi" },
                      { date: "04/15", by: "Drew", person: "Ashlynne Shafer", role: "CM", brand: "VRG", reason: "Rank 19 INC, 2 PassGP, 20 untouched leads, declining 5wks", method: "Slack DM", response: "Acknowledged, cited onboarding", next: "Verify with Tony — did he meet with Ashlynne?" },
                      { date: "04/14", by: "David", person: "Tony Gonzalez", role: "Nat'l Sales Mgr", brand: "All", reason: "2 overdue follow-ups in log", method: "Call", response: "Said he'd update today", next: "Check log tomorrow" },
                      { date: "04/14", by: "Drew", person: "Alexis Lopez Apodaca", role: "CM", brand: "VRG", reason: "Rank 18 INC, 18 untouched, declining", method: "Slack DM", response: "No response", next: "Escalate to Tony" },
                      { date: "04/12", by: "David", person: "JD Mullen", role: "Affiliate Owner", brand: "VBCG", reason: "AE production 20% of internal standard", method: "Email", response: "Team is committed", next: "Monitor Q2 campaigns" },
                      { date: "04/10", by: "David", person: "Matthew Recce", role: "CM", brand: "VDR", reason: "Rank 13 FTF, 3 PassGP despite 265 calls", method: "Slack DM + Call", response: "Pending", next: "Shadow Cesar's calls" },
                      { date: "04/08", by: "Drew", person: "Edwin Garcia", role: "CMA", brand: "AVC", reason: "Rank 85 CMA (last), 2% case prep", method: "Slack DM", response: "Replied — blamed CRM issues", next: "Verify with Chris" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: row.response.includes("No r") || row.response.includes("no reply") ? "#fff5f5" : i % 2 === 1 ? "#fafbfc" : "white" }}>
                        <td style={{ padding: "6px 5px", fontWeight: 500, whiteSpace: "nowrap" }}>{row.date}</td>
                        <td style={{ padding: "6px 5px", fontWeight: 600, color: "#3B7DD8" }}>{row.by}</td>
                        <td style={{ padding: "6px 5px", fontWeight: 600, color: "#1B2A4A" }}>{row.person}</td>
                        <td style={{ padding: "6px 5px" }}><span style={{ padding: "1px 5px", borderRadius: 3, fontSize: 8, fontWeight: 600, background: row.role === "CM" ? "#E8F0FE" : row.role === "CMA" ? "#F3E8FF" : row.role.includes("Affiliate") ? "#FEF5E7" : "#fee2e2", color: row.role === "CM" ? "#3B7DD8" : row.role === "CMA" ? "#6C3FA0" : row.role.includes("Affiliate") ? "#D4860B" : "#991b1b" }}>{row.role}</span></td>
                        <td style={{ padding: "6px 5px", fontSize: 9 }}>{row.brand}</td>
                        <td style={{ padding: "6px 5px", fontSize: 9, maxWidth: 140, color: "#6b7280" }}>{row.reason}</td>
                        <td style={{ padding: "6px 5px", fontSize: 9 }}>{row.method}</td>
                        <td style={{ padding: "6px 5px", fontSize: 9, fontWeight: 500, color: row.response.includes("No") ? "#991b1b" : "#166534" }}>{row.response}</td>
                        <td style={{ padding: "6px 5px", fontSize: 9, color: "#854d0e" }}>{row.next}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {unaddressedReds.length > 0 && (
                <div style={{ background: "white", borderRadius: 10, padding: 16, border: "2px solid #ef4444" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b", marginBottom: 4 }}>👻 Red-Zone CMs With ZERO Management Action</div>
                  <div style={{ fontSize: 10, color: "#991b1b", marginBottom: 10 }}>These employees are flagged as critical but no manager has logged a single coaching action.</div>
                  {unaddressedReds.map(cm => (
                    <div key={cm.id} style={{ padding: "10px 14px", background: "#fee2e2", borderRadius: 6, borderLeft: "4px solid #ef4444", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#991b1b" }}>{cm.name} ({cm.brand}, {cm.type} rank #{cm.rank}) — Score: {cm.score}</div>
                        <div style={{ fontSize: 10, color: "#991b1b", marginTop: 2 }}>PassGP: {cm.passGP} | Calls: {cm.realCalls} | Untouched: {cm.untouched} | Trend: {cm.weekHistory[0]}→{cm.weekHistory[4]}</div>
                      </div>
                      <span style={{ padding: "3px 8px", borderRadius: 4, background: "#7f1d1d", color: "white", fontSize: 8, fontWeight: 700 }}>NO ACTION LOGGED</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ background: "white", borderRadius: 10, padding: 16, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 10 }}>📌 Drew &amp; David — Weekly Review Checklist</div>
                {[
                  { priority: "critical", text: "Check dashboard: Any red-zone CMs/CMAs with NO contact from us or management?" },
                  { priority: "critical", text: "Check Accountability Log: Overdue follow-ups from Tony or brand execs?" },
                  { priority: "critical", text: "Review Ping Log: Anyone we contacted fail to respond? Escalate non-responders." },
                  { priority: "high", text: "Cross-reference: Are worst performers addressed at EVERY level (CM, CMA, exec)?" },
                  { priority: "high", text: "Review 'No Change' outcomes: Which employees need next-stage escalation?" },
                  { priority: "high", text: "Speed-to-Contact: Are missed appointment rates improving?" },
                  { priority: "medium", text: "Review affiliate owner performance: VBCG, other external brands" },
                  { priority: "medium", text: "Check Tony's log activity: Consistent coaching logs?" },
                  { priority: "low", text: "Note top performers (Cesar, Abby, Victoria) for recognition — send to Mike" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: 6, marginBottom: 4, background: item.priority === "critical" ? "#fef2f2" : item.priority === "high" ? "#fffbeb" : "#f8fafc", border: `1px solid ${item.priority === "critical" ? "#fca5a5" : item.priority === "high" ? "#fde68a" : "#e5e7eb"}` }}>
                    <div style={{ width: 18, height: 18, borderRadius: 3, border: "2px solid", borderColor: item.priority === "critical" ? "#ef4444" : item.priority === "high" ? "#f59e0b" : "#d1d5db", flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 10, color: "#1B2A4A", fontWeight: item.priority === "critical" ? 600 : 400 }}>{item.text}</div>
                    <span style={{ padding: "2px 6px", borderRadius: 8, fontSize: 7, fontWeight: 700, textTransform: "uppercase", background: item.priority === "critical" ? "#ef4444" : item.priority === "high" ? "#f59e0b" : item.priority === "medium" ? "#3B7DD8" : "#6b7280", color: "white" }}>{item.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <div style={{ marginTop: 16, padding: 12, background: "#f0f9ff", borderRadius: 8, borderLeft: "3px solid #3B7DD8" }}>
          <div style={{ fontSize: 11, color: "#1B2A4A", fontWeight: 600 }}>💡 Real Data from Chris's weekly rankings — Week of 2026-04-04 to 2026-04-10</div>
          <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>
            33 CMs (19 INC + 14 FTF) and 85 CMAs from live GlobalTekMed roster. PassGP, Actions, Calls, Balto scores are real values. Once PowerBI replica refreshes at 30-60 min cadence (per Chris), this dashboard auto-updates with no manual entry.
          </div>
        </div>
      </div>
    </div>
  );
}