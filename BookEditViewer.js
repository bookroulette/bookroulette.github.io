class BookEditViewer
{
	constructor(booklistviewer)
	{
		this.book = null;
		
		this.booklistviewer = booklistviewer;
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
	
	eventSubmitEditBook = (event) =>
	{
		var book = {};
		
		var form = event.target.parentNode;
		
		// Iterate through all inputs
		for (var i = 0; i < form.children.length; i++) {
			var child = form.children[i];

			// Check if the child is an input element of type text
			if (child.tagName === 'INPUT' && child.type === 'text') {
				if(child.id == "id")
					book[child.id] = parseInt(child.value, 10);
				else
					book[child.id] = child.value;
			}
		}
		
		this.booklistviewer.UpdateBook(book.id, book);
		
		this.Close();
	}
	
	eventSubmitAddBook = (event) =>
	{
		var book = {};
		
		var form = event.target.parentNode;
		
		// Iterate through all inputs
		for (var i = 0; i < form.children.length; i++) {
			var child = form.children[i];

			// Check if the child is an input element of type text
			if (child.tagName === 'INPUT' && child.type === 'text') {
				if(child.id == "id")
					book[child.id] = parseInt(child.value, 10);
				else
					book[child.id] = child.value;
			}
		}
		
		this.booklistviewer.AddBook(book);
		
		this.Close();
	}
	
	Close()
	{
		var container = document.querySelector('.BookEditViewer');
		
		// Remove all children from the container
		while(container.firstChild) {
			container.removeChild(container.firstChild);
		}
		
		container.style.width = "0%";
		container.style.height = "0%";
	}
	
	Draw(book = {}, isNewBook = false)
	{
		var container = document.querySelector('.BookEditViewer');
		
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
			<label>Id:</label>
			<input type="text" id="id" name="id" value="` + book.id + `">
			
			<label>Title:</label>
			<input type="text" id="title" name="title" value="` + book.title + `">
			
			<label>Image:</label>
			<input type="text" id="image" name="image" value="` + book.image + `">
			
			<label>Author:</label>
			<input type="text" id="author" name="author" value="` + book.author + `">
			
			<label>ISBN:</label>
			<input type="text" id="isbn" name="isbn" value="` + book.isbn + `">
		`;
		inputBook.innerHTML = template;
		
		// Submit
		const input_submit = document.createElement('input');
		input_submit.type = "submit";
		input_submit.value = "Submit";
		
		if(isNewBook)
			input_submit.addEventListener("click", this.eventSubmitAddBook);
		else
			input_submit.addEventListener("click", this.eventSubmitEditBook);
		
		inputBook.appendChild(input_submit);
		
		container.appendChild(inputBook);
	}
}
