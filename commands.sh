#Init 1st config servers and its shard servers
docker-compose exec configsvr01 sh -c "mongosh < /scripts/init-configserver.js"

docker-compose exec shard01-a sh -c "mongosh < /scripts/init-shard01.js"
docker-compose exec shard02-a sh -c "mongosh < /scripts/init-shard02.js"
sleep 10
docker-compose exec shard03-a sh -c "mongosh < /scripts/init-shard03.js"

#Init router
docker-compose exec router01 sh -c "mongosh < /scripts/init-router.js"

#Connect to the first router and init database
docker-compose exec router01 sh -c "mongosh < /mongo-init-scripts/init.js"
docker-compose exec router01 sh -c "/mongo-init-scripts/mongoImportData.sh"

#Clear
# docker-compose down -v --rmi all --remove-orphans