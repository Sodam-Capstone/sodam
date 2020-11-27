from __future__ import print_function
import time
import boto3
import os.path
import requests
from pydub import AudioSegment
from pydub.utils import mediainfo

### 로컬 파일 전처리
local_file = "s1_anger_M_a1.mp3"
sound = AudioSegment.from_file(local_file)

if sound.frame_rate != 16000:
    sound = sound.set_frame_rate(16000)

if '.wav' not in local_file:
    sound.export("s1_anger_M_a1.wav", format = "wav")
    local_file = "s1_anger_M_a1.wav"

### 로컬 파일을 버킷에 업로드하기
s3 = boto3.client('s3')
bucket_file = local_file
bucket_name = 'speech.to.text'

# 로컬 파일 이름, 버킷 이름, 버킷 파일 이름
s3.upload_file(local_file, bucket_name, bucket_file)

### 버킷 파일 텍스트화 하기
transcribe = boto3.client('transcribe')
job_name = bucket_file
job_uri = 's3://speech.to.text/' + job_name

transcribe.start_transcription_job(
    TranscriptionJobName = job_name,
    Media = {'MediaFileUri': job_uri},
    MediaFormat = 'wav',
    LanguageCode = 'ko-KR',
    Settings = {'ShowSpeakerLabels': True, 'MaxSpeakerLabels': 4}
)

while True:
    status = transcribe.get_transcription_job(TranscriptionJobName = job_name)
    if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
        break
    print("Not ready yet...")
    time.sleep(10)


### 텍스트화 파일 로컬에 저장하기
url = status['TranscriptionJob']['Transcript']['TranscriptFileUri']
r = requests.get(url, allow_redirects = True)
open('origin.json', 'wb').write(r.content)