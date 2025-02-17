import {
    applyFocusVisible,
    directionSwitch,
    format,
} from "@microsoft/fast-jss-utilities";
import { DesignSystem, withDesignSystemDefaults } from "../design-system";
import { AutoSuggestOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { height, horizontalSpacing } from "../utilities/density";
import {
    neutralFillStealthHover,
    neutralFillStealthRest,
    neutralFillStealthSelected,
    neutralFocus,
    neutralForegroundRest,
} from "../utilities/color";
import { ComponentStyles, ComponentStyleSheet } from "@microsoft/fast-jss-manager";
import { applyScaledTypeRamp } from "../utilities/typography";
import { Direction, ellipsis, toPx } from "@microsoft/fast-jss-utilities";
import { applyCornerRadius, applyFocusPlaceholderBorder } from "../utilities/border";
import { applyCursorDefault } from "../utilities/cursor";
import { applyDisabledState } from "../utilities/disabled";
import { designUnit } from "../utilities/design-system";
import {
    HighContrastColor,
    highContrastDisabled,
    highContrastSelection,
    highContrastSelector,
    highContrastStealth,
} from "../utilities/high-contrast";

const styles: ComponentStyles<AutoSuggestOptionClassNameContract, DesignSystem> = {
    autoSuggestOption: {
        "list-style-type": "none",
        height: height(),
        display: "grid",
        "grid-template-columns": directionSwitch(
            format("{0} auto auto 1fr {0}", horizontalSpacing()),
            format("{0} 1fr auto auto {0}", horizontalSpacing())
        ),
        "grid-template-rows": "auto",
        "align-items": "center",
        padding: "0",
        margin: format("0 {0}", toPx(designUnit)),
        "white-space": "nowrap",
        overflow: "hidden",
        ...applyCursorDefault(),
        color: neutralForegroundRest,
        ...applyScaledTypeRamp("t7"),
        background: neutralFillStealthRest,
        ...applyCornerRadius(),
        ...applyFocusPlaceholderBorder(),
        ...applyFocusVisible<DesignSystem>({
            "border-color": neutralFocus,
            [highContrastSelector]: {
                background: HighContrastColor.selectedBackground,
                color: HighContrastColor.selectedText,
            },
        }),
        "&:hover": {
            background: neutralFillStealthHover,
            ...highContrastSelection,
        },
        ...highContrastStealth,
    },
    autoSuggestOption_contentRegion: {
        "grid-column-start": "3",
        overflow: "hidden",
        ...ellipsis(),
    },
    autoSuggestOption__disabled: {
        ...applyDisabledState(),
        ...highContrastDisabled,
        "&:hover": {
            background: neutralFillStealthRest,
            ...highContrastDisabled,
        },
    },
    autoSuggestOption__selected: {
        background: neutralFillStealthSelected,
        "&:hover": {
            background: neutralFillStealthSelected,
            ...highContrastSelection,
        },
    },
};

export default styles;
