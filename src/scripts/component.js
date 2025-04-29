export class Component {
    constructor(tag = 'section', className = '') {
        this.element = document.createElement(tag);
        this.element.className = className;
        document.body.appendChild(this.element);
    }

    createElement({ tag, className = '', content = '', src = '' }) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        if (src) element.src = src;
        return element;
    }

    appendChild(child) {
        this.element.appendChild(child);
    }
}