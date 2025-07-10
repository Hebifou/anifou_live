from flask import Flask, render_template, request, g
from flask_babel import Babel, _
import os

print(">>> Flask-Babel aktiviert:", Babel)  # Debug-Ausgabe beim Start

app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'de'
app.config['BABEL_SUPPORTED_LOCALES'] = ['de', 'en']
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'locale'

babel = Babel(app)

@babel.localeselector
def get_locale():
    print(">>> get_locale() wurde ausgeführt")  # Wird bei jedem Request aufgerufen

    lang = request.args.get('lang')
    print("Sprache erkannt (URL):", lang)

    if lang in app.config['BABEL_SUPPORTED_LOCALES']:
        g.current_lang = lang
        return lang

    best_match = request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES'])
    print("Sprache erkannt (Browser):", best_match)

    g.current_lang = best_match or 'de'
    return g.current_lang

# Sprache in Templates verfügbar machen
@app.context_processor
def inject_get_locale():
    return dict(get_locale=lambda: g.get('current_lang', 'de'))

# Routen
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/galerie")
def galerie():
    return render_template("galerie_vorschau.html")

@app.route("/galerie-voll")
def galerie_voll():
    return render_template("galerie.html")

@app.route("/galerie/<werk>")
def galerie_werk(werk):
    return render_template(f"werk_{werk}.html")

@app.route("/projekt/<projektname>")
def projekt(projektname):
    erlaubte_projekte = [
        "drei_komma_5",
        "plastic_vs_profit",
        "how_the_internet_feels"
    ]

    if projektname not in erlaubte_projekte:
        return render_template("404.html"), 404

    template_path = f"projekt/{projektname}/index.html"
    return render_template(template_path)

@app.route("/kontakt")
def kontakt():
    return render_template("kontakt.html")

@app.route("/projekte")
def projekt_uebersicht():
    return render_template("projekte.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5030)
