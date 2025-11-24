import ShareForm from '../components/ShareForm'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ShareForm />
        <Footer />
      </div>
    </div>
  )
}
