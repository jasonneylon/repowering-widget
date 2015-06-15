import m from 'mithril';

class ViewModel {
	  constructor(server, projectId) { 
	    this.project = new Project({"funds_raised": "loading..."});
	    this.url = `${server}/projects/${projectId}`;
	  }
	  
	  loadProject() {
		  return m.request({method: "GET", dataType: "jsonp", url: `${this.url}/status`})
		  	.then((data) => { 
					this.project = new Project(data);
	  		}
	  	);
	  }
}

class Project {
	constructor(data) {
	  this.fundsRaised = m.prop(data["funds_raised"]);		
	}
}


class Widget {
	constructor(server, projectId) {
	  this.vm = new ViewModel(server, projectId);
	  this.vm.loadProject();
	}

	view(ctrl) {
		return [
			m("h1", this.vm.project.fundsRaised()),
			m("a", {href: this.vm.url}, "Invest!")
		];
	}
}

export default Widget;