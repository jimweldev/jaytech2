import { Input } from "@/components/ui/input"
import { useState } from "react";

const ComputerBrandPage = () => {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 sm:py-24 mb-4">
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">Computer Upgrade</h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Boost speed and reliability with professional hardware and software upgrades.
          </p>
        </div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://store.hp.com/app/assets/images/uploads/prod/pc-upgrade-guide-hero1548967802272.jpg')",
          }}
        />
      </div>

      {/* Computer Brands */}
      <div className="container mx-auto py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight px-4 text-gray-900 mb-4">
            Choose Your Computer Brand
          </h2>

          {/* Search Bar */}
          <div className="mb-6 px-4">
            <Input
              className="w-full max-w-md mx-auto"

              type="text"
              placeholder="Search brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

          </div>
        </div>
      </div>
    </>
  )
}

export default ComputerBrandPage