export const initRule = (field, name, ...validations) => {
    return (state, props) => {
      for (let v  of validations) {
        let errorMessageFunc = v(state[field], state, props);
        if (errorMessageFunc) {
          return {[field]: errorMessageFunc(name)};
        }
      }
      return null;
    };
  };
  
  export const executeRules = (state, runners, props = {}) => {
    return runners.reduce((memo, runner) => {
      return Object.assign(memo, runner(state, props));
    }, {});
  };