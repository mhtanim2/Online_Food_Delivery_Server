const path = require('path');
const fs = require('fs');

const getUserImageService = (req) => {
  const { filename } = req.params;

  const rootPath = path.resolve();
  const fullfilepath = path.join(
    rootPath,
    `src/uploads/images/products/${filename}`,
  );

  // check if file exists
  try {
    fs.accessSync(fullfilepath);
    return { status: 'Success', data: fullfilepath };
  } catch (err) {
    return { status: 'Error', error: err.toString() };
  }
};

module.exports = getUserImageService;
