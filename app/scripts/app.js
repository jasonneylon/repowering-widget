import m from 'mithril';
import Widget from './widget';

let me = document.querySelector('script[data-project-id][data-name="repowering-widget"]');
let projectId = me.getAttribute('data-project-id');
let server = me.getAttribute('data-server') || "http://www.repowering.org.uk/";

console.log("Starting widget..");
document.write('<div id="repowering-widget">Repowering widget goes here</div>');

m.module(document.getElementById("repowering-widget"), new Widget(server, projectId));
