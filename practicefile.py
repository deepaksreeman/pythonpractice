import requests

url = "http://localhost:5678/webhook-test/f0c6660d-b64a-4412-addd-590c2c660675"
response=requests.post(url, json={"name":"Deepak"})
print(response.status_code)
print(repr(response.text))