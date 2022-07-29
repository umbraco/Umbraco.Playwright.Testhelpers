
export class PermissionsBuilder {
  permissions: string[];
  parentBuilder;

  constructor(parentBuilder) {
    this.permissions = [];
    this.parentBuilder = parentBuilder;
  }

  withCultureAndHostNames() {
    this.permissions.push("I");
    return this;
  }

  withRestrictPublicAccess() {
    this.permissions.push("P");
    return this;
  }

  withRollBack() {
    this.permissions.push("K");
    return this;
  }

  withBrowseNode() {
    this.permissions.push("F");
    return this;
  }

  withCreateContentTemplate() {
    this.permissions.push("ï");
    return this;
  }

  withDelete() {
    this.permissions.push("D");
    return this;
  }

  withCreate() {
    this.permissions.push("C");
    return this;
  }

  withNotifications() {
    this.permissions.push("N");
    return this;
  }

  withPublish() {
    this.permissions.push("U");
    return this;
  }

  withPermissions() {
    this.permissions.push("R");
    return this;
  }

  withSendToPublish() {
    this.permissions.push("H");
    return this;
  }

  withUnpublish() {
    this.permissions.push("Z");
    return this;
  }

  withUpdate() {
    this.permissions.push("A");
    return this;
  }

  withCopy() {
    this.permissions.push("O");
    return this;
  }

  withMove() {
    this.permissions.push("M");
    return this;
  }

  withSort() {
    this.permissions.push("S");
    return this;
  }

  withAllowAll() {
    // Reset array to make sure there's no dupes
    this.permissions = [];
    
    this.withCultureAndHostNames()
      .withRestrictPublicAccess()
      .withRollBack()
      .withBrowseNode()
      .withCreateContentTemplate()
      .withDelete()
      .withCreate()
      .withNotifications()
      .withPublish()
      .withPermissions()
      .withSendToPublish()
      .withUnpublish()
      .withUpdate()
      .withCopy()
      .withMove()
      .withSort()

    return this;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return this.permissions;
  }
}