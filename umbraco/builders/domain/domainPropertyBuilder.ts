export class DomainPropertyBuilder {
    parentBuilder;
    name;
    lang;

    constructor(parentBuilder) {
        this.parentBuilder = parentBuilder;
    }

    withName(name) {
        this.name = name;
        return this;
    }

    withLang(lang) {
        this.lang = lang;
        return this;
    }

    done() {
        return this.parentBuilder;
    }

    build() {
        return {
            name: this.name,
            lang: this.lang,
        };
    }
}