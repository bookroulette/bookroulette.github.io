class BookListViewer
{
	constructor()
	{
		this.books = [];
		
		this.bookeditviewer = new BookEditViewer(this);
		
		// Settings
		this.book_width = 300;
		
		// Events
		window.addEventListener("resize", (event) => {
			this.calcContainerColumns();
		});
	}
	
	LoadBooks()
	{
		// URL of the JSON data
		const apiUrl = 'data.json';

		// Fetch JSON data from the API endpoint
		fetch(apiUrl).then(
			response => {
				if (!response.ok)
				{
					throw new Error('Network response was not ok');
				}
				
				return response.json();
			}
		).then(
			data => {
				// Check if there are items in the data
				if (data.items && data.items.length > 0)
				{
					this.books = data.items;
					this.Draw();
				}
				else
				{
					console.error('No books found in the JSON data.');
				}
			}
		).catch(
			error => {
				console.error('Error fetching data:', error);
			}
		);
	}
	
	encodeBooks()
	{
		var obj = {
			items: this.books
		};
		
		return JSON.stringify(obj);
	}
	
	decodeBooks(jsonString)
	{
		const new_books = JSON.parse(jsonString);
		
		if(	new_books.hasOwnProperty("items") &&
			new_books.items.hasOwnProperty("length") &&
			new_books.items.length > 0)
		{
			this.books = new_books.items;
			this.Draw();
		}
	}
	
	calcContainerColumns()
	{
		var container = document.querySelector('.grid');
		
		var newgridTemplateColumns = "auto";
		
		for(var i = this.book_width; i < window.innerWidth - this.book_width; i+= this.book_width)
			newgridTemplateColumns += " auto";
		
		var total_books = Math.min(this.books.length + 1, Math.floor(window.innerWidth / this.book_width));
		container.style.width = (total_books * this.book_width) + "px";
		container.style.gridTemplateColumns = newgridTemplateColumns;
	}
	
	// Events
	eventOpenEditViewer = (event) =>
	{
		var divBook = event.target.parentNode;
		var id = parseInt(divBook.className, 10);
		
		var book = this.GetBook(id);
		
		this.bookeditviewer.Draw(book);
	}
	
	eventOpenEditViewerAddNew = () =>
	{
		var book = {
			id: this.GetNewBookId(),
			title: "",
			image: "images/unknown.png",
			author: "",
			isbn: ""
		};
		this.bookeditviewer.Draw(book, true);
	}
	
	eventDeleteBook = (event) =>
	{
		var divBook = event.target.parentNode;
		var id = parseInt(divBook.className, 10);
		
		this.RemoveBook(id);
	}
	
	eventErrorImage = (event) =>
	{
		event.target.src = "images/unknown.png";
	}
	
	AddBook(book)
	{
		this.books.push(book);
		this.Draw();
	}
	
	UpdateBook(id, updatedBook)
	{
		this.books = this.books.map(book => (book.id === id ? updatedBook : book));
		this.Draw();
	}
	
	RemoveBook(id)
	{
		this.books = this.books.filter(book => book.id !== id);
		this.Draw();
	}
	
	GetBook(id)
	{
		return this.books.find(book => book.id === id);
	}
	
	GetNewBookId()
	{
		return this.books.reduce((maxBook, currentBook) => (currentBook.id > maxBook.id ? currentBook : maxBook), { id: -1 }).id + 1;
	}
	
	Draw()
	{
		var container = document.querySelector('.BookListViewer');
		
		// Remove all children from the container
		while(container.firstChild) {
			container.removeChild(container.firstChild);
		}
		
		const grid = document.createElement('div');
		grid.className = "grid";
		
		this.books.forEach(book => {
			const divBook = document.createElement('div');
			divBook.className = book.id;
			
			const imgBook = document.createElement('img');
			imgBook.src = book.image;
			imgBook.addEventListener("error", this.eventErrorImage);
			divBook.appendChild(imgBook);
			
			// Edit
			const editBook = document.createElement('span');
			editBook.className = "material-symbols-outlined";
			editBook.textContent = "edit";
			editBook.addEventListener("click", this.eventOpenEditViewer);
			divBook.appendChild(editBook);
			
			// Delete
			const deleteBook = document.createElement('span');
			deleteBook.className = "material-symbols-outlined";
			deleteBook.textContent = "delete";
			deleteBook.style.color = "red";
			deleteBook.addEventListener("click", this.eventDeleteBook);
			divBook.appendChild(deleteBook);
			
			grid.appendChild(divBook);
		});
		
		const addBook = document.createElement('div');
		addBook.innerHTML += "<img src=\"images/add.png\" alt=\"Item Image\" class=\"image\">";
		addBook.addEventListener("click", this.eventOpenEditViewerAddNew);
		grid.appendChild(addBook);
		
		container.appendChild(grid);
		
		this.calcContainerColumns();
	}
}
