#!/bin/bash

# This script runs after the build to ensure CSS and other assets are correctly included

# Copy index.css to the build directory if it exists
if [ -f "src/index.css" ]; then
  echo "Copying index.css to build directory"
  cp src/index.css build/
fi

# Ensure proper permissions
chmod -R 755 build/

echo "Post-build process completed successfully"
