import React, { PropTypes } from 'react';
import TinyMCE from 'react-tinymce';

const TextEditor = ({ document, onChange, error, onFocus }) => {
  return (
    <div>
    <TinyMCE
      content={document.content}
      config={{
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
      }}
      onChange={onChange}
      onFocus={onFocus}
    />
    { error && <span className="red-text">{error}</span> }
    </div>);
};
TextEditor.propTypes = {
  document: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};
export default TextEditor;
