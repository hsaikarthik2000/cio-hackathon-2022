from flask import Flask
from flask import request
from flask import json

 python test
 hjbvjhbcds
  
token = "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"
headers = {"Authorization" : "token {}".format(token)}
data_lib = [{"title": "Bug still not solve"}, {"title": "Add a new feature"}, {"title": "Rewrite the README"}]
url = "https://api.github.com/repos/hsaikarthik2000/cio-hackathon-2022/issues"

data = {"title": "Action Done"}

app = Flask(__name__)

@app.route('/')
def root():
  print("Hello")
  return 'Hello World!'

@app. route('/', methods=['POST'])
def hook_root():
  print("SUCCESS")
  print(request.content_type)
  if request.content_type == 'application/json':
    print("ROOT SUCCESS")
    request.post(url,data=json.dumps(data),headers=headers)
    return json.dumps(request.json)

if __name__ == '__main__':
  app.run(debug=True)

print("Hello World")
