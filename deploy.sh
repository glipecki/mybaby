#!/bin/bash
echo "Building..."
yarn build
echo ""

echo "Deploying..."
firebase deploy
echo ""
