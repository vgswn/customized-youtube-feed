# customized-youtube-feed


App that scrapes Youtube for videos every minute and provide an api gateway to query based on title and descriptions


## Requirements
* Docker
* Docker Compose
* Bash (to run deploy script)

## Installation

Service has a deploy.sh script which has all the steps written
make sure you have docker running

```sh
sudo sh deploy.sh
```

## ENV Variables Needed
* GOOGLE_AUTH_KEY
* YT_KEY_WORD

## Sample .env File
```sh
GOOGLE_AUTH_KEY=XXXXXXX
YT_KEY_WORD=cricket
```

ES data is save on volume in folder ./esdata

Attaching a esdata.zip, you can unzip and have already setup es node with documents > 250
https://drive.google.com/file/d/1aOXf44NNnoqPC64ZTmy8e-JGXTqEFug-/view?usp=share_link
Request for access