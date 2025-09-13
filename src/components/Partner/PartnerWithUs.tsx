import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "../Footer";
import {
  BankIcon,
  AgentIcon,
  AffinityIcon,
  MarketplaceIcon,
  WhiteLabelIcon,
  ApiIcon,
  Process1Icon,
  Process2Icon,
  Process3Icon,
  Process4Icon,
  UmbaLogo,
  TechIcon,
  EcommerceIcon,
  InsurTechIcon,
  InsuranceProviderIcon,
  HealthcareIcon,
  EmployerIcon,
  RevenueIcon,
  EfficiencyIcon,
  EngagementIcon,
  TrustIcon,
  AutoIcon,
} from "./../PartnerIcons";

const PartnerWithUs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "bank" | "underwriter" | "sacco" | "agent" | "individual" | "affinity"
  >("bank");
  const [isLoading, setIsLoading] = useState(false);

  const partnerTypes = [
    {
      id: "insurance-providers",
      name: "Insurance Providers (Carriers & Underwriters)",
      icon: <InsuranceProviderIcon />,
      description:
        "Expand your reach through our digital marketplace while maintaining underwriting control.",
    },
    {
      id: "banks",
      name: "Bank / Financial Institution",
      icon: <BankIcon />,
      description:
        "Embed insurance products into your banking services to increase customer value.",
    },
    {
      id: "insurtech",
      name: "InsurTech Startups",
      icon: <InsurTechIcon />,
      description:
        "Leverage our platform to distribute your innovative insurance solutions at scale.",
    },
    {
      id: "brokers-agents",
      name: "Brokers & Agents",
      icon: <AgentIcon />,
      description:
        "Access our full product portfolio and digital tools to serve clients more efficiently.",
    },
    {
      id: "ecommerce",
      name: "E-commerce & Retail",
      icon: <EcommerceIcon />,
      description:
        "Offer contextual insurance (e.g., gadget, travel) at checkout to boost revenue.",
    },
    {
      id: "auto-mobility",
      name: "Auto & Mobility Companies",
      icon: <AutoIcon />,
      description:
        "Bundle insurance with vehicle sales or rideshare services for a seamless experience.",
    },
    {
      id: "healthcare",
      name: "Healthcare Providers",
      icon: <HealthcareIcon />,
      description:
        "Integrate health insurance options for patients and telemedicine users.",
    },
    {
      id: "employers",
      name: "Employers & HR Platforms",
      icon: <EmployerIcon />,
      description:
        "Provide group insurance (health, life) as an employee benefit via our platform.",
    },
    {
      id: "affinity",
      name: "Affinity Groups (SACCOs, MFIs, Associations)",
      icon: <AffinityIcon />,
      description:
        "Monetize your member base with tailored insurance solutions.",
    },
    {
      id: "tech-partners",
      name: "Tech & API Providers",
      icon: <TechIcon />,
      description:
        "Integrate your KYC, claims, or CRM tools with our ecosystem.",
    },
  ];

  const benefits = [
    {
      icon: <RevenueIcon />,
      title: "Revenue Growth",
      items: [
        "**Commission Opportunities** – Earn on every policy sold through our platform.",
        "**Wider Product Range** – Offer 100+ insurance products from top providers.",
        "**Cross-Selling Potential** – Monetize existing customers with relevant add-ons.",
        "**Performance-Based Rewards** – Higher commissions for top-performing partners.",
      ],
    },
    {
      icon: <EfficiencyIcon />,
      title: "Operational Efficiency",
      items: [
        "**Seamless API Integrations** – Plug-and-play connectivity with your systems.",
        "**Automated Underwriting** – Instant quotes, policy issuance, and renewals.",
        "**Digital Claims Processing** – Faster payouts with AI-driven fraud detection.",
        "**Centralized Dashboard** – Track sales, commissions, and customer data in real-time.",
      ],
    },
    {
      icon: <EngagementIcon />,
      title: "Customer Engagement",
      items: [
        "**Co-Branded Marketing** – Customizable campaigns to promote your offerings.",
        "**AI-Powered Recommendations** – Personalized insurance matches for users.",
        "**Self-Service Portal** – Customers can manage policies without hassle.",
        "**Educational Content** – Blogs, webinars, and tools to drive informed purchases.",
      ],
    },
    {
      icon: <TrustIcon />,
      title: "Trust & Compliance",
      items: [
        "**Regulatory Support** – We handle licensing and compliance in key markets.",
        "**Data Security** – Bank-grade encryption and GDPR/CCPA compliance.",
        "**White-Glove Onboarding** – Dedicated support for partner integration.",
      ],
    },
  ];

  const integrationOptions = [
    {
      icon: <MarketplaceIcon />,
      title: "Insurance Marketplace",
      description:
        "Access our comprehensive marketplace with products from multiple insurers, all through a single integration",
      features: [
        "100+ insurance products",
        "40+ underwriters",
        "Real-time quotes",
        "Instant policy issuance",
      ],
    },
    {
      icon: <WhiteLabelIcon />,
      title: "White-Label Platform",
      description:
        "Launch your own branded insurance platform with our fully customizable solution",
      features: [
        "Complete brand control",
        "Custom product bundles",
        "Dedicated support",
        "Performance analytics",
      ],
    },
    {
      icon: <ApiIcon />,
      title: "API Integration",
      description:
        "Seamlessly integrate insurance products into your existing digital platforms",
      features: [
        "Developer-friendly documentation",
        "Sandbox environment",
        "Dedicated technical support",
        "Regular updates",
      ],
    },
  ];

  const processSteps = [
    {
      icon: <Process1Icon />,
      title: "Discovery Call",
      description: "We'll understand your business needs and goals",
      duration: "1-2 days",
    },
    {
      icon: <Process2Icon />,
      title: "Integration Setup",
      description: "Our team will implement the best integration solution",
      duration: "2-4 weeks",
    },
    {
      icon: <Process3Icon />,
      title: "Testing & Training",
      description: "We ensure everything works perfectly for your team",
      duration: "1-2 weeks",
    },
    {
      icon: <Process4Icon />,
      title: "Launch & Growth",
      description: "Go live and scale your insurance offerings",
      duration: "Ongoing",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-green-900 to-green-700 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-white">
                Partner With Africa's Leading
              </span>
              <br />
              <span className="text-white">Insurance Aggregator Platform</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Expand your revenue streams and enhance customer value with our
              comprehensive insurance distribution platform.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <button
                onClick={() => navigate("/partner-with-us")}
                className="px-8 py-4 bg-white text-green-700 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
              >
                Start Your Partnership Journey
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Partner Types */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who Can <span className="text-green-600">Partner</span> With Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We work with a diverse range of partners across the financial and
              insurance ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {partnerTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className={`p-6 rounded-xl border transition-all flex flex-col items-center text-center ${
                  activeTab === type.id
                    ? "border-green-500 bg-green-50 text-green-700 shadow-md"
                    : "border-gray-200 hover:border-green-300 bg-white"
                }`}
                onClick={() => setActiveTab(type.id)}
              >
                <div className="w-16 h-16 mb-4 text-green-600">{type.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-green-50 p-8 rounded-xl border border-green-100 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Benefits for {partnerTypes.find((t) => t.id === activeTab)?.name}{" "}
              Partners
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTab === "bank" && (
                <>
                  <p className="text-gray-700">
                    • Embed insurance products into your digital banking
                    platforms
                  </p>
                  <p className="text-gray-700">
                    • Increase customer stickiness with value-added services
                  </p>
                  <p className="text-gray-700">
                    • Earn commissions on every policy sold
                  </p>
                  <p className="text-gray-700">
                    • Custom product bundles for your customer segments
                  </p>
                </>
              )}
              {activeTab === "underwriter" && (
                <>
                  <p className="text-gray-700">
                    • Access to multiple distribution channels
                  </p>
                  <p className="text-gray-700">
                    • Reduced customer acquisition costs
                  </p>
                  <p className="text-gray-700">
                    • Digital policy issuance and management
                  </p>
                  <p className="text-gray-700">
                    • Real-time performance analytics
                  </p>
                </>
              )}
              {activeTab === "sacco" && (
                <>
                  <p className="text-gray-700">
                    • Tailored insurance products for your members
                  </p>
                  <p className="text-gray-700">
                    • Additional revenue stream for your organization
                  </p>
                  <p className="text-gray-700">
                    • Simplified member onboarding
                  </p>
                  <p className="text-gray-700">• Group policy discounts</p>
                </>
              )}
              {activeTab === "agent" && (
                <>
                  <p className="text-gray-700">
                    • Access to multiple insurers through one platform
                  </p>
                  <p className="text-gray-700">
                    • Competitive commission structures
                  </p>
                  <p className="text-gray-700">
                    • Digital tools to manage your clients
                  </p>
                  <p className="text-gray-700">
                    • Marketing support and lead generation
                  </p>
                </>
              )}
              {activeTab === "individual" && (
                <>
                  <p className="text-gray-700">
                    • No upfront costs to get started
                  </p>
                  <p className="text-gray-700">
                    • Comprehensive training and support
                  </p>
                  <p className="text-gray-700">• Mobile-friendly sales tools</p>
                  <p className="text-gray-700">
                    • Performance-based incentives
                  </p>
                </>
              )}
              {activeTab === "affinity" && (
                <>
                  <p className="text-gray-700">
                    • Monetize your customer relationships
                  </p>
                  <p className="text-gray-700">
                    • Customized insurance solutions
                  </p>
                  <p className="text-gray-700">
                    • White-label options available
                  </p>
                  <p className="text-gray-700">• Revenue sharing models</p>
                </>
              )}
            </div>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/partner-with-us")}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Apply to Become a Partner
            </motion.button>
          </div>
        </motion.section>

        {/* Why Partner With Us */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 py-12 bg-gray-50 rounded-2xl"
        >
          <div className="text-center mb-12 px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The <span className="text-green-600">Partner</span> Advantage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              How partnering with us drives growth and efficiency for your
              business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            {benefits.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-8 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <svg
                        className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Integration Scenarios */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Flexible <span className="text-green-600">Integration</span>{" "}
              Options
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose the integration method that best fits your business model
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrationOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600 mx-auto">
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {option.description}
                </p>
                <ul className="space-y-2 mt-4">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Process */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 bg-gradient-to-r from-green-50 to-white p-8 md:p-12 rounded-2xl border border-green-100"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple <span className="text-green-600">Onboarding</span> Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get started quickly with our streamlined partnership process
            </p>
          </div>

          <div className="relative">
            {/* Progress line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-green-200 mx-16"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center relative z-10"
                >
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                    <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                      {step.icon}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold md:block hidden">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <p className="text-green-600 text-sm font-medium">
                      {step.duration}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Case Study */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Partner <span className="text-green-600">Success</span> Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              See how we've helped our partners grow their insurance businesses
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Umba Microfinance Bank
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                By integrating our insurance marketplace into their digital
                banking platform, Umba MFB was able to offer bundled insurance
                products with their loans, creating additional value for
                customers and new revenue streams for the bank.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-green-50 p-6 rounded-xl text-center border border-green-100"
                >
                  <p className="text-3xl font-bold text-green-600 mb-2">40%</p>
                  <p className="text-gray-600 font-medium">
                    Increase in loan uptake with insurance bundles
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-green-50 p-6 rounded-xl text-center border border-green-100"
                >
                  <p className="text-3xl font-bold text-green-600 mb-2">90%</p>
                  <p className="text-gray-600 font-medium">
                    Policy automation rate reducing operational costs
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl border border-green-100 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mr-6 shadow-sm border border-green-100">
                  <UmbaLogo className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Testimonial</h4>
                  <p className="text-gray-500">CEO, Umba MFB</p>
                </div>
              </div>
              <p className="text-gray-600 italic text-lg leading-relaxed">
                "The partnership has been transformative for our business.
                Within six months of integration, insurance products became a
                significant revenue stream, and our customers appreciate the
                convenience of getting insured during their loan application
                process."
              </p>
              <div className="mt-6 flex justify-end">
                <div className="w-12 h-1 bg-green-400 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business with Insurance?
          </h2>
          <p className="text-green-100 text-xl mb-8 max-w-2xl mx-auto">
            Join our network of partners and start offering innovative insurance
            solutions to your customers today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/partner-with-us")}
              className="px-10 py-4 bg-white text-green-700 font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Become a Partner
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg text-lg hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Request a Demo
            </motion.button>
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

export default PartnerWithUs;
