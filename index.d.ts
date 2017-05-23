/// <reference types="react" />
import * as React from 'react';
export interface Props {
    globalPositioned?: boolean;
    handlerClassName: string;
    itemElementsClassName: string;
}
export interface State {
    opened: boolean;
    highlight: boolean;
}
export declare class UIDropdown extends React.Component<Props, State> {
    state: State;
    private shouldComponentUpdate(nextProps, nextState);
    private handlerElement;
    private itemElements;
    private clickOutside;
    private pressEscape;
    private clickHandler;
    private clickItemElement;
    private removeClickOutsideListeners();
    private addClickOutsideListeners();
    private removeEscListener();
    private addEscListener();
    private removeClickHandlerListeners();
    private addClickHandlerListeners();
    private removeClickOnElementListeners();
    private addClickOnElementListeners();
    private componentWillUnmount();
    private componentDidMount();
    private componentDidUpdate();
    private dropdownToggleHandler();
    private dropdownCloseHandler();
    private getDropdownClassName();
    render(): JSX.Element;
}
