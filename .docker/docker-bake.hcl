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
    annotations = [
        "org.opencontainers.image.authors=NoNamer777",
        "org.opencontainers.image.source=https://github.com/dnd-mapp/dma-web-client",
        "org.opencontainers.image.licenses=AGPL-3.0",
        "org.opencontainers.image.title=\"D&D Mapp - Web client\"",
        "org.opencontainers.image.description=The main web client of the D&D Mapp platform."
    ]
    cache-from = [
        "type=gha"
    ]
    cache-to = [
        "type=gha,mode=max,repository=dnd-mapp/dma-web-client"
    ]
}
