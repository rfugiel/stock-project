from flask import Flask, Blueprint, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS 

from api.auth import auth_bp
from api.market_data import market_data_bp


app = Flask(__name__)
cors = CORS(app)
api = Api(app)


app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(market_data_bp, url_prefix='/market_data')