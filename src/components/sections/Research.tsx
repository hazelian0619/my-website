export default function Research() {
  return (
    <section id="research" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light mb-12 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="project-card bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-medium">AI-Powered Healthcare Assistant</h3>
              <span className="text-sm text-gray-500">2024.6 - 2024.9</span>
            </div>
            <p className="text-gray-600 mb-4">Led development of an AI healthcare assistant at HiDream.ai</p>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Key Achievements</h4>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-2">
                  <li>Developed and deployed GPT-based medical consultation system</li>
                  <li>Improved diagnosis accuracy by 35% through fine-tuning</li>
                  <li>Integrated real-time medical image analysis using PyTorch</li>
                  <li>Led team of 5 engineers in system architecture design</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                <p className="text-sm text-gray-600">PyTorch, TensorFlow, GPT-3.5, Computer Vision, AWS</p>
              </div>
            </div>
          </div>
          
          <div className="project-card bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-medium">ByteDance Recommendation System</h3>
              <span className="text-sm text-gray-500">2024.3 - 2024.6</span>
            </div>
            <p className="text-gray-600 mb-4">Optimized content recommendation algorithms for ByteDance's e-commerce platform</p>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Key Contributions</h4>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-2">
                  <li>Developed dynamic pricing model increasing ROI by 76%</li>
                  <li>Implemented A/B testing framework for algorithm optimization</li>
                  <li>Enhanced user engagement metrics by 45%</li>
                  <li>Collaborated with data scientists to improve recommendation accuracy</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Skills Applied</h4>
                <p className="text-sm text-gray-600">Machine Learning, A/B Testing, Python, SQL, Data Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 