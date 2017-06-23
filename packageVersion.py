import json

filePath='package.json'
json_data=open(filePath).read()

data = json.loads(json_data)
#print(data)
version = data["version"]
print(version) 
# pprint(data)
