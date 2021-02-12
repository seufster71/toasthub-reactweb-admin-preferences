import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormBuilder from '../../coreView/common/form-builder';

export default function PreferenceModifyView({itemState, appPrefs, onSave, onCancel, inputChange}) {
	let formName = "ADMIN_PREFERENCE_FORM";
	let formTitle = "Preferences";
	let formGroup = "FORM1";
	
    if (itemState.subType === "FORM") {
    	formName = "ADMIN_FORMFIELD_FORM";
    	formTitle = "Formfields";
    	formGroup = "FORM1";
    } else if (itemState.subType === "LABEL") {
    	formName = "ADMIN_LABEL_FORM";
    	formTitle = "Labels";
    	formGroup = "FORM1";
    } else if (itemState.subType === "TEXT") {
    	formName = "ADMIN_TEXT_FORM";
    	formTitle = "Texts";
    	formGroup = "FORM1";
    } else if (itemState.subType === "OPTION") {
    	formName = "ADMIN_OPTION_FORM";
    	formTitle = "Options";
    	formGroup = "FORM1";
    }
    
    return (
	    <FormBuilder itemState={itemState} formName={formName} formTitle={formTitle} formGroup={formGroup} 
	    appPrefs={appPrefs} onSave={onSave} onCancel={onCancel} inputChange={inputChange}/>
	);
}


PreferenceModifyView.propTypes = {
  itemState: PropTypes.object.isRequired,
  appPrefs: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  viewType: PropTypes.string
};
