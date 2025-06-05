import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      <div className="container px-4 mx-auto">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-teal">
              Vehicle Damage Assessment AI
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Streamline your insurance claims with our advanced VGG-19 powered damage detection system. 
              Get instant damage assessment and claim estimates with just a photo.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-brand-blue font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Upload a Photo</h3>
                <p className="text-gray-600">
                  Simply upload a clear photo of your vehicle damage from any angle.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-brand-blue font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Assessment</h3>
                <p className="text-gray-600">
                  Our VGG-19 deep learning model analyzes the damage type, location, and severity.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-brand-blue font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Estimate</h3>
                <p className="text-gray-600">
                  Get an immediate claim value estimate based on damage analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white rounded-lg shadow-sm my-12 lg:my-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold">Ready to simplify your claims process?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of users who are saving time and getting faster claim approvals.
            </p>
            <Button asChild size="lg" className="mt-8 text-base">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm">
          <p>© 2025 ClaimVision Assist. All rights reserved.</p>
          <p className="mt-2">Powered by advanced VGG-19 deep learning models.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;