class BookAddViewer
{
	constructor(booklistviewer)
	{
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
	
	eventSubmit = (event) =>
	{
		console.log("Submit!");
		
		var book = {};
		
		var form = event.target.parentNode;
		
		// Iterate through all inputs
		for (var i = 0; i < form.children.length; i++) {
			var child = form.children[i];

			// Check if the child is an input element of type text
			if (child.tagName === 'INPUT' && child.type === 'text') {
				book[child.id] = child.value;
			}
		}
		
		this.booklistviewer.AddBook(book);
		
		this.Close();
	}
	
	Close()
	{
		var container = document.querySelector('.BookAddViewer');
		
		// Remove all children from the container
		while(container.firstChild) {
			container.removeChild(container.firstChild);
		}
		
		container.style.width = "0%";
		container.style.height = "0%";
	}
	
	Draw()
	{
		var container = document.querySelector('.BookAddViewer');
		
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
			<input type="text" id="id" name="id" value="1337">
			
			<label>Title:</label>
			<input type="text" id="title" name="title" value="lol">
			
			<label>Image:</label>
			<input type="text" id="image" name="image" value="gamespy.png">
			
			<label>Author:</label>
			<input type="text" id="author" name="author" value="WTF">
			
			<label>ISBN:</label>
			<input type="text" id="isbn" name="isbn" value="1234">
		`;
		inputBook.innerHTML = template;
		
		// Submit
		const input_submit = document.createElement('input');
		input_submit.type = "submit";
		input_submit.value = "Submit";
		input_submit.addEventListener("click", this.eventSubmit);
		inputBook.appendChild(input_submit);
		
		container.appendChild(inputBook);
	}
}
