function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto text-center">
            {/* 头像 */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/images/avatar.jpg" 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow-lg"
              />
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Lian</h1>
            <p className="text-xl text-gray-700 mb-4">AI Product Manager & Researcher</p>
            <p className="text-lg text-gray-600 mb-4">Focusing on Human-Computer Interaction & AI Applications</p>
            <p className="text-lg text-gray-600 mb-8">Currently pursuing MPhil at HKUST</p>
            <div className="text-lg text-gray-600 mb-8 space-y-2">
              <p>• Expertise in AI product development and management</p>
              <p>• Research interests in human-centered AI and social computing</p>
              <p>• Experience with leading tech companies in Asia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App 