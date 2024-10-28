export class NotificationConstantHelper {

  public static readonly success = {
    created: "Created",
    saved: "Saved",
    published: "Document published",
    unpublished: "Document unpublished",
    copied: "Copied",
    moved: "Moved",
    movedToRecycleBin: "Trashed",
    deleted: "Deleted",
    emptiedRecycleBin: "Recycle Bin Emptied",
    restored: "Restored",
    duplicated: "Duplicated",
    renamed: "Renamed",
    folderCreated: "Folder created",
    folderUpdated: "Folder updated",
    folderDeleted: "Folder deleted",
    userDisabled: "User disabled",
    userEnabled: "User enabled",
    avatarUploaded: "Avatar uploaded",
    avatarDeleted: "Avatar deleted",
    documentBlueprintCreated: 'Document Blueprint created'
  }

  public static readonly error = {
    emptyName: "Name was empty or null",
    duplicateName: "Duplicate name",
    invalidEmail: "Invalid email supplied",
    notEmptyFolder: "The folder is not empty",
    duplicateISOcode: "Duplicate ISO code",
    notEmpty: "Not empty",
    noAccessToResource: "The authenticated user do not have access to this resource"
  }
}