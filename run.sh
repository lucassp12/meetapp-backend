echo Shutting down all containers
docker-compose down

echo Building images
docker-compose build --no-cache

echo Uploading Application container
docker-compose up -d

echo Containers running:
docker ps

echo Make migrations
sleep 3 && docker exec -it meetapp_node yarn migration

echo Finished

sleep 2
