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
    emptyLinkPicker: 'This field is required',
    invalidValue: 'Value is invalid, it does not match the correct pattern',
    unsupportInvariantContentItemWithVariantBlocks: 'One or more Block Types of this Block Editor is using a Element-Type that is configured to Vary By Culture or Vary By Segment. This is not supported on a Content item that does not vary by Culture or Segment.',
    emptyValue: 'Value cannot be empty'
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
    1: ['Start node', '']
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
    0: ['Crop options', ''],
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

  public static readonly tipTapSettings = {
    0: ['Capabilities', 'Choose which Tiptap extensions to enable.\nOnce enabled, the related actions will be available for the toolbar and statusbar.'],
    1: ['Toolbar', 'Design the available actions.\nDrag and drop the available actions onto the toolbar.'],
    2: ['Statusbar', 'Design the available statuses.\nDrag and drop the available actions onto the statusbar areas.'],
    3: ['Stylesheets', 'Pick the stylesheets whose editor styles should be available when editing.'],
    4: ['Dimensions', 'Set the maximum width and height of the editor. This excludes the toolbar height.'],
    5: ['Maximum size for inserted images', 'Maximum width or height - enter 0 to disable resizing.'],
    6: ['Overlay size', 'Select the width of the overlay (link picker).'],
    7: ['Available Blocks', 'Define the available blocks.'],
    8: ['Image Upload Folder', 'Choose the upload location of pasted images.'],
    9: ['Ignore User Start Nodes', ''],
  }

  public static readonly tinyMCESettings = {
    0: ['Toolbar', 'Pick the toolbar options that should be available when editing'],
    1: ['Stylesheets', 'Pick the stylesheets whose editor styles should be available when editing'],
    2: ['Dimensions', 'Set the editor dimensions'],
    3: ['Maximum size for inserted images', 'Maximum width or height - enter 0 to disable resizing.'],
    4: ['Mode', 'Select the mode for the editor'],
    5: ['Available Blocks', 'Define the available blocks.'],
    6: ['Overlay size', 'Select the width of the overlay (link picker).'],
    7: ['Hide Label', ''],
    8: ['Image Upload Folder', 'Choose the upload location of pasted images.'],
    9: ['Ignore User Start Nodes', ''],
  }

  public static readonly userGroupAssignAccessSettings = {
    0: ['Sections', 'Add sections to give users access'],
    1: ['Languages', 'Limit the languages users have access to edit'],
    2: ['Select content start node', 'Limit the content tree to a specific start node'],
    3: ['Select media start node', 'Limit the media library to a specific start node']
  }

  public static readonly userGroupDefaultPermissionsSettings = {
    0: ['Permissions', 'Assign permissions for actions']
  }

  public static readonly userGroupGranularPermissionsSettings = {
    0: ['Documents', 'Assign permissions to specific documents']
  }

  public static readonly userGroupPermissionsSettings = {
    0: ['Read', 'Allow access to read a Document', 'Umb.Document.Read'],
    1: ['Create Document Blueprint', 'Allow access to create a Document Blueprint', 'Umb.Document.CreateBlueprint'],
    2: ['Delete', 'Allow access to delete a Document', 'Umb.Document.Delete'],
    3: ['Create', 'Allow access to create a Document', 'Umb.Document.Create'],
    4: ['Notifications', 'Allow access to setup notifications for Documents', 'Umb.Document.Notifications'],
    5: ['Publish', 'Allow access to publish a Document', 'Umb.Document.Publish'],
    6: ['Set permissions', 'Allow access to change permissions for a Document', 'Umb.Document.Permissions'],
    7: ['Unpublish', 'Allow access to unpublish a Document', 'Umb.Document.Unpublish'],
    8: ['Update', 'Allow access to save a Document', 'Umb.Document.Update'],
    9: ['Duplicate', 'Allow access to copy a Document', 'Umb.Document.Duplicate'],
    10: ['Move to', 'Allow access to move a Document', 'Umb.Document.Move'],
    11: ['Sort children', 'Allow access to change the sort order for Documents', 'Umb.Document.Sort'],
    12: ['Culture and Hostnames', 'Allow access to assign culture and hostnames', 'Umb.Document.CultureAndHostnames'],
    13: ['Public Access', 'Allow access to set and change access restrictions for a Document', 'Umb.Document.PublicAccess'],
    14: ['Rollback', 'Allow access to roll back a Document to a previous state', 'Umb.Document.Rollback'],
    15: ['UI Read', 'Allow access to read Document property values in the UI', 'Umb.Document.PropertyValue.Read'],
    16: ['UI Write', 'Allow access to write Document property values from the UI', 'Umb.Document.PropertyValue.Write'],
  }

  public static readonly userGroupSectionsSettings = {
    0: ['Content', 'Umb.Section.Content'],
    1: ['Forms', 'Umb.Section.Forms'],
    2: ['Media', 'Umb.Section.Media'],
    3: ['Members', 'Umb.Section.Members'],
    4: ['Packages', 'Umb.Section.Packages'],
    5: ['Settings', 'Umb.Section.Settings'],
    6: ['Translation', 'Umb.Section.Translation'],
    7: ['Users', 'Umb.Section.Users'],
  }

  public static readonly trashDeleteDialogMessage = {
    referenceHeadline: 'The following items depend on this',
    bulkReferenceHeadline: 'The following items are used by other content.'
  }

  public static readonly webhookEvents = [
    {
      "eventName": "Content Deleted",
      "eventType": "Content",
      "alias": "Umbraco.ContentDelete"
    },
    {
      "eventName": "Content Published",
      "eventType": "Content",
      "alias": "Umbraco.ContentPublish"
    },
    {
      "eventName": "Content Unpublished",
      "eventType": "Content",
      "alias": "Umbraco.ContentUnpublish"
    },
    {
      "eventName": "Media Deleted",
      "eventType": "Media",
      "alias": "Umbraco.MediaDelete"
    },
    {
      "eventName": "Media Saved",
      "eventType": "Media",
      "alias": "Umbraco.MediaSave"
    }
  ]
}