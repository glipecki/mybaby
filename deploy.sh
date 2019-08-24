#!/bin/bash
echo "Building..."
yarn ng build --prod --aot --build-optimizer --progress
echo ""

echo "Deploying..."
firebase deploy
echo ""
