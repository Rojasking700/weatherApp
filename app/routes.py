from app import app
from flask import render_template, request, flash, redirect, url_for


@app.route('/')
@app.route('/index')
def index():
    title = 'HOME'
    return render_template('index.html', title=title)