import { DialogClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { classNames, keyCodeEscape } from "@microsoft/fast-web-utilities";
import { canUseDOM } from "exenv-es6";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import { DialogHandledProps, DialogProps, DialogUnhandledProps } from "./dialog.props";

class Dialog extends Foundation<DialogHandledProps, DialogUnhandledProps, {}> {
    public static defaultProps: Partial<DialogProps> = {
        contentHeight: "480px",
        contentWidth: "640px",
        visible: false,
        managedClasses: {},
    };

    public static displayName: string = `${DisplayNamePrefix}Dialog`;

    protected handledProps: HandledProps<DialogHandledProps> = {
        describedBy: void 0,
        label: void 0,
        labelledBy: void 0,
        contentWidth: void 0,
        contentHeight: void 0,
        modal: void 0,
        managedClasses: void 0,
        onDismiss: void 0,
        visible: void 0,
    };

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        const {
            dialog_positioningRegion,
            dialog_contentRegion,
        }: DialogClassNameContract = this.props.managedClasses;

        return (
            <div
                {...this.unhandledProps()}
                className={this.generateClassNames()}
                aria-hidden={!this.props.visible}
            >
                <div className={classNames(dialog_positioningRegion)}>
                    {this.renderModalOverlay()}
                    <div
                        role="dialog"
                        tabIndex={-1}
                        className={classNames(dialog_contentRegion)}
                        style={{
                            height: this.props.contentHeight,
                            width: this.props.contentWidth,
                        }}
                        aria-describedby={this.props.describedBy}
                        aria-labelledby={this.props.labelledBy}
                        aria-label={this.props.label}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * React life-cycle method
     */
    public componentDidMount(): void {
        if (canUseDOM() && this.props.onDismiss) {
            window.addEventListener("keydown", this.handleWindowKeyDown);
        }
    }

    /**
     * React life-cycle method
     */
    public componentDidUpdate(prevProps: Partial<DialogHandledProps>): void {
        if (canUseDOM()) {
            if (!prevProps.onDismiss && this.props.onDismiss) {
                window.addEventListener("keydown", this.handleWindowKeyDown);
            } else if (prevProps.onDismiss && !this.props.onDismiss) {
                window.removeEventListener("keydown", this.handleWindowKeyDown);
            }
        }
    }

    /**
     * React life-cycle method
     */
    public componentWillUnmount(): void {
        if (canUseDOM() && this.props.onDismiss) {
            window.removeEventListener("keydown", this.handleWindowKeyDown);
        }
    }

    /**
     * Generates class names
     */
    protected generateClassNames(): string {
        return super.generateClassNames(classNames(this.props.managedClasses.dialog));
    }

    /**
     * Renders the modal overlay
     */
    private renderModalOverlay(): React.ReactElement<HTMLDivElement> {
        if (!this.props.modal) {
            return;
        }

        return (
            <div
                className={classNames(this.props.managedClasses.dialog_modalOverlay)}
                onClick={this.handleOverlayClick}
                role={"presentation"}
                tabIndex={-1}
            />
        );
    }

    private handleOverlayClick = (event: React.MouseEvent): void => {
        if (
            this.props.onDismiss &&
            typeof this.props.onDismiss === "function" &&
            this.props.visible
        ) {
            this.props.onDismiss(event);
        }
    };

    private handleWindowKeyDown = (event: KeyboardEvent): void => {
        if (
            this.props.onDismiss &&
            typeof this.props.onDismiss === "function" &&
            this.props.visible &&
            event.keyCode === keyCodeEscape
        ) {
            this.props.onDismiss(event);
        }
    };
}

export default Dialog;
export * from "./dialog.props";
export { DialogClassNameContract };
