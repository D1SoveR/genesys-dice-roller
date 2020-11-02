import * as React from "react";

type NavButtonProps = { toggleCallback?: (expanded: boolean) => void };

/**
 * Component used to indicate the controls for bringing up the menu pane.
 * Handles user clicks, animating appropriately when the menu is opened, changing two lines
 * of the burger into a cross, and hiding the third one, or reverting when the menu pane is hidden.
 */
export default class NavButton extends React.PureComponent<NavButtonProps, { expanded: boolean }> {

    constructor(props: NavButtonProps) {
        super(props);
        this.state = { expanded: false };
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Handler for user interaction of clicking on the nav button;
     * it toggles the expanded state, and if callback has been provided
     * for the component, runs it with new expansion state.
     */
    handleClick(): void {
        const newState = !this.state.expanded;
        this.setState({ expanded: newState });
        if (this.props.toggleCallback) {
            this.props.toggleCallback(newState);
        }
    }

    /**
     * Component renderer, creates base SVG element with three horizontal lines within.
     */
    render() {

        const lines = [2, 5, 8].map(y => <line x1="1.5" y1={y} x2="8.5" y2={y} />);

        return <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            className={`nav-button ${this.state.expanded ? "expanded" : ""}`}
            style={{ strokeWidth: 1.5, strokeLinecap: "round" }}
            onClick={this.handleClick}
        >{lines}</svg>;
    }
}
