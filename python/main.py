from sklearn.model_selection import train_test_split 
from sklearn.model_selection import GridSearchCV
from sklearn.mixture import GaussianMixture
from sklearn.metrics import accuracy_score

from sklearn.externals import joblib

from sklearn.svm import SVC
from imutils import paths

import matplotlib.pyplot as plt
import soundfile as sf
import librosa
import wave, array
import numpy as np
import pandas as pd
import pickle
import json
import sys
import os
import cv2

import warnings
warnings.filterwarnings('ignore')

def get_result(y, sr):
    clf_load = joblib.load(sys.argv[2] + '/python/saved_model.pkl')
    audio_mfcc = librosa.feature.mfcc(y = y, sr = sr)
    x_test = audio_mfcc.reshape(-1)
    return clf_load.predict([x_test])[0]
job_name = sys.argv[1][:-4]
# # json 데이터 불러오기
file =  sys.argv[2] + '/reformat_json/reformat_' + job_name +'.json'
with open(file, "r", encoding = "utf-8") as json_file:
    json_data = json.load(json_file)

# 음성 파일 불러오기
file = sys.argv[2] + '/python/content/' + sys.argv[1]
y, sr = librosa.load(file, sr = 16000)

# 화자 수 설정하기
speakers = json_data['speakers']

# json 파일 사용하여 화자 분할하기
spk = []
spk_cnt = []

for i in range(0, speakers):
    spk.append([])
    spk_cnt.append(0)

for i in range(0, len(json_data['result'])):
    start_time = float(json_data['result'][i]['start_time'])
    end_time = float(json_data['result'][i]['end_time'])
    
    cutted_y = y[int(start_time)*16000:int(end_time)*16000]
    
    if json_data['result'][i]['speaker_label'] == 'spk_0':
        spk[0].append([cutted_y, sr])
        spk_cnt[0] += 1
        
    if json_data['result'][i]['speaker_label'] == 'spk_1':
        spk[1].append([cutted_y, sr])
        spk_cnt[1] += 1

# 화자마다 음성 파일 1초씩 자르기
# 음성 파일 테스트하기
emotion = []
total_duration = []

for i in range(0, speakers):
    emotion.append([])
    total_duration.append(0)

k = 0
while k < speakers:
    for i in range(0, spk_cnt[k]):
        duration = int(librosa.get_duration(spk[k][i][0], sr))
        total_duration[k] += duration
        for j in range(0, duration):
            cutted_y = spk[k][i][0][j*16000:(j+1)*16000]
            emotion[k].append(get_result(cutted_y, 16000))
    k += 1

# 테스트 결과 가공하기
emotion_count =[]

for i in range(0, speakers):
    emotion_count.append({'happiness':0, 'neutral':0, 'sadness':0, 'anger':0, 'time':total_duration[i]})

k = 0
while k < speakers:
    for i in emotion[k]:
        try: emotion_count[k][i]+= 1
        except: emotion_count[k][i] = 1
    k += 1

# 테스트 결과 CSV 파일로 저장하기
result_dict = {}

for i in range(0, speakers):
    spk_id = "spk_" + str(i)  
    temp_dict = {}
    temp_key = list(emotion_count[i].keys())
    temp_value = list(emotion_count[i].values())
    for j in range(0, 5):    
        temp_dict[temp_key[j]] = temp_value[j]
        result_dict[spk_id] = temp_dict

df = pd.DataFrame(result_dict).T
df.to_csv(sys.argv[2] + '/python/csv/'+job_name+'.csv')