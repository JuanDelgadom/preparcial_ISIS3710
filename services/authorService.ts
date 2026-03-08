import { Author } from "../types/Author";

const API = 'http://127.0.0.1:8080/api/authors';

export async function getAuthors(): Promise<Author[]> {
  const res = await fetch(API)
  return res.json()
}

export async function getAuthor(id: string): Promise<Author> {
  const res = await fetch(`${API}/${id}`)
  return res.json()
}

export async function createAuthor(author: Author) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(author)
  })
  return res.json()
}

export async function updateAuthor(id: string, author: Author) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(author)
  })
  return res.json()
}

export async function deleteAuthor(id: string) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  })
}