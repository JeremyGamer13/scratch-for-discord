import Blockly from "blockly/core";
import { registerRestrictions } from "../../../restrictions";

const blockName = "jg_jimp_rotate";

const blockData = {
    "message0": "Rotate Image clockwise %1 degrees and %2",
    "args0": [
        {
            "type": "input_value",
            "name": "Rotate",
            "check": ["Number", "var", "Env"]
        },
        {
            "type": "field_dropdown",
            "name": "autoResize",
            "options": [
                [
                    "automatically resize",
                    'true'
                ],
                [
                    "do not automatically resize",
                    'false'
                ]
            ]
        }
    ],
    "colour": 260,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "Rotate the image clockwise a certain amount of degrees, and you can choose whether to automatically resize the image to fit the rotation, or not to. Can only use Numbers, Variables, or Env secrets.",
    "helpUrl": ""
};

Blockly.Blocks[blockName] = {
    init: function () {
        this.jsonInit(blockData);
        this.setColour("#ff0000")
        this.setTooltip("This block is now unsupported. We recommend switching to a newer block found in the toolbox. - " + this.tooltip)
    }
};

Blockly.JavaScript[blockName] = function (block) {
    const degrees = Blockly.JavaScript.valueToCode(block, "Rotate", Blockly.JavaScript.ORDER_ATOMIC);
    const autoResize = block.getFieldValue("autoResize");
    return `await image.rotate( Number(` + degrees + `), ` + autoResize + ` )\n`;
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