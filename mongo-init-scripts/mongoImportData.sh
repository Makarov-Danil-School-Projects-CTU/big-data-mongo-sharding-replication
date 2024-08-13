#!/bin/bash
import_collection() {
    collection=$1
    file=$2

    echo "Importing data for collection: $collection"

    if mongoimport --db dorm --collection "$collection" --type json --file "$file" --jsonArray; then
        echo "Successfully imported $collection"
    else
        echo "Error importing $collection"
        exit 1
    fi
}

echo "Starting data import..."

import_collection "students" "/input-data/students.json"
import_collection "rooms" "/input-data/rooms.json"
import_collection "dormitoryBlocks" "/input-data/dormitoryBlocks.json"
import_collection "events" "/input-data/events.json"
import_collection "visitors" "/input-data/visitors.json"
import_collection "maintenanceRequests" "/input-data/maintenanceRequests.json"

echo "Data import completed."