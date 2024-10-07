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
    folderCreated: "Folder created",
    folderUpdated: "Folder updated",
    folderDeleted: "Folder deleted"
  }

  public static readonly error = {
    emptyName: "Name was empty or null",
    duplicateName: "Duplicate name",
    invalidEmail: "Invalid email supplied",
    notEmptyFolder: "The folder is not empty",
    duplicateISOcode: "Duplicate ISO code",
    notEmpty: "Not empty"
  }
}