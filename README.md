This repo is in no way intended to be a demonstration of good work. Just a quick share of hack scripts. That said you should be able to run the scripts fine. Added docker for windows users.

# kafkahackscripts

`npm install`

`node messages -t mytopic`

`node offsets -t mytopic`

`node producer`

May need to update the URL for kafka from kafka:9093 to localhost:9093

`docker build -t kafkahack .`

`docker run --network (whatever your network is for kafka) -it -v ~/path/to/workspace:/XYZ kafkahack /bin/bash`
