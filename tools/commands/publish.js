/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var FileUtil = require('../lib/FileUtil');
var CopyFiles = require('../actions/CopyFiles');
var exml = require("../actions/exml");
var CompileProject = require('../actions/CompileProject');
var CompileTemplate = require('../actions/CompileTemplate');
var Publish = (function () {
    function Publish() {
    }
    Publish.prototype.execute = function () {
        var options = egret.args;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) {
            utils.exit(10015, options.projectDir);
        }
        options.minify = true;
        options.publish = true;
        utils.clean(options.releaseDir);
        exml.beforeBuild();
        var compileProject = new CompileProject();
        exml.build();
        var result = compileProject.compileProject(options);
        if (result.exitStatus)
            return result.exitStatus;
        utils.minify(options.out, options.out);
        CopyFiles.copyProjectFiles();
        exml.afterBuild();
        CompileTemplate.compileTemplates(options, result.files);
        return result.exitStatus;
    };
    return Publish;
})();
module.exports = Publish;

//# sourceMappingURL=../commands/publish.js.map