"use client"
import { useState, useTransition } from "react"
import type React from "react"

import { subscribeToWaitlist } from "../actions/waitlist"
import { Toast } from "@/components/ui/toast-notification"
import { SuccessModal } from "@/components/success-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, Mail, Zap, Calendar, Globe, ImageIcon, Layout, Video, Twitter } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function Home() {
  const [isPending, startTransition] = useTransition()
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [email, setEmail] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("email", email)

    startTransition(async () => {
      const result = await subscribeToWaitlist(formData)

      if (result.success) {
        setToast({ message: result.message, type: "success" })
        setEmail("")
        if (result.showModal) {
          setShowSuccessModal(true)
        }
      } else {
        setToast({ message: result.message, type: "error" })
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0A0A0F]/80 border-b border-gray-800/40">
        <div className="container mx-auto py-5 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#9D6EFF]" />
            <span className="font-medium text-lg tracking-tight">Project M</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#roadmap" className="text-sm text-gray-300 hover:text-white transition-colors">
              Roadmap
            </Link>
            <Link href="#faq" className="text-sm text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/30 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[#1A1A2E]/10 blur-3xl transform -translate-y-1/2 rounded-full"></div>

        <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-gray-800/60 rounded-full backdrop-blur-sm">
            <span className="text-xs font-medium text-[#9D6EFF]">Currently in private beta</span>
          </div>

          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Automate Your Marketing <span className="text-[#9D6EFF]">Campaigns</span> with AI
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create & Launch personalized marketing campaigns in minutes, not days. Join the
              waitlist to be among the first to revolutionize your marketing strategy
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900/60 border-gray-700/50 h-12 backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
              <Button
                type="submit"
                className="bg-[#7B4AE2] hover:bg-[#6A3ACF] h-12 px-6 transition-all duration-300"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Join Waitlist"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="text-gray-500 mt-4 text-sm flex items-center justify-center gap-1">
              <Mail className="h-4 w-4" />
              We'll notify you when we launch
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="features" className="py-24 relative bg-[#0D0D14]">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50')] bg-repeat opacity-[0.02]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block mb-3 px-3 py-1 bg-[#1A1A2E] rounded-full text-xs font-medium text-[#9D6EFF]">
              How It Works
            </div>
            <h2 className="text-3xl font-bold mb-4">Streamlined Process</h2>
            <p className="text-gray-400 max-w-2xl">
              Our AI-powered platform simplifies marketing campaign creation through a four-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="bg-gradient-to-b from-gray-800/40 to-gray-800/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 relative group transition-all duration-300 hover:border-[#9D6EFF]/30 hover:shadow-[0_0_25px_-5px_rgba(157,110,255,0.1)]">
              <div className="absolute -top-3 -left-3 bg-[#7B4AE2] rounded-full w-7 h-7 flex items-center justify-center font-medium text-sm">
                1
              </div>
              <h3 className="text-xl font-medium mb-3 mt-2">Select / Create Buyer Avatar</h3>
              <p className="text-gray-400 mb-5 text-sm leading-relaxed">
              Enter your business and product details — our AI will instantly generate your ideal buyer persona, complete with detailed psychographics.
              </p>
              <div className="rounded-lg overflow-hiddenx bg-gray-900/50 border border-gray-700/30">
                <Image
                  src="/avatar.png"
                  alt="Buyer Avatar Creation"
                  width={200}
                  height={120}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-b from-gray-800/40 to-gray-800/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 relative group transition-all duration-300 hover:border-[#9D6EFF]/30 hover:shadow-[0_0_25px_-5px_rgba(157,110,255,0.1)]">
              <div className="absolute -top-3 -left-3 bg-[#7B4AE2] rounded-full w-7 h-7 flex items-center justify-center font-medium text-sm">
                2
              </div>
              <h3 className="text-xl font-medium mb-3 mt-2">Define Your Product</h3>
              <p className="text-gray-400 mb-5 text-sm leading-relaxed">
              You can either choose a product you've already added to your list, or create a brand-new one by submitting a few quick details. This helps us tailor your campaign content to fit your product perfectly
              </p>
              <div className="rounded-lg overflow-hidden border border-gray-700/30 bg-gray-900/50">
                <Image
                  src="/product details.png"
                  alt="Product Definition"
                  width={200}
                  height={120}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-b from-gray-800/40 to-gray-800/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 relative group transition-all duration-300 hover:border-[#9D6EFF]/30 hover:shadow-[0_0_25px_-5px_rgba(157,110,255,0.1)]">
              <div className="absolute -top-3 -left-3 bg-[#7B4AE2] rounded-full w-7 h-7 flex items-center justify-center font-medium text-sm">
                3
              </div>
              <h3 className="text-xl font-medium mb-3 mt-2">Select Channels & Goals</h3>
              <p className="text-gray-400 mb-5 text-sm leading-relaxed">
              Select Marketing channels you want to campaign on (Emails, SMS, Paid Ads, and much more) and select campaign objective, be it conversions, engagement, or awareness.
              </p>
              <div className="rounded-lg overflow-hidden border border-gray-700/30 bg-gray-900/50">
                <Image
                  src="/channels.png"
                  alt="Channel Selection"
                  width={200}
                  height={120}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-gradient-to-b from-gray-800/40 to-gray-800/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 relative group transition-all duration-300 hover:border-[#9D6EFF]/30 hover:shadow-[0_0_25px_-5px_rgba(157,110,255,0.1)]">
              <div className="absolute -top-3 -left-3 bg-[#7B4AE2] rounded-full w-7 h-7 flex items-center justify-center font-medium text-sm">
                4
              </div>
              <h3 className="text-xl font-medium mb-3 mt-2">Get Your Campaign</h3>
              <p className="text-gray-400 mb-5 text-sm leading-relaxed">
              Get a fully done-for-you, AI-powered marketing campaign — complete with launch-ready content, channel-wise breakdowns and detailed execution schedule. Just Plug and Play
              </p>
              <div className="rounded-lg overflow-hidden border border-gray-700/30 bg-gray-900/50">
                <Image
                  src="/campaign.png"
                  alt="Campaign Generation"
                  width={200}
                  height={120}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D14] via-[#0A0A0F] to-[#0D0D14]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block mb-3 px-3 py-1 bg-[#1A1A2E] rounded-full text-xs font-medium text-[#9D6EFF]">
              Product Roadmap
            </div>
            <h2 className="text-3xl font-bold mb-4">Upcoming Features</h2>
            <p className="text-gray-400 max-w-2xl">
              Our development roadmap outlines the powerful features we're building to transform your marketing
              operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="bg-[#0D0D14] rounded-xl p-6 border border-gray-800/50 hover:border-[#9D6EFF]/30 transition-all duration-300 group">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#1A1A2E]/80 transition-colors">
                <Calendar className="h-6 w-6 text-[#9D6EFF]" />
              </div>
              <h3 className="text-xl font-medium mb-3">Execute Campaigns</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Directly execute your campaigns on autopilot and track performance on the platform itself. No more
                switching between tools.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0D0D14] rounded-xl p-6 border border-gray-800/50 hover:border-[#9D6EFF]/30 transition-all duration-300 group">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#1A1A2E]/80 transition-colors">
                <Globe className="h-6 w-6 text-[#9D6EFF]" />
              </div>
              <h3 className="text-xl font-medium mb-3">All Major Channels</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Run campaigns across all major marketing channels from a single platform. Social media, email, PPC, and
                more.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0D0D14] rounded-xl p-6 border border-gray-800/50 hover:border-[#9D6EFF]/30 transition-all duration-300 group">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#1A1A2E]/80 transition-colors">
                <ImageIcon className="h-6 w-6 text-[#9D6EFF]" />
              </div>
              <h3 className="text-xl font-medium mb-3">Visual Content</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get personalised ad creatives, social media posts, carousels, and more as part of your campaign.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#0D0D14] rounded-xl p-6 border border-gray-800/50 hover:border-[#9D6EFF]/30 transition-all duration-300 group">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#1A1A2E]/80 transition-colors">
                <Layout className="h-6 w-6 text-[#9D6EFF]" />
              </div>
              <h3 className="text-xl font-medium mb-3">Webpages</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Let us handle creating all the required webpages your campaign needs: landing pages, lead magnets, sales
                pages, and more.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#0D0D14] rounded-xl p-6 border border-gray-800/50 hover:border-[#9D6EFF]/30 transition-all duration-300 group">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#1A1A2E]/80 transition-colors">
                <Video className="h-6 w-6 text-[#9D6EFF]" />
              </div>
              <h3 className="text-xl font-medium mb-3">Video Content</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get high-performing videos created automatically for your campaigns, optimized for engagement and
                conversions.
              </p>
            </div>

            {/* Coming Soon */}
            <div className="bg-[#0D0D14] rounded-xl p-6 border border-gray-800/50 hover:border-[#9D6EFF]/30 transition-all duration-300 group">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#1A1A2E]/80 transition-colors">
                <span className="text-xl font-bold text-[#9D6EFF]">+</span>
              </div>
              <h3 className="text-xl font-medium mb-3">And More Coming</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We're constantly adding new features based on user feedback. Join the waitlist to influence what we
                build next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0D0D14] relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50')] bg-repeat opacity-[0.02]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block mb-3 px-3 py-1 bg-[#1A1A2E] rounded-full text-xs font-medium text-[#9D6EFF]">
              Key Benefits
            </div>
            <h2 className="text-3xl font-bold mb-4">Why Choose Project M</h2>
            <p className="text-gray-400 max-w-2xl">
              Automated Marketing Completely. It would either force you to fire your marketing team or make them 10-times more productive
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col p-6 bg-gradient-to-b from-gray-800/20 to-transparent rounded-xl border border-gray-700/20">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-[#9D6EFF]" />
              </div>
              <h3 className="text-xl font-medium mb-3">AI-Powered Insights</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our AI analyzes market trends and consumer behavior to create highly effective campaigns with predictive
                performance metrics.
              </p>
            </div>

            <div className="flex flex-col p-6 bg-gradient-to-b from-gray-800/20 to-transparent rounded-xl border border-gray-700/20">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-[#9D6EFF]" />
              </div>
              <h3 className="text-xl font-medium mb-3">Time Efficiency</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create complete marketing campaigns in minutes instead of days or weeks, allowing your team to focus on
                strategic initiatives.
              </p>
            </div>

            <div className="flex flex-col p-6 bg-gradient-to-b from-gray-800/20 to-transparent rounded-xl border border-gray-700/20">
              <div className="bg-[#1A1A2E] rounded-xl p-4 w-14 h-14 flex items-center justify-center mb-6">
                <ArrowRight className="h-6 w-6 text-[#9D6EFF]" />
              </div>
              <h3 className="text-xl font-medium mb-3">Multi-Channel Support</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Deploy your campaigns across multiple platforms with consistent messaging and branding, optimized for
                each channel's unique requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Section */}
      <section id="follow" className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D14] to-[#0A0A0F]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto bg-[#1A1A2E]/50 border border-[#9D6EFF]/20 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-medium mb-2">Follow My Journey</h3>
                <p className="text-gray-300 mb-4">
                  I'm building Project M in public. Follow along to get behind-the-scenes insights, early access, and
                  exclusive updates.
                </p>

                <Button
                  onClick={() => window.open("https://x.com/piyushkkr", "_blank")}
                  className="bg-[#1DA1F2] hover:bg-[#1a94e0] text-white flex items-center justify-center gap-2 px-6 mx-auto md:mx-0"
                >
                  <Twitter className="h-5 w-5" />
                  Follow @piyushkkr on X
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0D0D14] to-[#0A0A0F]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block mb-3 px-3 py-1 bg-[#1A1A2E] rounded-full text-xs font-medium text-[#9D6EFF]">
              FAQ
            </div>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl">Find answers to common questions about our platform and services.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-gray-800/50 mb-4">
                <AccordionTrigger className="text-left text-lg font-medium py-5 px-6 bg-[#0D0D14] rounded-xl hover:bg-[#0D0D14]/80 transition-colors">
                  How does Project M generate marketing campaigns?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5 pt-2 px-6">
                  Project M analyses your business, product, and target
                  audience. It then creates personalized marketing campaigns based on proven strategies and best
                  practices in your industry. The AI continuously learns and improves from successful campaigns to
                  deliver better results over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-gray-800/50 mb-4">
                <AccordionTrigger className="text-left text-lg font-medium py-5 px-6 bg-[#0D0D14] rounded-xl hover:bg-[#0D0D14]/80 transition-colors">
                  When will Project M be available?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5 pt-2 px-6">
                  We're currently in the final stages of development and plan to launch in the coming weeks. Join our
                  waitlist to be among the first to get access and receive updates on our progress.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-gray-800/50 mb-4">
                <AccordionTrigger className="text-left text-lg font-medium py-5 px-6 bg-[#0D0D14] rounded-xl hover:bg-[#0D0D14]/80 transition-colors">
                  What marketing channels does Project M support?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5 pt-2 px-6">
                  As we are building MVP version 1 so we are making Emails, X, SMS, WhatsApp & Reddit campaigns available. We are working on launching all major channels in the MVP version 2 based on channel popularity and user feedback
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-gray-800/50 mb-4">
                <AccordionTrigger className="text-left text-lg font-medium py-5 px-6 bg-[#0D0D14] rounded-xl hover:bg-[#0D0D14]/80 transition-colors">
                  Do I need marketing experience to use Project M?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5 pt-2 px-6">
                  No, Project M is designed to be user-friendly for everyone, regardless of marketing experience. Our
                  platform handles the complex strategy work while providing you with an intuitive interface to input
                  your business information and goals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-gray-800/50 mb-4">
                <AccordionTrigger className="text-left text-lg font-medium py-5 px-6 bg-[#0D0D14] rounded-xl hover:bg-[#0D0D14]/80 transition-colors">
                  How much does Project M cost?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5 pt-2 px-6">
                  We'll offer several pricing tiers to accommodate businesses of all sizes. Pricing details will be
                  announced closer to launch, but waitlist members will receive special early-bird pricing and exclusive
                  offers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-gray-800/50">
                <AccordionTrigger className="text-left text-lg font-medium py-5 px-6 bg-[#0D0D14] rounded-xl hover:bg-[#0D0D14]/80 transition-colors">
                  Can I customize the campaigns generated by Project M?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5 pt-2 px-6">
                  While Project M creates complete campaigns automatically, you'll have full control to review, edit, regenerate & customize any aspect before launching. Our platform provides the perfect balance between
                  automation and customization.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/80 to-[#2D1A4A]/80"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[#9D6EFF]/10 blur-3xl transform -translate-y-1/2 rounded-full"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-[#9D6EFF]/5 blur-3xl transform translate-y-1/2 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be First in Line</h2>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              Join our exclusive waitlist today and get early access to the future of marketing automation.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white h-12 backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
              <Button
                type="submit"
                className="bg-white text-[#1A1A2E] hover:bg-gray-100 h-12 px-6 transition-all duration-300 font-medium"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Join Waitlist"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-sm text-gray-400">
              By joining, you'll receive product updates and early access opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0A0A0F] border-t border-gray-800/40">
        <div className="container mx-auto px-4">
          

          <div className="pt-8 border-t border-gray-800/40 flex flex-col md:flex-row justify-between items-center">

            <div className="flex space-x-6">
              <Link href="x.com/piyushkkr" className="text-gray-400 hover:text-[#9D6EFF] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
