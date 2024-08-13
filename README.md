Keywords: Mongo, Docker compose, Database Replication and Sharding

📋 Task: Creation of 15 Non-Trivial, Interconnected Examples

🛠️ Requirements:

Create 15 Non-Trivial, Interconnected Examples:

Design 15 different examples that are non-trivial and interconnected, demonstrating the capabilities and operations of the selected NoSQL database.<br>
Each example should include:<br>
The Query or Command: The specific operation being performed on the database.<br>
Solution: The expected result or output of the query/command.<br>
Detailed Explanation: A thorough explanation of what each query/command does, why it works that way, and the context within the database.

Utilize Database-Specific Features:

Depending on the NoSQL database chosen, make use of database-specific features such as:

Clustering: Demonstrate how to manage and query data within a cluster.<br>
Replication Factor: Show how replication is handled, including how data is distributed across nodes and how it maintains consistency.<br>
Sharding: Provide examples of how data is partitioned across different shards, and how queries are executed in a sharded environment.<br>

Simulate a Node Failure:

Include an example where you simulate the failure of one or more nodes within the database cluster.<br>
Describe Solutions: Offer possible solutions for handling such failures, explaining how the database can maintain availability, consistency, or recover from the failure, depending on the CAP theorem properties it adheres to.

Example Format:<br>
Each example should be clear and well-documented, with each step and its reasoning fully explained.<br>
Include any necessary setup commands or context required to understand the examples.

# Instruction

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
