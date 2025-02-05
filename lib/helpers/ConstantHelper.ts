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
  }
}