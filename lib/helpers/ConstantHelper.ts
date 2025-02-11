export class ConstantHelper {

  public static readonly sections = {
    content: "Content",
    media: "Media",
    settings: "Settings",
    packages: "Packages",
    members: "Members",
    dictionary: "Translation",
    users: "Users"
  }

  public static readonly testUserCredentials = {
    name: 'Test User',
    email: 'verySecureEmail@123.test',
    password: 'verySecurePassword123'
  }

  public static readonly validationMessages = {
    emptyLinkPicker: 'Please enter an anchor or querystring, or select a published document or media item, or manually configure the URL',
    invalidValue: 'Value is invalid, it does not match the correct pattern'
  }

  public static readonly inputTypes = {
    general: 'input',
    tipTap: 'umb-input-tiptap'
  }
  
  public static readonly notificationMessages = {
    success: 'Success',
    error: 'Error',
    saved: 'Saved',
    published: 'Published',
    unpublished: 'Unpublished',
    documentWasNotPublished: 'Document was not published, but we saved it for you.'
  }
}