from flask import Flask, render_template, request, g, send_from_directory, redirect, url_for
from flask_babel import Babel
import os

app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'de'
app.config['BABEL_SUPPORTED_LOCALES'] = ['de', 'en']
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'locale'

babel = Babel(app)

@babel.localeselector
def get_locale():
    best_match = request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES'])
    g.current_lang = best_match or 'de'
    return g.current_lang

@app.context_processor
def inject_get_locale():
    return dict(get_locale=lambda: g.get('current_lang', 'de'))

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory(directory=os.path.join(app.root_path, 'static'), path='sitemap.xml', mimetype='application/xml')


# 🔹 Projekt-Routen mit modernen Slugs
@app.route('/project/life-in-plastic')
def life_in_plastic():
    return render_template('projekt/plastic_vs_profit/index.html')

@app.route('/project/minus-three-point-five')
def minus_three_point_five():
    return render_template('projekt/drei_komma_5/index.html')

@app.route('/project/how-the-internet-feels')
def how_the_internet_feels():
    return render_template('projekt/how_the_internet_feels/index.html')

@app.route('/project/hand')
def project_hand():
    return render_template('werk_hand.html')


# 🔁 Redirects von alten Projekt-URLs
@app.route('/projekt/plastic_vs_profit')
def redirect_plastic_vs_profit():
    return redirect(url_for('life_in_plastic'), code=301)

@app.route('/projekt/drei_komma_5')
def redirect_drei_komma_5():
    return redirect(url_for('minus_three_point_five'), code=301)

@app.route('/projekt/how_the_internet_feels')
def redirect_how_internet_feels():
    return redirect(url_for('how_the_internet_feels'), code=301)


# 🔁 Galerie-Redirects
@app.route("/galerie/urbanamazonas")
def redirect_urbanamazonas():
    return redirect(url_for("gallery_werk", werk="hand"), code=301)

@app.route("/galerie")
def redirect_galerie_to_preview():
    return redirect(url_for("gallery_preview"), code=301)

@app.route("/galerie/<werk>")
def redirect_galerie_werk(werk):
    return redirect(url_for("gallery_werk", werk=werk), code=301)


# 🔹 Hauptseiten & Galerie
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/gallery-preview")
def gallery_preview():
    return render_template("galerie_vorschau.html")

@app.route("/galerie-voll")
def galerie_voll():
    return render_template("galerie.html")

@app.route("/gallery/<werk>")
def gallery_werk(werk):
    return render_template(f"werk_{werk}.html")

@app.route("/gallery/two-brothers-and-the-sea")
def gallery_two_brothers():
    return render_template("werk_2brothers.html")

@app.route("/gallery/2brothers")
def redirect_2brothers_old():
    return redirect(url_for("gallery_two_brothers"), code=301)



# 🔹 Kontakt & Projektübersicht
@app.route("/contact")
def kontakt():
    return render_template("kontakt.html")

@app.route("/projects")
def projekt_uebersicht():
    return render_template("projekte.html")



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5030)
