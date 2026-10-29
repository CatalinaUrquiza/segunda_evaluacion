module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: ["tests/**/*.spec.js"],
    reporters: ["progress"],
    browsers: ["Chrome"],
    singleRun: true,
  });
};