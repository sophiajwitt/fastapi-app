#!/bin/bash

# Script to create 100 git branches

echo "Creating 100 branches..."

for i in {1..100}
do
    branch_name="branch-$i"
    git branch "$branch_name"

    if [ $? -eq 0 ]; then
        echo "Created branch: $branch_name"
    else
        echo "Failed to create branch: $branch_name"
    fi
done

echo "Done! Created 100 branches."
echo "To view all branches, run: git branch"
