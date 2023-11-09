class BookListViewer
{
	constructor()
	{
		this.books = [];
		
		this.bookaddviewer = new BookAddViewer(this);
		
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
		const apiUrl = 'http://10.10.10.112/bookroulette/test2/data.json';

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
	eventAddBook = () => {
		console.log("Add button clicked!");
		
		this.bookaddviewer.Draw();
	}
	
	AddBook(book)
	{
		this.books.push(book);
		this.Draw();
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
			const newBook = document.createElement('div');
			newBook.innerHTML += "<img src=\"images/" + book.image + "\" alt=\"Item Image\" class=\"image\">";
			grid.appendChild(newBook);
		});
		
		const addBook = document.createElement('div');
		addBook.innerHTML += "<img src=\"images/add.png\" alt=\"Item Image\" class=\"image\">";
		addBook.addEventListener("click", this.eventAddBook);
		grid.appendChild(addBook);
		
		container.appendChild(grid);
		
		this.calcContainerColumns();
	}
}
