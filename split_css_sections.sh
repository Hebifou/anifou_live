#!/bin/bash
set -e

SOURCE="static/css/style_backup_full.css"
DEST="static/css"

echo "🔍 Starte finales, getestetes CSS-Splitting (macOS-sicher)"
echo "Quelle: $SOURCE"
echo "------------------------------------"

if [ ! -f "$SOURCE" ]; then
  echo "❌ Fehler: Datei $SOURCE nicht gefunden!"
  exit 1
fi

extract_block() {
  local start="$1"
  local end="$2"
  local output="$3"

  echo "→ Extrahiere Abschnitt ${start}) → ${output}"

  perl -0777 -ne "
    my \$content = do { local \$/; <STDIN> };
    if (\$content =~ m{
      (?:/\*[^*]*\*+(?:[^/*][^*]*\*+)*/)?      # evtl. Kommentar vorab
      [^/]*?                                   # beliebiger Text davor
      /\\*[^*]*\\b${start}\\)[\\s\\S]*?\\*/   # Start-Kommentar mit Nummer
      (.*?)                                    # Inhalt zwischen Start und Ende
      (?=/\\*[^*]*\\b${end}\\)[\\s\\S]*?\\*/) # bis vor nächsten Marker
    }xs) {
      print \"/* ${start}) BLOCK START */\\n\$1\\n/* ${start}) BLOCK END */\\n\";
    }
  " "$SOURCE" > "$output"

  if [ -s "$output" ]; then
    echo "✅ Gespeichert in: $output"
  else
    echo "⚠️ Keine Daten für ${start}) gefunden"
  fi
  echo
}

# === Abschnitte ===
extract_block "00" "10" "$DEST/base/_tokens.css"
extract_block "10" "20" "$DEST/base/_layout.css"
extract_block "20" "30" "$DEST/components/_nav.css"
extract_block "30" "40" "$DEST/components/_hero.css"
extract_block "40" "50" "$DEST/components/_simulation.css"
extract_block "50" "60" "$DEST/components/_video.css"
extract_block "60" "70" "$DEST/components/_buttons.css"
extract_block "70" "80" "$DEST/components/_footer.css"
extract_block "80" "90" "$DEST/pages/_life-in-plastic.css"
extract_block "90" "95" "$DEST/pages/_privacy.css"
extract_block "95" "99" "$DEST/pages/_imprint.css"
extract_block "99" "100" "$DEST/pages/_responsive.css"

echo "------------------------------------"
echo "✨ Fertig! Prüfe static/css — die Dateien sollten jetzt Inhalt haben."
