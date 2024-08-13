# Návod ke zprovoznění semestrální práce

docker-compose up -d && ./commands.sh

# Connect to Mongo Compass
# mongodb://127.0.0.1:27117,127.0.0.1:27118 (optional)


# Create student to test clustering:

docker-compose exec -it router01 mongosh
use dorm
db.students.insertOne({
    firstName: "John",
    lastName: "Doe",
    DOB: new Date("1995-05-15"),
    gender: "Male",
    nationality: "American",
    emailAddress: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    roomNumber: 101,
    block: "A",
    checkInDate: new Date("2023-01-01"),
    checkOutDate: new Date("2023-06-30"),
    university: "Example University",
    faculty: "Engineering"
});


# There will be no records about John Doe in two shard servers
# Try:

docker-compose exec -it shard01-a mongosh
use dorm
db.students.find({ lastName: "Doe" });
exit

docker-compose exec -it shard02-a mongosh
use dorm
db.students.find({ lastName: "Doe" });
exit

docker-compose exec -it shard03-a mongosh
use dorm
db.students.find({ lastName: "Doe" });
exit