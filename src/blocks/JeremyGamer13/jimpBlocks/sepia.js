import Blockly from "blockly/core";
import { registerRestrictions } from "../../../restrictions";

const blockName = "jg_jimp_sepia";

const blockData = {
    "message0": "Sepia Effect",
    "args0": [],
    "colour": 260,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "Adds a warm brown color on the image.",
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
    return `await image.sepia()\n`;
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