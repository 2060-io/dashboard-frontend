#!/bin/bash

rm -rf openapi-client
curl -H "Accept: application/json" https://ob.dev.2060.io/q/openapi > api.json
npx @openapitools/openapi-generator-cli generate -i api.json -g typescript-fetch -o ./openapi-client --additional-properties=usePromises=true

rm -f api.json
