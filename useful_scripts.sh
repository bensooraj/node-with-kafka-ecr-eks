# Remove all exited containers
docker rm $(docker ps -a -f status=exited -q)

