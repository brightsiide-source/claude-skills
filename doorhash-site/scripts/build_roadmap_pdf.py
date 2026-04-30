#!/usr/bin/env python3
"""Generate the DoorHash 'Top 5 Plays' PDF for Drew."""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Brand palette from doorhash logo
LEAF = HexColor("#8DC63F")
LEAF_LIGHT = HexColor("#CFE9A3")
INK = HexColor("#0A0A0A")
INK_SOFT = HexColor("#454545")
INK_MUTED = HexColor("#888888")
CREAM = HexColor("#F7F4EC")
PAPER = HexColor("#FAFAF7")

OUT = "doorhash-top-5-plays.pdf"
PAGE_W, PAGE_H = LETTER

PLAYS = [
    {
        "n": "01",
        "title": "Strain library — programmatic SEO",
        "effort": "Medium",
        "why": (
            "One template + Dutchie data auto-generates 100+ strain pages with terpene "
            "profiles, lineage, and effects. Each one ranks for searches like \"blue dream "
            "las cruces\" or \"tropic thunder strain.\" This is how Top Crop owns NM SEO "
            "today — we leapfrog them with better page design."
        ),
    },
    {
        "n": "02",
        "title": "Provenance receipt — the seed-to-door killer",
        "effort": "Medium",
        "why": (
            "Every flower order ships with a digital receipt: Lot #DV-04-26 · Harvested "
            "12 days ago · Hand-trimmed by Maria · Cured 21 days. Printable, shareable. "
            "Nobody else can do this because nobody else owns their farm. The whole Don "
            "Verde wedge made tangible."
        ),
    },
    {
        "n": "03",
        "title": "Strain finder quiz",
        "effort": "Low",
        "why": (
            "\"How do you want to feel?\" — 4 to 5 questions deliver a personalized cart of "
            "6 products. Captures email, segments customers, addictive on social. Top Crop "
            "is a price wall; doorhash becomes a concierge."
        ),
    },
    {
        "n": "04",
        "title": "Live delivery tracker (Domino's, but for weed)",
        "effort": "High",
        "why": (
            "Post-checkout: \"Marco picked up your order at 4:32, ETA 18 min.\" Map view, "
            "driver photo, real-time updates. Goes viral on social. Mango has an app for "
            "this — we'd ship it on the open web with no install required."
        ),
    },
    {
        "n": "05",
        "title": "SMS automation (Klaviyo or Postscript)",
        "effort": "Low",
        "why": (
            "Cannabis-friendly SMS provider running flows: abandoned cart, drop alerts, "
            "restock notifications, birthday. Repeat order rate roughly 2x at cannabis "
            "brands that run this well. Highest revenue lift per dollar — period."
        ),
    },
]

SEQUENCE = [
    ("Week 1", "SMS + Klaviyo", "Fastest revenue lift, period."),
    ("Week 2", "Strain finder quiz", "Capture email + immediate differentiation."),
    ("Weeks 3–5", "Strain library + programmatic SEO", "Compounds organically for years."),
    ("Weeks 6–7", "Provenance receipts", "The brand story, made operational."),
    ("Weeks 8–11", "Live delivery tracker", "Biggest wow, biggest lift — ship last."),
]


def draw_logo(c, x, y):
    """Draw a simple doorhash wordmark on dark background."""
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(LEAF)
    c.drawString(x, y, "door")
    door_w = c.stringWidth("door", "Helvetica-Bold", 22)
    c.setFillColor(CREAM)
    c.drawString(x + door_w, y, "hash")
    # Tiny leaf accent above the d
    c.setFillColor(LEAF)
    leaf_x = x + 6
    leaf_y = y + 22
    c.circle(leaf_x, leaf_y, 2.2, fill=1, stroke=0)


def draw_pill(c, text, x, y, fill_color, text_color, font="Helvetica-Bold", size=8):
    c.setFont(font, size)
    text_w = c.stringWidth(text, font, size)
    pad_x = 7
    pad_y = 4
    pill_w = text_w + pad_x * 2
    pill_h = size + pad_y * 2
    c.setFillColor(fill_color)
    c.roundRect(x, y - pad_y, pill_w, pill_h, pill_h / 2, fill=1, stroke=0)
    c.setFillColor(text_color)
    c.drawString(x + pad_x, y, text)
    return pill_w


def wrap_text(text, width, font, size, c):
    """Greedy word-wrap to a target width in points."""
    words = text.split()
    lines = []
    line = []
    for w in words:
        candidate = " ".join(line + [w])
        if c.stringWidth(candidate, font, size) <= width:
            line.append(w)
        else:
            if line:
                lines.append(" ".join(line))
            line = [w]
    if line:
        lines.append(" ".join(line))
    return lines


def main():
    c = canvas.Canvas(OUT, pagesize=LETTER)
    c.setTitle("DoorHash — Top 5 Plays")
    c.setAuthor("DoorHash")
    c.setSubject("Roadmap")

    # ---- Background
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # ---- Header bar (leaf green strip top)
    c.setFillColor(LEAF)
    c.rect(0, PAGE_H - 8, PAGE_W, 8, fill=1, stroke=0)

    # ---- Logo + meta
    margin = 0.55 * inch
    top_y = PAGE_H - 0.8 * inch
    draw_logo(c, margin, top_y)

    c.setFont("Helvetica", 8)
    c.setFillColor(INK_MUTED)
    c.drawRightString(
        PAGE_W - margin, top_y + 14, "ROADMAP — TOP 5 PLAYS"
    )
    c.drawRightString(
        PAGE_W - margin, top_y + 2, "for Drew · Mike · Javi · Neal"
    )

    # ---- Title
    title_y = top_y - 0.5 * inch
    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(CREAM)
    c.drawString(margin, title_y, "How we take")
    c.setFillColor(LEAF)
    c.drawString(margin, title_y - 28, "doorhash to the next level.")

    # ---- Subhead
    c.setFont("Helvetica", 10)
    c.setFillColor(INK_MUTED)
    sub_y = title_y - 50
    sub = (
        "Five highest-leverage moves to leap past Mango Cannabis and Top Crop. "
        "Ranked by impact-to-effort. Excludes the obvious — photography, more cities."
    )
    for line in wrap_text(sub, PAGE_W - margin * 2, "Helvetica", 10, c):
        c.drawString(margin, sub_y, line)
        sub_y -= 13

    # ---- Plays
    card_y = sub_y - 18
    card_w = PAGE_W - margin * 2
    card_pad = 12

    for play in PLAYS:
        # Measure body height
        body_w = card_w - card_pad * 2 - 60  # leave room for number block
        body_lines = wrap_text(play["why"], body_w, "Helvetica", 9, c)
        body_h = len(body_lines) * 12

        card_h = 22 + body_h + card_pad * 2  # title row + body + padding

        # Card background (subtle dark card on dark page)
        c.setFillColor(HexColor("#161616"))
        c.setStrokeColor(HexColor("#262626"))
        c.setLineWidth(0.6)
        c.roundRect(margin, card_y - card_h, card_w, card_h, 8, fill=1, stroke=1)

        # Big number
        c.setFont("Helvetica-Bold", 26)
        c.setFillColor(LEAF)
        c.drawString(margin + card_pad, card_y - card_pad - 22, play["n"])

        # Title
        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(CREAM)
        title_x = margin + card_pad + 50
        title_y_pos = card_y - card_pad - 12
        c.drawString(title_x, title_y_pos, play["title"])

        # Effort pill
        effort_color = {
            "Low": HexColor("#7CB342"),
            "Medium": HexColor("#F59E0B"),
            "High": HexColor("#EF4444"),
        }[play["effort"]]
        title_w = c.stringWidth(play["title"], "Helvetica-Bold", 12)
        draw_pill(
            c,
            f"{play['effort']} effort",
            title_x + title_w + 8,
            title_y_pos,
            effort_color,
            INK,
        )

        # Body
        c.setFont("Helvetica", 9)
        c.setFillColor(HexColor("#C8C8C2"))
        body_y = title_y_pos - 16
        for line in body_lines:
            c.drawString(title_x, body_y, line)
            body_y -= 12

        card_y -= card_h + 8

    # ---- Recommended sequence footer
    seq_y = card_y - 6
    c.setFillColor(LEAF_LIGHT)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(margin, seq_y, "RECOMMENDED 11-WEEK SEQUENCE")
    seq_y -= 14
    c.setFont("Helvetica", 9)
    for week, name, note in SEQUENCE:
        c.setFillColor(LEAF)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(margin, seq_y, week)
        c.setFillColor(CREAM)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(margin + 60, seq_y, name)
        c.setFillColor(INK_MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(margin + 60 + c.stringWidth(name, "Helvetica-Bold", 9) + 8, seq_y, note)
        seq_y -= 13

    # ---- Footer
    c.setFillColor(INK_MUTED)
    c.setFont("Helvetica", 7)
    c.drawString(
        margin,
        0.4 * inch,
        "doorhash · cannabis delivery + retail · Southern New Mexico · a Don Verde Farms company",
    )
    c.drawRightString(PAGE_W - margin, 0.4 * inch, "v1 roadmap")

    c.showPage()
    c.save()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
