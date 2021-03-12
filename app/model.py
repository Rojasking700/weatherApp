from app import db 
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_login import UserMixin 

# @login.user_loader
# def load_user(user_id):
#     return User.query.get(user_id)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    firstName = db.Column(db.String(150), nullable=False)
    lastName = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    address = db.Column(db.String(150), nullable=False)
    zipcode = db.Column(db.String(5), nullable=False)
    city = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(150), nullable=False)
    country = db.Column(db.String(150), nullable=False)
    password = db.Column(db.String(256), nullable=False)

    def __init__(self, username, firstName,lastName,email,address,zipcode,city,state,country,password):
        self.username = username
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.address = address
        self.zipcode = zipcode
        self.city = city 
        self.state = state
        self.country = country
        self.password = generate_password_hash(password)
