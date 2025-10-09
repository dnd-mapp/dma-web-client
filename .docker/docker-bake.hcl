variable "TAGS" {
    default = [
        "latest"
    ]
    type = list(string)
}

target "default" {
    context = "."
    dockerfile = ".docker/Dockerfile"
    platforms = [
        "linux/amd64",
        "linux/arm64"
    ]
    tags = [
        for tag in TAGS: "ghcr.io/dnd-mapp/dma-web-client:${tag}"
    ]
    attest = [
        "type=provenance,mode=max",
        "type=sbom"
    ]
    cache-from = [
        "type=gha"
    ]
    cache-to = [
        "type=gha,mode=max,repository=dnd-mapp/dma-web-client"
    ]
}
