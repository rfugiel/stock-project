from flask import Blueprint
import requests
import base64

auth_bp = Blueprint(
    'home_bp', __name__,
    template_folder='templates',
    static_folder='static'
)

@auth_bp.route('/retrieve_auth_token', methods=['GET'])
def retrieve_auth_token():
    URL = "https://id.livevol.com/connect/token"

    client_id = ""
    client_secret = ""
    message = f"{client_id}:{client_secret}"

    message_bytes = message.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes)
    base64_message = base64_bytes.decode('ascii')

    headers = {
        "Authorization": f"Basic {base64_message}"
    }

    PARAMS = {"grant_type": "client_credentials"}

    r = requests.post(URL, data = PARAMS, headers=headers)
    return r.json()
