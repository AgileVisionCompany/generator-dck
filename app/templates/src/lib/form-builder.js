/**
 * Populates state for the field in the parent component
 * @param {*} that reference to the parent component
 * @param {*} name name of the field
 * @param {*} initialValue initial value of the field
 * @param {*} validator validator to be used for checking the field
 */
export function initField(that, name, initialValue, validator) {
  let field = {};
  field[name] = {
    value: initialValue,
    validation: null,
    validator: validator,
    onChange: e => {
      const field = { ...that.state[name] };
      field.value = e.target.value;

      let newState = {};
      newState[name] = field;
      that.setState(newState);

      validator(field.value).then(result => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        let updatedState = {};
        updatedState[name] = fieldState;
        that.setState(updatedState);
      });
    },
    validationCurrentValue: () => {
      const field = { ...that.state[name] };

      let newState = {};
      newState[name] = field;
      that.setState(newState);

      validator(field.value).then(result => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        let updatedState = {};
        updatedState[name] = fieldState;
        that.setState(updatedState);
      });
    },
    setValue: value => {
      const field = { ...that.state[name] };
      field.value = value;

      let newState = {};
      newState[name] = field;
      that.setState(newState);

      validator(field.value).then(result => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        let updatedState = {};
        updatedState[name] = fieldState;
        that.setState(updatedState);
      });
    }
  };

  return field;
}
