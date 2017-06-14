import React, { PropTypes } from 'react';
import TinyMCE from 'react-tinymce';

const TextEditor = ({ document, onChange }) => {
  return (
    <div>
    <TinyMCE
      content={document.content}
      config={{
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
      }}
      onChange={onChange}
    />
    </div>);
};
TextEditor.propTypes = {
  document: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
export default TextEditor;
