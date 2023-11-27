class BookViewer
{
	constructor()
	{
		this.book = {};
	}
	
	SetBook(book)
	{
		this.book = book;
	}
	
	/*
		Event
	*/
	eventClick = (event) =>
	{
		event.stopPropagation();
	}
	
	eventClickClose = (event) =>
	{
		this.Close();
	}
	
	Close()
	{
		var container = document.querySelector('.BookViewer');
		
		// Remove all children from the container
		while(container.firstChild) {
			container.removeChild(container.firstChild);
		}
		
		container.style.width = "0%";
		container.style.height = "0%";
	}
	
	Draw()
	{
		var container = document.querySelector('.BookViewer');
		
		container.addEventListener("click", this.eventClickClose);
		
		// Remove all children from the container
		while(container.firstChild) {
			container.removeChild(container.firstChild);
		}
		
		var body = document.body,
		    html = document.documentElement;

		var pageHeight = Math.max( body.scrollHeight, body.offsetHeight, 
							   html.clientHeight, html.scrollHeight, html.offsetHeight );
		
		container.style.width = "100%";
		container.style.height = pageHeight + "px";
		
		const inputBook = document.createElement('div');
		inputBook.addEventListener("click", this.eventClick);
		
		var template = `
			<img src="` + this.book.image + `" />
		`;
		inputBook.innerHTML = template;
		
		container.appendChild(inputBook);
	}
}
