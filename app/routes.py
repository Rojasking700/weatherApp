from app import app, db
from flask import render_template, request, flash, redirect, url_for
from app.forms import RegisterUser
from app.model import User
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import check_password_hash


@app.route('/')
@app.route('/index')
def index():
    title = 'HOME'
    return render_template('index.html', title=title)

@app.route('/register', methods=['GET','POST'])
def register():
    title = 'REGISTER'
    registerUser = RegisterUser()
    if request.method == 'POST' and registerUser.validate:
        username = registerUser.username.data
        firstName = registerUser.firstName.data
        lastName = registerUser.lastName.data
        email = registerUser.email.data
        address = registerUser.address.data
        zipcode = registerUser.zipcode.data
        city = registerUser.city.data
        state = registerUser.state.data
        country = registerUser.country.data
        password = registerUser.password.data

        print(username, firstName)

        new_user = User(username,firstName,lastName,email,address,zipcode,city,state,country,password)
        db.session.add(new_user)
        db.session.commit()

        flash("Congradulations! You have successfully signeup for Ollie Williams weather report!", "success")
        return redirect(url_for('index'))

    return render_template('register.html',title=title,registerUser=registerUser)

