import { storiesOf } from "@storybook/react";
import React from "react";
import { Button, ButtonAppearance } from "./";
import { glyphFactory, SVGGlyph } from "../../assets/svg-element";

storiesOf("Button", module)
    .add("Default", () => <Button>Button</Button>)
    .add("Anchor", () => <Button href="#">Anchor button</Button>)
    .add("Anchor - disabled", () => (
        <Button href="#" disabled={true}>
            Anchor button
        </Button>
    ))
    .add("Primary", () => (
        <Button appearance={ButtonAppearance.primary}>Primary Button</Button>
    ))
    .add("Primary - disabled", () => (
        <Button appearance={ButtonAppearance.primary} disabled={true}>
            Primary Button
        </Button>
    ))
    .add("Outline", () => (
        <Button appearance={ButtonAppearance.outline}>Outline Button</Button>
    ))
    .add("Outline - disabled", () => (
        <Button appearance={ButtonAppearance.outline} disabled={true}>
            Outline Button
        </Button>
    ))
    .add("Lightweight", () => (
        <Button appearance={ButtonAppearance.lightweight}>Lightweight Button</Button>
    ))
    .add("Lightweight - disabled", () => (
        <Button appearance={ButtonAppearance.lightweight} disabled={true}>
            Lightweight Button
        </Button>
    ))
    .add("Justified", () => (
        <Button appearance={ButtonAppearance.justified}>Justified Button</Button>
    ))
    .add("Justified - disabled", () => (
        <Button appearance={ButtonAppearance.justified} disabled={true}>
            Justified Button
        </Button>
    ))
    .add("Stealth - disabled", () => (
        <Button appearance={ButtonAppearance.stealth} disabled={true}>
            Justified Button
        </Button>
    ))
    .add("Before content", () => (
        <Button beforeContent={glyphFactory(SVGGlyph.user)}>Login</Button>
    ))
    .add("After content", () => (
        <Button afterContent={glyphFactory(SVGGlyph.download)}>Download</Button>
    ))
    .add("Before and after content - disabled", () => (
        <Button
            beforeContent={glyphFactory(SVGGlyph.user)}
            afterContent={glyphFactory(SVGGlyph.download)}
            disabled={true}
        >
            Do stuff
        </Button>
    ));
