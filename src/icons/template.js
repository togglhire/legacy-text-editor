const typescriptTemplate = (code, config, state) => {
  return (
    `import * as React from "react"\n\n` +
    `export const ${state.componentName} = (props: any) => ${code}`
  );
};

module.exports = typescriptTemplate;
