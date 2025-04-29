import { Component } from './component.js';

export class Home extends Component {
    constructor() {
        super('section', 'Home');
    }

    render() {
        const container = this.createElement({
            tag: 'div',
            className: 'Home__Container',
        });
        this.appendChild(container);

        const navBar = this.createElement({
            tag: 'div',
            className: 'Home__NavBar',
        });
        container.appendChild(navBar);

        navBar.appendChild(
            this.createElement({
                tag: 'p',
                className: 'Home__Logo',
                content: 'Bean Scene',
            })
        );

        const menuBar = this.createElement({
            tag: 'div',
            className: 'Home__MenuBar',
        });
        navBar.appendChild(menuBar);

        ['Home', 'Menu', 'About', 'Contact'].forEach((text) => {
            menuBar.appendChild(
                this.createElement({
                    tag: 'p',
                    className: 'Home__Button',
                    content: text,
                })
            );
        });
    }
}
