#!/usr/bin/env bash
set -euo pipefail

SRC="static/css/style_backup.css"
DEST="static/css"

if [ ! -f "$SRC" ]; then
  echo "❌ Quelle nicht gefunden: $SRC"
  exit 1
fi

mkdir -p "$DEST/base" "$DEST/components" "$DEST/pages"

# Ziel-Dateien leeren
: > "$DEST/base/_layout.css"
: > "$DEST/components/_nav.css"
: > "$DEST/components/_hero.css"
: > "$DEST/components/_simulation.css"
: > "$DEST/components/_video.css"
: > "$DEST/components/_buttons.css"
: > "$DEST/components/_footer.css"
: > "$DEST/pages/_life-in-plastic.css"
: > "$DEST/pages/_privacy.css"
: > "$DEST/pages/_imprint.css"
: > "$DEST/pages/_responsive.css"

# Zuordnung: Abschnittsnummer → Zieldatei
map_section() {
  case "$1" in
    10) echo "$DEST/base/_layout.css" ;;
    20) echo "$DEST/components/_nav.css" ;;
    30) echo "$DEST/components/_hero.css" ;;
    40) echo "$DEST/components/_simulation.css" ;;
    50) echo "$DEST/components/_video.css" ;;
    60) echo "$DEST/components/_buttons.css" ;;
    70) echo "$DEST/components/_footer.css" ;;
    80) echo "$DEST/pages/_life-in-plastic.css" ;;
    90) echo "$DEST/pages/_privacy.css" ;;
    95) echo "$DEST/pages/_imprint.css" ;;
    99) echo "$DEST/pages/_responsive.css" ;;
    *)  echo "" ;;
  esac
}

current=""
# Wir erkennen Abschnittsüberschriften daran, dass irgendwo in der Zeile "NN)" steht
# (z. B. " 70) FOOTER"). Das ist robust für Deine Kommentarblöcke.
while IFS= read -r line; do
  # Abschnittsnummer suchen (10|20|...|99)
  sec=""
  for n in 10 20 30 40 50 60 70 80 90 95 99; do
    if printf "%s" "$line" | grep -qE "[[:space:]]${n}\)"; then
      sec="$n"
      break
    fi
  done

  if [ -n "$sec" ]; then
    current="$(map_section "$sec")"
    # Überschriftenzeile selbst auch mit in die Zieldatei schreiben
    if [ -n "$current" ]; then
      printf "%s\n" "$line" >> "$current"
    fi
    continue
  fi

  # Normale Zeilen durchreichen
  if [ -n "$current" ]; then
    printf "%s\n" "$line" >> "$current"
  fi
done < "$SRC"

echo "✅ Fertig. Prüfe Inhalte:"
ls -lh "$DEST/components" "$DEST/pages" | sed 's/^/   /'
