var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.argument("projectName", {
      type: Object,
      required: false,
      default: null
    });
  }
  paths() {
    const currentDir = this.destinationRoot();
    if (this.options.projectName != null) {
      this.spawnCommand("mkdir", [this.options.projectName]);
      this.destinationRoot(currentDir + "/" + this.options.projectName);
    }
  }
  writing() {
    const temp = this.destinationRoot().split("/");
    this.projectName = temp[temp.length - 1];
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("./package.json"),
      {
        name: this.projectName
      }
    );
    this.fs.copy(this.templatePath("src"), this.destinationPath("./src"));
    this.fs.copy(this.templatePath("public"), this.destinationPath("./public"));
  }
  install() {
    this.spawnCommand("npm", ["install"]);
  }
};
