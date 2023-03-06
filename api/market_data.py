from flask import Blueprint, request
import requests
import json
from flask_cors import cross_origin

market_data_bp = Blueprint(
    'market_data_bp', __name__,
)

@market_data_bp.route('/underlying_quotes', methods=['GET'])
@cross_origin()
def underlying_quotes():
    URL = "https://api.livevol.com/v1/delayed/allaccess/market/underlying-quotes"
    
    cboe_token = request.args.get("cboe_token")
    headers = {
        "Authorization": "Bearer {}".format(cboe_token)
    }
   
    symbols = request.args.getlist("symbols")
    if not symbols:
        return json.dumps([])
    params = {
        "symbols": ", ".join(symbols),
        "date": "2023-02-15",
    }
   
    r = requests.get(URL, headers=headers, params=params)
    response_json = r.json()
    required_fields = [
        "symbol",
        "iv30",
        "iv30_change",
        "underlying_last_trade_price",
        
    ]
    result = {}
    for entry in response_json:
        symbol = entry["symbol"]
        result[symbol] = {
            field:entry[field] for field in required_fields
        }

    return result
    
@market_data_bp.route('/symbols', methods=['GET'])
@cross_origin()
def symbols():
    URL = "https://api.livevol.com/v1/delayed/allaccess/reference/symbols"

    cboe_token = request.args.get("cboe_token")
    headers = {
        "Authorization": "Bearer {}".format(cboe_token)
    }
   
    r = requests.get(URL, headers=headers)
    response_json = r.json()
   
    return json.dumps(
        {"symbols": [x["name"] for x in response_json]}
    )