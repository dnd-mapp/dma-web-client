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
}
