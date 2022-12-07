import Blockly from "blockly/core";
import { registerRestrictions } from "../../../restrictions";

const blockName = "jg_jimp_opacity";

const blockData = {
    "message0": "Opacity level %1",
    "args0": [
        {
            "type": "input_value",
            "name": "val",
            "check": ["Number", "var", "Env"]
        }
    ],
    "colour": 260,
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "Multiplies the opacity channel by the number. Goes from 0 to 100. Can only use Numbers, Variables, or Env secrets.",
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
    const val = Blockly.JavaScript.valueToCode(block, "val", Blockly.JavaScript.ORDER_ATOMIC);
    return `await image.opacity( Number( (` + val + `) / 100 ) )
`;
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