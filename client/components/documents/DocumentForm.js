import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';
import options from '../../data/options';

const DocumentForm = (
  {
    documents,
    onSave,
    onChange,
    clearError,
    loading,
    errors,
    labelclass
  }
) => {
  return (
    <form className="col s12" onSubmit={onSave} method="post">
              <div className="row">
                <TextInput
                id="title"
                type="text"
                name="title"
                className="input-field col m12 s12"
                onChange={onChange}
                onFocus={clearError}
                value={documents.title}
                errors={errors}
                label="Title"
                labelclass={labelclass}
                />
                </div>
                <div className="row">
                <TextArea
                id="content"
                type="text"
                name="content"
                className="materialize-textarea"
                onChange={onChange}
                onFocus={clearError}
                value={documents.content}
                errors={errors}
                labelclass={labelclass}
                label="Content"
                />
              </div>
              <div className="row">
                <SelectInput
                id="access"
                name="access"
                onChange={onChange}
                options={options}
                error={errors}
                value={documents.access}
                label="Privacy"
                />
              </div>
              <button
            type="submit"
            name="btn_login"
            className="col s12 btn btn-large waves-effect light-blue darken-3"
            disabled={loading}
          >
            Post
          </button>
      </form>
  );
};

DocumentForm.propTypes = {
  createDocument: PropTypes.func,
  documents: PropTypes.object,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  clearError: PropTypes.func,
  labelclass: PropTypes.string
};
export default DocumentForm;
