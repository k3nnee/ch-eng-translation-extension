import Widget from "./components/Widget.svelte";
import {writable} from "svelte/store";
import Sidebar from "./components/Sidebar.svelte";
import browser from "webextension-polyfill";

const bootstrap_css = document.createElement('link');
bootstrap_css.rel = 'stylesheet';
bootstrap_css.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
document.head.appendChild(bootstrap_css);

const icons_css = document.createElement('link');
icons_css.rel = 'stylesheet';
icons_css.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css';
document.head.appendChild(icons_css);

const highlighted = writable("");
const show = writable(false);

document.addEventListener("mouseup", (event) => {
    const highlighted_text = window.getSelection();

    highlighted.set(highlighted_text.toString());

    if(highlighted_text.toString().length > 0){
        const range = highlighted_text.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        render_widget(Math.round(rect.left), Math.round(rect.top));
    }else{
        const widget = document.getElementById('widget-container');
        widget.style.visibility = "hidden"
    }
});

const render_widget = (x, y) => {
    console.log(x, y);
    const widget = document.getElementById('widget-container');
    widget.style.visibility = "visible"
    widget.style.left = `${x}px`
    widget.style.top = `${y + 35}px`
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "iconClicked") {
        console.log("Extension icon clicked!");
        show.set(true);
    }
});

window.onload = () => {
    console.log("DOM script loaded!");
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'widget-container';
    widgetContainer.style.position = 'fixed';
    widgetContainer.style.bottom = `0px`;
    widgetContainer.style.left = `0px`;
    widgetContainer.style.zIndex = '9999';
    widgetContainer.style.visibility = "hidden";

    document.body.appendChild(widgetContainer);
    console.log("Creating new widget...")
    new Widget({
        target: widgetContainer,
        props: {
            highlighted_text: highlighted
        }
    });

    const sidebarContainer = document.createElement('div');
    const window_x = window.innerWidth;
    const window_y = window.innerHeight;

    sidebarContainer.id = 'sidebar-container';
    sidebarContainer.style.position = 'fixed';
    sidebarContainer.style.bottom = `0px`;
    sidebarContainer.style.right = `0px`;
    sidebarContainer.style.zIndex = '9999';
    sidebarContainer.style.visibility = "visible";
    sidebarContainer.style.height = `${706}px`;
    sidebarContainer.style.width = `${1482*.25}px`;


    document.body.appendChild(sidebarContainer);
    console.log("Creating new sidebar...")
    new Sidebar({
        target: sidebarContainer,
        props: {
            show: show
        }
    });
}
