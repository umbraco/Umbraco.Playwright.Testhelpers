import fs from "fs";

export class MediaFileBuilder {
    name;
    mimeType;
    path;
    buffer;

    withName(name) {
        this.name = name;
        return this;
    }

    withMimeType(mimeType) {
        this.mimeType = mimeType;
        return this;
    }

    withPath(path) {
        this.buffer = fs.readFileSync("./fixtures/mediaLibrary/"+ path);
        return this;
    }
    
    build() {
        return {
            name: this.name,
            mimeType: this.mimeType || "image/png",
            //Should be deleted
            path: this.path,
            buffer: this.buffer
        };
    }
}