import json
import sys

json_name = sys.argv[1][:-4]
json_path = sys.argv[2]

with open(json_path + '/py_json/' + json_name + '.json', "r", encoding = "utf-8") as json_file:
  json_data = json.load(json_file)

# start_time, speaker_label, end_time
result = []

for i in range(0, len(json_data['results']['speaker_labels']['segments'])):
  segments = json_data['results']['speaker_labels']['segments'][i]
  del segments['items']

  result.append(segments)

# 단어 단위를 문장 단위로 변경하기
count = 0
content = ""

for i in range(0, len(json_data['results']['items'])):
  # content = word
  try:
    if float(result[count]['end_time']) >= float(json_data['results']['items'][i]['end_time']):
      content += json_data['results']['items'][i]['alternatives'][0]['content'] + " "
      if i == len(json_data['results']['items']) - 1:
        result[count]['result'] = content 
      
    else:
      result[count]['result'] = content
      count += 1
      content = json_data['results']['items'][i]['alternatives'][0]['content'] + " "

  # content != word
  except:
    if i == len(json_data['results']['items']) - 1:
      result[count]['result'] = content
      

# list to dict
final_result = {}
final_result["result"] = result
final_result["speakers"] = json_data['results']['speaker_labels']['speakers']


with open(json_path + '/reformat_json/reformat_' + json_name + '.json', 'w', encoding = "utf-8") as json_file:
  json.dump(final_result, json_file, indent = 4)

print("reformat.py 실행완료")