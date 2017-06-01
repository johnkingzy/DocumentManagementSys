import React, { PropTypes } from 'react';
import TinyMCE from 'react-tinymce-input';

const TINYMCE_CONFIG = {
  language: 'en',
  theme: 'modern',
  toolbar: 'bold italic underline strikethrough hr | bullist numlist | link unlink | undo redo | spellchecker code',
  menubar: false,
  statusbar: true,
  resize: true,
  plugins: 'link,spellchecker,paste',
  theme_modern_toolbar_location: 'top',
  theme_modern_toolbar_align: 'left'
};
const TextEditor = ({ document, onChange }) => {
  return (
    <div>
        <TinyMCE
            value={document.content}
            tinymceConfig={TINYMCE_CONFIG}
            onChange={onChange}
            />
    </div>);
};
TextEditor.propTypes = {
  document: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
export default TextEditor;
