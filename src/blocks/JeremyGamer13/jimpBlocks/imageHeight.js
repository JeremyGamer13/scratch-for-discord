//"output": "Boolean",
import Blockly from "blockly/core";
import { registerRestrictions } from "../../../restrictions";

const blockName = "jg_jimp_height";

const blockData = {
    "message0": "Height of image",
    "args0": [],
    "colour": 260,
    "output": "Number",
    "tooltip": "Returns the Height of the image.",
    "helpUrl": ""
};

Blockly.Blocks[blockName] = {
    init: function () {
        this.jsonInit(blockData);
        this.setColour("#ff0000")
        this.setTooltip("This block is now unsupported. We recommend switching to a newer block found in the toolbox. - " + this.tooltip)
    }
};

Blockly.JavaScript[blockName] = function () {
    const code = [`image.bitmap.height`, Blockly.JavaScript.ORDER_NONE];
    return code;
}

registerRestrictions(blockName, [
    {
        type: "hasparent",
        message: "RES_JGSAVEIMAGE",
        types: [
            "jg_beginJimp"
        ]
    }
]);