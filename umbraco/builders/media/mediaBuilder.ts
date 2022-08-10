import {MediaPropertyBuilder} from './mediaPropertyBuilder';

export class MediaBuilder {
    id;
    properties;
    name;
    contentTypeAlias;
    parentId;
    action;
    mediaPropertyBuilder;

    constructor() {
        this.mediaPropertyBuilder = [];
    }

    addProperty() {
        const builder = new MediaPropertyBuilder(this);
        this.mediaPropertyBuilder.push(builder);
        return builder;
    }

    withName(name) {
        this.name = name;
        return this;
    }

    withContentTypeAlias(contentTypeAlias) {
        this.contentTypeAlias = contentTypeAlias;
        return this;
    }

    build() {
        return {
            id: this.id || '0',
            properties: this.mediaPropertyBuilder.map((builder) => {
                return builder.build();
            }),
            name: this.name,
            contentTypeAlias: this.contentTypeAlias,
            parentId: this.parentId || '-1',
            action: this.action || 'saveNew'
        };
    }
}