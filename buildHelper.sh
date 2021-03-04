#!/bin/bash

set -ex

TAG="${1}"
REGISTRY="registry.f5demos.com"

bp () {
    docker build -t ${REGISTRY}/${1}:${TAG} -t ${REGISTRY}/${1}:latest ${2}
    docker push ${REGISTRY}/${1}
}

bp "spa" "front-end"
bp "api" "back-end"
bp "inv" "inventory"
bp "recs" "recommendations"