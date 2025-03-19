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

  public static readonly approvedColorSettings = {
    0: ['Include labels?', 'Stores colors as a JSON object containing both the color hex string and label, rather than just the hex string.'],
    1: ['Colors', 'Add, remove or sort colors'],
  }

  public static readonly checkboxListSettings = {
    0: ['Add option', 'Add, remove or sort options for the list.']
  }

  public static readonly contentPickerSettings = {
    0: ['Ignore user start nodes', 'Selecting this option allows a user to choose nodes that they normally dont have access to.'],
    1: ['Start node', ''],
    2: ['Show open button', 'Opens the node in a dialog']
  }

  public static readonly datePickerSettings = {
    0: ['Date format', 'If left empty then the format is YYYY-MM-DD'],
    //1: ['Offset time', "When enabled the time displayed will be offset with the server's timezone, this is useful for scenarios like scheduled publishing when an editor is in a different timezone than the hosted server"]
  }

  public static readonly dropdownSettings = {
    0: ['Enable multiple choice', ''],
    1: ['Add options', '']
  }

  public static readonly imageCropperSettings = {
    0: ['Define Crops', ''],
  }

  public static readonly mediaPickerSettings = {
    0: ['Accepted types', 'Limit to specific types'],
    1: ['Pick multiple items', 'Outputs a IEnumerable'],
    2: ['Amount', 'Set a required range of medias'],
    3: ['Start node', ''],
    4: ['Enable Focal Point', ''],
    5: ['Image Crops', 'Local crops, stored on document'],
    6: ['Ignore User Start Nodes', 'Selecting this option allows a user to choose nodes that they normally dont have access to.'],
  }

  public static readonly labelSettings = {
    0: ['Value type', 'The type of value to store'],
  }

    public static readonly listViewSettings = {
    0: ['Columns Displayed', 'The properties that will be displayed for each column.'],
    1: ['Layouts', 'The properties that will be displayed for each column.'],
    2: ['Order By', 'The default sort order for the Collection.'],
    3: ['Order Direction', ''],
    4: ['Page Size', 'Number of items per page.'],
    5: ['Workspace View icon', "The icon for the Collection's Workspace View."],
    6: ['Workspace View name', "The name of the Collection's Workspace View (default if empty: Child Items)."],
    7: ['Show Content Workspace View First', "Enable this to show the Content Workspace View by default instead of the Collection's."],
  }

  public static readonly multiURLPickerSettings = {
    0: ['Minimum number of items', ''],
    1: ['Maximum number of items', ''],
    2: ['Ignore user start nodes', 'Selecting this option allows a user to choose nodes that they normally dont have access to.'],
    3: ['Overlay Size', 'Select the width of the overlay.'],
    4: ['Hide anchor/query string input', 'Selecting this hides the anchor/query string input field in the link picker overlay.'],
  }
  
  public static readonly numericSettings = {
    0: ['Minimum', 'Enter the minimum amount of number to be entered'],
    1: ['Maximum', 'Enter the maximum amount of number to be entered'],
    2: ['Step size', 'Enter the intervals amount between each step of number to be entered']
  }

  public static readonly radioboxSettings = {
    0: ['Add option', 'Add, remove or sort options for the list.'],
  }

  public static readonly tagsSettings = {
    0: ['Tag group', ''],
    1: ['Storage Type', 'Select whether to store the tags in cache as JSON (default) or CSV format. Notice that CSV does not support commas in the tag value.']
  }

  public static readonly textareaSettings = {
    0: ['Maximum allowed characters', 'If empty - no character limit'],
    1: ['Number of rows', 'If empty or zero, the textarea is set to auto-height']
  }

  public static readonly textstringSettings = {
    0: ['Maximum allowed characters', 'If empty, 512 character limit'],
  }

  public static readonly trueFalseSettings = {
    0: ['Preset value', ''],
    1: ['Show on/off labels', ''],
    2: ['Label On', 'Displays text when enabled.'],
    3: ['Label Off', 'Displays text when disabled.'],
    4: ['Screen Reader Label', ''],
  }

  public static readonly uploadSettings = {
    0: ['Accepted file extensions', ''],
  }

  public static readonly richtextEditorSettings = {
    0: ['', ''],
    1: ['', '']
  }
}