# 📅 Day 13 - JSON & Requests

## 📦 JSON
- JSON = JavaScript Object Notation
- Used to exchange data between applications.
- Looks similar to a Python dictionary.
- JSON uses double quotes.

### JSON Functions

```python
import json
```

```python
json.dumps(dict)
```
- Python Dictionary → JSON String

```python
json.loads(json_string)
```
- JSON String → Python Dictionary

---

## 🌐 Requests Module

Install:

```bash
pip install requests
```

Import:

```python
import requests
```

GET Request:

```python
response = requests.get(URL)
```

- Sends a request to a server.
- `response` stores the complete reply from the server.

Useful attributes:

```python
response.status_code
```

- 200 → Success
- 404 → Not Found
- 500 → Server Error

Convert JSON to Dictionary:

```python
data = response.json()
```

Now access values like a dictionary:

```python
data["title"]
data["completed"]
```

Nested Dictionary:

```python
data["slip"]["advice"]
```

---

## 🧠 Remember

Python
↓
requests.get()
↓
Internet 🌐
↓
Server
↓
JSON Response
↓
response.json()
↓
Python Dictionary

---

## ⭐ Key Points

- `requests` helps Python communicate with servers.
- `response` contains the server's complete reply.
- `response.json()` converts JSON into a Python dictionary.
- Every Python version has its own installed packages.
- If `ModuleNotFoundError` occurs, check that you're using the correct Python interpreter.

🔑 API Key = Your authentication to use an API.
📨 Query Parameters = Extra information sent in the URL.
📥 GET = Retrieve data.
📤 POST = Send/create data.
📦 requests.get() receives data.
📦 requests.post() sends data.
📊 response.status_code checks success.
📄 response.json() converts the response into Python data.

|    Code | Meaning    | Example                            |
| ------: | ---------- | ---------------------------------- |
| **200** | OK         | GET request successful             |
| **201** | Created    | POST created a new resource        |
| **202** | Accepted   | Request accepted, processing later |
| **204** | No Content | Success, but nothing to return     |
