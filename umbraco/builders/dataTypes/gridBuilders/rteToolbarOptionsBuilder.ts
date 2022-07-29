import { GridRteBuilder } from './gridRteBuilder';

export class RteToolbarOptionsBuilder {
  parentBuilder;
  options;

  constructor(parentBuilder: GridRteBuilder) {
    this.parentBuilder = parentBuilder;
    this.options = [];
  }

  withSourceCodeEditor() {
    this.options.push('ace');
    return this;
  }

  withRemoveFormat() {
    this.options.push('removeformat');
  }

  withUndo() {
    this.options.push('undo');
    return this;
  }

  withRedo() {
    this.options.push('redo');
    return this;
  }

  withCut() {
    this.options.push('cut');
    return this;
  }

  withCopy() {
    this.options.push('copy');
    return this;
  }

  withPaste() {
    this.options.push('paste');
    return this;
  }

  withStyleSelect() {
    this.options.push('styleselect');
    return this;
  }

  withBold() {
    this.options.push('bold');
    return this;
  }

  withItalic() {
    this.options.push('italic');
    return this;
  }

  withUnderline() {
    this.options.push('underline');
    return this;
  }

  withStrikethrough() {
    this.options.push('strikethrough');
    return this;
  }

  withJustifyLeft() {
    this.options.push('alignleft');
    return this;
  }

  withJustifyCenter() {
    this.options.push('aligncenter');
    return this;
  }

  withJustifyRight() {
    this.options.push('alignright');
    return this;
  }

  withJustifyFull() {
    this.options.push('alignjustify');
    return this;
  }

  withBulletList() {
    this.options.push('bullist');
    return this;
  }

  withNumberedList() {
    this.options.push('numlist');
    return this;
  }

  withDecreaseIndent() {
    this.options.push('outdent');
    return this;
  }

  withIncreaseIndent() {
    this.options.push('indent');
    return this;
  }

  withInsertLink() {
    this.options.push('link');
    return this;
  }

  withRemoveLink() {
    this.options.push('unlink');
    return this;
  }

  withAnchor() {
    this.options.push('anchor');
    return this;
  }

  withImage() {
    this.options.push('umbmediapicker');
    return this;
  }

  withMacro() {
    this.options.push('umbmacro');
    return this;
  }

  withTable() {
    this.options.push('table');
    return this;
  }

  withEmbed() {
    this.options.push('umbembeddialog');
    return this;
  }

  withHorizontalRule() {
    this.options.push('hr');
    return this;
  }

  withSubscript() {
    this.options.push('subscript');
    return this;
  }

  withSuperscript() {
    this.options.push('superscript');
    return this;
  }

  withcharacterMap() {
    this.options.push('charmap');
    return this;
  }

  withRightToLeft() {
    this.options.push('rtl');
    return this;
  }

  withLeftToRight() {
    this.options.push('ltr');
    return this;
  }

  withFullScreen() {
    this.options.push('fullscreen');
    return this;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return this.options;
  }
}
