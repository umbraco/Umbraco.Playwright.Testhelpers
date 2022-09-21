import {DomainPropertyBuilder} from "./domainPropertyBuilder";

export class DomainBuilder {
    nodeId;
    language;
    domainPropertyBuilder;

    constructor() {
        this.domainPropertyBuilder = [];
    }

    withNodeId(nodeId) {
        this.nodeId = nodeId;
        return this;
    }
    
    withLanguage(language){
        this.language = language;
        return this;
    }

    addDomain() {
        const builder = new DomainPropertyBuilder(this);
        this.domainPropertyBuilder.push(builder);
        return builder;
    }


    build() {
        return {
            nodeId: this.nodeId,
            language: this.language || '0',
            domains: this.domainPropertyBuilder.map((builder) => {
                return builder.build();
            })
          
        };
    }
}
