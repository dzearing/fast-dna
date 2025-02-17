import React from "react";
import ReactDOM from "react-dom";
import { ComponentStyles, JSSManager } from "@microsoft/fast-jss-manager-react";
import { Canvas } from "../src/canvas";
import { Container } from "../src/container";
import { Row, RowResizeDirection } from "../src/row";
import { Pane, PaneResizeDirection } from "../src/pane";
import { Page } from "../src/page";
import { Grid } from "../src/grid";
import { Column, ColumnClassNamesContract } from "../src/column";
import { create } from "jss";
import jssNested from "jss-plugin-nested";

const jssInstance: ReturnType<create> = create();
jssInstance.use(jssNested());

JSSManager.jss = jssInstance;

const columnTestStyles: ComponentStyles<ColumnClassNamesContract, undefined> = {
    column: {
        "background-color": `rgba(0, 120, 212, 0.2)`,
        border: `2px solid rgba(0, 120, 212, 0.2)`,
        "min-height": "30px",
        margin: "4px 0",
    },
};

/**
 * Create the root node
 */
const root: HTMLElement = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

function renderIfEnabled(
    isEnabled: boolean,
    renderFunction: () => JSX.Element
): JSX.Element {
    return isEnabled ? renderFunction() : null;
}

function render(): void {
    const renderColumnA: boolean = true;
    const renderColumnB: boolean = false;

    ReactDOM.render(
        <React.Fragment>
            <Container>
                <Row
                    resizable={true}
                    resizeFrom={RowResizeDirection.south}
                    minHeight={50}
                    style={{ background: "#CCC" }}
                />
                <Row fill={true}>
                    <Pane
                        resizable={true}
                        resizeFrom={PaneResizeDirection.east}
                        style={{ background: "#E6E6E6" }}
                    />
                    <Canvas>
                        <Page>
                            <Grid key={"breakpoint-specific-spans"} row={1}>
                                <Column jssStyleSheet={columnTestStyles} span={12} />
                                <Column
                                    jssStyleSheet={columnTestStyles}
                                    span={[12, 6, 6, 4]}
                                    row={2}
                                />
                                <Column
                                    jssStyleSheet={columnTestStyles}
                                    span={[12, 6, 6, 4]}
                                    row={[3, 2]}
                                    position={[1, 7, 7, 5]}
                                />
                                <Column
                                    jssStyleSheet={columnTestStyles}
                                    span={[12, 12, 12, 4]}
                                    row={[4, 3, 3, 2]}
                                    position={[1, 1, 1, 9]}
                                />
                                {renderColumnA && (
                                    <Column
                                        jssStyleSheet={columnTestStyles}
                                        span={[12, 6, 6, 4]}
                                    >
                                        A
                                    </Column>
                                )}
                                {renderIfEnabled(renderColumnB, () => (
                                    <Column
                                        jssStyleSheet={columnTestStyles}
                                        span={[12, 12, 12, 4]}
                                        row={[4, 3, 3, 2]}
                                        position={[1, 1, 1, 9]}
                                    >
                                        B
                                    </Column>
                                ))}
                            </Grid>
                        </Page>
                    </Canvas>
                    <Pane collapsed={true} style={{ background: "#E1E1E1" }} />
                </Row>
                <Row
                    resizable={true}
                    resizeFrom={RowResizeDirection.north}
                    minHeight={50}
                    style={{ background: "#CCC" }}
                />
            </Container>
        </React.Fragment>,
        root
    );
}

render();
