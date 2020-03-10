export const isValidEmail = () => `Email Address is not valid`;

export const isRequired = fieldName => `${fieldName} is required`;

export const mustMatch = otherFieldName => {
  return fieldName => `${fieldName} must match ${otherFieldName}`;
};

export const phoneno = fieldName => `Enter a valid ${fieldName}`;

export const requiredByCheckBox = otherFieldName => {
  return fieldName => `${fieldName} is required.`;
};

export const requiredByArray = otherFieldName => {
  return fieldName => `${fieldName} is required.`;
};
