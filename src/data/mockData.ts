import { Book, Review, User } from '../types';

export const mockBooks: Book[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 12.99,
    coverImage: "https://images.pexels.com/photos/3747279/pexels-photo-3747279.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
    genre: ["Fiction", "Classic", "Historical"],
    publishDate: "1960-07-11",
    isbn: "978-0446310789",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 10.95,
    coverImage: "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A dystopian novel that explores the dangers of totalitarianism and mass surveillance.",
    genre: ["Fiction", "Classic", "Dystopian"],
    publishDate: "1949-06-08",
    isbn: "978-0451524935",
    rating: 4.7,
    inStock: true
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 9.99,
    coverImage: "https://images.pexels.com/photos/3747277/pexels-photo-3747277.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A novel that examines the corrupt American Dream during the Roaring Twenties.",
    genre: ["Fiction", "Classic"],
    publishDate: "1925-04-10",
    isbn: "978-0743273565",
    rating: 4.5,
    inStock: true
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 8.99,
    coverImage: "https://images.pexels.com/photos/3747270/pexels-photo-3747270.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A romantic novel of manners that depicts the emotional development of Elizabeth Bennet.",
    genre: ["Fiction", "Classic", "Romance"],
    publishDate: "1813-01-28",
    isbn: "978-0141439518",
    rating: 4.6,
    inStock: true
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 14.99,
    coverImage: "https://images.pexels.com/photos/3747271/pexels-photo-3747271.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A fantasy novel about the adventures of Bilbo Baggins, a hobbit who is swept into an epic quest.",
    genre: ["Fiction", "Fantasy"],
    publishDate: "1937-09-21",
    isbn: "978-0345534835",
    rating: 4.7,
    inStock: true
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 11.50,
    coverImage: "https://images.pexels.com/photos/3747281/pexels-photo-3747281.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The story of Holden Caulfield, a teenage boy dealing with issues of identity, belonging, and loss.",
    genre: ["Fiction", "Coming-of-age"],
    publishDate: "1951-07-16",
    isbn: "978-0316769488",
    rating: 4.3,
    inStock: true
  },
  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    price: 29.99,
    coverImage: "https://images.pexels.com/photos/3747276/pexels-photo-3747276.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "An epic high-fantasy novel that follows the quest to destroy the One Ring, which was created by the Dark Lord Sauron.",
    genre: ["Fiction", "Fantasy"],
    publishDate: "1954-07-29",
    isbn: "978-0618640157",
    rating: 4.9,
    inStock: true
  },
  {
    id: 8,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    price: 15.99,
    coverImage: "https://images.pexels.com/photos/3747263/pexels-photo-3747263.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The first novel in the Harry Potter series, featuring a young wizard's adventures at Hogwarts School of Witchcraft and Wizardry.",
    genre: ["Fiction", "Fantasy", "Young Adult"],
    publishDate: "1997-06-26",
    isbn: "978-1338878929",
    rating: 4.8,
    inStock: true
  },
  {
    id: 9,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    price: 13.50,
    coverImage: "https://images.pexels.com/photos/3747299/pexels-photo-3747299.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A mystery thriller novel that follows symbologist Robert Langdon as he investigates a murder in the Louvre Museum.",
    genre: ["Fiction", "Mystery", "Thriller"],
    publishDate: "2003-03-18",
    isbn: "978-0307474278",
    rating: 4.1,
    inStock: true
  },
  {
    id: 10,
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 12.25,
    coverImage: "https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A dystopian novel set in a futuristic World State, inhabited by genetically modified citizens and an intelligence-based social hierarchy.",
    genre: ["Fiction", "Dystopian", "Sci-Fi"],
    publishDate: "1932-06-01",
    isbn: "978-0060850524",
    rating: 4.5,
    inStock: true
  },
  {
    id: 11,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 10.99,
    coverImage: "https://images.pexels.com/photos/3747448/pexels-photo-3747448.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A philosophical novel about a young Andalusian shepherd who dreams of finding a worldly treasure.",
    genre: ["Fiction", "Philosophy", "Fantasy"],
    publishDate: "1988-06-01",
    isbn: "978-0062315007",
    rating: 4.6,
    inStock: true
  },
  {
    id: 12,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 18.99,
    coverImage: "https://images.pexels.com/photos/3747511/pexels-photo-3747511.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A book that explores the history of humanity from the evolution of archaic human species to the 21st century.",
    genre: ["Non-Fiction", "History", "Science"],
    publishDate: "2011-02-10",
    isbn: "978-0062316097",
    rating: 4.7,
    inStock: true
  }
];

export const mockUsers: User[] = [
  {
    id: 1,
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    country: "United States",
    city: "New York",
    age: 32
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    country: "Canada",
    city: "Toronto",
    age: 28
  },
  {
    id: 3,
    email: "david.wilson@example.com",
    firstName: "David",
    lastName: "Wilson",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    country: "United Kingdom",
    city: "London",
    age: 35
  }
];

export const mockReviews: Review[] = [
  {
    id: 1,
    bookId: 1,
    userId: 1,
    userName: "John Doe",
    userAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    comment: "A masterpiece that never gets old. The character development is phenomenal.",
    createdAt: "2023-05-15T14:30:00Z"
  },
  {
    id: 2,
    bookId: 1,
    userId: 2,
    userName: "Jane Smith",
    userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
    comment: "Beautifully written with powerful themes that remain relevant today.",
    createdAt: "2023-07-22T09:15:00Z"
  },
  {
    id: 3,
    bookId: 2,
    userId: 3,
    userName: "David Wilson",
    userAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    comment: "A chilling and prophetic novel. Orwell's vision becomes more relevant with each passing year.",
    createdAt: "2023-06-03T16:45:00Z"
  },
  {
    id: 4,
    bookId: 2,
    userId: 1,
    userName: "John Doe",
    userAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
    comment: "The world-building is immaculate, though the pacing can be slow at times.",
    createdAt: "2023-08-11T11:20:00Z"
  },
  {
    id: 5,
    bookId: 3,
    userId: 2,
    userName: "Jane Smith",
    userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    comment: "Fitzgerald's prose is poetic and the story is timeless. A true classic.",
    createdAt: "2023-04-27T13:10:00Z"
  }
];