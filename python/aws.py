from __future__ import print_function
import time
import boto3
import os.path
import requests
import sys
from pydub import AudioSegment
from pydub.utils import mediainfo

### 로컬 파일 전처리
# local_file = sys.argv[1]
# sound = AudioSegment.from_file(local_file)

# if sound.frame_rate != 16000:
#     sound = sound.set_frame_rate(16000)

# if '.wav' not in local_file:
#     sound.export(sys.argv[1], format = "wav")
#     local_file = sys.argv[1]

### 로컬 파일을 버킷에 업로드하기
# s3 = boto3.client('s3')
# local_file = './s1_sadness_M_s4.wav'
# bucket_name = 'speech.to.text'
# bucket_file = 'call.wav'

# 로컬 파일 이름, 버킷 이름, 버킷 파일 이름
# s3.upload_file(local_file, bucket_name, bucket_file)

### 로컬 파일을 버킷에 다운로드하기
s3 = boto3.client('s3')
local_file = sys.argv[2] + '/python/content/' + sys.argv[1]
bucket_name = 'speech.to.text'
bucket_file = sys.argv[1]

# 로컬 파일 이름, 버킷 이름, 버킷 파일 이름
s3.download_file(bucket_name, bucket_file, local_file)


### 버킷 파일 텍스트화 하기
transcribe = boto3.client('transcribe')
job_name = sys.argv[1]
job_uri = 's3://speech.to.text/' + sys.argv[1]

transcribe.start_transcription_job(
    TranscriptionJobName=job_name,
    Media={'MediaFileUri': job_uri},
    MediaFormat='wav',
    LanguageCode='ko-KR',
    Settings={'ShowSpeakerLabels': True, 'MaxSpeakerLabels': 4}
)

while True:
    status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
    if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
        break
    print("Not ready yet...")
    time.sleep(10)


### 텍스트화 파일 로컬에 저장하기
job_name = sys.argv[1][:-4]

url = status['TranscriptionJob']['Transcript']['TranscriptFileUri']
r = requests.get(url, allow_redirects = True)
open('py_json/'+ job_name +'.json', 'wb').write(r.content)