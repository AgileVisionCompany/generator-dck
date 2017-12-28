import React from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

function getValidationState(validation) {
  if (validation === null) {
    return null;
  }

  if (validation.valid) {
    return "success";
  } else {
    return "error";
  }
}

function FieldGroup({
  id,
  label,
  help,
  validationState,
  validationMessage,
  ...props
}) {
  return (
    <FormGroup
      controlId={id}
      validationState={getValidationState(validationState)}
    >
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      {validationMessage &&
        validationState &&
        !validationState.valid && <HelpBlock>{validationMessage}</HelpBlock>}
    </FormGroup>
  );
}

export default FieldGroup;
