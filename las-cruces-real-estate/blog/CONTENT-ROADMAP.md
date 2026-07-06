# Las Cruces Blog Content Roadmap

**Purpose:** Automated weekly blog publishing. A scheduled Monday-morning job reads this file, picks the next unpublished topic (no `✅` prefix), writes the post, publishes, and marks it done here.

**Cadence:** Weekly, Monday 9am Central Time.

**When roadmap runs out:** The trigger reports "ROADMAP EXHAUSTED - manual refill needed" and stops publishing until this file is refilled. Ping David/Drew when this happens.

---

## Publishing conventions

- **Path:** `/blog/{slug}.html` (relative to `las-cruces-real-estate/`)
- **Template:** Follow structural pattern of `blog/how-to-sell-inherited-house-new-mexico.html` (schema, breadcrumb, byline, article body, related pages block, disclaimer, footer)
- **Length:** 1,500-2,200 words body content
- **Real content only** — no lorem ipsum, no fabricated statistics, no unverified rating claims, no BBB accreditation claims
- **Real NM legal citations** where relevant (NMSA statute references)
- **Doña Ana County specifics** where relevant (ZIPs, neighborhoods, court, title company, employers)
- **Author byline:** David Washburn (seller-side conversations, legal walkthroughs, situational content) OR Drew Heberer (offer math, financial, transactional, market analysis)
- **Schema:** `BlogPosting` + `BreadcrumbList` JSON-LD, both with `@id` anchors
- **Related pages block** at end linking to relevant situation pages, city pages, and other blog posts
- **Disclaimer** at end: "This article is for general information only and does not constitute legal advice..."
- **No em dashes in title, H1, or meta description** (audit flagged as AI tell — use pipes or periods instead; em dashes in body prose are fine)

## Infrastructure updates per post

- Add URL to `sitemap.xml` with today's lastmod, priority 0.85
- Add `.html` → extensionless redirect in `netlify.toml` (in the Blog redirect block)
- Add URL + one-line summary to `llms.txt` "Blog / long-form guides" section

## Commit & push

- git add all changed files
- Commit message format: `Weekly blog post: {Title}`
- Push to branch `claude/las-cruces-real-estate-site-6e6UC`

---

## Publication backlog (next up first)

### 1. Military PCS Home Sale Checklist for Fort Bliss, WSMR, and Holloman
- **Slug:** `military-pcs-home-sale-checklist-fort-bliss-wsmr-holloman`
- **Author:** David Washburn
- **Brief:** Three-installation-specific PCS timeline walkthrough. Fort Bliss (El Paso, TX, 45 miles south) PCS orders and overseas moves. White Sands Missile Range (WSMR) civilian and military transfers. Holloman AFB (Alamogordo, 90 miles NE) — F-16 training, F-22 program moves. Cover: TMO coordination, HHG pickup, remote closing mechanics via mobile notary, spouse power of attorney, VA loan payoff, dependent-care considerations, base housing report dates. Include specific Las Cruces neighborhoods where each installation's personnel typically live (Sonoma Ranch, East Mesa, Alameda, University Hills).
- **Target keywords:** military pcs home sale las cruces, fort bliss home sale, wsmr sell house, holloman afb pcs las cruces, military relocation new mexico

### 2. Selling a House in an Uncontested Divorce in New Mexico
- **Slug:** `selling-house-uncontested-divorce-new-mexico`
- **Author:** David Washburn
- **Brief:** Deep-dive companion to the divorce situation page. New Mexico community property under NMSA 40-3-8. Both spouses must sign to convey marital property. 6-month waiting period from filing. When to sell (before decree vs after), how equity gets split, tax implications of divorce sale under IRC §1041. Practical: how title companies handle spousal signatures, remote signing for out-of-state spouse, temporary orders that authorize sale.
- **Target keywords:** sell house divorce new mexico, nm community property house sale, divorce house sale las cruces, split equity divorce nm

### 3. Water Rights on New Mexico Real Estate: What Buyers and Sellers Need to Know
- **Slug:** `water-rights-new-mexico-real-estate-buyers-sellers`
- **Author:** Drew Heberer
- **Brief:** NM water rights are a distinct property interest from the land. Office of the State Engineer records. LRG (Lower Rio Grande) basin adjudication. EBID (Elephant Butte Irrigation District) allocations. Pre-1907 senior rights vs junior rights. Change-of-ownership paperwork. How water rights affect ag parcel valuation in Hatch, La Mesa, and Do&ntilde;a Ana. Common seller mistakes: assuming water goes with the land, failing to file OSE forms. Include what happens with residential-only lots (small domestic wells).
- **Target keywords:** new mexico water rights real estate, ose water rights transfer, lrg water rights, ebid water rights hatch, sell ag land water rights nm

### 4. Cash Sale vs. Listing with an Agent: When Each Makes Sense in Las Cruces
- **Slug:** `cash-sale-vs-listing-agent-las-cruces-when-each-makes-sense`
- **Author:** Drew Heberer
- **Brief:** Honest decision framework. When listing agents win (move-in-ready home, 3-6 month timeline, seller has cash for repairs). When cash buyers win (distressed, out-of-state heir, foreclosure timeline, tired landlord, quick relocation). Include the offer math from the previous post applied to two Las Cruces scenarios: a 2018 East Mesa build in good condition vs a 1970s University Hills fixer. Show actual dollars for each path. Recommend specific Las Cruces agents (generically — "we know reputable Doña Ana County Association of Realtors agents") when listing makes more sense than cash.
- **Target keywords:** cash sale vs listing agent, sell house fast las cruces, should i list or sell for cash, las cruces home sale decision

### 5. What to Do When You Can't Afford Repairs on Your Las Cruces House
- **Slug:** `cant-afford-repairs-las-cruces-house-what-to-do`
- **Author:** David Washburn
- **Brief:** For homeowners with major deferred maintenance. Options: sell as-is to cash buyer, get FHA 203(k) rehab loan, HUD Section 504 for eligible seniors, NM state programs (NM Mortgage Finance Authority), family loan, sell partial interest, reverse mortgage, or list at a discount. Real cost ranges for common Las Cruces repairs: refrigerated air conversion ($8-14k), flat roof replacement ($8-14k), stucco re-mud ($4-18k), foundation stabilization ($5-25k+). Judgment calls on which to fix (curb appeal + safety) vs which to skip.
- **Target keywords:** cant afford repairs house las cruces, sell fixer upper cash new mexico, foundation problems sell las cruces, repair or sell house

### 6. Small Estate Affidavit vs Probate in New Mexico: Which One Fits Your Situation?
- **Slug:** `small-estate-affidavit-vs-probate-new-mexico`
- **Author:** David Washburn
- **Brief:** Companion to the inherited-house post. Deep-dive on NMSA 45-3-1201 Small Estate Affidavit ($50k personal property threshold, not real estate). Compare to formal probate, informal probate, Affidavit of Heirship, and Community Property Affidavit for surviving spouses. Decision tree by estate size and asset mix. Practical: which title companies in Doña Ana County will insure Affidavit of Heirship title, typical processing times, cost differences ($0 for affidavit vs ~$1,500-4,000 for probate).
- **Target keywords:** small estate affidavit new mexico, nmsa 45-3-1201, nm probate alternatives, affidavit of heirship new mexico

### 7. Understanding Doña Ana County Property Taxes and How They Affect Your Sale
- **Slug:** `dona-ana-county-property-taxes-affect-house-sale`
- **Author:** Drew Heberer
- **Brief:** How Doña Ana County property taxes work (assessment, mill rates, exemptions). Head-of-household exemption, veterans exemption, disabled veterans exemption. What happens at closing (proration through closing date). Delinquent taxes and tax liens — how they get resolved at sale. Special assessments (EBID, sewer, road districts). How property tax changes affect your net at closing. Include LC-specific rate ranges: primary residence vs rental, downtown vs Sonoma Ranch vs East Mesa.
- **Target keywords:** dona ana county property taxes, nm property tax head of household exemption, back taxes house sale, tax lien las cruces

### 8. How to Sell a Mobile Home in Doña Ana County Without a Title
- **Slug:** `sell-mobile-home-dona-ana-county-without-title`
- **Author:** David Washburn
- **Brief:** Deep-dive companion to the mobile home page. NM MVD duplicate title process. Affidavit procedures for older mobiles with lost paperwork. When you need a bonded title. Common scenarios: title in deceased owner's name (probate + duplicate title), title never transferred from previous owner (paper trail rebuild), title lost in flood/fire (MVD affidavit). Also covers real-property-titled mobile homes where the county assessor conversion documents can substitute. Real timelines: 30-90 days typical for duplicate NM MVD titles.
- **Target keywords:** sell mobile home no title new mexico, nm mvd duplicate mobile home title, mobile home title lost dona ana, bonded title mobile home nm

### 9. Selling an NMSU-Adjacent Rental as the Student Housing Market Shifts
- **Slug:** `selling-nmsu-adjacent-rental-student-housing-market-shift`
- **Author:** Drew Heberer
- **Brief:** Market analysis of NMSU-area rental trends. Purpose-built student housing has captured demand. Older single-family conversions from 2010s are aging. Cap rates have compressed. When to exit vs when to hold. Neighborhoods most affected: University Park, University Hills, older Alameda-adjacent stock. 1031 exchange out of Las Cruces into a different market (Albuquerque multifamily, Texas SFR, etc.). Include historical NMSU enrollment trends and how they've affected rental demand.
- **Target keywords:** sell nmsu student rental, university park rental sale, nmsu rental market decline, sell las cruces rental property

### 10. New Mexico Homestead Rights: What They Mean When You Sell Your House
- **Slug:** `new-mexico-homestead-rights-when-you-sell`
- **Author:** David Washburn
- **Brief:** NM homestead exemption ($150k under NMSA 42-10-9). Not as broad as Texas homestead but still meaningful. How it protects from creditor judgments. What happens at sale (proceeds protected within specific windows). Interaction with mortgage foreclosure (does not stop mortgage foreclosure — homestead protects from unsecured creditors, not the mortgage lender). Practical relevance for sellers with unsecured judgment liens.
- **Target keywords:** new mexico homestead exemption, nmsa 42-10-9, nm homestead protection sale, judgment lien house sale nm

### 11. Selling a House with a Tax Lien in Doña Ana County
- **Slug:** `selling-house-tax-lien-dona-ana-county`
- **Author:** David Washburn
- **Brief:** How Doña Ana County property tax liens attach and get released. Difference between property tax liens (county), state tax liens (NM TRD), federal tax liens (IRS). Timeline: annual property tax bills, delinquency dates, tax sale procedures under NMSA 7-38. How title companies handle liens at closing (paid from proceeds). Sellers with federal tax liens — IRS release process. Case examples.
- **Target keywords:** sell house tax lien las cruces, dona ana county property tax delinquent, irs tax lien house sale, sell house back taxes nm

### 12. Preparing an Inherited Las Cruces House for Sale: The 30-Day Plan
- **Slug:** `preparing-inherited-las-cruces-house-for-sale-30-day-plan`
- **Author:** David Washburn
- **Brief:** Practical companion for the inherited-house probate post. Week-by-week plan for out-of-state heirs. Week 1: secure the property (locks, insurance, utilities). Week 2: inventory contents, decide what to keep. Week 3: engage probate attorney if not already, order title work. Week 4: choose sale path (list vs cash). Includes vendor recommendations (generically): NM probate attorneys, Doña Ana County title companies, house cleanout services in Las Cruces, appraisers for date-of-death valuation, tax preparers familiar with NM step-up basis.
- **Target keywords:** inherited house checklist las cruces, prepare inherited house sale new mexico, out of state heir house sale, dona ana inherited property

### 13. Foundation Problems in Las Cruces: Cost to Repair vs. Cash Sale Math
- **Slug:** `foundation-problems-las-cruces-repair-vs-cash-sale-math`
- **Author:** Drew Heberer
- **Brief:** Expansive clay soils around Las Cruces cause foundation movement. Types: settlement cracks, heave, differential movement. Cost ranges: cosmetic patch ($500-2k), pier stabilization ($5-15k), full underpinning ($15-40k). What retail buyers' inspectors flag. How lenders react (FHA/VA may deny financing). Real dollars: fix and list vs sell as-is. Include local foundation contractor rate ranges and reputable Las Cruces engineering firms (generically).
- **Target keywords:** foundation problems las cruces house, sell house foundation issues new mexico, foundation repair cost dona ana, expansive clay soil las cruces

### 14. Selling a Vacant House in Las Cruces: What You Need to Know
- **Slug:** `selling-vacant-house-las-cruces-what-you-need-to-know`
- **Author:** David Washburn
- **Brief:** Common problem — vacant Las Cruces property owned from out of state, deteriorating. Insurance requirements (vacant property policies), risks (copper theft, squatters, code violations), city vacant building registration if applicable. How to protect equity: proper vacant coverage, quarterly walkthroughs, minimum utilities on, secure locks. When to sell: usually immediately if you're not planning to move in. Cash sale mechanics for vacant property (no tenant coordination, faster).
- **Target keywords:** sell vacant house las cruces, vacant property nm, out of state vacant home sale, dona ana vacant house

### 15. New Mexico Real Estate Closing Costs: Who Pays What
- **Slug:** `new-mexico-real-estate-closing-costs-who-pays-what`
- **Author:** Drew Heberer
- **Brief:** NM closing cost breakdown. TDI-regulated title insurance rates (no negotiation). Escrow/settlement fees ($400-800 typical). Recording fees (minimal). No state real estate transfer tax. Prorated property taxes. HOA transfer fees. Termite inspection (buyer's cost typically). Seller's typical closing cost total: 1.5-2.5% of sale price on traditional sale. On cash sale to us: $0 seller cost. Include reputable Doña Ana County title companies (generically) and their fee ranges.
- **Target keywords:** new mexico closing costs, nm real estate title insurance, dona ana county title company fees, who pays closing costs new mexico

### 16. Should You Rent Out Your Las Cruces House or Sell It?
- **Slug:** `rent-out-las-cruces-house-or-sell-decision`
- **Author:** Drew Heberer
- **Brief:** Practical decision framework for owners deciding between converting to a rental vs selling. Cash flow math for typical Las Cruces submarkets (NMSU-area, East Mesa, Central LC). Cap rate ranges (currently 5-7% typical). Landlord obligations under NMSA 47-8. Property management costs (8-10% typical). Tax implications (depreciation, 1031 potential, capital gains exposure). When rental makes sense (positive cash flow, long-term hold, tax-advantaged situation). When selling makes sense (needs work, distant owner, tired of management already, need capital for something else). Real numbers from Las Cruces submarkets.
- **Target keywords:** rent or sell house las cruces, convert to rental new mexico, landlord vs sell house, las cruces rental cash flow

---

## Notes for the automated writer

- Read the existing blog posts in `/blog/` as references before writing. Match their tone, structure, disclaimer format, and internal linking style.
- Author-appropriate topics: David gets legal/situational content, Drew gets financial/analytical content. Don't swap them.
- If a topic feels like it needs data you don't have (specific closing volumes, real seller stories with details, specific attorney names), use generalized framing — "a Las Cruces probate attorney we've worked with" not "our probate attorney Jane Smith at 123 Main St".
- Cite NMSA statute numbers when discussing NM law. Cite IRC sections when discussing federal tax. Don't make up statute numbers.
- Do NOT invent specific closing counts, offer amounts, star ratings, review counts, or BBB claims. All fabricated stats trigger the same deceptive-content policy violation that flagged the site during a prior GBP submission.

## Roadmap refill signal

When the last unpublished topic is completed, the trigger session should:
1. Publish that post normally
2. Add a line at the top of the "Publication backlog" section that says: `# 🚨 ROADMAP EXHAUSTED — Manual refill needed. Trigger will pause on next fire.`
3. Send a completion notification indicating refill is needed
4. On the NEXT Monday fire, the session will see the exhausted marker and exit without publishing
