import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>Bookstore</h1>

      <Link href="/authors">
        Ver Autores
      </Link>
    </div>
  )
}