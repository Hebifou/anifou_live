from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    ListFlowable,
    ListItem
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from pathlib import Path


def create_pdf():
    """
    Erstellt eine einseitige Info-PDF für das Studio-Angebot.
    Ausgabe: /static/pdfs/anifou_studio_portfolio_info.pdf
    """

    # Projektbasis (eine Ebene über /templates)
    base_dir = Path(__file__).resolve().parent.parent

    # Zielordner für PDFs
    pdf_dir = base_dir / "static" / "pdfs"
    pdf_dir.mkdir(parents=True, exist_ok=True)

    file_path = pdf_dir / "anifou_studio_portfolio_info.pdf"

    # Dokument (A4, ruhig)
    doc = SimpleDocTemplate(
        str(file_path),
        pagesize=A4,
        rightMargin=25 * mm,
        leftMargin=25 * mm,
        topMargin=25 * mm,
        bottomMargin=25 * mm
    )

    styles = getSampleStyleSheet()

    # Ruhige Styles
    styles.add(ParagraphStyle(
        name="TitleQuiet",
        fontSize=18,
        leading=22,
        spaceAfter=14,
        textColor=HexColor("#111111"),
        fontName="Helvetica-Bold"
    ))

    styles.add(ParagraphStyle(
        name="SubtitleQuiet",
        fontSize=11,
        leading=15,
        spaceAfter=16,
        textColor=HexColor("#444444")
    ))

    styles.add(ParagraphStyle(
        name="BodyQuiet",
        fontSize=10,
        leading=15,
        spaceAfter=10,
        textColor=HexColor("#333333")
    ))

    styles.add(ParagraphStyle(
        name="SectionHeader",
        fontSize=11,
        leading=16,
        spaceBefore=14,
        spaceAfter=6,
        textColor=HexColor("#111111"),
        fontName="Helvetica-Bold"
    ))

    styles.add(ParagraphStyle(
        name="SmallQuiet",
        fontSize=9,
        leading=13,
        spaceAfter=6,
        textColor=HexColor("#555555")
    ))

    story = []

    # ---------- Inhalt ----------
    story.append(Paragraph(
        "Portfolio-Websites für kreative Studierende",
        styles["TitleQuiet"]
    ))

    story.append(Paragraph(
        "Schlichte, individuell angepasste Portfolio-Websites für Film, Kunst, Design, "
        "Architektur und Handwerk. Geeignet für laufende Projekte, Abschlussarbeiten, "
        "Bewerbungen und Festivals.",
        styles["SubtitleQuiet"]
    ))

    story.append(Paragraph(
        "<b>Für wen?</b><br/>"
        "Für Studierende und Kreative, die ihre Arbeiten übersichtlich und konzentriert "
        "zeigen möchten – unabhängig von Studienphase oder Erfahrung.",
        styles["BodyQuiet"]
    ))

    story.append(Paragraph("Wie es funktioniert", styles["SectionHeader"]))

    story.append(ListFlowable(
        [
            ListItem(Paragraph("Auswahl eines passenden Templates", styles["BodyQuiet"])) ,
            ListItem(Paragraph("Kurze Abstimmung zu Inhalt und Phase", styles["BodyQuiet"])) ,
            ListItem(Paragraph("Individuelle Anpassung", styles["BodyQuiet"])) ,
            ListItem(Paragraph("Fertige Website in 3–5 Tagen", styles["BodyQuiet"])) ,
        ],
        leftIndent=12
    ))

    story.append(Paragraph("Was enthalten ist", styles["SectionHeader"]))

    story.append(ListFlowable(
        [
            ListItem(Paragraph("Individuell angepasstes Template", styles["BodyQuiet"])) ,
            ListItem(Paragraph("Klare Struktur und Typografie", styles["BodyQuiet"])) ,
            ListItem(Paragraph("Mobile-optimierte Darstellung", styles["BodyQuiet"])) ,
            ListItem(Paragraph("Unterstützung beim Online-Stellen", styles["BodyQuiet"])) ,
            ListItem(Paragraph("Keine laufenden Kosten", styles["BodyQuiet"])) ,
        ],
        leftIndent=12
    ))

    story.append(Spacer(1, 10))

    story.append(Paragraph(
        "<b>Zeit & Kosten</b><br/>"
        "Fertig in 3–5 Tagen<br/>"
        "Kosten: 180–250 € (einmalig, je nach Umfang)",
        styles["BodyQuiet"]
    ))

    story.append(Spacer(1, 12))

    story.append(Paragraph(
        "<b>Beispiel-Templates</b><br/>"
        "www.anifou.com/studio-template-film<br/>"
        "www.anifou.com/studio-template-visual<br/>"
        "www.anifou.com/studio-template-space",
        styles["SmallQuiet"]
    ))

    story.append(Spacer(1, 14))

    story.append(Paragraph(
        "<b>Kontakt</b><br/>"
        "hello@anifou.com<br/>"
        "www.anifou.com/studio",
        styles["SmallQuiet"]
    ))

    # PDF erzeugen
    doc.build(story)

    print(f"PDF erstellt unter: {file_path}")


if __name__ == "__main__":
    create_pdf()
